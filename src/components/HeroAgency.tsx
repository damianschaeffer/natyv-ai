import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroAgency = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background ambience — subtle gradient orbs + grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Decorative horizontal lines */}
      <motion.div
        className="absolute left-0 top-1/3 w-32 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.div
        className="absolute right-0 bottom-1/3 w-32 h-px bg-gradient-to-l from-transparent via-primary/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-12">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-[6px] h-6 bg-primary" aria-hidden="true" />
            <span className="text-foreground font-accent text-sm md:text-base tracking-[0.3em] uppercase">
              The AI Operations Agency
            </span>
            <span className="w-[6px] h-6 bg-primary" aria-hidden="true" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            AI-Native Operations
            <span className="block text-primary mt-2">
              for Service Businesses.
            </span>
          </motion.h1>

          {/* Sub-promise */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            We design, deploy, and operate AI systems that capture every lead, save you hours every week,
            and make your business feel ten years ahead.{" "}
            <span className="text-foreground">Built on MyAgent. Run by people who know your industry.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link
              to="/advisory"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-accent uppercase tracking-[0.15em] text-sm md:text-base rounded-sm px-8 py-4 hover:bg-primary/90 transition-all duration-300"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <a
              href="https://get-myagent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 border border-border text-foreground font-accent uppercase tracking-[0.15em] text-sm md:text-base rounded-sm px-8 py-4 hover:bg-secondary/40 hover:border-primary/40 transition-all duration-300"
            >
              See MyAgent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Outcome stats — quick credibility row */}
          <motion.div
            className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto pt-8 border-t border-border/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="text-center">
              <div className="font-display text-3xl md:text-5xl text-primary mb-2">80+</div>
              <div className="text-xs md:text-sm text-muted-foreground font-body uppercase tracking-wider">
                Productized Services
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-5xl text-primary mb-2">24/7</div>
              <div className="text-xs md:text-sm text-muted-foreground font-body uppercase tracking-wider">
                Always-On Operations
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-5xl text-primary mb-2">20+</div>
              <div className="text-xs md:text-sm text-muted-foreground font-body uppercase tracking-wider">
                Years of Operations DNA
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroAgency;
