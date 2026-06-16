// EmailDraftScene — verbatim port of
// my-agent-ai/src/components/voice-command-showcase/dashboard-scenes/email-draft.tsx
// Pairs with email-draft-reply cinematic clip. Animates compose window slide-in,
// To/Subject fill, body typing, attachment, and SEND lock.
import { motion, AnimatePresence } from "framer-motion";

const BRAND_BLUE = "#1077FA";
const INK = "#f8fafc";
const PANEL = "#ffffff";
const BORDER = "rgba(0,0,0,0.08)";
const MUTED = "rgba(0,0,0,0.5)";
const TEXT = "rgba(0,0,0,0.9)";
const SUCCESS = "#22c55e";

const BODY =
  "Wednesday morning works — I've attached last month's lease addendum for your records.";

const COMPOSE_IN = 0.05;
const TO_FILL = 0.25;
const SUBJECT_FILL = 0.35;
const BODY_START = 0.45;
const BODY_END = 0.82;
const ATTACH_IN = 0.85;
const SEND_LOCK = 0.94;

function charReveal(text: string, tp: number, start: number, end: number): string {
  if (tp <= start) return "";
  if (tp >= end) return text;
  const ratio = (tp - start) / (end - start);
  return text.slice(0, Math.max(1, Math.floor(text.length * ratio)));
}

export function EmailDraftScene({ timelinePosition }: { timelinePosition: number }) {
  const tp = Math.max(0, Math.min(1, timelinePosition));
  const composeVisible = tp >= COMPOSE_IN;
  const toText = tp >= TO_FILL ? "Property Manager" : "";
  const subjectText = tp >= SUBJECT_FILL ? "Re: Inspection scheduling" : "";
  const bodyText = charReveal(BODY, tp, BODY_START, BODY_END);
  const bodyTyping = tp >= BODY_START && tp < BODY_END;
  const attachVisible = tp >= ATTACH_IN;
  const sendLocked = tp >= SEND_LOCK;

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
        padding: 12,
        gap: 8,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.3,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          Inbox · Reply
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: BRAND_BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="24 24 152 152" width={10} height={10} aria-hidden="true">
              <path
                d="M100 34 Q108 88 166 100 Q108 112 100 166 Q92 112 34 100 Q92 88 100 34Z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600 }}>
            <span style={{ color: BRAND_BLUE }}>My</span>
            <span style={{ color: TEXT }}>Agent</span>
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 12,
          right: 12,
          bottom: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          opacity: 0.25,
        }}
      >
        {[
          "Inspection scheduling — reply by Mon",
          "Utility bill · attached",
          "Weekly digest",
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: PANEL,
              border: `1px solid ${BORDER}`,
              borderRadius: 6,
              padding: "6px 8px",
              fontSize: 10,
              color: TEXT,
            }}
          >
            {s}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {composeVisible && (
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: "absolute",
              top: 38,
              left: 12,
              right: 12,
              bottom: 12,
              background: PANEL,
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              boxShadow: "0 24px 48px -16px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: TEXT, letterSpacing: 0.3 }}>
                NEW REPLY
              </div>
              <div style={{ fontSize: 9, color: MUTED }}>· ·</div>
            </div>

            <FieldRow label="To">
              {toText ? (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: `${BRAND_BLUE}22`,
                    color: BRAND_BLUE,
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {toText}
                </motion.span>
              ) : (
                <span style={{ color: MUTED, fontSize: 10, fontStyle: "italic" }}>…</span>
              )}
            </FieldRow>

            <FieldRow label="Subj">
              <span style={{ fontSize: 11, color: TEXT, fontWeight: 500 }}>
                {subjectText || (
                  <span style={{ color: MUTED, fontStyle: "italic" }}>…</span>
                )}
              </span>
            </FieldRow>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: "10px 12px",
                fontSize: 11,
                lineHeight: 1.5,
                color: TEXT,
              }}
            >
              {bodyText}
              {bodyTyping && <span style={{ color: BRAND_BLUE, marginLeft: 1 }}>▍</span>}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderTop: `1px solid ${BORDER}`,
              }}
            >
              <AnimatePresence>
                {attachVisible && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: `${BRAND_BLUE}14`,
                      border: `1px solid ${BRAND_BLUE}44`,
                      borderRadius: 6,
                      padding: "4px 8px",
                      fontSize: 10,
                      color: BRAND_BLUE,
                      fontWeight: 600,
                      flex: 1,
                      minWidth: 0,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span>📎</span>
                    <span>lease-addendum-march.pdf</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  background: sendLocked ? BRAND_BLUE : `${BRAND_BLUE}22`,
                  color: sendLocked ? "#ffffff" : BRAND_BLUE,
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {sendLocked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ color: SUCCESS }}
                  >
                    ✓
                  </motion.span>
                )}
                {sendLocked ? "SENT" : "SEND"}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: MUTED,
          letterSpacing: 0.5,
          width: 28,
          flexShrink: 0,
        }}
      >
        {label.toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}
