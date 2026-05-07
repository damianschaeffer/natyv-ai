import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Mic, PhoneCall, Server, Shield, Layers } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// Static headline — same pattern as Solutions / MyAgent.com section headers
const HEADLINE_PRE = "Best-in-class AI.";
const HEADLINE_POST = "Wired together.";

// Rotating subtitles — splice of MyAgentSection.tsx rotator pattern
const SUBTITLES = [
  "Eight tier-1 vendors. One unified agent.",
  "Production-grade infrastructure. Already integrated.",
  "Anthropic. OpenAI. Google. ElevenLabs. Telnyx. Wired together.",
];

// Supporting pills — same primitive as MyAgentShowcase PILLS row
const PILLS = [
  { Icon: Cpu, label: "LLM-agnostic" },
  { Icon: Mic, label: "Voice + audio" },
  { Icon: PhoneCall, label: "Telephony native" },
  { Icon: Server, label: "Production-grade" },
  { Icon: Shield, label: "SOC 2 ready" },
];

interface Partner {
  name: string;
  logo: string;
  scale?: number;
}

const PARTNERS: Partner[] = [
  { name: "Anthropic", logo: "/logos/anthropic.svg", scale: 0.75 },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Google Gemini", logo: "/logos/google-gemini.svg" },
  { name: "ElevenLabs", logo: "/logos/elevenlabs.svg" },
  { name: "Telnyx", logo: "/logos/telnyx.svg" },
  { name: "Supabase", logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "GoHighLevel", logo: "/logos/gohighlevel.png" },
];

const PartnersSection = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % SUBTITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
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
          Partners
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

      {/* Auto-scrolling partner logo carousel — preserves the alive movement */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-12 animate-scroll">
          {/* First set of logos */}
          {PARTNERS.map((partner) => (
            <div
              key={`first-${partner.name}`}
              className="h-7 opacity-50 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0 flex-shrink-0"
              style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                className="h-full w-auto object-contain filter brightness-0 invert"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {PARTNERS.map((partner) => (
            <div
              key={`second-${partner.name}`}
              className="h-7 opacity-50 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0 flex-shrink-0"
              style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                className="h-full w-auto object-contain filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Secondary line — mirrors MyAgentShowcase footer */}
      <div className="relative z-10 mt-10">
        <a
          href="/advisory"
          className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <Layers className="w-4 h-4 inline-block mr-1.5 -mt-0.5" aria-hidden="true" />
          Curious how we wire it together? Talk to a strategist →
        </a>
      </div>
    </section>
  );
};

export default PartnersSection;
