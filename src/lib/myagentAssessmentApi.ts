/** Shared MyAgent Supabase project (assessment + Natyv business page forms). */
export const MYAGENT_SUPABASE_URL =
  import.meta.env.VITE_MYAGENT_SUPABASE_URL ?? "https://mpbiwfisywymkdjlwivg.supabase.co";

export const MYAGENT_SUPABASE_ANON_KEY =
  import.meta.env.VITE_MYAGENT_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYml3ZmlzeXd5bWtkamx3aXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODUwNDgsImV4cCI6MjA3OTI2MTA0OH0.UQIUPHcIvXrMSCfmA0tgqjQA8gptgEktTfDyx2hxZn0";

export const ASSESSMENT_START_URL =
  import.meta.env.VITE_ASSESSMENT_START_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/start-ai-opportunity-assessment`;

export const ASSESSMENT_REFERRAL_LOOKUP_URL =
  import.meta.env.VITE_ASSESSMENT_REFERRAL_LOOKUP_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/get-public-assessment-referral`;

export const ASSESSMENT_FUNNEL_EVENT_URL =
  import.meta.env.VITE_ASSESSMENT_FUNNEL_EVENT_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/track-public-assessment-event`;

export const SUBMIT_CONTACT_FORM_URL = `${MYAGENT_SUPABASE_URL}/functions/v1/submit-contact-form`;

export const ASSESSMENT_BY_SESSION_URL =
  import.meta.env.VITE_ASSESSMENT_BY_SESSION_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/get-ai-opportunity-assessment-by-session`;

export const NATYV_BUSINESS_PAGE_SLUG = "natyv-ai";

export const REFERRAL_LOCALSTORAGE_KEY = "myagent_ref";

const ASSESSMENT_FUNNEL_SESSION_KEY = "natyv_assessment_funnel_session_v1";

export type AssessmentFunnelEventType =
  | "page_view"
  | "proof_view"
  | "proof_snapshot_view"
  | "proof_recommendation_selected"
  | "proof_cta_clicked"
  | "form_view"
  | "form_start"
  | "form_submit"
  | "referral_loaded";

/**
 * A short-lived, anonymous browser session key lets Mission Control measure
 * the funnel without sending names, email addresses, or assessment content.
 */
export function readAssessmentFunnelSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = sessionStorage.getItem(ASSESSMENT_FUNNEL_SESSION_KEY);
    if (existing && /^[a-z0-9-]{12,80}$/i.test(existing)) return existing;
    const generated = typeof crypto?.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
    sessionStorage.setItem(ASSESSMENT_FUNNEL_SESSION_KEY, generated);
    return generated;
  } catch {
    return "";
  }
}

/** Fire-and-forget, privacy-minimal funnel telemetry. Conversion actions never depend on it. */
export function trackAssessmentFunnelEvent(
  eventType: AssessmentFunnelEventType,
  metadata: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  const sessionId = readAssessmentFunnelSessionId();
  if (!sessionId) return;
  const referralCode = readStoredAssessmentReferralCode();
  const safeMetadata = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => ["string", "number", "boolean"].includes(typeof value)).slice(0, 8),
  );
  const entrySource = new URLSearchParams(window.location.search).get("source")?.trim() || "";
  if (entrySource && /^[a-z0-9_-]{1,40}$/i.test(entrySource) && !safeMetadata.entry_source) {
    safeMetadata.entry_source = entrySource;
  }
  const qaParam = new URLSearchParams(window.location.search).get("qa")?.trim().toLowerCase();
  const isQaTraffic = qaParam === "1" || qaParam === "true" || entrySource.toLowerCase().startsWith("qa_");
  if (isQaTraffic && !safeMetadata.traffic_class) {
    safeMetadata.traffic_class = "qa";
  }
  void fetch(ASSESSMENT_FUNNEL_EVENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: MYAGENT_SUPABASE_ANON_KEY,
    },
    keepalive: true,
    body: JSON.stringify({
      event_type: eventType,
      session_id: sessionId,
      referral_code: referralCode || undefined,
      path: window.location.pathname,
      metadata: safeMetadata,
    }),
  }).catch(() => {
    // Funnel telemetry must never interrupt the assessment or form submit.
  });
}

const REFERRER_SHARE_STORAGE_KEY = "natyv_assessment_referrer_share_v1";

export function normalizeAssessmentReferralCode(raw: string | null | undefined): string {
  const cleaned = String(raw ?? "").trim().toUpperCase();
  return /^[A-Z0-9-]{4,30}$/.test(cleaned) ? cleaned : "";
}

export function readStoredAssessmentReferralCode(): string {
  try {
    const raw = localStorage.getItem(REFERRAL_LOCALSTORAGE_KEY);
    return normalizeAssessmentReferralCode(raw);
  } catch {
    return "";
  }
}

export function readStoredReferrerShareUrl(): string {
  try {
    return sessionStorage.getItem(REFERRER_SHARE_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function storeReferrerShareUrl(url: string) {
  try {
    sessionStorage.setItem(REFERRER_SHARE_STORAGE_KEY, url);
  } catch {
    /* ignore */
  }
}

export function buildAssessmentReferralShareUrl(code: string): string {
  const cleaned = normalizeAssessmentReferralCode(code);
  if (!cleaned) return "";
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return `${window.location.origin}/assessment?ref=${encodeURIComponent(cleaned)}`;
    }
  }
  return `https://natyv.ai/assessment?ref=${encodeURIComponent(cleaned)}`;
}

export type PublicAssessmentReferralOffer = {
  valid: true;
  referral_code: string;
  referrer_first_name: string | null;
  full_price_cents: number;
  discount_cents: number;
  amount_total_cents: number;
};

export async function fetchPublicAssessmentReferral(code: string): Promise<PublicAssessmentReferralOffer | null> {
  const normalized = normalizeAssessmentReferralCode(code);
  if (!normalized) return null;

  const response = await fetch(
    `${ASSESSMENT_REFERRAL_LOOKUP_URL}?ref=${encodeURIComponent(normalized)}`,
    { headers: { apikey: MYAGENT_SUPABASE_ANON_KEY } },
  );
  if (response.status === 404) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Unable to verify this referral invitation.");
  return data as PublicAssessmentReferralOffer;
}

export type AssessmentBySessionResult =
  | { ready: true; first_name: string | null; pdf_url: string; opportunities: string[] }
  | { ready: false; reason: "not_paid" | "processing" };

export async function fetchAssessmentBySession(sessionId: string): Promise<AssessmentBySessionResult> {
  const response = await fetch(
    `${ASSESSMENT_BY_SESSION_URL}?session_id=${encodeURIComponent(sessionId)}`,
    { headers: { apikey: MYAGENT_SUPABASE_ANON_KEY } },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Unable to load your report");
  return data as AssessmentBySessionResult;
}

export type PublicAssessmentStartPayload = {
  first_name: string;
  email: string;
  company_or_role?: string;
  referral_code?: string;
  create_checkout?: boolean;
};

export async function startPublicAiOpportunityAssessment(payload: PublicAssessmentStartPayload) {
  const referral_code = payload.referral_code ?? readStoredAssessmentReferralCode();
  const response = await fetch(ASSESSMENT_START_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: MYAGENT_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      first_name: payload.first_name,
      email: payload.email,
      company_or_role: payload.company_or_role,
      referral_code: referral_code || undefined,
      create_checkout: payload.create_checkout === true,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Unable to start the assessment");
  return data as {
    assessment_id: string;
    intake_url?: string;
    checkout_url?: string;
    amount_total?: number;
    referral_applied?: boolean;
    referral_code?: string;
    referral_share_url?: string;
  };
}
