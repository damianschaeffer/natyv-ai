import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  DollarSign,
  LayoutGrid,
  MessageSquare,
  Phone,
  Star,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

interface OpportunityItem {
  icon: LucideIcon;
  rank: number;
  title: string;
  area: string;
  description: string;
  payoff: string;
  effort: string;
  reason: string;
  color: string;
  mapX: number;
  mapY: number;
}

const OPPORTUNITIES: OpportunityItem[] = [
  {
    icon: Phone,
    rank: 1,
    title: "24/7 call answering",
    area: "Front Desk",
    description: "Answer after-hours calls, qualify intent, and route urgent jobs before they shop around.",
    payoff: "$3,000/mo potential recovered revenue",
    effort: "Same-day setup",
    reason: "Biggest cash leak, lowest lift.",
    color: "#06B6D4",
    mapX: 24,
    mapY: 72,
  },
  {
    icon: MessageSquare,
    rank: 2,
    title: "Instant text response",
    area: "Front Desk",
    description: "Reply to missed calls, forms, and DMs before the lead cools off.",
    payoff: "Hours saved every week",
    effort: "1 short workflow",
    reason: "Fast setup, immediate speed-to-lead.",
    color: "#06B6D4",
    mapX: 17,
    mapY: 64,
  },
  {
    icon: LayoutGrid,
    rank: 3,
    title: "Visual sales pipeline",
    area: "Sales",
    description: "Move every lead into visible stages, owners, value, and next steps.",
    payoff: "$3k-$5k implementation value",
    effort: "3-5 day build",
    reason: "Heavier lift, but it becomes the operating base.",
    color: "#10B981",
    mapX: 52,
    mapY: 70,
  },
  {
    icon: Star,
    rank: 4,
    title: "Auto-review requests",
    area: "Marketing",
    description: "Ask for reviews after completed work without extra admin.",
    payoff: "More reviews without more admin",
    effort: "1 short workflow",
    reason: "Easy win after lead capture is tight.",
    color: "#FB923C",
    mapX: 17,
    mapY: 50,
  },
  {
    icon: Users,
    rank: 5,
    title: "Past customer outreach",
    area: "Customer Experience",
    description: "Win back dormant customers with timely, relevant follow-up.",
    payoff: "Revenue from customers already earned",
    effort: "1-2 day cleanup",
    reason: "Strong upside once new leads stop leaking.",
    color: "#8B5CF6",
    mapX: 35,
    mapY: 43,
  },
];

