// TEMPORARY mockup page — three subtitle treatments for the SERVICES
// section, side-by-side so Damian can compare and pick.
// Delete once he picks a direction.
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HEADLINE_PRE = "Your stack.";
const HEADLINE_POST = "Built around you.";

const OPTION_A = [
  "Every engagement deploys from the same proven catalog.",
  "Pick the functions that move your business.",
  "We install them for you — or self-serve on MyAgent.",
];

const OPTION_B = [
  "Customized to your specific operations.",
  "Designed and implemented by our team.",
  "Every engagement deploys from the same proven catalog.",
  "Pick the functions that move your business.",
  "Or self-serve the same catalog on MyAgent.",
];

const OPTION_C_STATIC = "Every engagement deploys from the same catalog.";
const OPTION_C_ROTATING = [
  "Pick the functions that move your business.",
  "We install them for you — or self-serve on MyAgent.",
  "Customized to your specific operations.",
];

const Rotator = ({ phrases }: { phrases: string[] }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 3500);
    return () => clearInterval(t);
  }, [phrases.length]);
  return (
    <div className="min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4 text-center"
        >
          {phrases[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const OptionCard = ({
  label,
  description,
  recommended,
  children,
}: {
  label: string;
  description: string;
  recommended?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`relative border rounded-2xl p-8 md:p-12 bg-background/40 ${
      recommended ? "border-primary/60" : "border-border/40"
    }`}
  >
    {recommended && (
      <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-accent font-semibold">
        Recommended
      </div>
    )}
    <div className="mb-8 text-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary/80 font-accent mb-2">
        {label}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>

    <div className="text-center">
      <h2
        className="font-poppins font-bold tracking-tight text-foreground leading-[1.02] mb-6"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
      >
        {HEADLINE_PRE}{" "}
        <span className="text-primary inline-block whitespace-nowrap">
          {HEADLINE_POST}
        </span>
      </h2>
      {children}
    </div>
  </div>
);

const ServicesSubtitleMockups = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary/80 font-accent mb-4">
            Services subtitle gallery
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-3">
            Three options to unify with /services
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Compare the three subtitle treatments. Each one folds the
            /services page paragraph ("Every Natyv engagement deploys
            from the same catalog…") into the homepage rhythm
            differently. Pick a number and I'll wire it into the live
            section.
          </p>
        </div>

        <div className="space-y-12">
          <OptionCard
            label="Option A"
            description="3 punchy rotating lines, each owning one beat. Cleanest unification."
            recommended
          >
            <Rotator phrases={OPTION_A} />
          </OptionCard>

          <OptionCard
            label="Option B"
            description="Expand current 2 → 5 rotating lines. Layered but slightly noisier."
          >
            <Rotator phrases={OPTION_B} />
          </OptionCard>

          <OptionCard
            label="Option C"
            description="Static catalog line + 3 rotating. Most defensive — proof always on screen."
          >
            <p className="text-sm text-muted-foreground/80 font-body italic mb-2">
              {OPTION_C_STATIC}
            </p>
            <Rotator phrases={OPTION_C_ROTATING} />
          </OptionCard>
        </div>

        <div className="text-center mt-16 text-xs text-muted-foreground/60">
          Pick A / B / C — I'll wire it into HomepageServices and remove
          this test page.
        </div>
      </div>
    </div>
  );
};

export default ServicesSubtitleMockups;
