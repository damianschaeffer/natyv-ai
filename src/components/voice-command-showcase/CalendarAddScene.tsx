// CalendarAddScene — verbatim port of
// my-agent-ai/src/components/voice-command-showcase/dashboard-scenes/calendar-add.tsx
// Animates Thursday 2pm "Budget review" tile + outbound SMS card in sync with
// the airpods-walk-and-dictate clip's voice command.
import { motion, AnimatePresence } from "framer-motion";

const BRAND_BLUE = "#1077FA";
const INK = "#f8fafc";
const PANEL = "#ffffff";
const BORDER = "rgba(0,0,0,0.08)";
const MUTED = "rgba(0,0,0,0.5)";
const TEXT = "rgba(0,0,0,0.9)";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const HOURS = [9, 10, 11, 12, 1, 2, 3, 4, 5];

const TILE_IN = 0.42;
const SMS_IN = 0.8;

export function CalendarAddScene({ timelinePosition }: { timelinePosition: number }) {
  const tileVisible = timelinePosition >= TILE_IN;
  const smsVisible = timelinePosition >= SMS_IN;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 16,
        boxSizing: "border-box",
        background: INK,
        color: TEXT,
        fontFamily: "Poppins, system-ui, sans-serif",
      }}
    >
      {/* Header strip */}
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
          Calendar · Week
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

      {/* Grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "28px repeat(5, 1fr)",
          gap: 2,
          minHeight: 0,
        }}
      >
        <div />
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              fontSize: 10,
              color: d === "Thu" ? BRAND_BLUE : MUTED,
              fontWeight: d === "Thu" ? 600 : 500,
              textAlign: "center",
              paddingBottom: 4,
            }}
          >
            {d}
          </div>
        ))}

        {HOURS.map((h) => (
          <HourRow key={h} hour={h} tileVisible={tileVisible} />
        ))}
      </div>

      {/* SMS card that rises from bottom */}
      <AnimatePresence>
        {smsVisible && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 16,
              background: PANEL,
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              padding: "10px 12px",
              boxShadow: "0 12px 24px -12px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: `${BRAND_BLUE}22`,
                color: BRAND_BLUE,
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              T
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: TEXT }}>To · Team</div>
              <div
                style={{
                  fontSize: 11,
                  color: MUTED,
                  marginTop: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                "Budget review Thursday at 2 — confirm before Monday."
              </div>
            </div>
            <div style={{ fontSize: 10, color: BRAND_BLUE, fontWeight: 600 }}>SENT</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HourRow({ hour, tileVisible }: { hour: number; tileVisible: boolean }) {
  const is2pm = hour === 2;
  const displayLabel = hour < 12 && hour >= 9 ? `${hour}a` : hour === 12 ? "12p" : `${hour}p`;

  return (
    <>
      <div
        style={{
          fontSize: 9,
          color: MUTED,
          textAlign: "right",
          paddingRight: 4,
          lineHeight: "18px",
        }}
      >
        {displayLabel}
      </div>
      {DAYS.map((d) => {
        const isThursday2pm = d === "Thu" && is2pm;
        return (
          <div
            key={d}
            style={{
              position: "relative",
              height: 18,
              background: "rgba(0,0,0,0.03)",
              borderRadius: 2,
            }}
          >
            <AnimatePresence>
              {isThursday2pm && tileVisible && (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: BRAND_BLUE,
                    borderRadius: 3,
                    color: "#ffffff",
                    fontSize: 9,
                    fontWeight: 600,
                    padding: "2px 4px",
                    boxShadow: `0 0 0 2px ${INK}, 0 4px 10px -2px ${BRAND_BLUE}80`,
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  Budget review
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}
