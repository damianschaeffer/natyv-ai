import { useEffect, useState, type MouseEvent } from "react";
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
import { trackAssessmentFunnelEvent } from "@/lib/myagentAssessmentApi";

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
    opportunity: "Weekly family meal and grocery plan",
    score: 89,
    product: "Cozi Max",
    plan: "Max household plan",
    price: "$79.99 / year*",
    url: "https://www.cozi.com/",
    fit: "Best overall fit",
    why: "It is the only candidate in this example that combines an AI meal planner, shared calendar, reminders, recipes, and a shopping list in one household system.",
    strengths: [
      "AI-assisted meal planning around preferences and schedule",
      "Shared calendar, reminders, recipes, and shopping lists",
      "One household upgrade covers the family across devices",
    ],
    tradeoff: "The family still needs a short review before shopping, and adoption depends on every caregiver using the shared system.",
    myAgentAlternative: "Ava could create a household grocery space with a shared list, calendar, weekly planning automation, and proactive reminders. It would be more tailored, but would require a small build and ongoing configuration.",
    apiFit: "Moderate",
    color: "#38bdf8",
  },
  {
    rank: 2,
    opportunity: "Family updates and appointment hub",
    score: 82,
    product: "Google Calendar",
    plan: "Personal / family setup",
    price: "$0 / year*",
    url: "https://calendar.google.com/",
    fit: "Strongest low-cost alternative",
    why: "It handles shared appointments and reminders exceptionally well, but it does not solve meal planning or shopping without additional tools and manual upkeep.",
    strengths: [
      "Familiar, free, and already available to most households",
      "Reliable shared calendars, reminders, and invitations",
      "Strong integration surface for future automations",
    ],
    tradeoff: "The household would still need a separate grocery workflow and a clear convention for ownership, updates, and recurring tasks.",
    myAgentAlternative: "Ava could turn the calendar into a guided family operating rhythm, summarize the week, surface conflicts, and turn conversations into tasks without replacing the calendar itself.",
    apiFit: "Strong",
    color: "#34d399",
  },
  {
    rank: 3,
    opportunity: "Shared household grocery list",
    score: 75,
    product: "AnyList",
    plan: "Complete household plan",
    price: "$14.99 / year*",
    url: "https://www.anylist.com/",
    fit: "Lowest-cost focused option",
    why: "It is excellent for a shared list and recurring items, but it requires more manual meal selection and does not provide the same calendar-and-planning breadth.",
    strengths: [
      "Fast shared list capture from any device",
      "Good recurring-item and grocery organization features",
      "Low annual cost and easy to reverse",
    ],
    tradeoff: "It is a list tool, not a full weekly planning system, so it leaves the highest-value coordination work to the family.",
    myAgentAlternative: "Ava could keep the list continuously current from the family's preferences, receipts, and calendar, but only after the household gives her those inputs and approves the automation rules.",
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

export default function AssessmentProofPreview() {
  const [activeRank, setActiveRank] = useState(1);
  const active = RECOMMENDATIONS.find((item) => item.rank === activeRank) || RECOMMENDATIONS[0];

  useEffect(() => {
    trackAssessmentFunnelEvent("proof_view", { surface: "assessment_proof_preview" });
  }, []);

  function selectRecommendation(rank: number) {
    setActiveRank(rank);
    trackAssessmentFunnelEvent("proof_recommendation_selected", { rank, product: RECOMMENDATIONS.find((item) => item.rank === rank)?.product });
  }

  function handleStartClick(event: MouseEvent<HTMLAnchorElement>) {
    trackAssessmentFunnelEvent("proof_cta_clicked", { surface: "assessment_proof_preview" });
    if (window.location.pathname !== "/assessment") return;
    const start = document.getElementById("start");
    if (!start) return;
    event.preventDefault();
    window.history.replaceState({}, "", "/assessment#start");
    start.scrollIntoView({ behavior: "smooth", block: "start" });
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
            onClick={handleStartClick}
            aria-label="Start a 15-minute assessment with Ava with no upfront payment"
            className="inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-center font-poppins text-sm font-bold text-primary-foreground shadow-[0_15px_35px_-15px_rgba(16,119,250,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            See what yours could uncover — no upfront payment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
