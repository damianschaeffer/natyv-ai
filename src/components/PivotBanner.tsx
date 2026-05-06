import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Single biggest conversion lever in V3 architecture: the pivot moment between
// Studio (Path A — self-serve product) and Solutions (Path B — agency).
// Replaces the previously-buried "Or have us install & run it for you →" line
// with a full-width banner that explicitly hands non-converters Path B.
const PivotBanner = () => {
  const scrollToSolutions = () => {
    const el = document.getElementById("homepage-services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      aria-label="Pivot to agency services"
      className="relative flex flex-col items-center justify-center px-6 py-16 md:py-20 overflow-hidden border-t border-b border-border/40"
    >
      {/* Ambient glow — subtle to keep the banner from competing with section heroes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      {/* Diamond divider — visual cue that this is a pivot, not a section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 flex items-center gap-3 text-primary/50"
        aria-hidden="true"
      >
        <span className="h-px w-12 bg-current" />
        <span className="text-base">◆</span>
        <span className="h-px w-12 bg-current" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <h2 className="font-poppins font-bold tracking-tight text-foreground text-2xl md:text-3xl lg:text-4xl leading-[1.1] mb-3">
          Want it built around your operations?
        </h2>
        <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
          Our team designs your stack, integrates it deeply, and runs it end-to-end.
        </p>

        <Button
          onClick={scrollToSolutions}
          className="h-11 px-6 text-sm font-poppins font-semibold rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          Path B: Agency Services
          <ArrowRight className="ml-1.5 w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
};

export default PivotBanner;
