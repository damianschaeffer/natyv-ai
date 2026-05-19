import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  Clock3,
  Database,
  DollarSign,
  ExternalLink,
  MessageSquareText,
  PhoneCall,
  Send,
  ShieldCheck,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

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

const BENEFITS: Benefit[] = [
  {
    icon: Bot,
    title: "Answer once",
    description: "The AI intake captures calls, leads, follow-up, and bottlenecks.",
  },
  {
    icon: Target,
    title: "Rank the moves",
    description: "Every idea is sorted by payoff and setup time.",
  },
  {
    icon: ShieldCheck,
    title: "Build first",
    description: "You leave with the first win, not another software wishlist.",
  },
];

const OPPORTUNITIES: OpportunityItem[] = [
  {
    icon: PhoneCall,
    rank: 1,
    title: "Missed-call rescue agent",
    area: "Front Desk",
    description: "Catch after-hours calls and route urgent jobs before they shop around.",
    payoff: "$3,000/mo potential recovered revenue",
    effort: "Same-day setup",
    reason: "Biggest cash leak, lowest lift.",
    color: "#06B6D4",
    mapX: 24,
    mapY: 72,
  },
  {
    icon: MessageSquareText,
    rank: 2,
    title: "Instant text-back follow-up",
    area: "Sales",
    description: "Reply to new leads while they are still warm.",
    payoff: "Hours saved every week",
    effort: "1 short workflow",
    reason: "Fast setup, immediate speed-to-lead.",
    color: "#10B981",
    mapX: 17,
    mapY: 64,
  },
  {
    icon: Database,
    rank: 3,
    title: "Simple CRM pipeline",
    area: "Operations",
    description: "Move every lead into visible stages, owners, value, and next steps.",
    payoff: "$3k-$5k implementation value",
    effort: "3-5 day build",
    reason: "Heavier lift, but it becomes the operating base.",
    color: "#3C83F6",
    mapX: 52,
    mapY: 70,
  },
  {
    icon: Star,
    rank: 4,
    title: "Review request automation",
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
    icon: Send,
    rank: 5,
    title: "Past customer reactivation",
    area: "Customer Experience",
    description: "Win back past customers with timely, relevant follow-up.",
    payoff: "Revenue from customers already earned",
    effort: "1-2 day cleanup",
    reason: "Strong upside once new leads stop leaking.",
    color: "#8B5CF6",
    mapX: 35,
    mapY: 43,
  },
];

