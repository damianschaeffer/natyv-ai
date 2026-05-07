// OperatorPhoneDemo — verbatim port of
// my-agent-ai/src/components/landing/OperatorPhoneDemo.tsx (557 lines).
// Marketing distillation of /call-handling OperatorControlsPanel for the
// "Full control. Zero effort." section. Cycles through Phase B (Secret Mode +
// Listen Live + Coach + Recent Instructions) and Phase C (Post-Call Report
// with Captured Data: Name, Phone, Email, Reason, Property).
//
// Avatar served from get-myagent.com production hosting.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  PhoneOff,
  Eye,
  Headphones,
  MessageSquareText,
  Send,
  CheckCircle2,
  CheckCircle,
  User,
  Mail,
  Building2,
  MessageSquare,
  Sparkles,
  Target,
  Brain,
} from "lucide-react";

const LOOP_MS = 12_000;
const PHASE_A_END = 0;
const PHASE_B_END = 10_000;

const NUDGE_TEXT = "get her email";
const NUDGE_TYPE_START = 5_000;
const NUDGE_TYPE_DURATION = 600;
const NUDGE_COMMIT = 5_700;

const AGENT_COLOR = "#3B82F6";
const AGENT_AVATAR = "https://get-myagent.com/avatars/agent-sophia.png";

type Phase = "A" | "B" | "C";

function phaseFor(elapsed: number): Phase {
  if (elapsed < PHASE_A_END) return "A";
  if (elapsed < PHASE_B_END) return "B";
  return "C";
}

function countdownRingValue(elapsed: number): number {
  const t = Math.min(elapsed, PHASE_A_END) / PHASE_A_END;
  return Math.max(10, Math.round(15 - t * 5));
}

function typedCharCount(elapsed: number): number {
  if (elapsed < NUDGE_TYPE_START) return 0;
  if (elapsed >= NUDGE_COMMIT) return 0;
  const t = Math.max(0, elapsed - NUDGE_TYPE_START) / NUDGE_TYPE_DURATION;
  return Math.min(NUDGE_TEXT.length, Math.floor(t * NUDGE_TEXT.length));
}

function nudgeCommitted(elapsed: number): boolean {
  return elapsed >= NUDGE_COMMIT && elapsed < PHASE_B_END;
}

