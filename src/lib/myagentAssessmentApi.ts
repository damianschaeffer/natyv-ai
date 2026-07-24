/** Shared MyAgent Supabase project (assessment + Natyv business page forms). */
export const MYAGENT_SUPABASE_URL =
  import.meta.env.VITE_MYAGENT_SUPABASE_URL ?? "https://mpbiwfisywymkdjlwivg.supabase.co";

export const MYAGENT_SUPABASE_ANON_KEY =
  import.meta.env.VITE_MYAGENT_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYml3ZmlzeXd5bWtkamx3aXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODUwNDgsImV4cCI6MjA3OTI2MTA0OH0.UQIUPHcIvXrMSCfmA0tgqjQA8gptgEktTfDyx2hxZn0";

export const ASSESSMENT_START_URL =
  import.meta.env.VITE_ASSESSMENT_START_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/start-ai-opportunity-assessment`;

export const SUBMIT_CONTACT_FORM_URL = `${MYAGENT_SUPABASE_URL}/functions/v1/submit-contact-form`;

export const ASSESSMENT_BY_SESSION_URL =
  import.meta.env.VITE_ASSESSMENT_BY_SESSION_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/get-ai-opportunity-assessment-by-session`;

export const NATYV_BUSINESS_PAGE_SLUG = "natyv-ai";

export const REFERRAL_LOCALSTORAGE_KEY = "myagent_ref";

const REFERRER_SHARE_STORAGE_KEY = "natyv_assessment_referrer_share_v1";

export function readStoredAssessmentReferralCode(): string {
  try {
    const raw = localStorage.getItem(REFERRAL_LOCALSTORAGE_KEY);
    if (!raw) return "";
    const cleaned = raw.trim().toUpperCase();
    return /^[A-Z0-9-]{4,30}$/.test(cleaned) ? cleaned : "";
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
  const cleaned = code.trim().toUpperCase();
  if (!/^[A-Z0-9-]{4,30}$/.test(cleaned)) return "";
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return `${window.location.origin}/assessment?ref=${encodeURIComponent(cleaned)}`;
    }
  }
  return `https://natyv.ai/assessment?ref=${encodeURIComponent(cleaned)}`;
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
