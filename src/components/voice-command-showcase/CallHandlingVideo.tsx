// CallHandlingVideo — verbatim port of the inline component from
// my-agent-ai/src/pages/MyLifeHero.tsx (lines 109-307). HTML5 video with
// burned-in caption overlay, tap-to-unmute affordance, prefers-reduced-motion
// handling, and a per-frame onTimeUpdate emitter to drive the synced phone demo.
import { useEffect, useRef, useState } from "react";

const CALL_HANDLING_VIDEO =
  "https://get-myagent.com/videos/cinematic/listen-live-coach-v5.mp4";
const CALL_HANDLING_CAPTIONS =
  "https://get-myagent.com/videos/cinematic/captions/listen-live-coach-v5.vtt";

export const CallHandlingVideo = ({
  onTimeUpdate,
}: {
  onTimeUpdate?: (timeMs: number) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [caption, setCaption] = useState<string>("");
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion && videoRef.current && !videoRef.current.paused) {
      try {
        videoRef.current.pause();
      } catch {
        /* no-op */
      }
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!onTimeUpdate) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    type VideoWithRVFC = HTMLVideoElement & {
      requestVideoFrameCallback?: (
        cb: (now: number, meta: { mediaTime: number }) => void
      ) => number;
    };
    const v = video as VideoWithRVFC;

    if (typeof v.requestVideoFrameCallback === "function") {
      const loop = (_now: number, meta: { mediaTime: number }) => {
        if (cancelled) return;
        onTimeUpdate(meta.mediaTime * 1000);
        v.requestVideoFrameCallback!(loop);
      };
      v.requestVideoFrameCallback(loop);
      return () => {
        cancelled = true;
      };
    }

    const onTU = () => onTimeUpdate(video.currentTime * 1000);
    video.addEventListener("timeupdate", onTU);
    return () => video.removeEventListener("timeupdate", onTU);
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let track: TextTrack | null = null;
    let cuechangeHandler: (() => void) | null = null;

    const attach = () => {
      if (video.textTracks.length === 0) return false;
      track = video.textTracks[0];
      track.mode = "hidden";
      cuechangeHandler = () => {
        if (!track || !track.activeCues || track.activeCues.length === 0) {
          setCaption("");
          return;
        }
        const text = Array.from(track.activeCues)
          .map((c) => {
            const cue = c as VTTCue;
            return cue.text.replace(/\n/g, " ").trim();
          })
          .join(" ");
        setCaption(text);
      };
      track.addEventListener("cuechange", cuechangeHandler);
      return true;
    };

    if (!attach()) {
      const onMeta = () => {
        attach();
      };
      video.addEventListener("loadedmetadata", onMeta);
      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        if (track && cuechangeHandler) track.removeEventListener("cuechange", cuechangeHandler);
      };
    }

    return () => {
      if (track && cuechangeHandler) track.removeEventListener("cuechange", cuechangeHandler);
    };
  }, []);

  const handleUnmuteToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
    if (!next && v.paused) {
      v.play().catch(() => {});
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={CALL_HANDLING_VIDEO}
        autoPlay={!reducedMotion}
        muted={muted}
        loop={!reducedMotion}
        playsInline
        controls={reducedMotion}
        crossOrigin="anonymous"
        aria-label="Product demo: AI agent handling a real-estate call while the owner listens in and coaches the agent"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* kind="metadata" prevents Safari from rendering native
            captions on top of our custom overlay below. cuechange
            events still fire so our overlay works the same. */}
        <track
          kind="metadata"
          src={CALL_HANDLING_CAPTIONS}
          srcLang="en"
          label="English"
        />
      </video>

      {!reducedMotion && (
        <button
          type="button"
          onClick={handleUnmuteToggle}
          aria-label={muted ? "Unmute video audio" : "Mute video audio"}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white transition-colors border border-white/10"
        >
          {muted ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span>Tap to hear</span>
            </>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}

      {caption && !reducedMotion && (
        <div
          className="absolute inset-x-0 bottom-6 flex justify-center px-4 pointer-events-none"
          aria-hidden="true"
        >
          <div className="max-w-[90%] rounded-xl bg-black/80 backdrop-blur-sm px-4 py-2 text-center">
            <p className="text-sm md:text-base font-medium text-white leading-snug">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CallHandlingVideo;
