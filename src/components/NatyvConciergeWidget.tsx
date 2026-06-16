import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";

const NATYV_CONCIERGE_AGENT_ID = "532c323e-e5bd-4ce6-bc94-45875b26bf99";
const NATYV_CONCIERGE_AVATAR =
  "https://mpbiwfisywymkdjlwivg.supabase.co/storage/v1/object/public/space-avatars/e16fc1f0-01eb-4478-8d02-a3bb5979b4a9/eva-natyv-concierge.png";

// Proactive nudge — only on /services, only after the visitor has scrolled
// PAST the offer block (#start-here) AND been on the page a beat. It mirrors
// the MyAgent site's proactive demo agent: Ava offers to help the visitor
// pick a path instead of waiting for a click. Shown at most once per session.
const NUDGE_SESSION_KEY = "natyv_concierge_nudge_seen";
const NUDGE_MIN_DWELL_MS = 8000;

const NatyvConciergeWidget = () => {
  const location = useLocation();
  const isServicesRoute = location.pathname.replace(/\/+$/, "") === "/services";

  const [isDarkTheme, setIsDarkTheme] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );
  const [isOpen, setIsOpen] = useState(false);
  // Default false so prerendered HTML never contains the nudge (SSG-safe).
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const widgetUrl = useMemo(() => {
    const url = new URL(`https://get-myagent.com/chat/${NATYV_CONCIERGE_AGENT_ID}`);
    url.searchParams.set("embed", "true");
    url.searchParams.set("source", "natyv-ai");
    url.searchParams.set("theme", isDarkTheme ? "dark" : "light");
    return url.toString();
  }, [isDarkTheme]);

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

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "myagent-minimize-chat") {
        setIsOpen(false);
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      observer.disconnect();
      window.removeEventListener("message", onMessage);
    };
  }, []);

  // Proactive nudge trigger — scoped to /services, fires only once the
  // offer block is scrolled out of view AND the dwell minimum has passed,
  // and never if the visitor already saw it this session or chat is open.
  useEffect(() => {
    if (!isServicesRoute) {
      setNudgeVisible(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(NUDGE_SESSION_KEY)) return;

    let dwellMet = false;
    let offersOut = false;
    let cancelled = false;

    const maybeShow = () => {
      if (cancelled || dwellMet === false || offersOut === false) return;
      if (window.sessionStorage.getItem(NUDGE_SESSION_KEY)) return;
      setNudgeVisible(true);
    };

    const dwellTimer = window.setTimeout(() => {
      dwellMet = true;
      maybeShow();
    }, NUDGE_MIN_DWELL_MS);

    // Observe the offer section; the nudge may only appear once it has
    // fully left the viewport (so it never competes with an offer CTA).
    const offers = document.getElementById("start-here");
    let observer: IntersectionObserver | null = null;
    if (offers && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // Only flip to "out" after the section has been seen at least once,
          // so a visitor who lands above it isn't nudged before reading it.
          if (entry.isIntersecting) {
            offersOut = false;
          } else if (entry.boundingClientRect.top < 0) {
            offersOut = true;
            maybeShow();
          }
        },
        { threshold: 0 }
      );
      observer.observe(offers);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(dwellTimer);
      observer?.disconnect();
    };
  }, [isServicesRoute]);

  const dismissNudge = () => {
    setNudgeVisible(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(NUDGE_SESSION_KEY, "1");
    }
  };

  const openFromNudge = () => {
    dismissNudge();
    setIsOpen(true);
  };

  const showNudge = nudgeVisible && !isOpen && isServicesRoute;

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="relative h-[calc(100vh-6rem)] max-h-[820px] w-[calc(100vw-1rem)] max-w-[920px] overflow-hidden rounded-[26px] bg-transparent">
          <iframe
            src={widgetUrl}
            title="Natyv AI Concierge"
            className="h-full w-full border-0 bg-transparent"
            allow="microphone; autoplay; clipboard-write"
          />
        </div>
      ) : (
        <div className="flex flex-col items-end gap-3">
          {showNudge && (
            <div className="relative max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-300">
              <button
                type="button"
                onClick={openFromNudge}
                className="flex items-start gap-2.5 rounded-2xl rounded-br-md border border-primary/35 bg-background/95 px-3.5 py-3 text-left shadow-2xl shadow-black/40 backdrop-blur transition hover:border-primary/60"
                aria-label="Ask Ava which step is right for you"
              >
                <img
                  src={NATYV_CONCIERGE_AVATAR}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                />
                <span className="text-[13px] leading-snug text-foreground">
                  Not sure which step is right? I&apos;ll point you in 20 seconds.
                </span>
              </button>
              <button
                type="button"
                onClick={dismissNudge}
                className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-transparent text-white transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Open Natyv AI Concierge"
          >
          <span className="absolute inset-[-5px] rounded-full bg-primary/25 opacity-65 blur-md transition group-hover:opacity-85" />
          <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-background ring-2 ring-primary shadow-xl shadow-primary/25">
            <img
              src={NATYV_CONCIERGE_AVATAR}
              alt="Ava, Natyv AI Concierge"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 transition group-hover:opacity-100">
              <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
          </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NatyvConciergeWidget;
