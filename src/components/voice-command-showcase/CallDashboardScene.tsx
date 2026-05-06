// CallDashboardScene — verbatim port of
// my-agent-ai/src/components/voice-command-showcase/CallDashboardScene.tsx.
// Cinematic-stylized operator panel showing Listen Live + Secret Mode nudge
// composer + live transcript. Pairs with the listen-live-nudge cinematic clip.
import { motion, AnimatePresence } from "framer-motion";

const BRAND_BLUE = "#2979FF";
const INK = "#0d0d1e";
const PANEL = "#12131c";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.5)";
const TEXT = "rgba(255,255,255,0.92)";
const DANGER = "#ef4444";
const SUCCESS = "#22c55e";

type TranscriptLine = {
  at: number;
  role: "caller" | "agent" | "system";
  text: string;
  steered?: boolean;
};

const TRANSCRIPT: TranscriptLine[] = [
  { at: 0.22, role: "agent", text: "She was looking at the two-bedroom on Maple." },
  { at: 0.3, role: "agent", text: "I can check availability for Wednesday or Thursday—" },
  { at: 0.68, role: "caller", text: "Yeah, that'd be great. Thanks so much." },
  {
    at: 0.78,
    role: "agent",
    text: "Oh, one quick thing before we wrap — by the way, would you be able to please supply your email address?",
    steered: true,
  },
];

const LISTEN_AT = 0.17;
const NUDGE_START = 0.38;
const NUDGE_DISPATCH = 0.5;
const NUDGE_DELIVERED = 0.6;

const NUDGE_TEXT = "get her email";

function charReveal(text: string, tp: number, start: number, end: number): string {
  if (tp <= start) return "";
  if (tp >= end) return text;
  const ratio = (tp - start) / (end - start);
  return text.slice(0, Math.max(1, Math.floor(text.length * ratio)));
}

export function CallDashboardScene({ timelinePosition }: { timelinePosition: number }) {
  const tp = Math.max(0, Math.min(1, timelinePosition));
  const listening = tp >= LISTEN_AT;
  const composerText = charReveal(NUDGE_TEXT, tp, NUDGE_START, NUDGE_DISPATCH);
  const dispatched = tp >= NUDGE_DISPATCH;
  const delivered = tp >= NUDGE_DELIVERED;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: INK,
        color: TEXT,
        fontFamily: "Poppins, system-ui, sans-serif",
        padding: 14,
        gap: 10,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `${BRAND_BLUE}22`,
            color: BRAND_BLUE,
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          C
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: TEXT, lineHeight: 1.15 }}>
            Incoming caller
          </div>
          <div style={{ fontSize: 9, color: MUTED, letterSpacing: 0.3 }}>
            MY AGENT · AGENT-ACTIVE · 2:14
          </div>
        </div>
        <LivePulse />
      </div>

      <WaveStrip active={listening} tp={tp} />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: PANEL,
          border: `1px solid ${BORDER}`,
          borderRadius: 10,
          padding: "8px 10px",
          overflow: "hidden",
          opacity: listening ? 1 : 0.45,
          transition: "opacity 0.35s ease",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          position: "relative",
        }}
      >
        {TRANSCRIPT.map((line, i) => (
          <TranscriptRow key={i} line={line} tp={tp} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <ListenLivePill listening={listening} />
        <GhostButton label="Take Over" />
        <GhostButton label="End Call" danger />
      </div>

      <SecretComposer composerText={composerText} dispatched={dispatched} />

      <AnimatePresence>
        {dispatched && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: "absolute",
              right: 14,
              bottom: 70,
              background: delivered ? `${SUCCESS}22` : `${BRAND_BLUE}22`,
              color: delivered ? SUCCESS : BRAND_BLUE,
              border: `1px solid ${delivered ? `${SUCCESS}55` : `${BRAND_BLUE}55`}`,
              borderRadius: 8,
              padding: "4px 9px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.4,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {delivered ? "✓ DELIVERED" : "SENT · to Agent"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LivePulse() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ position: "relative", width: 8, height: 8 }}>
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ position: "absolute", inset: 0, borderRadius: "50%", background: DANGER }}
        />
        <div
          style={{ position: "absolute", inset: 0, borderRadius: "50%", background: DANGER }}
        />
      </div>
      <span style={{ fontSize: 9, color: DANGER, fontWeight: 700, letterSpacing: 0.4 }}>
        LIVE
      </span>
    </div>
  );
}

