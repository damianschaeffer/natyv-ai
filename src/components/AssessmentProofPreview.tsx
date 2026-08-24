import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";
import {
  handleAssessmentProofCtaClick,
  trackAssessmentFunnelEvent,
} from "@/lib/myagentAssessmentApi";

type Recommendation = {
  rank: number;
  opportunity: string;
  score: number;
  product: string;
  plan: string;
  price: string;
  url: string;
  fit: string;
  why: string;
  strengths: string[];
  tradeoff: string;
  myAgentAlternative: string;
  apiFit: "Strong" | "Moderate" | "Limited";
  color: string;
};

// This is an anonymized composite so prospects can see the decision quality
// without exposing a real customer's call, transcript, or private report.
const RECOMMENDATIONS: Recommendation[] = [
  {
    rank: 1,
    opportunity: "After-hours and overflow call answering",
    score: 91,
    product: "MyAgent Foundation",
    plan: "Foundation voice agent",
    price: "$99 / month*",
    url: "https://get-myagent.com/",
    fit: "Best overall fit",
    why: "It is the only candidate in this example that combines 24/7 AI call answering, lead qualification, and appointment routing in one setup sized for a solo operator or small crew.",
    strengths: [
      "Answers after-hours and busy-hour overflow without adding staff",
      "Captures caller intent, urgency, and callback details on every ring",
      "Routes booked jobs and urgent calls with a path to human takeover",
    ],
    tradeoff: "The owner still needs a short onboarding to tune greetings, service areas, and escalation rules—and to review the first week of calls.",
    myAgentAlternative: "Natyv White-Glove Build deploys the same platform with a local number, tuned scripts, and 90 days of Growth-tier support—the $250 assessment fee credits toward that $999 package when you upgrade.",
    apiFit: "Strong",
    color: "#38bdf8",
  },
  {
    rank: 2,
    opportunity: "Human virtual receptionist backup",
    score: 84,
    product: "Ruby",
    plan: "Virtual receptionist",
    price: "$245 / month*",
    url: "https://www.ruby.com/",
    fit: "Strongest human-backup alternative",
    why: "Live receptionists handle complex conversations well, but monthly cost is higher, coverage windows vary, and lead data still needs manual transfer into the shop's calendar or CRM.",
    strengths: [
      "Real people for nuanced scheduling and difficult callers",
      "Established brand trust with service businesses",
      "Predictable per-minute or bundled monthly pricing",
    ],
    tradeoff: "Higher recurring cost, less instant text-back on missed calls, and weaker integration with automated follow-up workflows.",
    myAgentAlternative: "Ava could draft overflow scripts and monitor Ruby handoffs, but the live answering itself stays on Ruby's team unless you replace it with MyAgent voice.",
    apiFit: "Moderate",
    color: "#34d399",
  },
  {
    rank: 3,
    opportunity: "Low-cost voicemail and call forwarding",
    score: 72,
    product: "Google Voice",
    plan: "Free personal setup",
    price: "$0 / month*",
    url: "https://voice.google.com/",
    fit: "Lowest-cost fallback",
    why: "It forwards calls and stores voicemail, but it does not answer, qualify, book, or text back—so high-intent callers still go to competitors while the owner is on a job.",
    strengths: [
      "Free and familiar for owner-operators already on Google Workspace",
      "Simple forwarding rules for one or two lines",
      "Easy to reverse if you upgrade later",
    ],
    tradeoff: "No proactive lead capture, no after-hours answering, and no structured job intake—just voicemail and manual callbacks.",
    myAgentAlternative: "Ava could summarize voicemails and draft callback texts, but only after the owner forwards transcripts or recordings into MyAgent each day.",
    apiFit: "Limited",
    color: "#f59e0b",
  },
];

function ScorePill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/55 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-poppins text-sm font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function apiFitLabel(value: Recommendation["apiFit"]): string {
  return value === "Strong" ? "Strong integration fit" : value === "Moderate" ? "Check integration path" : "Mostly manual today";
}

