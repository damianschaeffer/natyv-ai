import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock3, LockKeyhole, Sparkles } from "lucide-react";
import {
  ASSESSMENT_START_URL,
  MYAGENT_SUPABASE_ANON_KEY,
  fetchPublicAssessmentReferral,
  normalizeAssessmentReferralCode,
  PublicAssessmentReferralOffer,
  readStoredAssessmentReferralCode,
} from "@/lib/myagentAssessmentApi";

type ReferralState =
  | { status: "none" }
  | { status: "loading" }
  | { status: "valid"; offer: PublicAssessmentReferralOffer }
  | { status: "invalid" };

function dollars(cents: number): string {
  return `$${Math.round(cents / 100)}`;
}

export default function AssessmentStartForm({ referralCode }: { referralCode?: string | null }) {
  const normalizedReferralCode = useMemo(() => normalizeAssessmentReferralCode(referralCode), [referralCode]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [companyOrRole, setCompanyOrRole] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [referralState, setReferralState] = useState<ReferralState>(() => (
    normalizedReferralCode ? { status: "loading" } : { status: "none" }
  ));

  useEffect(() => {
    let cancelled = false;
    if (!normalizedReferralCode) {
      setReferralState({ status: "none" });
      return () => {
        cancelled = true;
      };
    }

    setReferralState({ status: "loading" });
    fetchPublicAssessmentReferral(normalizedReferralCode)
      .then((offer) => {
        if (cancelled) return;
        setReferralState(offer ? { status: "valid", offer } : { status: "invalid" });
      })
      .catch(() => {
        if (!cancelled) setReferralState({ status: "invalid" });
      });

    return () => {
      cancelled = true;
    };
  }, [normalizedReferralCode]);

  const referralOffer = referralState.status === "valid" ? referralState.offer : null;
  const referralChecking = referralState.status === "loading";
  const referrerName = referralOffer?.referrer_first_name || "A friend";
  const fullPrice = referralOffer ? dollars(referralOffer.full_price_cents) : "$250";
  const discount = referralOffer ? dollars(referralOffer.discount_cents) : "$100";
  const offerPrice = referralOffer ? dollars(referralOffer.amount_total_cents) : "$150";

  const headline = referralOffer
    ? `${referrerName} invited you to find the three AI opportunities worth doing first.`
    : referralChecking
      ? "Confirming your referral invitation…"
      : "Find the three AI opportunities worth doing first.";
  const description = referralOffer
    ? `${referrerName} shared this private invitation with you. Start with a 15-minute conversation with Ava, then receive exactly three ranked opportunities, the likely value of each, and the simplest place to begin.`
    : referralChecking
      ? "We’re checking the invitation attached to this link so we can show the correct price before you begin."
      : "Start with a private 15-minute conversation with Ava. We turn what she learns into exactly three ranked opportunities, the likely value of each, and the simplest place to begin.";
  const benefitItems = referralOffer
    ? [
      "No payment and no sales call before the intake",
      "A human-reviewed assessment prepared within 48 hours",
      `Save ${discount}: pay ${offerPrice} when the report is ready instead of ${fullPrice} — fully credited toward future work`,
    ]
    : referralChecking
      ? [
        "No payment and no sales call before the intake",
        "A human-reviewed assessment prepared within 48 hours",
        "Your referral savings will be confirmed before you start",
      ]
      : [
        "No payment and no sales call before the intake",
        "A human-reviewed assessment prepared within 48 hours",
        "$250 only when the report is ready — fully credited toward future work",
      ];

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const referral_code = readStoredAssessmentReferralCode() || normalizedReferralCode;
      const response = await fetch(ASSESSMENT_START_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: MYAGENT_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          first_name: firstName,
          email,
          company_or_role: companyOrRole,
          website,
          referral_code: referral_code || undefined,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.intake_url) {
        throw new Error(result.error || "We could not start the assessment.");
      }
      window.location.assign(result.intake_url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not start the assessment. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div id="start" className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/80 shadow-[0_30px_100px_-45px_rgba(16,119,250,0.75)] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
        <div className="border-b border-border/70 p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-11">
          {referralOffer && (
            <div className="mb-5 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm leading-relaxed text-foreground">
              <p className="font-poppins font-bold text-emerald-300">{referrerName} invited you</p>
              <p className="mt-1">Save {discount} on your assessment: pay {offerPrice} when your report is ready, instead of {fullPrice}.</p>
            </div>
          )}
          {referralChecking && (
            <div className="mb-5 rounded-2xl border border-primary/35 bg-primary/10 px-4 py-3 text-sm leading-relaxed text-muted-foreground" role="status">
              Checking your referral invitation and savings…
            </div>
          )}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Your low-friction AI on-ramp
          </div>
          <h1 className="font-poppins text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>

          <div className="mt-8 space-y-4">
            {benefitItems.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-emerald-400/15 text-emerald-400">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-background/55 p-4">
              <Clock3 className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
              <p className="font-poppins text-sm font-semibold text-foreground">15 minutes maximum</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">One thoughtful question at a time, with room to pause and think.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/55 p-4">
              <LockKeyhole className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
              <p className="font-poppins text-sm font-semibold text-foreground">Private, permission-based intake</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Ava explains recording and asks permission before the assessment begins.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center p-6 sm:p-9 lg:p-11" aria-describedby={error ? "assessment-start-error" : undefined}>
          <p className="font-poppins text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            {referralOffer ? "Your referral invitation" : referralChecking ? "Checking invitation" : "Start free"}
          </p>
          <h2 className="mt-2 font-poppins text-2xl font-bold text-foreground">
            {referralOffer ? `Your assessment is ${offerPrice}` : referralChecking ? "Confirm your savings" : "Talk with Ava now"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {referralOffer
              ? `${referrerName} shared this link with you. You save ${discount} on the report-ready assessment price.`
              : referralChecking
                ? "Enter your details after we confirm the invitation attached to this link."
                : "Enter your details and we’ll open your private intake immediately."}
          </p>

          <label className="mt-7 text-sm font-medium text-foreground" htmlFor="assessment-first-name">First name</label>
          <input
            id="assessment-first-name"
            required
            minLength={2}
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-2 h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Your first name"
          />

          <label className="mt-5 text-sm font-medium text-foreground" htmlFor="assessment-email">Email</label>
          <input
            id="assessment-email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="you@company.com"
          />

          <label className="mt-5 text-sm font-medium text-foreground" htmlFor="assessment-role">Company or role <span className="text-muted-foreground">(optional)</span></label>
          <input
            id="assessment-role"
            autoComplete="organization-title"
            value={companyOrRole}
            onChange={(event) => setCompanyOrRole(event.target.value)}
            className="mt-2 h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Founder, agency owner, operations lead…"
          />

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="assessment-website">Website</label>
            <input id="assessment-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
          </div>

          {error && <p id="assessment-start-error" role="alert" className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Opening your private intake…" : referralOffer ? "Start my discounted assessment" : "Start my 15-minute assessment"}
            {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            {referralOffer
              ? `Your intake is free. After review, pay ${offerPrice} through this invitation to unlock the report; no payment is taken before the intake.`
              : "If we cannot identify three practical opportunities, you do not pay."} Review our <a href="/privacy" className="text-primary hover:underline">Privacy</a> and <a href="/terms" className="text-primary hover:underline">Terms</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
