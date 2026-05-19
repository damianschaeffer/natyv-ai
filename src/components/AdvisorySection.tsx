import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  FileText,
  ShieldCheck,
  BarChart3,
  Target,
  ListChecks,
  CalendarCheck,
  ArrowRight,
  PhoneCall,
  MessageSquareText,
  Database,
  Star,
  Send,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

// Static headline - positions the founder-led advisory call as a concrete
// assessment offer instead of a generic consultation.
const HEADLINE_PRE = "Start with the";
const HEADLINE_MID = "AI Opportunity";
const HEADLINE_POST = "Assessment.";

// Rotating subtitles — each line surfaces UNIQUE info that the three
// tiles below don't already cover. The previous rotation duplicated
// tile content (founder-led / confidential / action plan) so the
// section was saying the same things twice. The new rotation adds:
//   1. Process insight (diagnose-first principle)
//   2. Speed-to-value (one session → plan in hand)
//   3. Bespoke positioning (built for your business, not a framework)
const SUBTITLES = [
  "20 minutes with our AI assessment agent. 48 hours later, a founder-reviewed action map.",
  "Find what to automate, what to ignore, and what pays back first.",
  "$500 founding assessment - credited toward your first build within 14 days.",
];

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AssessmentItem {
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
  payoffScore: number;
  setupScore: number;
  payoff: string;
  effort: string;
  reason: string;
  nextStep: string;
  color: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Bot,
    title: "AI-Led Discovery",
    description:
      "Start with a guided voice assessment that learns your calls, leads, follow-up, admin work, and recurring bottlenecks.",
  },
  {
    icon: FileText,
    title: "48-Hour Opportunity Map",
    description:
      "We turn the interview into a prioritized report with quick wins, ROI estimates, and the systems worth building first.",
  },
  {
    icon: ShieldCheck,
    title: "Credited Toward Build",
    description:
      "Founding assessments are $500 and credited toward your first Natyv build if we move forward within 14 days.",
  },
];

const ASSESSMENT_ITEMS: AssessmentItem[] = [
  {
    icon: BarChart3,
    title: "ROI Snapshot",
    description:
      "Estimate the hours, missed leads, and manual work your business can realistically recover.",
  },
  {
    icon: Target,
    title: "Effort vs. Impact Map",
    description:
      "Separate quick wins from heavy lifts so you do not spend money on the wrong automation first.",
  },
  {
    icon: ListChecks,
    title: "4-Day Quick Win Plan",
    description:
      "A ground-level rollout sequence for the fastest fix we would implement before anything else.",
  },
  {
    icon: CalendarCheck,
    title: "Founder Walkthrough",
    description:
      "A live review of the report with clear next steps, including where MyAgent does or does not fit.",
  },
];

const OPPORTUNITIES: OpportunityItem[] = [
  {
    icon: PhoneCall,
    rank: 1,
    title: "Missed-call rescue agent",
    area: "Front Desk",
    description:
      "Answer after-hours calls, qualify intent, and route urgent leads before they shop around.",
    payoffScore: 94,
    setupScore: 22,
    payoff: "$3,000/mo potential recovered revenue",
    effort: "Same-day setup",
    reason: "The business already gets enough calls. The fastest upside is catching the ones nobody answers.",
    nextStep: "Launch with call answering, lead capture, and urgent-call routing.",
    color: "#06B6D4",
  },
  {
    icon: MessageSquareText,
    rank: 2,
    title: "Instant text-back follow-up",
    area: "Sales",
    description:
      "Reply to new inquiries in seconds, capture the reason for contact, and keep the lead warm.",
    payoffScore: 88,
    setupScore: 18,
    payoff: "Hours saved every week",
    effort: "1 short workflow",
    reason: "Speed-to-lead compounds everything else. It works before a CRM rebuild is finished.",
    nextStep: "Connect website forms, missed calls, and basic lead replies.",
    color: "#10B981",
  },
  {
    icon: Database,
    rank: 3,
    title: "Simple CRM pipeline",
    area: "Operations",
    description:
      "Move leads from inboxes and sticky notes into visible stages with owner, next step, and value.",
    payoffScore: 80,
    setupScore: 52,
    payoff: "$3k-$5k implementation value",
    effort: "3-5 day build",
    reason: "It is a bigger lift, but it prevents every future automation from becoming another disconnected tool.",
    nextStep: "Create lead stages, owners, next steps, and dashboard visibility.",
    color: "#3C83F6",
  },
  {
    icon: Star,
    rank: 4,
    title: "Review request automation",
    area: "Marketing",
    description:
      "Trigger review asks after completed work and route unhappy customers to a private save path.",
    payoffScore: 68,
    setupScore: 16,
    payoff: "More reviews without more admin",
    effort: "1 short workflow",
    reason: "Easy win, but it matters after the lead-capture leaks are handled.",
    nextStep: "Trigger review asks from completed appointments or paid invoices.",
    color: "#FB923C",
  },
  {
    icon: Send,
    rank: 5,
    title: "Past customer reactivation",
    area: "Customer Experience",
    description:
      "Reach past customers with timely, relevant follow-up instead of waiting for them to remember you.",
    payoffScore: 61,
    setupScore: 34,
    payoff: "Revenue from customers you already earned",
    effort: "1-2 day cleanup",
    reason: "Great upside, but only after the new-lead response path stops leaking.",
    nextStep: "Segment past customers and write the first win-back sequence.",
    color: "#8B5CF6",
  },
];