function CompactProofPreview() {
  const primary = RECOMMENDATIONS[0];
  const alternatives = RECOMMENDATIONS.slice(1);
  const snapshotRef = useRef<HTMLDivElement>(null);
  const snapshotViewedRef = useRef(false);
  const [detailsHref, setDetailsHref] = useState("/assessment/example?view=full");

  useEffect(() => {
    trackAssessmentFunnelEvent("proof_view", { surface: "assessment_proof_compact" });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("view", "full");
    setDetailsHref(`/assessment/example?${params.toString()}`);
  }, []);

  useEffect(() => {
    const node = snapshotRef.current;
    if (!node || snapshotViewedRef.current) return;

    const markSnapshotViewed = () => {
      if (snapshotViewedRef.current) return;
      snapshotViewedRef.current = true;
      trackAssessmentFunnelEvent("proof_snapshot_view", { surface: "assessment_report_compact" });
    };

    if (typeof IntersectionObserver === "undefined") {
      markSnapshotViewed();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          markSnapshotViewed();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handleStartClick(event: MouseEvent<HTMLAnchorElement>) {
    handleAssessmentProofCtaClick(event, "compact");
  }

  return (
    <section
      id="example-report"
      aria-labelledby="assessment-proof-heading"
      data-testid="assessment-report-preview"
      className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 p-4 shadow-[0_30px_100px_-55px_rgba(16,119,250,0.8)] backdrop-blur-xl sm:p-6 lg:p-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative" ref={snapshotRef}>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-accent text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Completed assessment · illustrative</p>
            <h2 id="assessment-proof-heading" className="mt-2 font-poppins text-2xl font-bold leading-tight text-foreground sm:text-3xl">Missed-call capture and 24/7 front desk</h2>
            <p className="mt-1 text-sm text-muted-foreground">Decision ready · 3 ranked options · reviewed against the stated constraints</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Recommendation made
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-primary/40 bg-primary/[0.08] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary font-poppins text-lg font-bold text-primary-foreground">#1</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Selected recommendation</p>
                <h3 className="mt-1 font-poppins text-xl font-bold text-foreground">{primary.product}</h3>
                <p className="text-sm text-muted-foreground">{primary.plan}</p>
              </div>
            </div>
            <div className="flex items-end gap-3 sm:flex-col sm:items-end sm:gap-1">
              <span aria-label={`${primary.score}/100`} className="font-poppins text-3xl font-bold text-foreground">{primary.score}<span className="text-base text-muted-foreground">/100</span></span>
              <span className="text-xs font-semibold text-primary">{primary.price}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "24/7 answering",
              "Lead capture",
              "After-hours coverage",
              `${primary.apiFit} API / automation fit`,
            ].map((tag) => <span key={tag} className="rounded-full border border-border/70 bg-background/55 px-2.5 py-1 text-[11px] font-medium text-foreground/80">{tag}</span>)}
          </div>

          <div className="mt-4 grid gap-4 border-t border-primary/20 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Why it won</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/90">
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />One system answers, qualifies, and routes after-hours and overflow calls.</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />Best match for the missed-call leak and same-day-setup constraint.</li>
              </ul>
            </div>
            <a href={primary.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Official product URL <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-4 rounded-xl border border-amber-300/25 bg-amber-300/[0.06] px-3 py-2.5 text-sm leading-relaxed text-foreground/80">
            <span className="font-semibold text-amber-200">Tradeoff:</span> {primary.tradeoff}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Ranked alternatives</p>
            <span className="text-xs text-muted-foreground">Why they placed lower</span>
          </div>
          <div className="mt-2 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-background/45">
            {alternatives.map((item) => (
              <div key={item.rank} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-border/70 bg-background/70 font-poppins text-sm font-bold" style={{ color: item.color }}>#{item.rank}</span>
                  <div>
                    <p className="font-poppins font-semibold text-foreground">{item.product} <span className="font-normal text-muted-foreground">· {item.price}</span></p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.fit} · {item.apiFit} API fit</p>
                  </div>
                </div>
                <div className="max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-right">
                  <p><span className="font-semibold text-foreground/85">Best for:</span> {item.strengths[0]}</p>
                  <p className="mt-1"><span className="font-semibold text-amber-200">Tradeoff:</span> {item.tradeoff}</p>
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    Official product URL <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-border/70 bg-background/45 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Decision</p>
            <p className="mt-2 font-poppins text-lg font-bold text-foreground">Start with {primary.product}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/75">Proof window: 7 days · completion: track missed calls recovered and booked follow-ups.</p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Natyv upgrade path</p>
            <p className="mt-2 font-poppins text-lg font-bold text-foreground">White-Glove Build</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/75">Done-for-you MyAgent setup with local number and tuned scripts. $250 assessment credits toward the $999 package.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <a href={detailsHref} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Open full comparison <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <a
            href="/assessment#start"
            onClick={handleStartClick}
            aria-label="Start my 15-minute assessment with Ava with no upfront payment"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-center font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Start my 15-minute assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">*Illustrative composite. Pricing and integration availability are re-checked for the actual assessment.</p>
      </div>
    </section>
  );
}

function FullAssessmentProofPreview() {
  const [activeRank, setActiveRank] = useState(1);
  const snapshotRef = useRef<HTMLDivElement>(null);
  const snapshotViewedRef = useRef(false);
  const active = RECOMMENDATIONS.find((item) => item.rank === activeRank) || RECOMMENDATIONS[0];

  useEffect(() => {
    trackAssessmentFunnelEvent("proof_view", { surface: "assessment_proof_preview" });
  }, []);

  useEffect(() => {
    const node = snapshotRef.current;
    if (!node || snapshotViewedRef.current) return;

    const markSnapshotViewed = () => {
      if (snapshotViewedRef.current) return;
      snapshotViewedRef.current = true;
      trackAssessmentFunnelEvent("proof_snapshot_view", { surface: "assessment_report_snapshot" });
    };

    if (typeof IntersectionObserver === "undefined") {
      markSnapshotViewed();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          markSnapshotViewed();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function selectRecommendation(rank: number) {
    setActiveRank(rank);
    trackAssessmentFunnelEvent("proof_recommendation_selected", { rank, product: RECOMMENDATIONS.find((item) => item.rank === rank)?.product });
  }

  function handleStartClick(event: MouseEvent<HTMLAnchorElement>, placement: "early" | "bottom") {
    handleAssessmentProofCtaClick(event, placement);
  }

  return (
    <section
      id="example-report"
      aria-labelledby="assessment-proof-heading"
      className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 p-5 shadow-[0_30px_100px_-55px_rgba(16,119,250,0.8)] backdrop-blur-xl sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> See the deliverable before you commit
          </span>
          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-200">Illustrative composite</span>
        </div>

        <div className="mt-5 max-w-3xl">
          <h2 id="assessment-proof-heading" className="font-poppins text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            A clear decision, not an AI tool list.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            This is the kind of decision page your assessment is designed to produce: three ranked opportunities, the exact product to consider, official source, cost, tradeoffs, integration fit, and a candid MyAgent alternative.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="font-poppins text-sm font-semibold text-foreground">Want this same decision clarity for your situation?</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Start the private 15-minute intake when you are ready. No upfront payment; the $250 report fee is only due when the report is ready.</p>
          </div>
          <a
            href="/assessment#start"
            onClick={(event) => handleStartClick(event, "early")}
            aria-label="Start my 15-minute assessment with Ava with no upfront payment"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-center font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Start my 15-minute assessment — no upfront payment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-background/55 p-4">
            <Target className="h-5 w-5 text-primary" aria-hidden="true" />
            <p className="mt-3 font-poppins text-sm font-semibold text-foreground">Exactly three priorities</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">A ranked order with the reasoning behind it—not 30 disconnected ideas.</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/55 p-4">
            <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
            <p className="mt-3 font-poppins text-sm font-semibold text-foreground">Evidence + tradeoffs</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">What supports the choice, what could go wrong, and what to verify next.</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/55 p-4">
            <Lightbulb className="h-5 w-5 text-amber-300" aria-hidden="true" />
            <p className="mt-3 font-poppins text-sm font-semibold text-foreground">A first step you can act on</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Including the best effort Ava could deliver inside MyAgent, when that is honest.</p>
          </div>
        </div>

        <div
          className="mt-7 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]"
          data-testid="assessment-report-snapshot"
          ref={snapshotRef}
        >
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Sample report snapshot
              </span>
              <span className="text-xs text-muted-foreground">Anonymized local HVAC example</span>
            </div>
            <h3 className="mt-4 font-poppins text-xl font-bold text-foreground sm:text-2xl">
              One painful missed-call leak becomes a decision you can actually act on.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The example client is an owner-operated HVAC shop losing after-hours and on-job leads to voicemail. The report turns that story into a ranked starting point, a product comparison, and a short proof window instead of a generic list of AI ideas.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-background/55 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Decision</p>
                <p className="mt-1 text-sm font-semibold text-foreground">Capture after-hours demand</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/55 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Proof window</p>
                <p className="mt-1 text-sm font-semibold text-foreground">Run live answering for 7 days</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/55 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Completion</p>
                <p className="mt-1 text-sm font-semibold text-foreground">Book follow-ups and review conversion</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/45 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">What you can react to</p>
            <ol className="mt-4 space-y-4 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">1</span>
                <span><strong className="font-semibold text-foreground">The ranked choice.</strong> Why this product is first, and what would make another option better.</span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">2</span>
                <span><strong className="font-semibold text-foreground">The tradeoffs.</strong> Cost, limitations, integration fit, and the work the owner still has to do.</span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">3</span>
                <span><strong className="font-semibold text-foreground">The next move.</strong> A measurable first proof step, including an honest MyAgent alternative when it fits.</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-background/45">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Illustrative top three recommendation comparison</caption>
              <thead className="border-b border-border/70 bg-background/55 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Rank</th>
                  <th className="px-4 py-3 font-semibold">Opportunity</th>
                  <th className="px-4 py-3 font-semibold">Recommended product</th>
                  <th className="px-4 py-3 font-semibold">Fit score</th>
                  <th className="px-4 py-3 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {RECOMMENDATIONS.map((item) => (
                  <tr key={item.rank} className={item.rank === active.rank ? "bg-primary/[0.08]" : ""}>
                    <td className="px-4 py-3 font-poppins font-bold" style={{ color: item.color }}>#{item.rank}</td>
                    <td className="min-w-[220px] px-4 py-3 font-medium text-foreground">{item.opportunity}</td>
                    <td className="min-w-[180px] px-4 py-3 text-foreground/85">{item.product}</td>
                    <td className="px-4 py-3 font-poppins font-bold text-foreground">{item.score}/100</td>
                    <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Recommendation details">
          {RECOMMENDATIONS.map((item) => (
            <button
              key={item.rank}
              type="button"
              role="tab"
              aria-selected={item.rank === active.rank}
              onClick={() => selectRecommendation(item.rank)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${item.rank === active.rank ? "border-primary/60 bg-primary/10" : "border-border/70 bg-background/45 hover:border-primary/40"}`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: item.color }}>#{item.rank} · {item.fit}</span>
              <span className="mt-1 block font-poppins text-sm font-semibold text-foreground">{item.product}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{item.price} · {apiFitLabel(item.apiFit)}</span>
            </button>
          ))}
        </div>

        <article className="mt-4 rounded-2xl border border-primary/45 bg-primary/[0.07] p-5 sm:p-6" role="tabpanel" aria-label={`Recommendation ${active.rank} details`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: active.color }}>Selected recommendation · #{active.rank}</p>
              <h3 className="mt-2 font-poppins text-2xl font-bold text-foreground">{active.opportunity}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{active.product} · {active.plan} · {active.price}</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/55 px-3 py-2">
              <Star className="h-4 w-4" style={{ color: active.color }} aria-hidden="true" />
              <span className="font-poppins text-lg font-bold text-foreground">{active.score}/100</span>
              <span className="text-xs text-muted-foreground">weighted fit</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ScorePill label="Fit" value={active.fit} color={active.color} />
            <ScorePill label="API / automation" value={active.apiFit} color="#34d399" />
            <ScorePill label="Decision lens" value="Value + lift + cost" color="#f59e0b" />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Why it ranks here</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{active.why}</p>
              <a href={active.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Open official product source <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-300"><Check className="h-4 w-4" aria-hidden="true" /> Strengths</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/85">
                  {active.strengths.map((strength) => <li key={strength}>• {strength}</li>)}
                </ul>
              </div>
              <div className="rounded-xl border border-amber-300/30 bg-amber-300/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-200"><X className="h-4 w-4" aria-hidden="true" /> Honest limitation</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{active.tradeoff}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-primary/35 bg-background/50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">MyAgent alternative</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{active.myAgentAlternative}</p>
          </div>
        </article>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-5 text-center sm:flex-row sm:text-left">
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">*This is an illustrative composite, not a promise about your result. Product pricing and integration availability are re-checked during the actual assessment.</p>
          <a
            href="/assessment#start"
            onClick={(event) => handleStartClick(event, "bottom")}
            aria-label="Start my 15-minute assessment with Ava with no upfront payment"
            className="inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-center font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Start my 15-minute assessment — no upfront payment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function AssessmentProofPreview({ compact = false }: { compact?: boolean } = {}) {
  return compact ? <CompactProofPreview /> : <FullAssessmentProofPreview />;
}
