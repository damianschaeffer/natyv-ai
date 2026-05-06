// <CinematicClip> — HTML5 video + brand-styled subtitle overlay.
// Verbatim port of my-agent-ai/src/components/voice-command-showcase/CinematicClip.tsx.
// Parses WebVTT on mount, renders active cue in a blurred caption pill.
// Emits timelinePosition (0-1) via onProgress so parent scenes can sync.
import { useEffect, useRef, useState } from "react";

export interface VttCue {
  start: number;
  end: number;
  text: string;
}

export interface CinematicClipProps {
  src?: string;
  captionsSrc?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showSubtitles?: boolean;
  aspectRatio?: "16:9" | "9:16";
  onProgress?: (timelinePosition: number) => void;
  onEnded?: () => void;
  placeholderLabel?: string;
  placeholderLoopSeconds?: number;
}

const MUTED_ALPHA = "rgba(0, 0, 0, 0.65)";

export function CinematicClip({
  src,
  captionsSrc,
  autoPlay = true,
  muted = true,
  loop = true,
  showSubtitles = true,
  aspectRatio = "16:9",
  onProgress,
  onEnded,
  placeholderLabel,
  placeholderLoopSeconds = 6,
}: CinematicClipProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cues, setCues] = useState<VttCue[]>([]);
  const [activeCue, setActiveCue] = useState<string>("");
  const hasSrc = !!src && src.length > 0;

  useEffect(() => {
    if (!captionsSrc || !showSubtitles) {
      setCues([]);
      return;
    }
    let cancelled = false;
    fetch(captionsSrc)
      .then((r) => (r.ok ? r.text() : ""))
      .then((text) => {
        if (cancelled) return;
        setCues(parseVtt(text));
      })
      .catch(() => {
        if (!cancelled) setCues([]);
      });
    return () => {
      cancelled = true;
    };
  }, [captionsSrc, showSubtitles]);

  useEffect(() => {
    if (!hasSrc) {
      const startedAt = performance.now();
      const loopMs = placeholderLoopSeconds * 1000;
      let raf = 0;
      const tick = () => {
        const elapsed = (performance.now() - startedAt) % loopMs;
        const t = elapsed / 1000;
        const normalized = t / placeholderLoopSeconds;
        if (onProgress) onProgress(normalized);
        if (showSubtitles && cues.length > 0) {
          const active = cues.find((c) => t >= c.start && t <= c.end);
          setActiveCue(active ? active.text : "");
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    const vid = videoRef.current;
    if (!vid) return;

    let raf = 0;
    const tick = () => {
      if (!vid.duration || isNaN(vid.duration)) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = vid.currentTime;
      const normalized = vid.duration > 0 ? Math.min(1, Math.max(0, t / vid.duration)) : 0;
      if (onProgress) onProgress(normalized);

      if (showSubtitles && cues.length > 0) {
        const active = cues.find((c) => t >= c.start && t <= c.end);
        setActiveCue(active ? active.text : "");
      } else if (activeCue) {
        setActiveCue("");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cues, showSubtitles, onProgress, hasSrc, placeholderLoopSeconds]);

  const ar = aspectRatio === "9:16" ? "9 / 16" : "16 / 9";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ar,
        background: "#000000",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px",
      }}
    >
      {hasSrc ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          preload="metadata"
          onEnded={onEnded}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      ) : (
        <ClipPlaceholder label={placeholderLabel ?? "Clip pending"} />
      )}

      {showSubtitles && activeCue && (
        <div
          aria-live="polite"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "8%",
            textAlign: "center",
            pointerEvents: "none",
            padding: "0 24px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: MUTED_ALPHA,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#ffffff",
              fontFamily: "Poppins, system-ui, sans-serif",
              fontSize: "clamp(14px, 1.6vw, 20px)",
              fontWeight: 500,
              lineHeight: 1.35,
              borderRadius: 10,
              maxWidth: "85%",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              whiteSpace: "pre-line",
            }}
          >
            {activeCue}
          </span>
        </div>
      )}
    </div>
  );
}

function ClipPlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background:
          "linear-gradient(135deg, #0d0d1e 0%, #161b2e 50%, #0d0d1e 100%)",
        backgroundSize: "200% 200%",
        animation: "cs-placeholder-shimmer 7s ease-in-out infinite",
        color: "rgba(255,255,255,0.72)",
        fontFamily: "Poppins, system-ui, sans-serif",
        textAlign: "center",
        padding: 24,
      }}
    >
      <style>{`
        @keyframes cs-placeholder-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: "#2979FF" }}>
        CINEMATIC CLIP
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, maxWidth: "80%" }}>{label}</div>
    </div>
  );
}

export function parseVtt(text: string): VttCue[] {
  const lines = text.split(/\r?\n/);
  const cues: VttCue[] = [];
  let i = 0;
  if (lines[0]?.startsWith("WEBVTT")) i = 1;

  while (i < lines.length) {
    const line = lines[i]?.trim() ?? "";
    if (!line || line === "WEBVTT") {
      i++;
      continue;
    }
    let timingLine = line;
    if (!line.includes("-->")) {
      i++;
      timingLine = lines[i]?.trim() ?? "";
      if (!timingLine.includes("-->")) {
        continue;
      }
    }
    const m = timingLine.match(/(\d+:\d+:\d+\.\d+|\d+:\d+\.\d+)\s*-->\s*(\d+:\d+:\d+\.\d+|\d+:\d+\.\d+)/);
    if (!m) {
      i++;
      continue;
    }
    const start = parseTs(m[1]);
    const end = parseTs(m[2]);
    i++;
    const textLines: string[] = [];
    while (i < lines.length && lines[i]?.trim() !== "") {
      textLines.push(lines[i]);
      i++;
    }
    cues.push({ start, end, text: textLines.join("\n").trim() });
    i++;
  }
  return cues;
}

function parseTs(s: string): number {
  const parts = s.split(":");
  if (parts.length === 3) {
    return Number(parts[0]) * 3600 + Number(parts[1]) * 60 + Number(parts[2]);
  }
  return Number(parts[0]) * 60 + Number(parts[1]);
}
