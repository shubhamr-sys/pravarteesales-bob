"use client";

import { useEffect, useRef, useState } from "react";
import { TURNSTILE_ACTION_JOB_APPLICATION } from "@/lib/turnstile-constants";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "flexible" | "compact";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode?: string) => void | boolean;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      ready?: (callback: () => void) => void;
    };
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
/** Public sitekey — safe in client bundles; secret stays server-only */
const FALLBACK_SITE_KEY = "0x4AAAAAAFYNZljRVSyMb9OG";

function getSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || FALLBACK_SITE_KEY;
}

function explainError(code?: string): string {
  const c = String(code ?? "");
  if (c.startsWith("110200") || c === "110200") {
    return "Domain not authorized. In Cloudflare Turnstile → your widget → Hostname Management, add pravarteesales.com (and localhost for local testing).";
  }
  if (c.startsWith("110100") || c.startsWith("110110") || c.startsWith("400020")) {
    return "Invalid Turnstile site key. Check NEXT_PUBLIC_TURNSTILE_SITE_KEY in Vercel.";
  }
  if (c) return `CAPTCHA error (${c}). Check Cloudflare Turnstile widget settings.`;
  return "CAPTCHA could not load. Check domain allowlist in Cloudflare Turnstile.";
}

function waitForTurnstile(timeoutMs = 15000): Promise<NonNullable<Window["turnstile"]>> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("No window"));
      return;
    }
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    const start = Date.now();
    const tick = () => {
      if (window.turnstile) {
        resolve(window.turnstile);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        reject(new Error("Turnstile API timed out"));
        return;
      }
      window.setTimeout(tick, 50);
    };
    tick();
  });
}

function ensureTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    // Script tag already present (including after React Strict Mode remount)
    return waitForTurnstile().then(() => undefined);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      waitForTurnstile()
        .then(() => resolve())
        .catch(reject);
    };
    script.onerror = () => reject(new Error("Failed to load Turnstile script"));
    document.head.appendChild(script);
  });
}

function whenTurnstileReady(api: NonNullable<Window["turnstile"]>, cb: () => void) {
  if (typeof api.ready === "function") {
    api.ready(cb);
  } else {
    cb();
  }
}

interface Props {
  onToken: (token: string | null) => void;
  resetKey?: number;
  action?: string;
}

export default function TurnstileWidget({
  onToken,
  resetKey = 0,
  action = TURNSTILE_ACTION_JOB_APPLICATION,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sitekey = getSiteKey();

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setErrorMessage(null);
    onTokenRef.current(null);

    const mount = async () => {
      try {
        await ensureTurnstileScript();
        if (cancelled) return;

        const api = window.turnstile;
        const el = containerRef.current;
        if (!api || !el) {
          setStatus("error");
          setErrorMessage("CAPTCHA failed to load. Please refresh and try again.");
          return;
        }

        if (widgetIdRef.current) {
          try {
            api.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = null;
        }

        el.innerHTML = "";

        whenTurnstileReady(api, () => {
          if (cancelled || !containerRef.current || !window.turnstile) return;
          try {
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
              sitekey,
              action,
              theme: "light",
              size: "normal",
              appearance: "always",
              callback: (token) => {
                setStatus("ready");
                setErrorMessage(null);
                onTokenRef.current(token);
              },
              "expired-callback": () => onTokenRef.current(null),
              "error-callback": (errorCode) => {
                onTokenRef.current(null);
                setStatus("error");
                setErrorMessage(explainError(errorCode));
                return true;
              },
            });
            setStatus("ready");
          } catch (err) {
            console.error("[Turnstile] render failed", err);
            setStatus("error");
            setErrorMessage("CAPTCHA failed to render. Please refresh and try again.");
          }
        });
      } catch (err) {
        console.error("[Turnstile] load failed", err);
        if (!cancelled) {
          onTokenRef.current(null);
          setStatus("error");
          setErrorMessage("CAPTCHA failed to load. Please refresh and try again.");
        }
      }
    };

    // Defer one frame so the container ref is attached after paint
    const raf = window.requestAnimationFrame(() => {
      void mount();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [sitekey, resetKey, action]);

  return (
    <div className="space-y-2 rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
        Security check *
      </p>
      <div ref={containerRef} className="min-h-[65px] w-full overflow-visible" />
      {status === "loading" && (
        <p className="text-xs text-[#0A1F44]/45">Loading Cloudflare CAPTCHA…</p>
      )}
      {errorMessage && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 leading-relaxed">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