const AdvisorySection = () => {
  const [activeRank, setActiveRank] = useState<number | null>(null);
  const activeOpportunity = OPPORTUNITIES.find((item) => item.rank === activeRank);

  return (
    <section
      id="advisory"
      className="relative flex flex-col items-center justify-center px-3 sm:px-6 pt-8 md:pt-12 pb-20 md:pb-28 overflow-hidden border-t border-border/40"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-5 md:mb-6"
      >
        <span
          className="inline-block px-4 py-1.5 text-primary border border-primary/30 rounded-full font-accent uppercase"
          style={{
            fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          AI Opportunity Assessment
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto mb-6 md:mb-7"
      >
        <h2
          className="font-poppins font-bold text-foreground leading-[1.04] mb-5 max-w-[calc(100vw-2rem)] mx-auto break-words"
          style={{ fontSize: "clamp(2.15rem, 7.2vw, 4.35rem)", letterSpacing: "0" }}
        >
          Many Opportunities.
          <span className="block text-primary">Your Clear Roadmap.</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4">
          A guided AI intake ranks what pays back fastest, what takes the least
          setup time, and what can wait.
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto mb-10 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65, delay: 0.18 }}
      >
        <div className="rounded-2xl border border-primary/25 bg-background/45 backdrop-blur-md overflow-hidden">
          <div className="px-3 sm:px-7 md:px-8 pt-3 sm:pt-4 md:pt-5 pb-3 sm:pb-7 md:pb-8 border-b border-border/60">
            <div className="mb-2 sm:mb-3 text-center">
              <span
                className="inline-flex max-w-full items-center justify-center px-3 sm:px-4 py-1.5 text-primary border border-primary/30 rounded-full font-accent uppercase leading-relaxed sm:leading-none"
                style={{
                  fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
                  letterSpacing: "0.18em",
                  fontWeight: 500,
                }}
              >
                Sample Business AI Opportunity Assessment
              </span>
            </div>
            <div className="relative h-[332px] sm:h-[460px] rounded-2xl border border-border/70 bg-black/45 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(6,182,212,0.22),transparent_24%),radial-gradient(circle_at_35%_24%,rgba(16,185,129,0.16),transparent_22%),radial-gradient(circle_at_68%_24%,rgba(60,131,246,0.16),transparent_24%),radial-gradient(circle_at_76%_74%,rgba(251,146,60,0.10),transparent_24%)]" />

              <div className="absolute left-[48px] sm:left-[86px] right-3 sm:right-5 top-4 sm:top-5 bottom-[58px] sm:bottom-[70px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400/[0.14] via-transparent to-orange-500/[0.05] border border-white/[0.08] overflow-visible">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />

                {OPPORTUNITIES.map((item) => {
                  const isActive = item.rank === activeRank;

                  return (
                    <div
                      key={item.title}
                      className="absolute group z-20"
                      style={{
                        left: `${item.mapX}%`,
                        bottom: `${item.mapY}%`,
                        transform: "translate(-50%, 50%)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveRank((current) => (current === item.rank ? null : item.rank))}
                        aria-pressed={isActive}
                        className="relative h-9 w-9 sm:h-12 sm:w-12 rounded-full border-2 border-background/90 flex items-center justify-center font-poppins font-bold text-xs sm:text-sm text-white transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `0 0 34px ${item.color}66`,
                        }}
                        aria-label={`Priority ${item.rank}: ${item.title}`}
                      >
                        <span
                          className={`absolute inset-[-7px] sm:inset-[-9px] rounded-full ${isActive ? "animate-ping opacity-35" : "animate-pulse opacity-20"}`}
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        />
                        <span className="relative z-10">{item.rank}</span>
                      </button>
                      <div
                        className={`absolute left-14 top-1/2 -translate-y-1/2 hidden sm:block min-w-[210px] rounded-xl border px-3 py-2 transition-all pointer-events-none ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                        style={{
                          borderColor: `${item.color}55`,
                          backgroundColor: "rgba(3, 5, 7, 0.94)",
                          boxShadow: `0 18px 40px ${item.color}1f`,
                        }}
                      >
                        <p className="font-poppins font-bold text-xs text-foreground leading-snug">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.14em]" style={{ color: item.color }}>
                          {item.area}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                        {item.payoff} · {item.effort}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>

              <div className="absolute left-0 sm:left-5 top-8 bottom-[70px] sm:bottom-[82px] w-12 sm:w-14 pointer-events-none">
                <div className="absolute inset-y-5 left-1/2 w-full -translate-x-1/2 bg-emerald-400 shadow-[0_0_34px_rgba(52,211,153,0.38)] [clip-path:polygon(42%_100%,58%_100%,78%_0,22%_0)]" />
                <div className="absolute -bottom-1 left-1/2 h-8 w-8 sm:h-10 sm:w-10 -translate-x-1/2 rounded-full border border-black/15 bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_28px_rgba(52,211,153,0.34)]">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </div>
                <div className="absolute -top-5 left-1/2 h-12 w-12 sm:h-14 sm:w-14 -translate-x-1/2 rounded-full border border-black/15 bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_34px_rgba(52,211,153,0.55)]">
                  <DollarSign className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute left-[48px] sm:left-[86px] right-7 sm:right-8 bottom-3 sm:bottom-4 h-11 sm:h-14 pointer-events-none">
                <div className="absolute left-5 right-5 top-1/2 h-full -translate-y-1/2 bg-amber-400 shadow-[0_0_34px_rgba(245,158,11,0.38)] [clip-path:polygon(0_42%,100%_22%,100%_78%,0_58%)]" />
                <div className="absolute -left-1 top-1/2 h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 rounded-full border border-black/15 bg-amber-400 text-black flex items-center justify-center shadow-[0_0_28px_rgba(245,158,11,0.34)]">
                  <Clock3 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </div>
                <div className="absolute -right-3 sm:-right-4 top-1/2 h-12 w-12 sm:h-14 sm:w-14 -translate-y-1/2 rounded-full border border-black/15 bg-amber-400 text-black flex items-center justify-center shadow-[0_0_34px_rgba(245,158,11,0.55)]">
                  <Clock3 className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
                </div>
              </div>
            </div>

            {activeOpportunity && (
              <div
                className="mt-3 sm:hidden rounded-xl border bg-background/90 px-3 py-3"
                style={{
                  borderColor: `${activeOpportunity.color}66`,
                  boxShadow: `0 16px 34px -24px ${activeOpportunity.color}99`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-6 w-6 rounded-full flex items-center justify-center font-poppins font-bold text-xs text-white"
                    style={{ background: activeOpportunity.color }}
                  >
                    {activeOpportunity.rank}
                  </span>
                  <p className="font-poppins font-bold text-sm text-foreground leading-tight">
                    {activeOpportunity.title}
                  </p>
                </div>
                <p className="mt-2 text-xs text-foreground/75 font-poppins font-semibold leading-relaxed">
                  {activeOpportunity.payoff} · {activeOpportunity.effort}
                </p>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-7 md:p-8">
            <div className="space-y-2.5 sm:space-y-3">
              {OPPORTUNITIES.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 backdrop-blur-md transition-all duration-300"
                  style={{
                    background: `linear-gradient(140deg, ${item.color}14 0%, hsl(var(--background) / 0.72) 55%, hsl(var(--background) / 0.9) 100%)`,
                    boxShadow: `0 20px 50px -24px ${item.color}33`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: item.color }}
                  />
                  <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2.5 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-3 lg:grid-cols-[3.25rem_minmax(20rem,1.6fr)_repeat(3,minmax(9.5rem,1fr))] items-stretch p-3.5 sm:p-5 pt-4 sm:pt-6">
                    <div
                      className="self-start pt-1 sm:self-center sm:pt-0 font-poppins font-bold text-3xl sm:text-4xl md:text-5xl leading-none tabular-nums"
                      style={{ color: item.color }}
                      aria-label={`Priority ${item.rank}`}
                    >
                      {item.rank}
                    </div>

                    <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 self-center min-w-0 lg:pr-3">
                      <div
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: item.color,
                          boxShadow: `0 8px 24px -8px ${item.color}99`,
                        }}
                      >
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.25} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <h5
                          className="font-poppins font-bold text-sm sm:text-base md:text-lg leading-tight"
                          style={{ color: item.color }}
                        >
                          {item.area}
                        </h5>
                        <p className="font-poppins font-semibold text-sm text-foreground leading-snug mt-0.5 sm:mt-1">
                          {item.title}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className="col-span-2 lg:col-span-1 h-full min-h-[4rem] sm:min-h-[4.75rem] rounded-xl border border-emerald-300/35 bg-emerald-300/[0.08] px-3 py-2.5 sm:py-3 flex flex-col justify-center"
                    >
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-emerald-300 mb-1">
                        <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                        Payoff
                      </p>
                      <p className="text-xs sm:text-sm text-foreground font-poppins font-bold leading-snug">
                        {item.payoff}
                      </p>
                    </div>

                    <div className="col-span-2 lg:col-span-1 h-full min-h-[4rem] sm:min-h-[4.75rem] rounded-xl border border-amber-300/40 bg-amber-300/[0.08] px-3 py-2.5 sm:py-3 flex flex-col justify-center">
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-amber-300 mb-1">
                        <Clock3 className="w-3.5 h-3.5" aria-hidden="true" />
                        Setup time
                      </p>
                      <p className="text-xs sm:text-sm text-foreground font-poppins font-bold leading-snug">
                        {item.effort}
                      </p>
                    </div>

                    <div className="col-span-2 lg:col-span-1 h-full min-h-[4rem] sm:min-h-[4.75rem] rounded-xl border border-primary/35 bg-primary/[0.07] px-3 py-2.5 sm:py-3 flex flex-col justify-center">
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-primary mb-1">
                        <Target className="w-3.5 h-3.5" aria-hidden="true" />
                        Why
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/85 font-body leading-snug">
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div id="assessment-calendar" className="relative z-10 w-full mt-3 md:mt-5 scroll-mt-28">
        <div className="container mx-auto px-3 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="group overflow-hidden rounded-2xl border border-primary/35 bg-background/45 backdrop-blur-md transition-colors hover:border-primary/70">
              <a
                href="https://cal.com/damian-schaeffer/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-primary/25 bg-primary/[0.08] px-4 py-5 sm:px-6 md:px-8 text-center transition-colors group-hover:bg-primary/[0.12]"
                aria-label="Book the AI assessment call"
              >
                <h3 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.05]">
                  Book your
                  <span className="block text-primary">AI assessment call</span>
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto mt-3">
                  No payment today. Use the calendar below for the intake. If the opportunity is real,
                  you approve the paid assessment after the call and we turn it into your roadmap.
                </p>
              </a>
              <div className="p-2 sm:p-4 bg-black/20">
                <div className="overflow-hidden rounded-xl border border-primary/25 bg-background/80">
                  <iframe
                    src="https://cal.com/damian-schaeffer/consultation?layout=month_view&theme=dark&hideEventTypeDetails=true"
                    title="Book an AI Opportunity Assessment with Damian Schaeffer"
                    className="block w-full h-[620px] sm:h-[720px] border-0 bg-background"
                    loading="lazy"
                    allow="camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture"
                  />
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/60 font-body mt-3">
              Trouble loading the calendar?{" "}
              <a
                href="https://cal.com/damian-schaeffer/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Book directly on Cal.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorySection;
