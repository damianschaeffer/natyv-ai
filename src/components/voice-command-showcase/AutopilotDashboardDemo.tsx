// AutopilotDashboardDemo — verbatim port of
// my-agent-ai/src/components/landing/AutopilotDashboardDemo.tsx (877 lines).
// "Your life, themed" space switcher: Health / Work / Finance with auto-cycle
// and floating Sophia bubble. Avatar served from get-myagent.com.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  CheckSquare,
  Calendar,
  Mail,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  FileText,
  Sparkles,
  Activity,
  Heart,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const SOPHIA_AVATAR = "https://get-myagent.com/avatars/agent-sophia.png";

type CardSpec =
  | { type: "goals"; goals: Array<{ label: string; current: number; target: number; unit?: string }> }
  | { type: "activity"; stats: Array<{ label: string; value: string; delta?: string }> }
  | { type: "calendar"; events: Array<{ title: string; when: string; color?: string }> }
  | { type: "tasks"; tasks: Array<{ text: string; priority?: "high" | "normal" }> }
  | { type: "calls"; summary: string; recent: Array<{ name: string; when: string }> }
  | { type: "email"; summary: string; recent: Array<{ from: string; subject: string }> }
  | { type: "pipeline"; summary: string; deals: Array<{ name: string; value: string; hot?: boolean }> }
  | { type: "intelligence"; insights: string[] }
  | { type: "money"; balance: string; monthly: Array<{ label: string; amount: string; positive?: boolean }> }
  | { type: "contacts"; summary: string; recent: Array<{ name: string; role: string }> }
  | { type: "files"; summary: string; items: Array<{ name: string; meta: string }> };

type Space = {
  id: string;
  name: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  cards: CardSpec[];
};