export default function OperatorPhoneDemo({ videoTimeMs }: { videoTimeMs?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const externalClock = typeof videoTimeMs === "number";

  const loopEpochRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );
  const [inView, setInView] = useState(false);
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
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (externalClock) {
      setElapsed(Math.max(0, Math.min(LOOP_MS, videoTimeMs ?? 0)));
    }
  }, [externalClock, videoTimeMs]);

  useEffect(() => {
    if (externalClock) return;
    const shouldRun = inView && visible && !reducedMotion;

    if (!shouldRun) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (pausedAtRef.current === null && loopEpochRef.current !== null) {
        pausedAtRef.current = performance.now();
      }
      return;
    }

    const now = performance.now();
    if (loopEpochRef.current === null) {
      loopEpochRef.current = now;
    } else if (pausedAtRef.current !== null) {
      loopEpochRef.current += now - pausedAtRef.current;
      pausedAtRef.current = null;
    }

    const tick = (t: number) => {
      setElapsed((t - (loopEpochRef.current as number)) % LOOP_MS);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [externalClock, inView, visible, reducedMotion]);

  const phase: Phase = reducedMotion ? "B" : phaseFor(elapsed);
  const staticElapsed = NUDGE_COMMIT - 100;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Live demo of the operator control panel cycling through countdown, agent-active coach, and post-call report"
      className="absolute inset-0 bg-white flex flex-col text-slate-900 overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 pt-14 pb-4 border-b border-slate-200">
        <div className="relative flex-shrink-0" aria-hidden="true">
          <img
            src={AGENT_AVATAR}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            style={{ backgroundColor: AGENT_COLOR }}
          />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
              phase === "A"
                ? "bg-yellow-400 animate-pulse"
                : phase === "B"
                ? "bg-green-500"
                : "bg-gray-500"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold leading-tight text-slate-900">Ava</div>
          <div className="text-[11px] text-blue-600 font-medium leading-tight">MyAgent</div>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {phase === "A" ? "Incoming" : phase === "B" ? "Live" : "Completed"}
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "A" && (
            <motion.div
              key="phase-a"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-[60px] bottom-0 px-3 pt-4 pb-3 flex flex-col items-center justify-between"
            >
              <PhaseA elapsed={reducedMotion ? 0 : elapsed} />
            </motion.div>
          )}
          {phase === "B" && (
            <motion.div
              key="phase-b"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-[90px] bottom-0 px-4 pt-4 pb-3 flex flex-col gap-3 overflow-hidden"
            >
              <PhaseB elapsed={reducedMotion ? staticElapsed : elapsed} />
            </motion.div>
          )}
          {phase === "C" && (
            <motion.div
              key="phase-c"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-[60px] bottom-0 overflow-hidden"
            >
              <PhaseC elapsed={reducedMotion ? 0 : elapsed - PHASE_B_END} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhaseA({ elapsed }: { elapsed: number }) {
  const value = countdownRingValue(elapsed);
  const progress = Math.min(1, elapsed / PHASE_A_END);
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * progress;

  return (
    <>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-900">Unknown Caller</p>
        <p className="text-[10px] text-slate-500 tabular-nums tracking-wide">+1 (555) 341-8820</p>
      </div>

      <div className="relative" aria-hidden="true">
        <svg width={88} height={88} viewBox="0 0 88 88">
          <circle cx={44} cy={44} r={radius} fill="none" stroke="rgba(15,23,42,0.10)" strokeWidth={5} />
          <circle
            cx={44}
            cy={44}
            r={radius}
            fill="none"
            stroke="#10B981"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 44 44)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          <text
            x={44}
            y={44}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold fill-slate-900"
            style={{ fontSize: 22 }}
          >
            {value}
          </text>
          <text x={44} y={60} textAnchor="middle" className="fill-slate-400" style={{ fontSize: 7 }}>
            seconds
          </text>
        </svg>
      </div>

      <p className="text-[10px] text-slate-500">Ava answers if no action</p>

      <div className="w-full space-y-1.5">
        <FauxButton kind="primary">
          <Phone className="w-3 h-3" aria-hidden="true" />
          <span>Take Call</span>
          <span className="block text-[8px] font-normal text-white/80 mt-0.5">
            Go live with caller immediately
          </span>
        </FauxButton>
        <FauxButton kind="danger">
          <PhoneOff className="w-3 h-3" aria-hidden="true" />
          <span>End Call</span>
        </FauxButton>
      </div>
    </>
  );
}

function PhaseB({ elapsed }: { elapsed: number }) {
  const typed = NUDGE_TEXT.slice(0, typedCharCount(elapsed));
  const committed = nudgeCommitted(elapsed);

  return (
    <>
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          border: "1px solid rgba(59, 130, 246, 0.35)",
          boxShadow:
            "0 4px 20px rgba(59, 130, 246, 0.10), 0 0 10px rgba(59, 130, 246, 0.12)",
        }}
      >
        <div className="h-[3px] bg-blue-500" />
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span className="text-[14px] font-semibold text-slate-900">Secret Mode</span>
            </div>
            <span className="text-sm" aria-hidden="true">🤫</span>
          </div>

          <div className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2.5 px-3">
            <Headphones className="w-4 h-4" aria-hidden="true" />
            <div className="text-left">
              <div className="text-[13px] font-bold leading-tight">Listen Live</div>
              <div className="text-[11px] text-white/80 leading-tight mt-0.5">
                Eavesdrop without the caller knowing
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span className="text-[12px] font-semibold text-slate-900">Coach</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Send instructions only the agent can hear
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-[12px] text-slate-900 min-h-[28px] flex items-center">
                {typed ? (
                  <>
                    <span>{typed}</span>
                    <span
                      className="inline-block w-[1px] h-[12px] bg-slate-700 ml-0.5 animate-pulse"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <span className="text-slate-400">e.g. Ask for their email</span>
                )}
              </div>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-md"
              >
                <Send className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <FauxButton kind="primary" compact>
          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-[12px]">Take Call</span>
        </FauxButton>
        <FauxButton kind="danger" compact>
          <PhoneOff className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-[12px]">End Call</span>
        </FauxButton>
      </div>

      <div className="space-y-1.5 pt-1">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
          Recent Instructions
        </p>
        <AnimatePresence>
          {committed && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 px-1 py-1.5"
            >
              <CheckCircle2
                className="w-3.5 h-3.5 text-green-600 mt-[1px] flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[12px] text-slate-900 flex-1">{NUDGE_TEXT}</span>
              <span className="text-[10px] text-slate-400 tabular-nums">3:02 PM</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

const CAPTURED = [
  { icon: User, label: "Name", value: "Sarah Thompson" },
  { icon: Phone, label: "Phone", value: "+1 (555) 341-8820" },
  { icon: Mail, label: "Email", value: "sarah@thompson.io" },
  { icon: MessageSquare, label: "Reason", value: "Viewing — 2BR on Maple" },
  { icon: Building2, label: "Property", value: "Maple Street 2BR" },
];

function PhaseC({ elapsed }: { elapsed: number }) {
  const t = Math.max(0, elapsed) / 1000;

  return (
    <div
      className="h-full overflow-hidden px-2.5 py-2.5 space-y-2"
      style={{
        transform: `translateY(${Math.max(0, 16 - t * 16)}px)`,
        transition: "transform 0.25s ease-out",
      }}
    >
      <div className="text-center">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-1">
          <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
        </div>
        <p className="text-[11px] font-bold text-slate-900">Post-Call Report</p>
        <p className="text-[9px] text-slate-500">Sarah Thompson • 0:06</p>
      </div>

      <div className="flex gap-1 justify-center flex-wrap">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-medium bg-emerald-100 text-emerald-700">
          <Sparkles className="w-2 h-2" aria-hidden="true" />
          Positive
        </span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-medium bg-emerald-100 text-emerald-700">
          <Target className="w-2 h-2" aria-hidden="true" />
          Viewing booked
        </span>
      </div>

      {t > 0.3 && (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-1.5 space-y-0.5">
          <div className="flex items-center gap-1 mb-0.5">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: AGENT_COLOR }}
            >
              <User className="w-2.5 h-2.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-[8px] font-semibold text-slate-700">Captured Data</span>
          </div>
          {CAPTURED.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-1.5 px-0.5">
              <Icon className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-[8px] text-slate-500 w-10 flex-shrink-0">{label}</span>
              <span className="text-[8px] text-slate-800 flex-1 truncate">{value}</span>
              <CheckCircle className="w-2 h-2 text-green-600 flex-shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      )}

      {t > 1.0 && (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-1.5">
          <div className="flex items-center gap-1 mb-1">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: "#6366F1" }}
            >
              <Brain className="w-2.5 h-2.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-[8px] font-semibold text-slate-700">AI Summary</span>
          </div>
          <p className="text-[8px] text-slate-600 leading-[1.45]">
            Sarah inquired about the 2-bedroom on Maple Street. Provided email after the operator coached for it. Scheduled a viewing for Saturday — high buying intent.
          </p>
        </div>
      )}
    </div>
  );
}

function FauxButton({
  kind,
  compact = false,
  children,
}: {
  kind: "primary" | "danger";
  compact?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "w-full rounded-md flex items-center justify-center gap-1 font-bold text-white select-none";
  const size = compact ? "py-1 text-[9px]" : "py-1.5 text-[10px]";
  const color = kind === "primary" ? "bg-emerald-600" : "bg-red-600";
  return (
    <div className={`${base} ${size} ${color}`} aria-hidden="true">
      {children}
    </div>
  );
}
