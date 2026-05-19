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
import { MYAGENT_NORTH_STAR_PATH } from "@/components/brand/MyAgentLogo";

// Final binary fork — anyone who scrolled to the bottom without clicking
// gets one last clean choice between the two offers. Cards intentionally
// share identical chrome (border, fill, padding, button shape) so neither
// reads as "preferred"; identity comes from the brand mark inside the
// button + the proof-point row beneath it.

// Standard MyAgent trust badges — verbatim from MyAgentShowcase.tsx so
// the product brand promise stays consistent everywhere it appears.
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
  { Icon: User, label: "AI Interview" },
  { Icon: Calendar, label: "Founder Walkthrough" },
  { Icon: Briefcase, label: "$500 Build Credit" },
  { Icon: FileText, label: "48-Hour Map" },
  { Icon: Target, label: "ROI-Modeled" },
  { Icon: Compass, label: "No Sales Pressure" },
];

const TwoPathsFooter = () => {
  return (
    <section
      aria-label="Two ways forward — choose your path"
      className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden border-t border-border/40"
    >
      {/* Neutral ambient glow — sits dead-center so it doesn't bias either card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />

      {/* Section entrance — same blue-pill eyebrow used by every other
          homepage section, so visitors get a consistent "this is a new
          section" cue. Pill + headline gap matches Advisory / Partners
          (mb-10 md:mb-14) for cross-section vertical rhythm. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-10 md:mb-14"
      >
        <span
          className="inline-block px-4 py-1.5 text-primary border border-primary/30 rounded-full font-accent uppercase"
          style={{
            fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          Two Ways Forward
        </span>
      </motion.div>

      {/* Headline — canonical homepage h2 typography (matches Services /
          Advisory / Partners) so the pill→headline rhythm reads identical
          across the four homepage sections. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto text-center mb-8 md:mb-10"
      >
        <h2
          className="font-poppins font-bold tracking-tight text-foreground leading-[1.02]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
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
          className="group rounded-2xl border border-primary/30 hover:border-primary/50 bg-card/40 backdrop-blur-md p-6 md:p-8 flex flex-col transition-colors"
        >
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-primary text-center mb-3 leading-tight">
            Meet your agent
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed text-center mb-7 max-w-sm mx-auto">
            Your own AI agent that answers calls, books appointments, and
            handles real work — live in 60 seconds.
          </p>

          {/* CTA — the canonical "MyAgent Free Trial" pill. Lockup is
              rendered INLINE (not via <MyAgentLogo>'s fixed-em wrapper)
              so the diamond + "MyAgent" + "Free Trial" all read at the
              parent button's font-size as one uniform typographic line. */}
          <a
            href="https://get-myagent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full"
            aria-label="Start your MyAgent free trial"
          >
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground shadow-lg transition-all text-sm sm:text-base"
            >
              <span
                className="inline-flex items-center"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  gap: "0.25em",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
                aria-label="MyAgent"
              >
                <span
                  className="inline-flex items-center justify-center bg-primary flex-shrink-0"
                  style={{
                    width: "1em",
                    height: "1em",
                    borderRadius: "0.227em",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="24 24 152 152"
                    style={{ width: "0.8em", height: "0.8em" }}
                  >
                    <path d={MYAGENT_NORTH_STAR_PATH} fill="#ffffff" />
                  </svg>
                </span>
                <span style={{ whiteSpace: "nowrap" }}>
                  <span style={{ color: "hsl(var(--primary))" }}>My</span>
                  <span>Agent</span>
                </span>
              </span>
              <span className="font-poppins font-semibold">Free Trial</span>
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

        {/* Agency card — diagnostic first, bespoke build second */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group rounded-2xl border border-primary/30 hover:border-primary/50 bg-card/40 backdrop-blur-md p-6 md:p-8 flex flex-col transition-colors"
        >
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-primary text-center mb-3 leading-tight">
            Start with an assessment
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed text-center mb-7 max-w-sm mx-auto">
            A guided AI interview, founder-reviewed report, and 48-hour
            opportunity map that shows what to automate first.
          </p>

          {/* CTA — equal-weight chrome to MyAgent's button. Calendar
              icon sized w-4 h-4 (= text-base ≈ 16px) so it matches the
              "AI Opportunity Assessment" type-size, mirroring the inline
              MyAgent diamond's relationship to "Free Trial". */}
          <Link
            to="/advisory"
            className="inline-flex w-full"
            aria-label="Book an AI Opportunity Assessment"
          >
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground shadow-lg transition-all text-sm sm:text-base"
            >
              <Calendar
                className="w-4 h-4 text-primary flex-shrink-0"
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <span className="font-poppins font-semibold">
                AI Opportunity Assessment
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
