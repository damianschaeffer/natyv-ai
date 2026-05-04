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
  CheckCircle,
  ShieldCheck,
  Lock,
  Play,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Faithful port of get-myagent.com's hero — using the actual <h1>/pill/video
// markup from src/pages/MyLifeHero.tsx, the actual TrustBadgesPill markup,
// and a static (non-rotating) port of the BrandLogo component. Every
// interactive element opens https://get-myagent.com in a new tab so the
// visitor's natyv.ai navigation stays alive.

// MyAgent BrandLogo, dark-mode only (natyv.ai is permanently dark). Source:
// my-agent-ai/src/components/BrandLogo.tsx — rounded square in primary blue
// with a 4-point North Star + "MyAgent" wordmark in Poppins 700.
const NORTH_STAR_PATH =
  "M100 34 Q108 88 166 100 Q108 112 100 166 Q92 112 34 100 Q92 88 100 34Z";

const MyAgentBrandLogo = ({ height = 32 }: { height?: number }) => {
  const iconSize = Math.round(height * 0.8);
  const borderRadius = Math.round(height * 0.227);
  return (
    <span
      role="img"
      aria-label="MyAgent"
      style={{
        display: "inline-flex",
        alignItems: "center",
        height,
        gap: `${Math.round(height * 0.25)}px`,
      }}
    >
      <span
        style={{
          width: height,
          height,
          borderRadius,
          background: "hsl(var(--primary))",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="24 24 152 152">
          <path d={NORTH_STAR_PATH} fill="#ffffff" />
        </svg>
      </span>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: height,
          lineHeight: 1,
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
        }}
      >
        <span style={{ color: "hsl(var(--primary))" }}>My</span>
        <span style={{ color: "#ffffff" }}>Agent</span>
      </span>
    </span>
  );
};

const PILLS = [
  { Icon: Network, label: "One ecosystem" },
  { Icon: Sparkles, label: "Customized for you" },
  { Icon: Heart, label: "Feels human" },
  { Icon: Brain, label: "Learns your life" },
  { Icon: Zap, label: "Handles real work" },
];

const TRUST_BADGES = [
  { icon: Gift, label: "No Setup Fees" },
  { icon: Clock, label: "14-Day Free Trial" },
  { icon: CreditCard, label: "No Credit Card" },
  { icon: CheckCircle, label: "Cancel Anytime" },
  { icon: ShieldCheck, label: "SOC 2 Compliant" },
  { icon: Lock, label: "Data Stays Yours" },
];

const MYAGENT_URL = "https://get-myagent.com";
const HERO_VIDEO =
  "https://get-myagent.com/videos/cinematic/salon-hero-fast-2026-04-17T14-53-47-171Z.mp4";

const MyAgentShowcase = () => {
  return (
    <section
      id="myagent-section"
      className="relative flex flex-col items-center justify-center px-2 sm:px-6 pt-8 md:pt-10 pb-6 border-t border-border/40"
    >
      {/* Ambient glow — same vibe as the source */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[150px] pointer-events-none" />

      {/* MyAgent BrandLogo — large, takes the position the headline used to occupy */}
      <motion.a
        href={MYAGENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 mb-8 md:mb-10 group inline-flex items-center gap-3"
        aria-label="Visit MyAgent (opens in a new tab)"
      >
        <span className="group-hover:scale-[1.03] transition-transform inline-flex">
          <span className="md:hidden inline-flex"><MyAgentBrandLogo height={56} /></span>
          <span className="hidden md:inline-flex lg:hidden"><MyAgentBrandLogo height={84} /></span>
          <span className="hidden lg:inline-flex"><MyAgentBrandLogo height={104} /></span>
        </span>
        <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/60 group-hover:text-foreground transition-colors" aria-hidden="true" />
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {/* Pills — exact markup from MyLifeHero.tsx */}
        <div className="grid grid-cols-2 justify-items-center sm:flex sm:flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:gap-1.5 max-w-5xl mx-auto mb-4">
          {PILLS.map((p, i) => (
            <a
              key={p.label}
              href={MYAGENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 hover:bg-background/60 hover:border-primary/40 transition-colors${i === 4 ? " col-span-2" : ""}`}
            >
              <p.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="text-sm sm:text-base font-semibold text-foreground/90 whitespace-nowrap">
                {p.label}
              </span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Hero video — exact framing from MyLifeHero.tsx */}
      <motion.a
        href={MYAGENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto block group"
        aria-label="Watch MyAgent — opens get-myagent.com in a new tab"
      >
        <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-2xl shadow-black/80">
          <div className="relative aspect-video bg-gradient-to-br from-[#0a0a0a] to-[#111]">
            <video
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            {/* Vignette over video so headline overlay reads */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Hover affordance */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-background/30">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-poppins font-semibold text-sm shadow-2xl">
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Open MyAgent</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </motion.a>

      {/* Demo + Start Free Trial buttons — same chrome as StickyFooterCTA */}
      <div className="relative z-10 flex justify-center gap-2 sm:gap-3 mt-4">
        <a href={MYAGENT_URL} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm font-poppins font-semibold rounded-full shadow-lg backdrop-blur-md bg-background/80 border-border/50 hover:bg-background/90 transition-all"
          >
            <Play className="w-3.5 h-3.5 mr-1.5 fill-current" aria-hidden="true" />
            Demo
          </Button>
        </a>
        <a href={MYAGENT_URL} target="_blank" rel="noopener noreferrer">
          <Button
            className="h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm font-poppins font-semibold rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
            Start Free Trial
          </Button>
        </a>
      </div>

      {/* Trust badges — exact markup from TrustBadgesPill.tsx */}
      <div className="relative z-10 mt-3 grid grid-cols-3 md:flex items-center justify-center gap-x-2 gap-y-1 md:gap-4 lg:gap-5 rounded-xl md:rounded-full bg-background/80 backdrop-blur-md border border-border/50 px-3 py-1.5 md:px-5 md:py-2 shadow-lg w-full max-w-[min(100%,920px)] mx-auto">
        {TRUST_BADGES.map((b) => (
          <div
            key={b.label}
            className="flex items-center justify-center gap-1 md:gap-1.5 text-[10px] md:text-xs font-medium text-muted-foreground"
          >
            <b.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
            <span className="whitespace-nowrap">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Secondary line — agency option */}
      <div className="relative z-10 mt-4">
        <a
          href="/advisory"
          className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          Or have us install &amp; run it for you →
        </a>
      </div>
    </section>
  );
};

export default MyAgentShowcase;