const AdvisorySection = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % SUBTITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="advisory"
      className="relative flex flex-col items-center justify-center px-2 sm:px-6 pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden border-t border-border/40"
    >
      {/* Ambient glow — same primitive as MyAgentShowcase */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[150px] pointer-events-none" />

      {/* Section entrance — small subtle pill matching the rest of
          the homepage section entries. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-10 md:mb-14"
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

      {/* Headline cluster — Poppins-bold mark with static headline + rotating subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto mb-8 md:mb-10"
      >
        <h2
          className="font-poppins font-bold text-foreground leading-[1.04] mb-6 max-w-[calc(100vw-2rem)] mx-auto break-words"
          style={{ fontSize: "clamp(2rem, 9vw, 5rem)", letterSpacing: "0" }}
        >
          {HEADLINE_PRE}
          <span className="block text-primary">{HEADLINE_MID}</span>
          <span className="block text-primary">{HEADLINE_POST}</span>
        </h2>

        <div className="min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSubtitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4"
            >
              {SUBTITLES[currentSubtitle]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Founding offer strip - one compact commercial anchor before
          the visitor reaches the calendar. */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-0 mb-8 md:mb-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-center rounded-2xl border border-primary/30 bg-primary/[0.06] backdrop-blur-md px-5 py-5 md:px-7 md:py-6">
          <div className="text-center md:text-left">
            <p className="font-accent uppercase text-primary text-xs tracking-[0.22em] mb-2">
              Founding launch offer
            </p>
            <p className="font-poppins font-bold text-lg sm:text-2xl md:text-3xl text-foreground leading-tight max-w-[20rem] md:max-w-full mx-auto md:mx-0 break-words">
              $500 assessment, credited toward your first build.
            </p>
            <p className="mt-2 text-sm md:text-base text-muted-foreground font-body leading-relaxed">
              Designed for business owners who know AI matters, but need the
              right starting point before buying software or custom work.
            </p>
          </div>
          <a
            href="#assessment-calendar"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground shadow-lg transition-all text-sm sm:text-base font-poppins font-semibold"
            aria-label="Book your AI Opportunity Assessment"
          >
            Book assessment
            <ArrowRight className="w-4 h-4 text-primary" aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      {/* 3 benefit cards — restyled to match Studio aesthetic */}
      <motion.div
        className="relative z-10 grid sm:grid-cols-3 gap-4 md:gap-5 w-full max-w-4xl mx-auto mb-10 px-2 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {BENEFITS.map((benefit, index) => (
          <motion.article
            key={benefit.title}
            className="group flex flex-col p-6 rounded-2xl border border-border/60 bg-background/40 backdrop-blur-md hover:border-primary/40 hover:bg-background/60 transition-all duration-300 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <benefit.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-poppins font-bold text-base md:text-lg text-foreground mb-2 leading-snug">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {benefit.description}
            </p>
          </motion.article>
        ))}
      </motion.div>

      {/* Assessment report preview - shows the buyer what the diagnostic
          produces before asking them to book. */}
      <motion.div
        className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full max-w-5xl mx-auto mb-10 px-2 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {ASSESSMENT_ITEMS.map((item, index) => (
          <motion.article
            key={item.title}
            className="group flex flex-col p-5 rounded-2xl border border-border/60 bg-background/35 backdrop-blur-md hover:border-primary/40 hover:bg-background/55 transition-all duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.06 }}
          >
            <div className="w-11 h-11 mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-poppins font-bold text-base text-foreground mb-2 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {item.description}
            </p>
          </motion.article>
        ))}
      </motion.div>

      {/* Opportunity Map - a concrete sample of the assessment output. */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-0 mb-12 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65, delay: 0.38 }}
      >
        <div className="rounded-2xl border border-primary/25 bg-background/45 backdrop-blur-md overflow-hidden">
          <div className="p-5 sm:p-7 md:p-8 border-b border-border/60">
            <div className="grid lg:grid-cols-[1fr_auto] gap-5 lg:gap-8 lg:items-start mb-6">
              <div>
                <p className="font-accent uppercase text-primary text-xs tracking-[0.22em] mb-3">
                  Sample report output
                </p>
                <h3 className="font-poppins font-bold text-2xl md:text-4xl text-foreground leading-tight mb-3">
                  From 75+ options to the first 5 moves.
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-3xl">
                  The assessment turns the full Natyv service catalog into a
                  simple order of operations: what makes or saves the most
                  money, what takes the least setup time, and what should wait.
                </p>
              </div>
              <a
                href="/sample-ai-opportunity-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full border border-primary/35 bg-primary/[0.08] hover:bg-primary/[0.14] text-primary font-poppins font-semibold text-sm transition-colors"
              >
                View sample PDF
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
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

            <div className="relative h-[360px] sm:h-[430px] rounded-2xl border border-border/60 bg-black/35 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(6,182,212,0.16),transparent_28%),radial-gradient(circle_at_70%_20%,rgba(60,131,246,0.14),transparent_25%),radial-gradient(circle_at_72%_72%,rgba(251,146,60,0.1),transparent_26%)]" />
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-border/50 bg-foreground/[0.02]" />
                <div className="border-b border-border/50 bg-foreground/[0.012]" />
                <div className="border-r border-border/50 bg-foreground/[0.012]" />
                <div className="bg-background/30" />
              </div>

              <div className="absolute top-4 left-4 max-w-[12rem]">
                <p className="font-poppins font-bold text-sm sm:text-base text-foreground">
                  Highest payoff first
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  More revenue saved, earned, or protected.
                </p>
              </div>
              <div className="absolute bottom-4 left-4 max-w-[12rem]">
                <p className="font-poppins font-bold text-sm sm:text-base text-foreground">
                  Least setup time
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  Fastest path to a working win.
                </p>
              </div>
              <div className="absolute bottom-4 right-4 max-w-[13rem] text-right">
                <p className="font-poppins font-bold text-sm sm:text-base text-foreground">
                  Wait until the base is ready
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  Still valuable, just not first.
                </p>
              </div>

              <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Payoff
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Setup time
              </div>

              {OPPORTUNITIES.map((item, index) => (
                <div
                  key={item.title}
                  className="absolute group"
                  style={{
                    left: `${Math.max(12, Math.min(item.setupScore, 88))}%`,
                    bottom: `${Math.max(18, Math.min(item.payoffScore, 82))}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  <div
                    className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-background/80 shadow-[0_0_28px_rgba(41,121,255,0.32)] flex items-center justify-center font-poppins font-bold text-sm text-white"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 30px ${item.color}55`,
                    }}
                    aria-label={`Priority ${item.rank}: ${item.title}`}
                  >
                    {item.rank}
                  </div>
                  <div
                    className={`absolute ${index < 3 ? "left-12" : "right-12"} top-1/2 -translate-y-1/2 hidden sm:block min-w-[190px] rounded-xl border border-border/70 bg-background/95 px-3 py-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none`}
                  >
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
            <div className="grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-8 lg:items-end mb-5">
              <div>
                <p className="font-accent uppercase text-primary text-xs tracking-[0.22em] mb-2">
                  Example: local service business
                </p>
                <h4 className="font-poppins font-bold text-xl md:text-3xl text-foreground leading-tight">
                  The roadmap your eyes land on next.
                </h4>
                <p className="mt-2 text-sm md:text-base text-muted-foreground font-body leading-relaxed max-w-3xl">
                  No vague buckets, no code names. The report gives the owner a
                  numbered starting order, with the reason each move belongs
                  where it does.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/[0.08] px-4 py-3">
                <p className="font-poppins font-bold text-primary text-lg leading-tight">
                  $3,000/mo
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  sample upside from 2 recovered jobs
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {OPPORTUNITIES.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/45 px-4 py-4 sm:px-5 sm:py-5"
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <div className="grid md:grid-cols-[auto_1fr] gap-4">
                    <div className="flex md:flex-col items-center md:items-start gap-3">
                      <div
                        className="h-11 w-11 rounded-xl flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${item.color}22` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                      </div>
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center font-poppins font-bold text-sm text-white"
                        style={{ backgroundColor: item.color }}
                        aria-label={`Priority ${item.rank}`}
                      >
                        {item.rank}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
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

                      <div className="grid sm:grid-cols-3 gap-3 mt-4">
                        <div className="rounded-xl border border-border/50 bg-background/35 p-3">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                            Why here
                          </p>
                          <p className="text-xs text-foreground/85 font-body leading-relaxed">
                            {item.reason}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border/50 bg-background/35 p-3">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                            Payoff
                          </p>
                          <p className="text-xs text-foreground/85 font-poppins font-semibold leading-relaxed">
                            {item.payoff}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border/50 bg-background/35 p-3">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
                            Setup time
                          </p>
                          <p className="text-xs text-foreground/85 font-poppins font-semibold leading-relaxed">
                            {item.effort}
                          </p>
                          <p className="text-xs text-muted-foreground font-body leading-relaxed mt-1">
                            {item.nextStep}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/[0.06] px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                The assessment does the sorting for you, so the first call
                starts with context and the first build starts with confidence.
              </p>
              <a
                href="/sample-ai-opportunity-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-background/90 hover:bg-background border border-foreground/25 hover:border-foreground/45 text-foreground font-poppins font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Open full sample
                <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Inline booking — Cal.com iframe sits directly under the
          benefit cards, no chrome wrapper or "Select a time" header
          above it. Visual silence around the iframe lets the
          calendar grid be the primary action. URL params suppress
          Cal.com's event-type details panel for a tighter embed.
          Note: the "Overlay my calendar" toggle inside the iframe
          is controlled by Damian's Cal.com event-type settings, not
          from this URL — disable it from the Cal.com dashboard if
          unwanted. */}
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
                Book directly on Cal.com →
              </a>
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AdvisorySection;