const SPACES: Space[] = [
  {
    id: "health",
    name: "Health",
    accent: "#EC4899",
    icon: Heart,
    cards: [
      {
        type: "goals",
        goals: [
          { label: "Daily steps", current: 8200, target: 10000, unit: "steps" },
          { label: "Sleep ≥ 7h", current: 5, target: 7, unit: "days" },
          { label: "Workouts", current: 2, target: 3, unit: "sessions" },
        ],
      },
      {
        type: "activity",
        stats: [
          { label: "This week", value: "4 workouts", delta: "+1 vs last" },
          { label: "Steps", value: "52,840", delta: "+12%" },
          { label: "Avg sleep", value: "6h 48m", delta: "+22 min" },
        ],
      },
      {
        type: "calendar",
        events: [
          { title: "Yoga · Sunrise studio", when: "Tomorrow · 7:00 AM" },
          { title: "Annual physical · Dr. Chen", when: "Apr 28 · 2:30 PM" },
          { title: "Meal prep", when: "Sunday · 10:00 AM" },
        ],
      },
      {
        type: "tasks",
        tasks: [
          { text: "Book dentist cleaning", priority: "high" },
          { text: "Renew prescription" },
          { text: "Schedule blood work" },
        ],
      },
      {
        type: "intelligence",
        insights: [
          "Sleep quality up 18% after cutting caffeine past 2pm.",
          "Best mood days correlate with 8+ hours sleep.",
        ],
      },
      {
        type: "contacts",
        summary: "3 care providers",
        recent: [
          { name: "Dr. Chen", role: "Primary care" },
          { name: "Sarah", role: "Trainer" },
          { name: "Mike", role: "Therapist" },
        ],
      },
    ],
  },

  {
    id: "work",
    name: "Work",
    accent: "#3B82F6",
    icon: Briefcase,
    cards: [
      {
        type: "calls",
        summary: "47 this week · 3 today",
        recent: [
          { name: "Sarah Thompson", when: "just now" },
          { name: "David Park", when: "1h ago" },
          { name: "Jessica Miller", when: "3h ago" },
        ],
      },
      {
        type: "email",
        summary: "47 unread · 3 drafts",
        recent: [
          { from: "Sarah T.", subject: "Re: Maple St listing details" },
          { from: "David P.", subject: "Q2 review deck" },
          { from: "Ops Team", subject: "Weekly dispatch rundown" },
        ],
      },
      {
        type: "calendar",
        events: [
          { title: "Team standup", when: "Today · 10:00 AM" },
          { title: "Tesla Fleet · Client call", when: "Today · 2:00 PM" },
          { title: "Q2 Review", when: "Friday · 9:30 AM" },
        ],
      },
      {
        type: "tasks",
        tasks: [
          { text: "Send pricing to Sarah Thompson", priority: "high" },
          { text: "Review Q2 budget", priority: "high" },
          { text: "Reply to David's proposal" },
        ],
      },
      {
        type: "pipeline",
        summary: "3 active deals · $47k",
        deals: [
          { name: "Tesla Fleet Contract", value: "$12k", hot: true },
          { name: "Jessica — Salon rebrand", value: "$3k" },
          { name: "Maple St — 2BR rental", value: "$3.2k", hot: true },
        ],
      },
      {
        type: "intelligence",
        insights: [
          "Ava captured 8 leads from calls yesterday.",
          'Top inbound keyword this week: "pricing" (12 asks).',
        ],
      },
    ],
  },

  {
    id: "finance",
    name: "Finance",
    accent: "#10B981",
    icon: DollarSign,
    cards: [
      {
        type: "money",
        balance: "$12,340",
        monthly: [
          { label: "Revenue this month", amount: "+$4,200", positive: true },
          { label: "Expenses", amount: "−$3,100" },
          { label: "Net", amount: "+$1,100", positive: true },
        ],
      },
      {
        type: "goals",
        goals: [
          { label: "Emergency fund", current: 7500, target: 10000, unit: "$" },
          { label: "Roth IRA (annual)", current: 3500, target: 7000, unit: "$" },
          { label: "Pay off card", current: 800, target: 1200, unit: "$" },
        ],
      },
      {
        type: "tasks",
        tasks: [
          { text: "Pay rent (due Apr 30)", priority: "high" },
          { text: "File Q2 estimated tax" },
          { text: "Review Tesla fleet invoice" },
        ],
      },
      {
        type: "intelligence",
        insights: [
          "Dining expenses up 22% vs. last month.",
          "Subscription fees: $247 / mo across 12 services.",
        ],
      },
      {
        type: "files",
        summary: "2025 tax · 4 items",
        items: [
          { name: "W-2 2025.pdf", meta: "From: Payroll · Mar 2" },
          { name: "1099 — Tesla Fleet.pdf", meta: "From: Tesla · Jan 31" },
          { name: "Rent receipt Apr.pdf", meta: "From: Landlord" },
        ],
      },
      {
        type: "calendar",
        events: [
          { title: "Rent auto-pay", when: "Apr 30 · $2,100" },
          { title: "Q2 estimated tax", when: "Jun 15 · $1,450" },
          { title: "Payday", when: "Every other Friday" },
        ],
      },
    ],
  },
];

const AUTOCYCLE_MS = 7_000;

export default function AutopilotDashboardDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(SPACES[0].id);
  const [userInteracted, setUserInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );
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
    const shouldCycle = inView && visible && !reducedMotion && !userInteracted;
    if (!shouldCycle) return;
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = SPACES.findIndex((s) => s.id === prev);
        return SPACES[(idx + 1) % SPACES.length].id;
      });
    }, AUTOCYCLE_MS);
    return () => clearInterval(interval);
  }, [inView, visible, reducedMotion, userInteracted]);

  const active = SPACES.find((s) => s.id === activeId) ?? SPACES[0];

  const handleSelectSpace = (id: string) => {
    setActiveId(id);
    setUserInteracted(true);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Dashboard demo — click a space to see how MyAgent organizes that part of your life"
      className="relative w-full"
    >
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/40 border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-[200px_1fr] gap-0 max-lg:grid-cols-1">
          <LeftSidebar
            activeId={activeId}
            onSelect={handleSelectSpace}
            userInteracted={userInteracted}
          />
          <MainArea space={active} />
        </div>
      </div>
      <FloatingAvaBubble />
    </div>
  );
}

