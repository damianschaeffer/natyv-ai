import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Phone,
  Headphones,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceCommandShowcase } from "@/components/voice-command-showcase/VoiceCommandShowcase";
import { CallHandlingShowcase } from "@/components/voice-command-showcase/CallHandlingShowcase";
import AutopilotDashboardDemo from "@/components/voice-command-showcase/AutopilotDashboardDemo";
import { WebsiteWidgetShowcase, WidgetTypewriterSub } from "@/components/voice-command-showcase/WebsiteWidgetShowcase";
import { MyAgentLockup } from "@/components/brand/MyAgentLogo";
import SectionHeader from "@/components/SectionHeader";

// Faithful port of get-myagent.com's hero — using the actual <h1>/pill/video
// markup from src/pages/MyLifeHero.tsx, the actual TrustBadgesPill markup,
// and the canonical MyAgent brand lockup from
// `src/components/brand/MyAgentLogo.tsx`. Every interactive element opens
// https://get-myagent.com in a new tab so the visitor's natyv.ai
// navigation stays alive.

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
const WIDGET_SECTION_SCROLL_OFFSET = 72;

// Umbrella headline — MyAgent's canonical brand promise from get-myagent.com
const UMBRELLA_PRE = "Your life.";
const UMBRELLA_POST = "Your way.";

// Voice-commands 3-pack — verbatim from MyAgent.com "Live your life. Skip the rest."
const VOICE_SCENES = [
  {
    videoSrc:
      "https://get-myagent.com/videos/cinematic/airpods-walk-and-dictate-fast-2026-04-17T17-51-00-797Z.mp4",
    captionsSrc:
      "https://get-myagent.com/videos/cinematic/captions/airpods-walk-and-dictate.vtt",
    dashboardScene: "calendar-add" as const,
  },
  {
    videoSrc:
      "https://get-myagent.com/videos/cinematic/email-draft-reply-fast-2026-04-17T20-16-55-476Z.mp4",
    captionsSrc:
      "https://get-myagent.com/videos/cinematic/captions/email-draft-reply.vtt",
    dashboardScene: "email-draft" as const,
  },
  {
    videoSrc:
      "https://get-myagent.com/videos/cinematic/doc-to-phone-v2-standard-2026-04-21T10-44-54-766Z.mp4",
    captionsSrc:
      "https://get-myagent.com/videos/cinematic/captions/doc-to-phone.vtt",
    dashboardScene: "doc-to-phone" as const,
  },
];

// Call-handling section rotating subtitle — verbatim from MyAgent.com
const CALL_CONTROL_PHRASES = [
  "Answers every call, anytime, anywhere.",
  "Full transparency, full control.",
];

// Voice-commands section rotating subtitle — visual consistency with the
// other sub-sections on natyv.ai (matches the rotating-sub pattern used by
// "Full control. Zero effort." and "Your website. Always on.")
const VOICE_COMMANDS_PHRASES = [
  "Dictate on the go. Your agent handles the rest.",
  "Voice in. Real work out.",
];

