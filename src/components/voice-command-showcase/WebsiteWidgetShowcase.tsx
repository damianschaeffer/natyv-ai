// WebsiteWidgetShowcase — verbatim port of the "Your website. Always on."
// section markup from my-agent-ai/src/pages/MyLifeHero.tsx (lines 909-996).
// Embeds the actual MyAgent live widget demo at get-myagent.com/demo-embed
// inside a browser-frame chrome, with hover affordance that opens a real
// MyAgent chat in a new tab. PhraseRotator + WidgetTypewriterSub inlined.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";

const WIDGET_PHRASES = [
  "Pre-trained on your business.",
  "Configured to sound like you.",
  "Ready to talk to your customers.",
  "Listens. Responds. Remembers.",
];

const DEMO_EMBED_URL = "https://get-myagent.com/demo-embed?theme=light";
const SOPHIA_CHAT_URL = "https://get-myagent.com/chat/b516aaab-99d8-457e-b2f4-ceef92222211";

const PhraseRotator = ({
  phrases,
  intervalMs = 3000,
  className = "",
}: {
  phrases: string[];
  intervalMs?: number;
  className?: string;
}) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), intervalMs);
    return () => clearInterval(t);
  }, [phrases.length, intervalMs]);
  return (
    <div className={`min-h-[1.75em] leading-relaxed ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="inline-block"
        >
          {phrases[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const WidgetTypewriterSub = () => (
  <PhraseRotator
    phrases={WIDGET_PHRASES}
    className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto"
  />
);

export const WebsiteWidgetShowcase = () => {
  const [demoHovered, setDemoHovered] = useState(false);

  const openSophiaChat = () => {
    window.open(SOPHIA_CHAT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile: CSS-scaled 3-panel view */}
      <div className="sm:hidden relative overflow-hidden" style={{ height: 385 }}>
        <div
          style={{
            transform: "scale(0.50)",
            transformOrigin: "top left",
            width: "200%",
            pointerEvents: "none",
          }}
        >
          <div className="relative rounded-xl bg-white border border-zinc-300 shadow-2xl shadow-black/60 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 border-b border-zinc-200">
              <div className="flex gap-1" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-6">
                <div className="mx-auto max-w-md h-6 rounded-md bg-white border border-zinc-300 shadow-sm flex items-center justify-center gap-1.5 px-2.5">
                  <Lock className="w-3 h-3 text-zinc-500 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-zinc-700">yourbusiness.com</span>
                </div>
              </div>
            </div>
            <iframe
              src={DEMO_EMBED_URL}
              title="MyAgent live widget demo — full 3-panel view"
              loading="lazy"
              style={{
                width: "100%",
                height: 740,
                border: "none",
                display: "block",
                background: "#ffffff",
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop: interactive browser chrome with hover-to-chat affordance */}
      <div
        className="hidden sm:block relative"
        onMouseEnter={() => setDemoHovered(true)}
        onMouseLeave={() => setDemoHovered(false)}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative rounded-xl bg-white border border-zinc-300 shadow-2xl shadow-black/60 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 border-b border-zinc-200">
            <div className="flex gap-1" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 mx-3 md:mx-6">
              <div className="mx-auto max-w-md h-6 rounded-md bg-white border border-zinc-300 shadow-sm flex items-center justify-center gap-1.5 px-2.5">
                <Lock className="w-3 h-3 text-zinc-500 flex-shrink-0" strokeWidth={2.5} />
                <span className="text-xs md:text-sm font-medium text-zinc-700">yourbusiness.com</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <iframe
              src={DEMO_EMBED_URL}
              title="MyAgent live widget demo — Sophia taking a real call"
              loading="lazy"
              style={{
                width: "100%",
                height: "clamp(300px, 62vh, 680px)",
                border: "none",
                display: "block",
                background: "#ffffff",
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 cursor-pointer"
              style={{
                opacity: demoHovered ? 1 : 0,
                backgroundColor: "rgba(0,0,0,0.35)",
                pointerEvents: demoHovered ? "auto" : "none",
              }}
              onClick={openSophiaChat}
            >
              <button
                type="button"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white shadow-2xl transition-transform duration-150 hover:scale-105 active:scale-95 text-base"
                style={{
                  backgroundColor: "#2563EB",
                  boxShadow: "0 0 40px #2563EB80",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  openSophiaChat();
                }}
              >
                Speak with Sophia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteWidgetShowcase;
