import { TURNSTILE_ACTION_JOB_APPLICATION } from "@/lib/turnstile-constants";

export { TURNSTILE_ACTION_JOB_APPLICATION };

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

function expectedHostnames(): Set<string> {
  return new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  );
}

function turnstileSecret(): string | undefined {
  return process.env.TURNSTILE_SECRET || process.env.TURNSTILE_SECRET_KEY;
}

export async function verifyTurnstileToken(
  token: string,
  options?: {
    expectedAction?: string;
    remoteip?: string | null;
  }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = turnstileSecret();
  const hostnames = expectedHostnames();
  const expectedAction = options?.expectedAction ?? TURNSTILE_ACTION_JOB_APPLICATION;

  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET is not set");
    return { ok: false, error: "CAPTCHA is not configured." };
  }

  if (hostnames.size === 0) {
    console.error("[turnstile] TURNSTILE_HOSTNAMES is not set");
    return { ok: false, error: "CAPTCHA is not configured." };
  }

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048
  ) {
    return { ok: false, error: "Please complete the CAPTCHA." };
  }

  let result: SiteverifyResult;
  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });
    if (options?.remoteip) body.set("remoteip", options.remoteip);

    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    result = (await res.json()) as SiteverifyResult;
  } catch (err) {
    console.error("[turnstile] verify error", err);
    return { ok: false, error: "CAPTCHA verification failed. Please try again." };
  }

  if (
    !result.success ||
    result.action !== expectedAction ||
    !result.hostname ||
    !hostnames.has(result.hostname)
  ) {
    console.warn("[turnstile] verify rejected", {
      success: result.success,
      action: result.action,
      hostname: result.hostname,
      codes: result["error-codes"],
    });
    return { ok: false, error: "CAPTCHA verification failed. Please try again." };
  }

  return { ok: true };
}
