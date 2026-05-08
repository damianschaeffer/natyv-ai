import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gift,
  Clock,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  Lock,
  User,
  Calendar,
  Briefcase,
  FileText,
  Target,
  Compass,
} from "lucide-react";
import { MyAgentLogo } from "@/components/brand/MyAgentLogo";

// Final binary fork — anyone who scrolled to the bottom without clicking
// gets one last clean choice between the two offers. Cards intentionally
// share identical chrome (border, fill, padding, button shape) so neither
// reads as "preferred"; identity comes from the brand mark inside the
// button + the proof-point row beneath it.

// Standard MyAgent trust badges — verbatim from MyAgentShowcase.tsx so the
// product brand promise stays consistent everywhere it appears.
const MYAGENT_BADGES = [
  { Icon: Gift, label: "No Setup Fees" },
  { Icon: Clock, label: "14-Day Free Trial" },
  { Icon: CreditCard, label: "No Credit Card" },
  { Icon: CheckCircle, label: "Cancel Anytime" },
  { Icon: ShieldCheck, label: "SOC 2 Compliant" },
  { Icon: Lock, label: "Data Stays Yours" },
];

// Agency engagement proof points — same number (6) and visual rhythm as
// the MyAgent badges so the two sides balance. Icons are intentionally
// disjoint from MYAGENT_BADGES to avoid looking duplicated.
const AGENCY_BADGES = [
  { Icon: User, label: "Founder-Led" },
  { Icon: Calendar, label: "30-Min Session" },
  { Icon: Briefcase, label: "NDA Available" },
  { Icon: FileText, label: "Custom Roadmap" },
  { Icon: Target, label: "ROI-Modeled" },
  { Icon: Compass, label: "No Sales Pitch" },
];

const TwoPathsFooter = () => {
  return (
    <section
      aria-label="Two ways forward — choose your path"
      className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden border-t border-border/40"
    >
      {/* Neutral ambient glow — sits dead-center so it doesn't bias either card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center mb-10 md:mb-14"
      >
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-accent">
          Two ways forward
        </div>
        <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight leading-[1.1]">
          Pick what fits your business today.
        </h2>
      </motion.div>

      {/* Card pair — identical chrome, distinct identity through content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
        {/* MyAgent card — productized, self-serve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group rounded-2xl border border-border/60 hover:border-border bg-card/40 backdrop-blur-md p-6 md:p-8 flex flex-col transition-colors"
        >
          {/* Heading + body */}
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground text-center mb-3 leading-tight">
            Meet your agent
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed text-center mb-7 max-w-sm mx-auto">
            Your own AI agent that answers calls, books appointments, and
            handles real work — live in 60 seconds.
          </p>

          {/* CTA — the canonical "MyAgent Free Trial" button (verbatim
              chrome from StickyDualCTA, with the sealed MyAgentLogo lockup
              providing the brand identity inside the pill). */}
          <a
            href="https://get-myagent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full"
            aria-label="Start your MyAgent free trial"
          >
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground shadow-lg transition-all"
            >
              <MyAgentLogo height={20} />
              <span className="text-sm sm:text-base font-poppins font-semibold">
                Free Trial
              </span>
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </a>

          {/* Trust badges — get-myagent.com brand promise, verbatim */}
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2.5">
            {MYAGENT_BADGES.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground"
              >
                <b.Icon
                  className="w-3.5 h-3.5 text-primary flex-shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>{b.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Agency card — bespoke, founder-led */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group rounded-2xl border border-border/60 hover:border-border bg-card/40 backdrop-blur-md p-6 md:p-8 flex flex-col transition-colors"
        >
          {/* Heading + body */}
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground text-center mb-3 leading-tight">
            Architect with our team
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed text-center mb-7 max-w-sm mx-auto">
            30-minute strategy session with the founder. We map the
            highest-ROI automations to your business and walk you out
            with a custom action plan.
          </p>

          {/* CTA — equal-weight chrome to MyAgent's button. Calendar
              accent-color icon mirrors the role the MyAgent diamond plays
              on the other side, so both pills feel symmetrical. */}
          <Link
            to="/advisory"
            className="inline-flex w-full"
            aria-label="Book a 30-minute strategy consultation"
          >
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground shadow-lg transition-all"
            >
              <Calendar
                className="w-5 h-5 text-primary"
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <span className="text-sm sm:text-base font-poppins font-semibold">
                Strategy Consultation
              </span>
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </Link>

          {/* Engagement proof points — agency parallel to MyAgent's
              trust badges. 6 items, identical layout grid. */}
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2.5">
            {AGENCY_BADGES.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground"
              >
                <b.Icon
                  className="w-3.5 h-3.5 text-primary flex-shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>{b.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoPathsFooter;
