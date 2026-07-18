import { FormEvent, useState } from "react";
import { ArrowRight, Check, Clock3, LockKeyhole, Sparkles } from "lucide-react";

const ASSESSMENT_START_URL = import.meta.env.VITE_ASSESSMENT_START_URL ||
  "https://mpbiwfisywymkdjlwivg.supabase.co/functions/v1/start-ai-opportunity-assessment";

export default function AssessmentStartForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [companyOrRole, setCompanyOrRole] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(ASSESSMENT_START_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          email,
          company_or_role: companyOrRole,
          website,
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
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Your low-friction AI on-ramp
          </div>
          <h1 className="font-poppins text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl">
            Find the three AI opportunities worth doing first.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Start with a private 15-minute conversation with Ava. We turn what she learns into exactly three ranked opportunities, the likely value of each, and the simplest place to begin.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "No payment and no sales call before the intake",
              "A human-reviewed assessment prepared within 48 hours",
              "$250 only when the report is ready — fully credited toward future work",
            ].map((item) => (
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
          <p className="font-poppins text-sm font-semibold uppercase tracking-[0.15em] text-primary">Start free</p>
          <h2 className="mt-2 font-poppins text-2xl font-bold text-foreground">Talk with Ava now</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Enter your details and we’ll open your private intake immediately.</p>

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
            {submitting ? "Opening your private intake…" : "Start my 15-minute assessment"}
            {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            If we cannot identify three practical opportunities, you do not pay. Review our <a href="/privacy" className="text-primary hover:underline">Privacy</a> and <a href="/terms" className="text-primary hover:underline">Terms</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
