import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
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
  whyBullets: string[];
  strengths: string[];
  tradeoff: string;
  myAgentAlternative: string;
  tags: string[];
  apiFit: "Strong" | "Moderate" | "Limited";
  color: string;
};

type DetailField = "why" | "strengths" | "tradeoff" | "upgrade";

const DETAIL_FIELDS: { id: DetailField; label: string }[] = [
  { id: "why", label: "Why it won" },
  { id: "strengths", label: "Strengths" },
  { id: "tradeoff", label: "Tradeoff" },
  { id: "upgrade", label: "Upgrade path" },
];

// One illustrative dental-office assessment. The map teaser, expander, and
// example page all read from this so prospects never see two bolted-on reports.
const SAMPLE = {
  industry: "Dental office",
  title: "Missed-call capture and 24/7 front desk",
  subtitle: "Decision ready · 3 ranked options · reviewed against the stated constraints",
  decision: "Start with MyAgent Foundation",
  proofWindow: "7 days · capture after-hours calls and book next-day appointments",
  upgradeTitle: "White-Glove Build",
  upgradeDetail: "Custom PMS routing, multi-location hours, and a human-reviewed go-live if the practice outgrows Foundation.",
};

const RECOMMENDATIONS: Recommendation[] = [
  {
    rank: 1,
    opportunity: "Missed-call capture and 24/7 front desk",
    score: 91,
    product: "MyAgent Foundation",
    plan: "Foundation voice agent",
    price: "$99 / month*",
    url: "https://get-myagent.com/",
    fit: "Best overall fit",
    why: "It is the only option in this example that answers, qualifies, and routes missed and after-hours calls inside the practice stack without adding a second answering service.",
    whyBullets: [
      "One system answers, qualifies, and routes after-hours and missed calls.",
      "Best match for 24/7 coverage without a separate reception vendor.",
    ],
    strengths: [
      "24/7 answering with lead capture on every missed call",
      "After-hours coverage that books the next available appointment",
      "Strong API / automation fit with the rest of the practice stack",
    ],
    tradeoff: "The practice still needs a short onboarding pass and a few days of call-flow tuning before it sounds like the office.",
    myAgentAlternative: "Natyv White-Glove Build deploys the same platform with a local number, tuned scripts, and 90 days of Growth-tier support—the $250 assessment fee credits toward that $999 package when you upgrade.",
    tags: ["24/7 answering", "Lead capture", "After-hours coverage", "Strong API / automation fit"],
    apiFit: "Strong",
    color: "#38bdf8",
  },
  {
    rank: 2,
    opportunity: "Live receptionist backup for overflow and after hours",
    score: 78,
    product: "Ruby",
    plan: "Live answering service",
    price: "$245 / month*",
    url: "https://www.ruby.com/",
    fit: "Strongest human-backup alternative",
    why: "Live receptionists are excellent when every call should reach a person, but the monthly cost is higher and the practice still owns the follow-up workflow.",
    whyBullets: [
      "A person can cover overflow and after-hours without new software.",
      "Weaker fit if the goal is automated qualification into the schedule.",
    ],
    strengths: [
      "Live receptionists for overflow and after-hours coverage",
      "Familiar answering-service model with little technical setup",
      "Useful as a human backup while an agent is being tuned",
    ],
    tradeoff: "Higher monthly cost, less automation, and messages still have to be entered into the practice systems.",
    myAgentAlternative: "Foundation can sit in front of Ruby: Ava takes first response, and a person only joins when the caller asks for one.",
    tags: ["Live receptionists", "Overflow coverage", "After-hours", "Moderate API / automation fit"],
    apiFit: "Moderate",
    color: "#34d399",
  },
  {
    rank: 3,
    opportunity: "Low-cost number and voicemail layer",
    score: 61,
    product: "Google Voice",
    plan: "Personal / standard number",
    price: "$0 / month*",
    url: "https://voice.google.com/",
    fit: "Lowest-cost fallback",
    why: "It is a cheap number and voicemail layer, but it does not qualify leads or recover missed calls into the schedule.",
    whyBullets: [
      "Lowest cost if the office only needs a shared number.",
      "Does not capture or book the missed-call demand this practice named.",
    ],
    strengths: [
      "Free or near-free shared number and voicemail",
      "Easy to try without a contract",
      "Familiar Google account setup",
    ],
    tradeoff: "Voicemail is not a front desk. Missed calls still leak unless someone checks and calls back.",
    myAgentAlternative: "Ava can keep the Google number as a fallback line while Foundation handles live answer, qualification, and booking.",
    tags: ["Shared number", "Voicemail", "Lowest cost", "Limited API / automation fit"],
    apiFit: "Limited",
    color: "#f59e0b",
  },
];

