import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Network,
  Sparkles,
  Heart,
  Brain,
  Zap,
  Gift,
  Clock,
  CreditCard,
  CheckCircle2,
  Shield,
  Lock,
  Play,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mirror of get-myagent.com's hero, rendered natively on natyv.ai.
// Every interactive element opens get-myagent.com in a new tab so
// the visitor's natyv.ai navigation stays alive.

const pills = [
  { icon: Network, label: "One ecosystem" },
  { icon: Sparkles, label: "Customized for you" },
  { icon: Heart, label: "Feels human" },
  { icon: Brain, label: "Learns your life" },
  { icon: Zap, label: "Handles real work" },
];

const trustBadges = [
  { icon: Gift, label: "No Setup Fees" },
  { icon: Clock, label: "14-Day Free Trial" },
  { icon: CreditCard, label: "No Credit Card" },
  { icon: CheckCircle2, label: "Cancel Anytime" },
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Lock, label: "Data Stays Yours" },
];

const MYAGENT_URL = "https://get-myagent.com";
const MYAGENT_VIDEO = "https://get-myagent.com/videos/sophia-intro.mp4";

const MyAgentShowcase = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovering, setHovering] = useState(false);

  return (
    <section
      id="myagent-section"
      className="relative py-24 md:py-32 overflow-hidden border-t border-border/40"
    >
      {/* Embedded-preview ribbon */}
      <div className="container mx-auto px-6 relative z-10 mb-8">
        <div className="flex justify-center">
          <a
            href={MYAGENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>Embedded preview · click anywhere to explore MyAgent</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* MyAgent wordmark — clickable */}
          <a
            href={MYAGENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-10 group"
            aria-label="Visit MyAgent"
          >
            <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="font-body font-extrabold tracking-tight text-2xl md:text-3xl leading-none">
              <span className="text-primary">My</span><span className="text-foreground">Agent</span>
            </span>
          </a>

          {/* Headline */}
          <h2 className="font-body font-extrabold tracking-tight text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.05]">
            Your life.{" "}
            <span className="text-primary">Your way.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-10 max-w-3xl mx-auto">
            Ever feel like AI doesn't work for you?{" "}
            <span className="text-primary font-semibold">We fixed that.</span>
          </p>

          {/* Pill nav */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
            {pills.map((pill) => (
              <a
                key={pill.label}
                href={MYAGENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-primary/40 transition-colors duration-200"
              >
                <pill.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-body font-medium text-foreground whitespace-nowrap">
                  {pill.label}
                </span>
              </a>
            ))}
          </div>

          {/* Video player — autoplay loop, click to open MyAgent in new tab */}
          <a
            href={MYAGENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block group rounded-2xl overflow-hidden border border-border/60 bg-card/30 backdrop-blur-sm mb-10 max-w-4xl mx-auto"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            aria-label="Watch MyAgent in action — opens get-myagent.com in a new tab"
          >
            <video
              ref={videoRef}
              src={MYAGENT_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full aspect-video object-cover"
              aria-hidden="true"
            />
            {/* Hover overlay with click affordance */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                hovering ? "bg-background/40 opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm shadow-2xl">
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Open MyAgent</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
          </a>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-10">
            <a href={MYAGENT_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="font-body font-semibold border-border bg-card/40 hover:bg-card/60 px-8 py-3 text-base rounded-full"
              >
                <Play className="mr-2 w-4 h-4 fill-current" aria-hidden="true" />
                Demo
              </Button>
            </a>
            <a href={MYAGENT_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base rounded-full"
              >
                <Sparkles className="mr-2 w-4 h-4" aria-hidden="true" />
                Start Free Trial
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-muted-foreground/80 font-body">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="inline-flex items-center gap-1.5">
                <badge.icon className="w-3.5 h-3.5 text-primary/70" aria-hidden="true" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Secondary line — agency option */}
          <div className="mt-10">
            <a
              href="/advisory"
              className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Or have us install &amp; run it for you →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyAgentShowcase;
