import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Final binary fork — anyone who scrolled to the bottom without clicking gets
// one last clean choice between the two paths. Mirrors the Hero's dual CTAs
// but in a more decisive card-pair format.
const TwoPathsFooter = () => {
  return (
    <section
      aria-label="Two paths summary"
      className="relative px-4 sm:px-6 py-16 md:py-20 overflow-hidden border-t border-border/40"
    >
      {/* Ambient glow — sits between Studio's primary blue and Solutions' warmer tone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />

      {/* Eyebrow lives in the sticky bar now (persistent across the site).
          Cards below stand on their own. */}

      <div className="relative z-10 grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
        {/* Path A — Try MyAgent (primary card, blue accent) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-primary/40 bg-primary/[0.05] backdrop-blur-md p-7 md:p-9 text-center flex flex-col"
        >
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-3 font-accent">
            Path A
          </div>
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground mb-2">
            Meet your agent
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed mb-6 max-w-sm mx-auto">
            Self-serve. Free for 14 days. No credit card. Live in 60 seconds.
          </p>
          <a
            href="https://get-myagent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto"
          >
            <Button className="h-11 px-6 text-sm font-poppins font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg">
              <Sparkles className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Start free trial
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        {/* Path B — Talk to a strategist (outline card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border/60 bg-background/40 backdrop-blur-md p-7 md:p-9 text-center flex flex-col"
        >
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 font-accent">
            Path B
          </div>
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground mb-2">
            Talk to a strategist
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed mb-6 max-w-sm mx-auto">
            60-minute consultation. Confidential. NDA available. Action plan delivered.
          </p>
          <Link to="/advisory" className="mt-auto">
            <Button
              variant="outline"
              className="h-11 px-6 text-sm font-poppins font-semibold rounded-full bg-background/60 border-border/60 hover:bg-background/80 transition-all shadow-lg"
            >
              <Calendar className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Book consultation
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoPathsFooter;
