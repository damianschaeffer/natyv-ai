import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Shield,
  ArrowRight,
  Sparkles,
  UserCheck,
  FileText,
  MessageSquare,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Static headline — same pattern as Solutions / MyAgent.com section headers
const HEADLINE_PRE = "Strategy first.";
const HEADLINE_POST = "Build second.";

// Rotating subtitles — splice of MyAgentSection.tsx rotator pattern
const SUBTITLES = [
  "60-minute 1:1 with a senior AI operations strategist.",
  "Confidential. NDA available. Action plan delivered.",
  "We map your operations before we touch your stack.",
];

// Supporting pills — same primitive as MyAgentShowcase PILLS row
const PILLS = [
  { Icon: UserCheck, label: "Senior strategist" },
  { Icon: Clock, label: "60-minute session" },
  { Icon: Shield, label: "Confidential / NDA" },
  { Icon: Compass, label: "Operations + AI" },
  { Icon: FileText, label: "Action plan delivered" },
];

interface Benefit {
  icon: typeof Video;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Video,
    title: "1:1 Strategy Session",
    description: "Direct consultation with a senior AI strategist. No junior account managers.",
  },
  {
    icon: MessageSquare,
    title: "60-Minute Deep Dive",
    description: "Comprehensive analysis of your operational landscape and AI opportunities.",
  },
  {
    icon: Shield,
    title: "Confidential Brief",
    description: "Enterprise-grade discretion. NDA available before the first conversation.",
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

      {/* Supporting pills — exact splice from MyAgentShowcase PILLS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto mb-12 md:mb-16"
      >
        <div className="grid grid-cols-2 justify-items-center sm:flex sm:flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:gap-1.5 max-w-5xl mx-auto">
          {PILLS.map((p, i) => (
            <span
              key={p.label}
              className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1${i === 4 ? " col-span-2" : ""}`}
            >
              <p.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="text-sm sm:text-base font-semibold text-foreground/90 whitespace-nowrap">
                {p.label}
              </span>
            </span>
          ))}
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

      {/* CTA — pill-shaped to match Studio's button chrome */}
      <motion.div
        className="relative z-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link to="/advisory">
          <Button
            className="h-10 sm:h-11 px-5 sm:px-6 text-sm font-poppins font-semibold rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <Calendar className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Schedule consultation
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      {/* Secondary line — alternative CTA, mirrors MyAgentShowcase footer */}
      <div className="relative z-10 mt-4">
        <Link
          to="/services"
          className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          Or jump straight to deployment →
        </Link>
      </div>
    </section>
  );
};

export default AdvisorySection;
