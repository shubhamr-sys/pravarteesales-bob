"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_ACTION_JOB_APPLICATION } from "@/lib/turnstile-constants";

/** Public sitekey — safe in client bundles; secret stays server-only */
const FALLBACK_SITE_KEY = "0x4AAAAAAFYNZljRVSyMb9OG";

function getSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || FALLBACK_SITE_KEY;
}

function explainError(code?: string | Error | unknown): string {
  const c = String(code ?? "");
  if (c.includes("110200")) {
    return "Domain not authorized. In Cloudflare Turnstile → Hostname Management, add pravarteesales.com.";
  }
  if (c.includes("110100") || c.includes("110110") || c.includes("400020")) {
    return "Invalid Turnstile site key. Check NEXT_PUBLIC_TURNSTILE_SITE_KEY in Vercel.";
  }
  if (c) return `CAPTCHA error: ${c}`;
  return "CAPTCHA could not complete. Please try again.";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const siteKey = getSiteKey();

  return (
    <div className="space-y-2 rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
        Security check *
      </p>
      <Turnstile
        key={resetKey}
        siteKey={siteKey}
        options={{
          action,
          theme: "light",
          size: "normal",
          appearance: "always",
        }}
        scriptOptions={{
          appendTo: "head",
        }}
        onSuccess={(token) => {
          setErrorMessage(null);
          onToken(token);
        }}
        onExpire={() => onToken(null)}
        onError={(code) => {
          onToken(null);
          setErrorMessage(explainError(code));
        }}
        onTimeout={() => {
          onToken(null);
          setErrorMessage("CAPTCHA timed out. Please try again.");
        }}
      />
      {errorMessage && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 leading-relaxed">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
