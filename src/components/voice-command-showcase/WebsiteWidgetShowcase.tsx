// WebsiteWidgetShowcase — public Natyv website widget embedded in browser chrome.
// The iframe points at the ownerless public Ava concierge, not a user-owned agent.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, PauseCircle, Volume2 } from "lucide-react";
import { useNearViewport } from "@/hooks/use-near-viewport";

const WIDGET_PHRASES = [
  "Pre-trained on your business.",
  "Configured to sound like you.",
  "Ready to talk to your customers.",
  "Listens. Responds. Remembers.",
];

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
  const { ref: showcaseRef, hasEnteredViewport } = useNearViewport<HTMLDivElement>("320px 0px");
  const [isDarkTheme, setIsDarkTheme] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [demoListening, setDemoListening] = useState(false);
  const [mobileFrame, setMobileFrame] = useState<HTMLIFrameElement | null>(null);
  const [desktopFrame, setDesktopFrame] = useState<HTMLIFrameElement | null>(null);
  const demoEmbedUrl = `https://get-myagent.com/demo-embed?theme=${isDarkTheme ? "dark" : "light"}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const isKnownFrame =
        event.source === mobileFrame?.contentWindow ||
        event.source === desktopFrame?.contentWindow;
      if (!isKnownFrame) return;

      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type === "demo-embed-audio-state") {
        setDemoListening(Boolean(data.isPlaying || data.isLoading));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [desktopFrame, mobileFrame]);

  const toggleDemoAudio = () => {
    const activeFrame = window.innerWidth >= 640 ? desktopFrame : mobileFrame;
    activeFrame?.contentWindow?.postMessage({ type: "demo-embed-toggle-audio" }, new URL(demoEmbedUrl).origin);
  };

  const shouldLoadMobileFrame = hasEnteredViewport && isMobileViewport;
  const shouldLoadDesktopFrame = hasEnteredViewport && !isMobileViewport;

  return (
    <div ref={showcaseRef} className="w-full max-w-[700px] mx-auto">
      {/* Mobile: native one-panel widget */}
      <div className="sm:hidden relative overflow-hidden">
        <div>
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
              <button
                type="button"
                onClick={toggleDemoAudio}
                className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50"
              >
                {demoListening ? <PauseCircle className="h-3.5 w-3.5 text-primary" /> : <Volume2 className="h-3.5 w-3.5 text-primary" />}
                {demoListening ? "Pause" : "Listen"}
              </button>
            </div>
            {shouldLoadMobileFrame ? (
              <iframe
                ref={setMobileFrame}
                src={demoEmbedUrl}
                title="Natyv AI one-panel live widget demo"
                loading="lazy"
                allow="microphone; autoplay"
                style={{
                  width: "100%",
                  height: 560,
                  border: "none",
                  display: "block",
                  background: isDarkTheme ? "#050505" : "#ffffff",
                }}
              />
            ) : (
              <DemoPlaceholder height={560} isDarkTheme={isDarkTheme} />
            )}
          </div>
        </div>
      </div>

      {/* Desktop: interactive browser chrome */}
      <div className="hidden sm:block relative">
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
            <button
              type="button"
              onClick={toggleDemoAudio}
              className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 md:text-xs"
            >
              {demoListening ? <PauseCircle className="h-3.5 w-3.5 text-primary" /> : <Volume2 className="h-3.5 w-3.5 text-primary" />}
              {demoListening ? "Pause" : "Listen"}
            </button>
          </div>
          <div className="relative">
            {shouldLoadDesktopFrame ? (
              <iframe
                ref={setDesktopFrame}
                src={demoEmbedUrl}
                title="Natyv AI one-panel live widget demo"
                loading="lazy"
                allow="microphone; autoplay"
                style={{
                  width: "100%",
                  height: "clamp(470px, 58vh, 560px)",
                  border: "none",
                  display: "block",
                  background: isDarkTheme ? "#050505" : "#ffffff",
                }}
              />
            ) : (
              <DemoPlaceholder height="clamp(470px, 58vh, 560px)" isDarkTheme={isDarkTheme} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function DemoPlaceholder({
  height,
  isDarkTheme,
}: {
  height: number | string;
  isDarkTheme: boolean;
}) {
  return (
    <div
      role="img"
      aria-label="Interactive demo loads when visible"
      className="flex items-center justify-center px-6 text-center text-sm text-zinc-500"
      style={{
        width: "100%",
        height,
        background: isDarkTheme
          ? "radial-gradient(circle at 50% 35%, rgba(16,119,250,0.16), #050505 58%)"
          : "linear-gradient(135deg, #f8fafc, #eef2f7)",
      }}
    >
      Interactive demo loads as you reach it.
    </div>
  );
}

export default WebsiteWidgetShowcase;
