// JobRescheduleScene — verbatim port of
// my-agent-ai/src/components/voice-command-showcase/dashboard-scenes/job-reschedule.tsx
// Animates the 3pm "Water heater" job moving from Today→Thursday 9am, then an
// outbound team SMS. Pairs with the plumber-truck-voice clip.
import { motion, AnimatePresence } from "framer-motion";

const BRAND_BLUE = "#1077FA";
const INK = "#0d0d1e";
const PANEL = "#12131c";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.5)";
const TEXT = "rgba(255,255,255,0.92)";
const WARM = "#f97316";

const COLS = ["Today", "Thu"];
const ROWS = ["9a", "11a", "1p", "3p", "5p"];

const MOVE_AT = 0.36;
const SMS_AT = 0.7;

export function JobRescheduleScene({ timelinePosition }: { timelinePosition: number }) {
  const moved = timelinePosition >= MOVE_AT;
  const smsVisible = timelinePosition >= SMS_AT;

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
          Field · Schedule
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
          flex: 1,
          display: "grid",
          gridTemplateColumns: "28px 1fr 1fr",
          gap: 2,
          minHeight: 0,
          position: "relative",
        }}
      >
        <div />
        {COLS.map((c) => (
          <div
            key={c}
            style={{
              fontSize: 10,
              color: c === "Thu" && moved ? BRAND_BLUE : MUTED,
              fontWeight: 600,
              textAlign: "center",
              paddingBottom: 4,
              transition: "color 0.3s ease",
            }}
          >
            {c}
          </div>
        ))}

        {ROWS.map((r) => (
          <JobRow key={r} hour={r} moved={moved} />
        ))}

        {/* Moving "Water heater" block */}
        <motion.div
          initial={false}
          animate={{
            left: moved ? "calc(28px + (100% - 30px) / 2 + 2px)" : "calc(28px + 2px)",
            top: moved ? "calc(18px + 0 * 20px + 2px)" : "calc(18px + 3 * 20px + 2px)",
            width: "calc((100% - 30px) / 2 - 4px)",
          }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            position: "absolute",
            height: 18,
            background: BRAND_BLUE,
            borderRadius: 3,
            color: "#ffffff",
            fontSize: 9,
            fontWeight: 600,
            padding: "2px 6px",
            boxShadow: `0 0 0 2px ${INK}, 0 6px 14px -4px ${BRAND_BLUE}aa`,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          Water heater
        </motion.div>

        {/* A second static "already booked" block to show realism */}
        <div
          style={{
            position: "absolute",
            top: "calc(18px + 2 * 20px + 2px)",
            left: "calc(28px + 2px)",
            width: "calc((100% - 30px) / 2 - 4px)",
            height: 18,
            background: `${WARM}22`,
            color: WARM,
            borderRadius: 3,
            fontSize: 9,
            fontWeight: 600,
            padding: "2px 6px",
            border: `1px solid ${WARM}55`,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          Estimate
        </div>
      </div>

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
              <div style={{ fontSize: 11, fontWeight: 600, color: TEXT }}>To · Team · SMS</div>
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
                "Headed to the supply yard — moved 3pm job to Thu AM."
              </div>
            </div>
            <div style={{ fontSize: 10, color: BRAND_BLUE, fontWeight: 600 }}>SENT</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function JobRow({ hour, moved }: { hour: string; moved: boolean }) {
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
        {hour}
      </div>
      {COLS.map((c) => {
        const isThu9a = c === "Thu" && hour === "9a";
        const isToday3p = c === "Today" && hour === "3p";
        const targeted = (moved && isThu9a) || (!moved && isToday3p);
        return (
          <div
            key={c}
            style={{
              height: 18,
              background: "rgba(255,255,255,0.02)",
              borderRadius: 2,
              position: "relative",
              outline: targeted ? `1px dashed ${BRAND_BLUE}55` : "none",
              outlineOffset: -1,
            }}
          />
        );
      })}
    </>
  );
}
