import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Map, ShieldCheck } from "lucide-react";

// Static headline — punchy transition from the 75-item services catalog
// into the consultation booking. The first half names the problem
// (visitor doesn't know which services to pick), the blue-accent
// second half makes the offer (we deliver the plan).
const HEADLINE_PRE = "Skip guessing.";
const HEADLINE_POST = "Get the plan.";

// Rotating subtitles — each line surfaces UNIQUE info that the three
// tiles below don't already cover. The previous rotation duplicated
// tile content (founder-led / confidential / action plan) so the
// section was saying the same things twice. The new rotation adds:
//   1. Process insight (diagnose-first principle)
//   2. Speed-to-value (one session → plan in hand)
//   3. Bespoke positioning (built for your business, not a framework)
const SUBTITLES = [
  "We map your operations before we touch your stack.",
  "One conversation. A deployment plan in hand.",
  "Built around your business — not a framework retrofit.",
];

interface Benefit {
  icon: typeof User;
  title: string;
  description: string;
}

// Three benefit tiles — benefit-first, not feature-first. Each tile
// answers a different question the skeptical visitor has:
//   1. WHO am I talking to?  → Founder-Led
//   2. WHAT do I walk away with?  → Action Plan, Yours
//   3. WHAT'S THE CATCH?  → Zero Sales Pressure
// Replaces the earlier feature-tiles ("1:1 Strategy Session" /
// "60-Minute Deep Dive" / "Confidential Brief") which described the
// meeting format rather than the value of attending.
const BENEFITS: Benefit[] = [
  {
    icon: User,
    title: "Founder-Led",
    description:
      "Direct line to the founder. The person designing your AI system answers your questions live — no junior account managers, no handoffs.",
  },
  {
    icon: Map,
    title: "Action Plan, Yours",
    description:
      "You leave with a prioritized roadmap mapped to your operations and ROI. Yours to keep, even if you don't engage further.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Sales Pressure",
    description:
      "Confidential by default, NDA available. If our agency or MyAgent isn't the right fit, we'll tell you fast.",
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
          Advisory
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
          className="font-poppins font-bold tracking-tight text-foreground leading-[1.02] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          {HEADLINE_PRE}{" "}
          <span className="text-primary inline-block whitespace-nowrap">{HEADLINE_POST}</span>
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

      {/* Inline booking — Cal.com iframe sits directly under the
          benefit cards, no chrome wrapper or "Select a time" header
          above it. Visual silence around the iframe lets the
          calendar grid be the primary action. URL params suppress
          Cal.com's event-type details panel for a tighter embed.
          Note: the "Overlay my calendar" toggle inside the iframe
          is controlled by Damian's Cal.com event-type settings, not
          from this URL — disable it from the Cal.com dashboard if
          unwanted. */}
      <div className="relative z-10 w-full mt-12 md:mt-16">
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
              title="Book a consultation with Damian Schaeffer"
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
