import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  User,
  Calendar,
  Briefcase,
  FileText,
  Target,
  Compass,
} from "lucide-react";

/**
 * "Not sure which functions to start with?" closing CTA.
 *
 * Used identically at the bottom of the homepage SERVICES section AND
 * the dedicated /services page so both read as one closing handoff:
 * "you've seen the catalog, here's how to pick from it."
 *
 * Layout mirrors the right-card pattern from TwoPathsFooter — same
 * chrome, same dark AI Opportunity Assessment pill, same 6-item agency
 * proof-point grid — so visitors see the same offer treatment whether
 * they hit it here or at the page-end fork. The section h2 is the
 * white canonical homepage headline ("Not sure which functions to
 * start with?") sitting above the single card as the question; the
 * card is the answer.
 */

// Agency engagement proof points — mirror of the AGENCY_BADGES array
// in TwoPathsFooter so both surfaces show the same set of signals.
// Kept inline (not extracted to a shared module) so the duplication is
// visible and easy to keep in sync.
const AGENCY_BADGES = [
  { Icon: User, label: "AI Intake" },
  { Icon: Calendar, label: "Strategy Call" },
  { Icon: Briefcase, label: "Approve After Call" },
  { Icon: FileText, label: "Ranked Roadmap" },
  { Icon: Target, label: "ROI-Modeled" },
  { Icon: Compass, label: "No Sales Pressure" },
];

const StrategyCallCTA = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 mt-16 md:mt-24">
      {/* Section headline — canonical homepage h2 typography (matches
          TwoPathsFooter / Services / Advisory / Partners) so the
          closing handoff reads with the same vertical rhythm as the
          rest of the page. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto text-center mb-8 md:mb-10"
      >
        <h2
          className="font-poppins font-bold tracking-tight text-foreground leading-[1.02]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          Not sure where AI should start?
        </h2>
      </motion.div>

      {/* Single assessment card — verbatim chrome from
          TwoPathsFooter's right card so the visitor sees the same offer
          treatment in both contexts. Centered with max-w-xl so it
          reads as a balanced standalone offer, not a half of a
          missing pair. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="group relative z-10 max-w-xl mx-auto rounded-2xl border border-primary/30 hover:border-primary/50 bg-card/40 backdrop-blur-md p-6 md:p-8 flex flex-col transition-colors"
      >
        <h3 className="font-poppins font-bold text-2xl md:text-3xl text-primary text-center mb-3 leading-tight">
          Start with an assessment
        </h3>
        <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed text-center mb-7 max-w-sm mx-auto">
          A guided AI intake and consultation that shows what should be
          automated first, what should wait, and where the payoff lives.
        </p>

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
    </section>
  );
};

export default StrategyCallCTA;
