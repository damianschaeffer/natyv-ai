// DocToPhoneScene — verbatim port of
// my-agent-ai/src/components/voice-command-showcase/dashboard-scenes/doc-to-phone.tsx
// Pairs with doc-to-phone cinematic clip. Animates inbox search, PDF match,
// PDF card slide, then iMessage delivery with read receipt.
import { motion, AnimatePresence } from "framer-motion";

const BRAND_BLUE = "#1077FA";
const IMESSAGE_BLUE = "#1077FA";
const INK = "#f8fafc";
const PANEL = "#ffffff";
const BORDER = "rgba(0,0,0,0.08)";
const MUTED = "rgba(0,0,0,0.5)";
const TEXT = "rgba(0,0,0,0.9)";
const SUCCESS = "#22c55e";

const SEARCH_START = 0.15;
const MATCH_AT = 0.4;
const CARD_SLIDE_AT = 0.55;
const IMESSAGE_IN = 0.68;
const DELIVERED_AT = 0.82;
const READ_AT = 0.92;

const INBOX_ROWS = [
  { from: "Supplier", subject: "Insurance certificate (updated)", day: "Tue", match: true },
  { from: "Team", subject: "Weekly dispatch rundown", day: "Mon", match: false },
  { from: "Landlord", subject: "Garage bay renewal", day: "Fri", match: false },
];

export function DocToPhoneScene({ timelinePosition }: { timelinePosition: number }) {
  const tp = Math.max(0, Math.min(1, timelinePosition));
  const searching = tp >= SEARCH_START && tp < MATCH_AT;
  const matched = tp >= MATCH_AT;
  const cardSliding = tp >= CARD_SLIDE_AT && tp < IMESSAGE_IN;
  const delivered = tp >= IMESSAGE_IN;
  const deliveredStamp = tp >= DELIVERED_AT;
  const readReceipt = tp >= READ_AT;

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
          Inbox · Search & deliver
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

      <AnimatePresence>
        {searching && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: `${BRAND_BLUE}18`,
              border: `1px solid ${BRAND_BLUE}44`,
              borderRadius: 999,
              padding: "4px 10px",
              color: BRAND_BLUE,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 0.3,
              alignSelf: "flex-start",
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              ◐
            </motion.span>
            Searching inbox — last Tuesday
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {INBOX_ROWS.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 8px",
              background: row.match && matched ? `${BRAND_BLUE}16` : PANEL,
              border: `1px solid ${row.match && matched ? `${BRAND_BLUE}55` : BORDER}`,
              borderRadius: 6,
              transition: "all 0.3s ease",
              opacity: !matched && !searching && i > 0 ? 0.55 : 1,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: `${BRAND_BLUE}22`,
                color: BRAND_BLUE,
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {row.from[0]}
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: row.match && matched ? BRAND_BLUE : TEXT,
                  lineHeight: 1.1,
                }}
              >
                {row.from}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: MUTED,
                  lineHeight: 1.1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {row.subject}
              </div>
            </div>
            <div style={{ fontSize: 9, color: MUTED, flexShrink: 0 }}>{row.day}</div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {cardSliding && (
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.9 }}
            animate={{ y: 60, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: "absolute",
              left: "50%",
              top: 140,
              transform: "translateX(-50%)",
              background: PANEL,
              border: `1px solid ${BRAND_BLUE}55`,
              borderRadius: 8,
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: `0 20px 36px -12px ${BRAND_BLUE}aa`,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 28,
                height: 36,
                background: "#ffffff",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                color: "#ef4444",
                flexShrink: 0,
              }}
            >
              PDF
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: TEXT }}>
                insurance-certificate.pdf
              </div>
              <div style={{ fontSize: 9, color: MUTED }}>2 pages · 147 KB</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {delivered && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 12,
              background: PANEL,
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              padding: 10,
              boxShadow: "0 20px 36px -12px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: IMESSAGE_BLUE,
                  letterSpacing: 0.4,
                }}
              >
                iMESSAGE · TO YOUR PHONE
              </div>
              <div style={{ flex: 1 }} />
              {deliveredStamp && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: 9, color: SUCCESS, fontWeight: 700 }}
                >
                  ✓ DELIVERED
                </motion.div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: IMESSAGE_BLUE,
                  color: "#ffffff",
                  borderRadius: 14,
                  padding: "6px 8px",
                  maxWidth: "82%",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: `0 4px 12px -4px ${IMESSAGE_BLUE}aa`,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 28,
                    background: "#ffffff",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 800,
                    color: "#ef4444",
                    flexShrink: 0,
                  }}
                >
                  PDF
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    insurance-certificate.pdf
                  </div>
                  <div style={{ fontSize: 8, opacity: 0.8 }}>2 pages · 147 KB</div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div style={{ fontSize: 8, color: MUTED }}>now</div>
              {readReceipt && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: IMESSAGE_BLUE,
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