function apiFitLabel(value: Recommendation["apiFit"]): string {
  return value === "Strong" ? "Strong integration fit" : value === "Moderate" ? "Check integration path" : "Mostly manual today";
}

function InteractiveReport({
  surface,
  showOpenFullLink = false,
  showStartCta = true,
}: {
  surface: "assessment_report_compact" | "assessment_report_snapshot" | "assessment_report_embedded";
  showOpenFullLink?: boolean;
  showStartCta?: boolean;
}) {
  const primary = RECOMMENDATIONS[0];
  const [activeRank, setActiveRank] = useState(1);
  const [detailField, setDetailField] = useState<DetailField>("why");
  const snapshotRef = useRef<HTMLDivElement>(null);
  const snapshotViewedRef = useRef(false);
  const [detailsHref, setDetailsHref] = useState("/assessment/example?view=full");
  const active = RECOMMENDATIONS.find((item) => item.rank === activeRank) || primary;
  const alternatives = RECOMMENDATIONS.filter((item) => item.rank !== active.rank);

  useEffect(() => {
    trackAssessmentFunnelEvent("proof_view", { surface });
  }, [surface]);

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
      trackAssessmentFunnelEvent("proof_snapshot_view", { surface });
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
  }, [surface]);

  function selectRecommendation(rank: number) {
    setActiveRank(rank);
    setDetailField("why");
    trackAssessmentFunnelEvent("proof_recommendation_selected", {
      rank,
      product: RECOMMENDATIONS.find((item) => item.rank === rank)?.product,
    });
  }

  function handleStartClick(event: MouseEvent<HTMLAnchorElement>) {
    handleAssessmentProofCtaClick(event, surface === "assessment_report_embedded" ? "bottom" : "compact");
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
            <p className="font-accent text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Completed assessment · {SAMPLE.industry} · illustrative
            </p>
            <h2 id="assessment-proof-heading" className="mt-2 font-poppins text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {SAMPLE.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{SAMPLE.subtitle}</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Recommendation made
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Ranked product options">
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

        <article className="mt-4 rounded-2xl border border-primary/40 bg-primary/[0.08] p-4 sm:p-5" role="tabpanel" aria-label={`Recommendation ${active.rank} details`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary font-poppins text-lg font-bold text-primary-foreground">#{active.rank}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Selected recommendation</p>
                <h3 className="mt-1 font-poppins text-xl font-bold text-foreground">{active.product}</h3>
                <p className="text-sm text-muted-foreground">{active.plan}</p>
              </div>
            </div>
            <div className="flex items-end gap-3 sm:flex-col sm:items-end sm:gap-1">
              <span aria-label={`${active.score}/100`} className="font-poppins text-3xl font-bold text-foreground">{active.score}<span className="text-base text-muted-foreground">/100</span></span>
              <span className="text-xs font-semibold text-primary">{active.price}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border/70 bg-background/55 px-2.5 py-1 text-[11px] font-medium text-foreground/80">{tag}</span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-primary/20 pt-4" role="tablist" aria-label="Recommendation fields">
            {DETAIL_FIELDS.map((field) => (
              <button
                key={field.id}
                type="button"
                role="tab"
                aria-selected={detailField === field.id}
                onClick={() => setDetailField(field.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  detailField === field.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/70 bg-background/55 text-muted-foreground hover:text-foreground"
                }`}
              >
                {field.label}
              </button>
            ))}
          </div>

          <div className="mt-4" role="tabpanel" aria-label={DETAIL_FIELDS.find((field) => field.id === detailField)?.label}>
            {detailField === "why" && (
              <ul className="space-y-1.5 text-sm leading-relaxed text-foreground/90">
                {active.whyBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {detailField === "strengths" && (
              <ul className="space-y-1.5 text-sm leading-relaxed text-foreground/90">
                {active.strengths.map((strength) => (
                  <li key={strength} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-300" aria-hidden="true" />
                    {strength}
                  </li>
                ))}
              </ul>
            )}
            {detailField === "tradeoff" && (
              <div className="rounded-xl border border-amber-300/25 bg-amber-300/[0.06] px-3 py-2.5 text-sm leading-relaxed text-foreground/80">
                <span className="font-semibold text-amber-200">Tradeoff:</span> {active.tradeoff}
              </div>
            )}
            {detailField === "upgrade" && (
              <p className="text-sm leading-relaxed text-foreground/90">{active.myAgentAlternative}</p>
            )}
            <a href={active.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Official product URL <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </article>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Ranked alternatives</p>
            <span className="text-xs text-muted-foreground">Click any option to inspect it</span>
          </div>
          <div className="mt-2 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-background/45">
            {alternatives.map((item) => (
              <button
                key={item.rank}
                type="button"
                onClick={() => selectRecommendation(item.rank)}
                className="flex w-full flex-col gap-3 p-4 text-left transition hover:bg-primary/[0.04] sm:flex-row sm:items-center sm:justify-between"
              >
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
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-border/70 bg-background/45 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Decision</p>
            <p className="mt-2 font-poppins text-lg font-bold text-foreground">Start with {active.product}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/75">Proof window: {SAMPLE.proofWindow}</p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Natyv upgrade path</p>
            <p className="mt-2 font-poppins text-lg font-bold text-foreground">{SAMPLE.upgradeTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/75">{SAMPLE.upgradeDetail}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
          {showOpenFullLink ? (
            <a href={detailsHref} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Open full comparison <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          ) : (
            <p className="text-xs leading-relaxed text-muted-foreground">Same {SAMPLE.industry.toLowerCase()} example as the map above. Click a rank to inspect the tradeoff.</p>
          )}
          {showStartCta && (
            <a
              href="/assessment#start"
              onClick={handleStartClick}
              aria-label="Start my 15-minute assessment with Ava with no upfront payment"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-center font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Start my 15-minute assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">*Illustrative composite. Pricing and integration availability are re-checked for the actual assessment.</p>
      </div>
    </section>
  );
}

function FullAssessmentProofPreview() {
  function handleStartClick(event: MouseEvent<HTMLAnchorElement>) {
    handleAssessmentProofCtaClick(event, "early");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary/25 bg-primary/[0.05] p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> See the deliverable before you commit
          </span>
          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-semibold text-amber-200">Illustrative {SAMPLE.industry.toLowerCase()} composite</span>
        </div>
        <h2 className="mt-5 font-poppins text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          A clear decision, not an AI tool list.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          This is the kind of decision page your assessment is designed to produce: three ranked options, the exact product to consider, official source, cost, tradeoffs, and a candid upgrade path.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
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
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Including the honest upgrade path if Foundation is too narrow.</p>
          </div>
        </div>
        <a
          href="/assessment#start"
          onClick={handleStartClick}
          aria-label="Start my 15-minute assessment with Ava with no upfront payment"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-center font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Start my 15-minute assessment — no upfront payment <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <InteractiveReport surface="assessment_report_snapshot" showOpenFullLink={false} showStartCta />
    </div>
  );
}

export default function AssessmentProofPreview({
  compact = false,
  embedded = false,
}: {
  compact?: boolean;
  embedded?: boolean;
} = {}) {
  if (embedded) {
    return <InteractiveReport surface="assessment_report_embedded" showOpenFullLink={false} showStartCta />;
  }
  return compact
    ? <InteractiveReport surface="assessment_report_compact" showOpenFullLink showStartCta />
    : <FullAssessmentProofPreview />;
}
