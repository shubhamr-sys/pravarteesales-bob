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
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode?: string) => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      ready?: (callback: () => void) => void;
    };
    __onTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
/** Public sitekey — safe in client bundles; secret stays server-only */
const FALLBACK_SITE_KEY = "0x4AAAAAAFYNZljRVSyMb9OG";

function getSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || FALLBACK_SITE_KEY;
}

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.turnstile) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Turnstile")), {
        once: true,
      });
      // Already loaded but API not yet attached
      const start = Date.now();
      const poll = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(poll);
          resolve();
        } else if (Date.now() - start > 8000) {
          window.clearInterval(poll);
          reject(new Error("Turnstile timed out"));
        }
      }, 50);
    });
  }

  return new Promise((resolve, reject) => {
    window.__onTurnstileLoad = () => resolve();
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__onTurnstileLoad";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Turnstile"));
    document.head.appendChild(script);
  });
}

function whenTurnstileReady(cb: () => void) {
  if (!window.turnstile) return;
  if (typeof window.turnstile.ready === "function") {
    window.turnstile.ready(cb);
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
    if (!containerRef.current) return;

    let cancelled = false;
    setStatus("loading");
    setErrorMessage(null);
    onTokenRef.current(null);

    const mount = async () => {
      try {
        await loadTurnstileScript();
        if (cancelled || !containerRef.current || !window.turnstile) {
          if (!cancelled) {
            setStatus("error");
            setErrorMessage("CAPTCHA failed to load. Please refresh and try again.");
          }
          return;
        }

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        containerRef.current.innerHTML = "";

        whenTurnstileReady(() => {
          if (cancelled || !containerRef.current || !window.turnstile) return;
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey,
            action,
            theme: "light",
            size: "flexible",
            callback: (token) => {
              setStatus("ready");
              onTokenRef.current(token);
            },
            "expired-callback": () => onTokenRef.current(null),
            "error-callback": () => {
              onTokenRef.current(null);
              setStatus("error");
              setErrorMessage(
                "CAPTCHA could not verify this domain. Add pravarteesales.com in Cloudflare Turnstile widget domains."
              );
            },
          });
          setStatus("ready");
        });
      } catch {
        if (!cancelled) {
          onTokenRef.current(null);
          setStatus("error");
          setErrorMessage("CAPTCHA failed to load. Please refresh and try again.");
        }
      }
    };

    mount();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [sitekey, resetKey, action]);

  return (
    <div className="space-y-2">
      <div ref={containerRef} className="min-h-[65px] flex items-center" />
      {status === "loading" && (
        <p className="text-xs text-[#0A1F44]/45">Loading security check…</p>
      )}
      {errorMessage && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