const MyAgentShowcase = () => {
  const [callPhraseIdx, setCallPhraseIdx] = useState(0);
  const [voicePhraseIdx, setVoicePhraseIdx] = useState(0);
  const widgetSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallPhraseIdx((prev) => (prev + 1) % CALL_CONTROL_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVoicePhraseIdx((prev) => (prev + 1) % VOICE_COMMANDS_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    return () => {
      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  const alignWidgetSection = (behavior: ScrollBehavior = "auto") => {
    const section = widgetSectionRef.current;
    if (!section) return;
    const target = section.getBoundingClientRect().top + window.scrollY - WIDGET_SECTION_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, Math.round(target)), behavior });
  };

  useEffect(() => {
    let timeoutId: number | null = null;

    const queueWidgetAlignment = () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const section = widgetSectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const targetZoneBottom = Math.min(window.innerHeight * 0.78, 680);
        const alreadyAligned = Math.abs(rect.top - WIDGET_SECTION_SCROLL_OFFSET) < 10;
        const closeEnoughToWidget = rect.top > -80 && rect.top < targetZoneBottom;
        if (!alreadyAligned && closeEnoughToWidget) {
          alignWidgetSection("auto");
        }
      }, 160);
    };

    window.addEventListener("scroll", queueWidgetAlignment, { passive: true });
    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", queueWidgetAlignment);
    };
  }, []);

  return (
    <section
      id="myagent-section"
      className="relative border-t border-border/40"
    >
      {/* Ambient glow — spans the full Studio section as one continuous
          atmosphere across all the scroll-stop subsections below. */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[150px]" />

      {/* ──────────────────────────────────────────────────────────
          INTRO LANDING — compact mini-transition page. Studio pill
          attached directly above the MyAgent lockup, no "presents"
          connector. Reads as a brief brand stamp before the four
          showcase scroll-stops below. */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center px-2 sm:px-6 pt-20 md:pt-24 pb-10">
        <div className="flex-1 flex flex-col items-center justify-center w-full gap-3 md:gap-4">
          {/* Section entrance — small subtle pill matching the
              /services-page treatment for visual unification.
              Sits tight above the MyAgent lockup. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <span
              className="inline-block px-4 py-1.5 text-primary border border-primary/30 rounded-full font-accent uppercase"
              style={{
                fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
                letterSpacing: "0.18em",
                fontWeight: 500,
              }}
            >
              Studio
            </span>
          </motion.div>

          {/* MyAgent BrandLogo — anchors the intro */}
          <motion.a
            href={MYAGENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative z-10 group inline-flex flex-col items-center"
            aria-label="Visit MyAgent (opens in a new tab)"
          >
            <span className="group-hover:scale-[1.03] transition-transform inline-flex items-start gap-2">
              <MyAgentLockup height="clamp(2.25rem, 5.5vw, 4.25rem)" />
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 mt-1 text-muted-foreground/60 group-hover:text-foreground transition-colors flex-shrink-0" aria-hidden="true" />
            </span>
          </motion.a>

          {/* Pills — sit below the MyAgent logo with breathing room above */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative z-10 text-center max-w-5xl mx-auto mt-4 md:mt-6"
          >
            <div className="grid grid-cols-2 justify-items-center sm:flex sm:flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:gap-1.5 max-w-5xl mx-auto">
              {PILLS.map((p, i) => (
                <a
                  key={p.label}
                  href={MYAGENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-md px-2.5 py-2 sm:px-3 sm:py-1 min-h-[44px] sm:min-h-0 hover:bg-background/60 hover:border-primary/40 transition-colors${i === 4 ? " col-span-2" : ""}`}
                >
                  <p.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                  <span className="text-sm sm:text-base font-semibold text-foreground/90 whitespace-nowrap">
                    {p.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — subtle "see all the ways MyAgent can
            empower you" hint that prepares the eye for the next
            scroll-stop section below. Mirrors the get-myagent.com
            scroll cue. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative z-10 flex flex-col items-center gap-2 mt-10 text-muted-foreground/60"
          aria-hidden="true"
        >
          <span className="text-[10px] md:text-xs font-accent uppercase tracking-[0.3em]">
            See how MyAgent works
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
          </motion.span>
        </motion.div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SHOWCASE 1 — its own scroll-stop. "Your calls. Always answered." */}
      <div className="relative min-h-screen flex flex-col items-center justify-start px-2 sm:px-6 pt-4 md:pt-6 pb-6 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-[920px] mx-auto"
      >
        <div className="text-center mb-3 md:mb-4 px-4">
          <h3
            className="font-poppins font-bold tracking-tight text-foreground !leading-[1.14]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Your calls.{" "}
            <span className="text-primary inline-block whitespace-nowrap">Always answered.</span>
          </h3>
          <div className="mt-3 md:mt-4 min-h-[1.75em] text-base md:text-lg text-muted-foreground font-body max-w-xl mx-auto" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={callPhraseIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-block"
              >
                {CALL_CONTROL_PHRASES[callPhraseIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          {/* Take over · Listen live · Coach pills — verbatim from MyAgent.com */}
          <ul
            aria-label="Key controls you always have"
            className="mt-3 flex flex-wrap justify-center gap-1 sm:gap-1.5"
          >
            <li className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="text-sm sm:text-base font-semibold text-foreground/90 whitespace-nowrap">Take over</span>
            </li>
            <li className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="text-sm sm:text-base font-semibold text-foreground/90 whitespace-nowrap">Listen live</span>
            </li>
            <li className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="text-sm sm:text-base font-semibold text-foreground/90 whitespace-nowrap">Coach</span>
            </li>
          </ul>
        </div>
        <CallHandlingShowcase />
      </motion.div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SHOWCASE 2 — its own scroll-stop. "Just ask. MyAgent handles it." */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <div className="text-center mb-8 md:mb-10 px-4">
          <h3
            className="font-poppins font-bold tracking-tight text-foreground !leading-[1.14]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Say the word.{" "}
            <span className="text-primary inline-block whitespace-nowrap">Work gets done.</span>
          </h3>
          <div className="mt-3 md:mt-4 min-h-[1.75em] text-base md:text-lg text-muted-foreground font-body max-w-xl mx-auto" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={voicePhraseIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-block"
              >
                {VOICE_COMMANDS_PHRASES[voicePhraseIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {VOICE_SCENES.map((scene, i) => (
            <VoiceCommandShowcase
              key={i}
              videoSrc={scene.videoSrc}
              dashboardScene={scene.dashboardScene}
              captionsSrc={scene.captionsSrc}
            />
          ))}
        </div>
      </motion.div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SHOWCASE 3 — its own scroll-stop. "Your Life. One Dashboard" */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <div className="text-center mb-6 md:mb-8 px-4">
          <h3
            className="font-poppins font-bold tracking-tight text-foreground !leading-[1.14] mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Your Life.{" "}
            <span className="text-primary inline-block whitespace-nowrap">One Dashboard</span>
          </h3>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-snug max-w-2xl mx-auto">
            Your dashboard builds &amp; organizes itself as your agent does the work.
          </p>
        </div>
        <AutopilotDashboardDemo />
      </motion.div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SHOWCASE 4 — its own scroll-stop. "Your website. Always on." */}
      <div ref={widgetSectionRef} className="relative min-h-screen flex flex-col items-center justify-start px-2 sm:px-6 pt-4 md:pt-6 pb-6 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-[920px] mx-auto"
      >
        <div className="text-center mb-3 md:mb-4 px-4">
          <h3
            className="font-poppins font-bold tracking-tight text-foreground !leading-[1.14]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Your website.{" "}
            <span className="text-primary inline-block whitespace-nowrap">Always on.</span>
          </h3>
          <WidgetTypewriterSub />
        </div>
        <WebsiteWidgetShowcase />
      </motion.div>

      {/* Demo + Start Free Trial buttons — same chrome as StickyFooterCTA */}
      <div className="relative z-10 flex justify-center gap-2 sm:gap-3 mt-4 md:mt-5 w-full">
        <a href={MYAGENT_URL} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="h-8 sm:h-10 px-3 sm:px-5 text-xs sm:text-sm font-poppins font-semibold rounded-full shadow-lg backdrop-blur-md bg-background/80 border-border/50 hover:bg-background/90 transition-all"
          >
            <Play className="w-3.5 h-3.5 mr-1.5 fill-current" aria-hidden="true" />
            Demo
          </Button>
        </a>
        <a href={MYAGENT_URL} target="_blank" rel="noopener noreferrer">
          <Button
            className="h-8 sm:h-10 px-3 sm:px-5 text-xs sm:text-sm font-poppins font-semibold rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
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
      </div>

    </section>
  );
};

export default MyAgentShowcase;