const AdvisorySection = () => {
  return (
    <section
      id="advisory"
      className="relative flex flex-col items-center justify-center px-2 sm:px-6 pt-8 md:pt-12 pb-20 md:pb-28 overflow-hidden border-t border-border/40"
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
          From 75+ options
          <span className="block text-primary">to the first five moves.</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4">
          A guided AI intake ranks what pays back fastest, what takes the least
          setup time, and what can wait.
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 grid sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl mx-auto mb-6 md:mb-7 px-2 sm:px-0"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.22 }}
      >
        {BENEFITS.map((benefit, index) => (
          <motion.article
            key={benefit.title}
            className="group grid grid-cols-[auto_1fr] gap-3 items-start p-4 rounded-2xl border border-border/60 bg-background/35 backdrop-blur-md hover:border-primary/40 hover:bg-background/55 transition-all duration-300"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28 + index * 0.06 }}
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <benefit.icon className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-sm md:text-base text-foreground leading-snug mb-1">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-0 mb-12 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65, delay: 0.32 }}
      >
        <div className="rounded-2xl border border-primary/25 bg-background/45 backdrop-blur-md overflow-hidden">
          <div className="p-5 sm:p-7 md:p-8 border-b border-border/60">
            <div className="flex flex-wrap gap-2 mb-5">
              {OPPORTUNITIES.map((item) => (
                <span
                  key={item.area}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-poppins font-semibold"
                  style={{
                    borderColor: `${item.color}66`,
                    backgroundColor: `${item.color}14`,
                    color: item.color,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.area}
                </span>
              ))}
            </div>

            <div className="relative h-[390px] sm:h-[460px] rounded-2xl border border-border/70 bg-black/45 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(6,182,212,0.22),transparent_24%),radial-gradient(circle_at_35%_24%,rgba(16,185,129,0.16),transparent_22%),radial-gradient(circle_at_68%_24%,rgba(60,131,246,0.16),transparent_24%),radial-gradient(circle_at_76%_74%,rgba(251,146,60,0.10),transparent_24%)]" />

              <div className="absolute left-[72px] sm:left-[86px] right-5 top-5 bottom-[70px] rounded-2xl bg-gradient-to-br from-cyan-400/[0.14] via-transparent to-orange-500/[0.05]" />
              <div className="absolute left-[72px] sm:left-[86px] right-5 top-5 bottom-[70px] rounded-2xl border border-white/[0.08]" />
              <div className="absolute left-[72px] sm:left-[86px] right-5 top-1/2 h-px bg-white/20" />
              <div className="absolute left-1/2 top-5 bottom-[70px] w-px bg-white/20" />

              <div className="absolute left-5 sm:left-7 top-8 bottom-[82px] w-4 rounded-full bg-gradient-to-t from-white/10 via-primary/55 to-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.28)]">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-emerald-400 text-background flex items-center justify-center shadow-[0_0_34px_rgba(16,185,129,0.55)]">
                  <DollarSign className="w-7 h-7" aria-hidden="true" />
                </div>
                <ArrowUp className="absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-5 text-emerald-300" aria-hidden="true" />
              </div>

              <div className="absolute left-[72px] sm:left-[86px] right-8 bottom-8 h-4 rounded-full bg-gradient-to-r from-cyan-300 via-primary/65 to-white/10 shadow-[0_0_30px_rgba(6,182,212,0.24)]">
                <div className="absolute -left-5 -top-4 h-12 w-12 rounded-full bg-cyan-300 text-background flex items-center justify-center shadow-[0_0_34px_rgba(6,182,212,0.48)]">
                  <Clock3 className="w-6 h-6" aria-hidden="true" />
                </div>
                <ArrowRight className="absolute -right-2 -top-2 w-8 h-8 text-white/55" aria-hidden="true" />
              </div>

              <div className="absolute left-[92px] sm:left-[112px] top-7 rounded-2xl border border-cyan-300/35 bg-cyan-300/[0.10] px-3 py-2">
                <p className="font-poppins font-bold text-sm text-foreground">Best first</p>
                <p className="text-xs text-muted-foreground">More payoff + less time</p>
              </div>
              <div className="absolute right-7 bottom-20 text-right hidden sm:block">
                <p className="font-poppins font-bold text-sm text-muted-foreground">More setup time</p>
              </div>
              <div className="absolute left-[88px] sm:left-[104px] bottom-20">
                <p className="font-poppins font-bold text-sm text-foreground">Least setup time</p>
              </div>
              <div className="absolute left-11 sm:left-14 top-7">
                <p className="font-poppins font-bold text-sm text-foreground">Payoff</p>
              </div>

              {OPPORTUNITIES.map((item) => (
                <div
                  key={item.title}
                  className="absolute group"
                  style={{
                    left: `${item.mapX}%`,
                    bottom: `${item.mapY}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  <div
                    className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border-2 border-background/90 flex items-center justify-center font-poppins font-bold text-sm text-white"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 34px ${item.color}66`,
                    }}
                    aria-label={`Priority ${item.rank}: ${item.title}`}
                  >
                    {item.rank}
                  </div>
                  <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden sm:block min-w-[180px] rounded-xl border border-border/70 bg-background/95 px-3 py-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                    <p className="font-poppins font-bold text-xs text-foreground leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                      {item.payoff}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-7 md:p-8">
            <div className="space-y-3">
              {OPPORTUNITIES.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/45 px-4 py-4 sm:px-5"
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <div className="grid lg:grid-cols-[auto_minmax(0,1fr)_minmax(11rem,0.72fr)_minmax(10rem,0.58fr)_minmax(11rem,0.7fr)] gap-3 lg:gap-4 items-center pl-2">
                    <div className="flex items-center gap-3 lg:block">
                      <div
                        className="h-11 w-11 rounded-xl flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${item.color}22` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                      </div>
                      <div
                        className="mt-0 lg:mt-2 h-8 w-8 rounded-full flex items-center justify-center font-poppins font-bold text-sm text-white"
                        style={{ backgroundColor: item.color }}
                        aria-label={`Priority ${item.rank}`}
                      >
                        {item.rank}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h5 className="font-poppins font-bold text-base md:text-lg text-foreground leading-snug">
                          {item.title}
                        </h5>
                        <span
                          className="text-[10px] uppercase tracking-[0.14em] border rounded-full px-2 py-0.5"
                          style={{
                            borderColor: `${item.color}66`,
                            backgroundColor: `${item.color}12`,
                            color: item.color,
                          }}
                        >
                          {item.area}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div
                      className="rounded-xl border px-3 py-3"
                      style={{
                        borderColor: `${item.color}55`,
                        backgroundColor: `${item.color}14`,
                      }}
                    >
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: item.color }}>
                        <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                        Payoff
                      </p>
                      <p className="text-sm text-foreground font-poppins font-bold leading-snug">
                        {item.payoff}
                      </p>
                    </div>

                    <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/[0.08] px-3 py-3">
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-cyan-300 mb-1">
                        <Clock3 className="w-3.5 h-3.5" aria-hidden="true" />
                        Setup time
                      </p>
                      <p className="text-sm text-foreground font-poppins font-bold leading-snug">
                        {item.effort}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/55 bg-background/45 px-3 py-3">
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                        <Target className="w-3.5 h-3.5" aria-hidden="true" />
                        Why
                      </p>
                      <p className="text-sm text-foreground/85 font-body leading-snug">
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-primary/35 bg-primary/[0.08] px-5 py-5 md:px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="font-accent uppercase text-primary text-xs tracking-[0.22em] mb-2">
                  Founding launch offer
                </p>
                <p className="font-poppins font-bold text-xl md:text-2xl text-foreground leading-tight">
                  $500 assessment, credited toward your first build.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/sample-ai-opportunity-report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground font-poppins font-semibold text-sm transition-colors whitespace-nowrap sm:min-w-[11.5rem]"
                >
                  View sample report
                  <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" />
                </a>
                <a
                  href="#assessment-calendar"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-semibold text-sm transition-colors whitespace-nowrap sm:min-w-[11.5rem]"
                  aria-label="Book your AI Opportunity Assessment"
                >
                  Book assessment
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div id="assessment-calendar" className="relative z-10 w-full mt-12 md:mt-16 scroll-mt-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <iframe
              src="https://cal.com/damian-schaeffer/consultation?layout=month_view&theme=dark&hideEventTypeDetails=true"
              title="Book an AI Opportunity Assessment with Damian Schaeffer"
              className="w-full rounded-2xl border border-border bg-background"
              style={{ height: "720px", border: 0 }}
              loading="lazy"
              allow="camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture"
            />
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