function WaveStrip({ active, tp }: { active: boolean; tp: number }) {
  const bars = 48;
  return (
    <div
      style={{
        height: 32,
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "0 2px",
        opacity: active ? 1 : 0.35,
        transition: "opacity 0.3s ease",
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const phase = Math.sin((i + tp * 10) * 0.6) * 0.5 + 0.5;
        const h = 4 + phase * 20 * (active ? 1 : 0.4);
        const color = i < bars / 2 ? BRAND_BLUE : SUCCESS;
        return (
          <div
            key={i}
            style={{
              width: "100%",
              height: h,
              background: color,
              opacity: 0.85,
              borderRadius: 1,
              transition: "height 0.12s linear",
            }}
          />
        );
      })}
    </div>
  );
}

function TranscriptRow({ line, tp }: { line: TranscriptLine; tp: number }) {
  const visible = tp >= line.at - 0.06;
  if (!visible) return null;
  const revealWindow = 0.08;
  const reveal = charReveal(line.text, tp, line.at - revealWindow, line.at);
  const shown = tp >= line.at ? line.text : reveal;
  const labelColor = line.role === "caller" ? "#f97316" : line.role === "agent" ? BRAND_BLUE : MUTED;
  const label = line.role === "caller" ? "CALLER" : line.role === "agent" ? "AGENT" : "—";

  return (
    <div style={{ fontSize: 10, lineHeight: 1.45, color: TEXT, display: "flex", gap: 6 }}>
      <span
        style={{
          color: labelColor,
          fontWeight: 700,
          fontSize: 8,
          letterSpacing: 0.5,
          paddingTop: 2,
          flexShrink: 0,
          width: 36,
        }}
      >
        {label}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          position: "relative",
          paddingLeft: line.steered ? 8 : 0,
        }}
      >
        {line.steered && (
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 1,
              bottom: 1,
              width: 2,
              background: BRAND_BLUE,
              borderRadius: 1,
              boxShadow: `0 0 6px ${BRAND_BLUE}aa`,
            }}
          />
        )}
        {shown}
        {shown.length < line.text.length && (
          <span style={{ color: MUTED, marginLeft: 1 }}>▍</span>
        )}
      </span>
    </div>
  );
}

function ListenLivePill({ listening }: { listening: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        padding: "6px 12px",
        borderRadius: 999,
        background: listening ? BRAND_BLUE : PANEL,
        color: listening ? "#ffffff" : TEXT,
        border: `1px solid ${listening ? BRAND_BLUE : BORDER}`,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.3,
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.3s ease",
        boxShadow: listening ? `0 0 0 4px ${BRAND_BLUE}22` : "none",
      }}
    >
      {listening && (
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ffffff",
            display: "inline-block",
          }}
        />
      )}
      LISTEN LIVE {listening ? "· ON" : ""}
    </div>
  );
}

function GhostButton({ label, danger = false }: { label: string; danger?: boolean }) {
  return (
    <div
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        background: PANEL,
        color: danger ? DANGER : MUTED,
        border: `1px solid ${danger ? `${DANGER}55` : BORDER}`,
        fontSize: 10,
        fontWeight: 600,
        opacity: 0.7,
      }}
    >
      {label}
    </div>
  );
}

function SecretComposer({ composerText, dispatched }: { composerText: string; dispatched: boolean }) {
  const empty = composerText.length === 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: PANEL,
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        padding: "8px 10px",
      }}
    >
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: BRAND_BLUE,
          letterSpacing: 0.5,
          flexShrink: 0,
        }}
      >
        SECRET
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 11,
          color: empty ? MUTED : TEXT,
          fontStyle: empty ? "italic" : "normal",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {empty ? "Whisper to the agent…" : composerText}
        {!empty && !dispatched && <span style={{ color: BRAND_BLUE, marginLeft: 1 }}>▍</span>}
      </div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: dispatched ? MUTED : BRAND_BLUE,
          opacity: empty ? 0.4 : 1,
          transition: "opacity 0.3s ease",
          flexShrink: 0,
        }}
      >
        {dispatched ? "↑" : "SEND"}
      </div>
    </div>
  );
}
