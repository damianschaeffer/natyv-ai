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

export const PUBLIC_OFFER_CHECKOUT_URL =
  import.meta.env.VITE_PUBLIC_OFFER_CHECKOUT_URL ??
  `${MYAGENT_SUPABASE_URL}/functions/v1/create-public-offer-checkout`;

export const NATYV_BUSINESS_PAGE_SLUG = "natyv-ai";

/**
 * Keep a referral invitation scoped to the current browser tab. A referral is
 * an invitation context, not a permanent browser entitlement: localStorage
 * could silently carry an old friend's discount into a later direct visit.
 */
export const REFERRAL_SESSIONSTORAGE_KEY = "myagent_ref_v2";

const ASSESSMENT_FUNNEL_SESSION_KEY = "natyv_assessment_funnel_session_v1";

/** Keep controlled QA browser checks out of the same anonymous session as real traffic. */
export function assessmentFunnelTrafficClass(search = ""): "qa" | "clean" {
  const params = new URLSearchParams(search);
  const source = params.get("source")?.trim().toLowerCase() || "";
  const qa = params.get("qa")?.trim().toLowerCase() || "";
  return qa === "1" || qa === "true" || source.startsWith("qa_") ? "qa" : "clean";
}

export function assessmentFunnelSessionStorageKey(search = ""): string {
  return `${ASSESSMENT_FUNNEL_SESSION_KEY}_${assessmentFunnelTrafficClass(search)}`;
}

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
    const storageKey = assessmentFunnelSessionStorageKey(window.location.search);
    const existing = sessionStorage.getItem(storageKey);
    if (existing && /^[a-z0-9-]{12,80}$/i.test(existing)) return existing;
    const generated = typeof crypto?.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
    sessionStorage.setItem(storageKey, generated);
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
  const queryReferralCode = normalizeAssessmentReferralCode(
    new URLSearchParams(window.location.search).get("ref"),
  );
  const referralCode = queryReferralCode || readStoredAssessmentReferralCode();
  const safeMetadata = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => ["string", "number", "boolean"].includes(typeof value)).slice(0, 8),
  );
  const entrySource = new URLSearchParams(window.location.search).get("source")?.trim() || "";
  if (entrySource && /^[a-z0-9_-]{1,40}$/i.test(entrySource) && !safeMetadata.entry_source) {
    safeMetadata.entry_source = entrySource;
  }
  const isQaTraffic = assessmentFunnelTrafficClass(window.location.search) === "qa";
  if (isQaTraffic && !safeMetadata.traffic_class) {
    safeMetadata.traffic_class = "qa";
  }
  const proofId = new URLSearchParams(window.location.search).get("proof_id")?.trim().toLowerCase() || "";
  if (/^[a-f0-9]{20}$/.test(proofId)) {
    safeMetadata.proof_id = proofId;
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

export type AssessmentProofCtaPlacement = "hero" | "early" | "bottom" | "compact";

/**
 * Carry only the anonymous attribution fields that belong to the proof →
 * intake handoff. This keeps a warm visitor measurable without copying
 * arbitrary query parameters into the assessment form URL.
 */
export function buildAssessmentStartDestination(search = ""): string {
  const sourceParams = new URLSearchParams(search);
  const nextParams = new URLSearchParams();
  const source = sourceParams.get("source")?.trim() || "";
  if (/^[a-z0-9_-]{1,40}$/i.test(source)) nextParams.set("source", source);
  const referral = sourceParams.get("ref")?.trim() || "";
  if (/^[a-z0-9-]{4,30}$/i.test(referral)) nextParams.set("ref", referral);
  const proofId = sourceParams.get("proof_id")?.trim().toLowerCase() || "";
  if (/^[a-f0-9]{20}$/.test(proofId)) nextParams.set("proof_id", proofId);
  const qa = sourceParams.get("qa")?.trim().toLowerCase() || "";
  if (qa === "1" || qa === "true") nextParams.set("qa", qa);
  const query = nextParams.toString();
  return `/assessment${query ? `?${query}` : ""}#start`;
}

/**
 * Shared proof CTA behavior. Conversion telemetry is best-effort; the
 * navigation must remain usable if the event request is blocked or delayed.
 */
export function handleAssessmentProofCtaClick(
  event: { preventDefault: () => void },
  placement: AssessmentProofCtaPlacement,
): void {
  if (typeof window === "undefined") return;
  trackAssessmentFunnelEvent("proof_cta_clicked", {
    surface: "assessment_proof_preview",
    placement,
    cta_variant: "start_15_minute_no_upfront_payment",
  });
  const destination = buildAssessmentStartDestination(window.location.search);
  if (window.location.pathname !== "/assessment") {
    event.preventDefault();
    window.location.assign(destination);
    return;
  }
  const start = document.getElementById("start");
  if (!start) return;
  event.preventDefault();
  window.history.replaceState({}, "", destination);
  start.scrollIntoView({ behavior: "smooth", block: "start" });
}

const REFERRER_SHARE_STORAGE_KEY = "natyv_assessment_referrer_share_v1";

export function normalizeAssessmentReferralCode(raw: string | null | undefined): string {
  const cleaned = String(raw ?? "").trim().toUpperCase();
  return /^[A-Z0-9-]{4,30}$/.test(cleaned) ? cleaned : "";
}

export function readStoredAssessmentReferralCode(): string {
  try {
    const raw = sessionStorage.getItem(REFERRAL_SESSIONSTORAGE_KEY);
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

export type PublicOfferCheckoutResult = {
  success: true;
  order_id: string;
  checkout_url: string;
  amount_total: number;
  currency: string;
  offer_slug: string;
  reused?: boolean;
};

export async function startPublicOfferCheckout(input: {
  offerSlug: string;
  email: string;
  name?: string;
}) {
  const response = await fetch(PUBLIC_OFFER_CHECKOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: MYAGENT_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      offer_slug: input.offerSlug,
      email: input.email.trim().toLowerCase(),
      name: input.name?.trim() || undefined,
      request_id: typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.checkout_url) throw new Error(data.error || "Unable to start checkout");
  return data as PublicOfferCheckoutResult;
}