function LeftSidebar({
  activeId,
  onSelect,
  userInteracted,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  userInteracted: boolean;
}) {
  return (
    <aside className="bg-[#FAFBFC] border-r border-slate-200 p-2 pt-3 max-lg:border-r-0 max-lg:border-b">
      <div className="mb-1 px-1 flex items-center gap-2">
        <div className="font-poppins font-bold text-[11px] tracking-tight flex-shrink-0">
          <span className="text-primary">My</span>
          <span className="text-slate-700">Spaces</span>
        </div>
        {!userInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="lg:hidden flex-1 px-1.5 py-1 rounded-md bg-blue-50 border border-blue-100"
          >
            <p className="text-[9px] text-blue-700 leading-snug">
              Click between different spaces of your life.
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-evenly lg:flex-col lg:justify-start lg:gap-0 lg:space-y-0.5 w-full">
        {SPACES.map((space) => {
          const isActive = space.id === activeId;
          const Icon = space.icon;
          return (
            <button
              key={space.id}
              type="button"
              onClick={() => onSelect(space.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Switch to ${space.name} space`}
              className={`flex items-center gap-1.5 px-2 py-1 lg:py-2 rounded-lg text-sm transition-all lg:w-full ${
                isActive
                  ? "bg-white shadow-sm border border-slate-200 text-slate-900 font-semibold"
                  : "text-slate-600 hover:bg-white/60"
              }`}
            >
              <span
                className="inline-flex w-5 h-5 lg:w-6 lg:h-6 rounded-md items-center justify-center flex-shrink-0"
                style={{
                  background: isActive ? space.accent : `${space.accent}1F`,
                  color: isActive ? "#ffffff" : space.accent,
                }}
              >
                <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5" aria-hidden="true" />
              </span>
              <span className="text-left">{space.name}</span>
              {isActive && (
                <ChevronRight
                  className="hidden lg:block w-3.5 h-3.5 text-slate-400 ml-auto"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {!userInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hidden lg:block mt-3 px-2 py-2 rounded-lg bg-blue-50 border border-blue-100"
        >
          <p className="text-[10px] text-blue-700 leading-snug">
            Click between different spaces of your life.
          </p>
        </motion.div>
      )}
    </aside>
  );
}

function MainArea({ space }: { space: Space }) {
  return (
    <section className="flex flex-col min-w-0">
      <motion.div
        className="h-[3px] w-full"
        animate={{ backgroundColor: space.accent }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />
      <TopHeader space={space} />
      <div className="bg-[#F6F8FB] p-2 sm:p-4 flex-1">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 max-md:grid-cols-2 max-sm:grid-cols-1">
          <AnimatePresence mode="wait">
            {space.cards.map((card, i) => (
              <motion.div
                key={`${space.id}-${i}-${card.type}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <CardRenderer card={card} accent={space.accent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TopHeader({ space }: { space: Space }) {
  const Icon = space.icon;
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200">
      <div className="flex items-center gap-2">
        <motion.div
          key={space.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm flex-shrink-0"
          style={{ background: space.accent }}
        >
          <Icon className="w-4 h-4 text-white" aria-hidden="true" />
        </motion.div>
        <motion.span
          key={`${space.id}-name`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="text-slate-900 font-bold text-base tracking-tight"
        >
          {space.name}
        </motion.span>
      </div>

      <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
        <div className="text-right leading-tight">
          <div className="text-xs font-semibold text-slate-900 tabular-nums">2:04 PM</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-[0.1em] font-medium">
            Apr 22
          </div>
        </div>
        <div className="relative">
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function CardRenderer({ card, accent }: { card: CardSpec; accent: string }) {
  switch (card.type) {
    case "goals":
      return <GoalsCard goals={card.goals} accent={accent} />;
    case "activity":
      return <ActivityCard stats={card.stats} accent={accent} />;
    case "calendar":
      return <CalendarCard events={card.events} />;
    case "tasks":
      return <TasksCard tasks={card.tasks} />;
    case "calls":
      return <CallsCard summary={card.summary} recent={card.recent} />;
    case "email":
      return <EmailCard summary={card.summary} recent={card.recent} />;
    case "pipeline":
      return <PipelineCard summary={card.summary} deals={card.deals} />;
    case "intelligence":
      return <IntelligenceCard insights={card.insights} />;
    case "money":
      return <MoneyCard balance={card.balance} monthly={card.monthly} />;
    case "contacts":
      return <ContactsCard summary={card.summary} recent={card.recent} />;
    case "files":
      return <FilesCard summary={card.summary} items={card.items} />;
  }
}

function Card({
  title,
  icon: Icon,
  color,
  meta,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="region"
      aria-label={title}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden h-full flex flex-col"
      style={{ borderTopColor: color, borderTopWidth: 2 }}
    >
      <div className="p-2.5 flex-1 flex flex-col gap-1.5 min-h-[140px]">
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}1F`, color }}
          >
            <Icon className="w-3 h-3" aria-hidden="true" />
          </div>
          <span className="text-[11px] font-semibold text-slate-900">{title}</span>
          {meta && (
            <span className="ml-auto text-[9px] text-slate-400 font-medium">{meta}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

function GoalsCard({
  goals,
  accent,
}: {
  goals: Array<{ label: string; current: number; target: number; unit?: string }>;
  accent: string;
}) {
  return (
    <Card title="Goals" icon={Target} color={accent}>
      <div className="space-y-1.5">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <div key={g.label}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-700 font-medium">{g.label}</span>
                <span className="text-slate-500 tabular-nums">
                  {g.unit === "$"
                    ? `$${g.current.toLocaleString()} / $${g.target.toLocaleString()}`
                    : `${g.current.toLocaleString()} / ${g.target.toLocaleString()}${
                        g.unit ? " " + g.unit : ""
                      }`}
                </span>
              </div>
              <div className="h-1.5 mt-0.5 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, pct)}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ActivityCard({
  stats,
  accent,
}: {
  stats: Array<{ label: string; value: string; delta?: string }>;
  accent: string;
}) {
  return (
    <Card title="Activity" icon={Activity} color={accent}>
      <div className="space-y-1">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline justify-between text-[10px]">
            <span className="text-slate-500">{s.label}</span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-slate-900 font-semibold text-[11px]">{s.value}</span>
              {s.delta && (
                <span className="text-[9px]" style={{ color: accent }}>
                  {s.delta}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CalendarCard({ events }: { events: Array<{ title: string; when: string }> }) {
  const COLOR = "#F97316";
  return (
    <Card title="Calendar" icon={Calendar} color={COLOR} meta={`${events.length} upcoming`}>
      <div className="space-y-1.5">
        {events.map((e) => (
          <div key={e.title} className="flex items-start gap-1.5 text-[10px]">
            <span className="inline-block w-1 h-1 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-slate-900 font-medium truncate">{e.title}</div>
              <div className="text-slate-500 tabular-nums">{e.when}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TasksCard({
  tasks,
}: {
  tasks: Array<{ text: string; priority?: "high" | "normal" }>;
}) {
  const COLOR = "#3B82F6";
  return (
    <Card title="Tasks" icon={CheckSquare} color={COLOR} meta={`${tasks.length} active`}>
      <div className="space-y-1">
        {tasks.map((t) => (
          <div key={t.text} className="flex items-start gap-1.5 text-[10px]">
            <span
              className={`inline-block w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                t.priority === "high" ? "bg-red-500" : "bg-slate-300"
              }`}
            />
            <span className="text-slate-700 truncate">{t.text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CallsCard({
  summary,
  recent,
}: {
  summary: string;
  recent: Array<{ name: string; when: string }>;
}) {
  const COLOR = "#10B981";
  return (
    <Card title="Calls" icon={Phone} color={COLOR} meta={summary}>
      <div className="space-y-1">
        {recent.map((r) => (
          <div key={r.name} className="flex items-center justify-between text-[10px]">
            <span className="text-slate-900 font-medium truncate">{r.name}</span>
            <span className="text-slate-500 flex-shrink-0 ml-2">{r.when}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EmailCard({
  summary,
  recent,
}: {
  summary: string;
  recent: Array<{ from: string; subject: string }>;
}) {
  const COLOR = "#EF4444";
  return (
    <Card title="Email" icon={Mail} color={COLOR} meta={summary}>
      <div className="space-y-1">
        {recent.map((r) => (
          <div key={r.subject} className="text-[10px]">
            <div className="text-slate-900 font-medium truncate">{r.from}</div>
            <div className="text-slate-500 truncate">{r.subject}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PipelineCard({
  summary,
  deals,
}: {
  summary: string;
  deals: Array<{ name: string; value: string; hot?: boolean }>;
}) {
  const COLOR = "#10B981";
  return (
    <Card title="Pipeline" icon={TrendingUp} color={COLOR} meta={summary}>
      <div className="space-y-1">
        {deals.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 min-w-0">
              {d.hot && (
                <span className="text-[8px]" aria-label="hot deal">
                  🔥
                </span>
              )}
              <span className="text-slate-700 truncate">{d.name}</span>
            </span>
            <span className="text-slate-900 font-semibold tabular-nums flex-shrink-0 ml-2">
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function IntelligenceCard({ insights }: { insights: string[] }) {
  const COLOR = "#8B5CF6";
  return (
    <Card title="Intelligence" icon={Sparkles} color={COLOR} meta={`${insights.length} insights`}>
      <div className="space-y-1.5">
        {insights.map((text, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[10px]">
            <Sparkles
              className="w-2.5 h-2.5 text-purple-400 mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-slate-700 leading-snug">{text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MoneyCard({
  balance,
  monthly,
}: {
  balance: string;
  monthly: Array<{ label: string; amount: string; positive?: boolean }>;
}) {
  const COLOR = "#10B981";
  return (
    <Card title="Money" icon={DollarSign} color={COLOR} meta="This month">
      <div>
        <div className="text-[10px] text-slate-500">Checking balance</div>
        <div className="text-[18px] font-bold text-slate-900 tabular-nums leading-tight">
          {balance}
        </div>
      </div>
      <div className="mt-1.5 space-y-0.5">
        {monthly.map((m) => (
          <div key={m.label} className="flex items-center justify-between text-[10px]">
            <span className="text-slate-500 truncate">{m.label}</span>
            <span
              className={`tabular-nums font-semibold flex-shrink-0 ml-2 ${
                m.positive ? "text-emerald-600" : "text-slate-700"
              }`}
            >
              {m.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ContactsCard({
  summary,
  recent,
}: {
  summary: string;
  recent: Array<{ name: string; role: string }>;
}) {
  const COLOR = "#3B82F6";
  return (
    <Card title="Contacts" icon={Users} color={COLOR} meta={summary}>
      <div className="space-y-1">
        {recent.map((r) => (
          <div key={r.name} className="flex items-center gap-1.5 text-[10px]">
            <span className="inline-block w-4 h-4 rounded-full bg-slate-200 flex-shrink-0 text-[8px] font-bold text-slate-600 flex items-center justify-center">
              {r.name[0]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-slate-900 font-medium truncate">{r.name}</div>
              <div className="text-slate-500 truncate">{r.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FilesCard({
  summary,
  items,
}: {
  summary: string;
  items: Array<{ name: string; meta: string }>;
}) {
  const COLOR = "#3B82F6";
  return (
    <Card title="Files" icon={FileText} color={COLOR} meta={summary}>
      <div className="space-y-1">
        {items.map((i) => (
          <div key={i.name} className="text-[10px]">
            <div className="text-slate-900 font-medium truncate">{i.name}</div>
            <div className="text-slate-500 truncate">{i.meta}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FloatingAvaBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: [1, 1.04, 1],
      }}
      transition={{
        opacity: { delay: 0.5, duration: 0.4 },
        scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
      }}
      className="absolute bottom-4 right-4 pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500 blur-md"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-xl shadow-blue-500/30 ring-2 ring-white">
          <img src={SOPHIA_AVATAR} alt="" className="w-full h-full object-cover" />
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
        </span>
      </div>
    </motion.div>
  );
}
