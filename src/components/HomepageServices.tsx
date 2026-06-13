import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  // Category-level icons
  Phone,
  TrendingUp,
  Settings2,
  CreditCard,
  Megaphone,
  Heart,
  ArrowRight,
  Sparkles,
  // Service-level icons (mirrors my-agent-ai/src/config/serviceIcons.ts)
  MessageSquare,
  PhoneCall,
  MapPin,
  MessageCircle,
  Inbox,
  Calendar,
  Bell,
  Globe,
  Star,
  FolderSync,
  Reply,
  Users,
  Zap,
  Send,
  Share2,
  Pencil,
  FileText,
  HelpCircle,
  LayoutGrid,
  ClipboardList,
  UserPlus,
  FileCheck,
  RotateCcw,
  Wallet,
  Receipt,
  ShoppingCart,
  Tag,
  Smartphone,
  CheckCircle,
  MessagesSquare,
  Bot,
  Voicemail,
  Target,
  FileSignature,
  Upload,
  ListChecks,
  BellRing,
  Crown,
  AppWindow,
  Copy,
  Layers,
  Briefcase,
  GraduationCap,
  Gauge,
  Eye,
  Trophy,
  AlertTriangle,
  BarChart3,
  Mic,
  Cable,
  Server,
  Mail,
  ShieldCheck,
  Mailbox,
  Lock,
  Video,
  Search,
  ShieldAlert,
  Store,
  Clock,
  Cake,
  Languages,
  Scale,
  Wrench,
  Headphones,
  Palette,
  Film,
  MailCheck,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

interface Service {
  name: string;
  icon: LucideIcon;
  // Short outcome-based selling line. Shown when the user clicks the
  // pill to expand it. Aim for 8-15 words, lead with the result the
  // business owner buys, not the feature.
  outcome: string;
}

interface ServiceFunction {
  id: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  // Brand-aligned category color used for the card's tinted border,
  // gradient, glow, the solid icon circle, AND the inner pill chips.
  color: string;
  services: Service[];
}

// Mirrors my-agent-ai/src/config/serviceIcons.ts — every service that
// MyAgent ships, slotted into one of the six Natyv agency functions.
// Keep in sync when MyAgent's catalog grows.
const functions: ServiceFunction[] = [
  {
    id: "front-desk",
    title: "Front Desk",
    tagline: "Never miss a call. Never lose a lead.",
    icon: Phone,
    color: "#06B6D4", // cyan
    services: [
      { name: "24/7 Call Answering", icon: Phone, outcome: "Every call answered, even at 2am or during your busiest hour." },
      { name: "Instant Text Response", icon: MessageSquare, outcome: "Sub-30-second SMS reply to any missed call, web form, or DM." },
      { name: "Personalized Phone Setup", icon: PhoneCall, outcome: "Custom voice, branded greeting, and call flow tuned to your operations." },
      { name: "Local Business Number", icon: MapPin, outcome: "Local-area-code line that builds trust with neighborhood callers." },
      { name: "Website Chat Widget", icon: MessageCircle, outcome: "Convert site visitors before they leave — answers in seconds." },
      { name: "Unified Message Inbox", icon: Inbox, outcome: "Calls, texts, DMs, and web chat in one shared inbox." },
      { name: "Lead Conversation Assistant", icon: Bot, outcome: "AI co-pilot that drafts the right reply for every inbound message." },
      { name: "Direct Voicemail Drop", icon: Voicemail, outcome: "Leave a perfect voicemail without ringing the phone — 80%+ listen rates." },
      { name: "Google Messages Connection", icon: MessagesSquare, outcome: "Customers text your Google Business Profile and you respond instantly." },
      { name: "Call Recording & Quality", icon: Mic, outcome: "Every call recorded, transcribed, and scored for coaching." },
      { name: "Call Sentiment Analysis", icon: Gauge, outcome: "Catch frustrated callers before they churn — flagged for owner review." },
      { name: "VIP Priority Line", icon: Crown, outcome: "Top clients reach a human path; everyone else is handled cleanly." },
      { name: "70+ Language Voice Support", icon: Languages, outcome: "Multilingual call answering powered by Gemini Live — every caller in their language." },
    ],
  },
  {
    id: "sales",
    title: "Sales",
    tagline: "Capture, qualify, and close — without the bottleneck.",
    icon: TrendingUp,
    color: "#10B981", // green (emerald)
    services: [
      { name: "Instant Lead Connection", icon: Zap, outcome: "Pair every new lead with a live channel inside two minutes." },
      { name: "Visual Sales Pipeline", icon: LayoutGrid, outcome: "Every deal's stage at a glance — no leads slip through the cracks." },
      { name: "Fair Lead Distribution", icon: UserPlus, outcome: "Round-robin or skill-based routing so no rep gets all the leads." },
      { name: "Custom Lead Forms", icon: FileText, outcome: "Branded forms that capture exactly what you need — and trigger the next step." },
      { name: "Interactive Quizzes", icon: HelpCircle, outcome: "On-site quizzes that double inbound conversion vs. static forms." },
      { name: "Quote Generator", icon: Receipt, outcome: "Branded quotes drafted from a 30-second client conversation." },
      { name: "Local Lead Finder", icon: Search, outcome: "Surface high-fit prospects in your service area — refreshed weekly." },
      { name: "Referral Partner Program", icon: Users, outcome: "Trackable referral links + automated payouts that turn fans into a sales force." },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    tagline: "Smart scheduling. Real systems. Hours back.",
    icon: Settings2,
    color: "#3C83F6", // blue (brand primary)
    services: [
      { name: "Smart Scheduling", icon: Calendar, outcome: "Book the right service in the right window — without back-and-forth." },
      { name: "No-Show Prevention", icon: Bell, outcome: "Reminder + reschedule sequences that recover 25–40% of no-shows." },
      { name: "Team Task Assignment", icon: ClipboardList, outcome: "Auto-route work items to the right person based on skill, load, and location." },
      { name: "Team Notifications", icon: BellRing, outcome: "Real-time alerts so the right info reaches the right person — no missed handoffs." },
      { name: "Branded Client Portal", icon: AppWindow, outcome: "A self-service hub where clients book, pay, and get answers 24/7." },
      { name: "Branded Installable Progressive Web App", icon: Smartphone, outcome: "iOS + Android home-screen app for your business — no app store required." },
      { name: "Multi-Location System Clone", icon: Copy, outcome: "Replicate your best location's playbook across the next ten." },
      { name: "White-Label Platform Builder", icon: Layers, outcome: "Resell the entire stack under your own brand to your own clients." },
      { name: "Applicant Tracking System", icon: Briefcase, outcome: "Job listings, applicant screening, and interview scheduling in one workflow." },
      { name: "Employee Training Portal", icon: GraduationCap, outcome: "Onboarding videos, SOPs, and quizzes that get new hires productive faster." },
      { name: "Team Performance Leaderboard", icon: Trophy, outcome: "Real-time scoreboard that gamifies the metrics that move revenue." },
      { name: "At-Risk Client Alerts", icon: AlertTriangle, outcome: "AI-flagged churn risks before they cancel — with the right intervention queued up." },
      { name: "Advanced Performance Analytics", icon: BarChart3, outcome: "Cohort, funnel, and unit-economics views the off-the-shelf dashboards skip." },
      { name: "Competitor Automation", icon: Eye, outcome: "Weekly intel on what your competitors are pricing, posting, and changing." },
      { name: "Automation Connection Hub", icon: Cable, outcome: "One-click connections to QuickBooks, HubSpot, Stripe, and 200+ tools." },
      { name: "Professional Website Hosting", icon: Server, outcome: "Fast, secure, SOC-2 hosting tuned for service-business workloads." },
      { name: "Privacy-First Data Handling", icon: Lock, outcome: "GDPR/CCPA-ready data pipelines so client data stays where it belongs." },
      { name: "Accessibility Scans & Remediation", icon: ShieldAlert, outcome: "WCAG 2.1 AA scans + fixes — meet ADA without the lawsuit risk." },
      { name: "Secure Video Hosting", icon: Video, outcome: "Branded, password-protected video library for trainings and case studies." },
      { name: "Security Audit Service", icon: ShieldCheck, outcome: "Quarterly pentest + remediation plan from a real human security team." },
      { name: "AI-Drafted Policy Templates", icon: Scale, outcome: "First-draft Terms, Privacy, and NDA — attorney review recommended, friction removed." },
      { name: "Technical Setup Service", icon: Wrench, outcome: "Hands-on white-glove setup of every tool, integration, and workflow." },
      { name: "Priority Support Access", icon: Headphones, outcome: "Dedicated Slack channel + 4-hour response SLA from real engineers." },
      { name: "A2P 10DLC Registration Support", icon: ShieldCheck, outcome: "Full carrier registration so your business texts actually deliver." },
      { name: "Waitlist Manager", icon: Clock, outcome: "Cap demand at the right price — auto-promote when slots open." },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    tagline: "Get paid faster. Reconcile less. Sleep better.",
    icon: CreditCard,
    color: "#EF4444", // red
    services: [
      { name: "Text-to-Pay Invoicing", icon: CreditCard, outcome: "Send a payable link by SMS — most clients pay inside 4 hours." },
      { name: "Automatic Invoicing", icon: FileCheck, outcome: "Recurring or trigger-based invoices that go out without you remembering." },
      { name: "Recurring Payments", icon: RotateCcw, outcome: "Move clients onto autopay without the awkward conversation." },
      { name: "Deposit Collection", icon: Wallet, outcome: "Capture deposits at booking — protect your calendar from no-pay holds." },
      { name: "Abandoned Cart Recovery", icon: ShoppingCart, outcome: "Recover the 60–70% of carts that ghost — branded follow-up sequence." },
      { name: "Discount Code Manager", icon: Tag, outcome: "Trackable codes per channel + per partner so you know what drives revenue." },
      { name: "Mobile Card Reader", icon: Smartphone, outcome: "Accept card payments anywhere — properly integrated with your books." },
      { name: "Automatic Receipts", icon: CheckCircle, outcome: "Branded receipts emailed (or texted) the moment a payment clears." },
      { name: "Digital Signatures", icon: FileSignature, outcome: "Send, sign, and store contracts in one branded flow — no DocuSign markup." },
      { name: "Secure Document Upload", icon: Upload, outcome: "Clients drop sensitive docs into a branded, encrypted vault — no email attachments." },
      { name: "Merchandise Store Setup", icon: Store, outcome: "Branded online store + fulfillment integration — open a new revenue line in days." },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Show up everywhere — without an agency for each channel.",
    icon: Megaphone,
    color: "#FB923C", // orange
    services: [
      { name: "Instant Website Launch", icon: Globe, outcome: "Publish a polished, conversion-tuned site in days, not months." },
      { name: "Auto-Review Requests", icon: Star, outcome: "Trigger Google / Yelp / industry review asks at the perfect moment." },
      { name: "Online Directory Sync", icon: FolderSync, outcome: "Your name, address, and hours stay correct across 50+ directories." },
      { name: "Auto-Review Responses", icon: Reply, outcome: "Every review answered with the right tone — even the bad ones." },
      { name: "Social Post Scheduler", icon: Share2, outcome: "Daily on-brand posting across the channels your customers actually use." },
      { name: "Content Writing Assistant", icon: Pencil, outcome: "Blog posts, email sequences, and ad copy in your voice — drafted, you approve." },
      { name: "Do-It-Yourself Facebook Ads", icon: TrendingUp, outcome: "Campaigns built, launched, and optimized without an ad-agency markup." },
      { name: "Do-It-Yourself Google Ads", icon: Target, outcome: "Search and display campaigns tuned for service-business intent." },
      { name: "Automated Postcard Mailings", icon: Mailbox, outcome: "Trigger physical mail from CRM events — birthdays, anniversaries, win-backs." },
      { name: "Dedicated Sending Domain", icon: Mail, outcome: "Reputation-warmed domain so your campaigns land in the inbox, not Promotions." },
      { name: "Email Delivery Optimization", icon: MailCheck, outcome: "Continual deliverability monitoring + IP warming + reputation defense." },
      { name: "Graphic Design Service", icon: Palette, outcome: "On-brand creative for ads, social, decks, and signage — turnaround in days." },
      { name: "Video Production Service", icon: Film, outcome: "Scripted, shot, edited videos for ads, training, and social — branded throughout." },
    ],
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    tagline: "Make every customer feel remembered — even at scale.",
    icon: Heart,
    color: "#8B5CF6", // violet
    services: [
      { name: "Automatic Follow-Up", icon: Send, outcome: "Personalized check-ins after every appointment, purchase, or interaction." },
      { name: "Past Customer Outreach", icon: Users, outcome: "Reactivate dormant clients with relevance-scored, high-conversion touches." },
      { name: "New Client Welcome Sequence", icon: ListChecks, outcome: "First-90-days journey that turns new customers into long-term ones." },
      { name: "Birthday Campaign Automation", icon: Cake, outcome: "Automated milestone touches that make every customer feel like the only one." },
    ],
  },
];

// Total productized capabilities, computed from the catalog itself so the
// number we advertise is always truthful no matter how the catalog changes.
const TOTAL_SERVICES = functions.reduce((n, f) => n + f.services.length, 0);

// Default (homepage) framing — the traditional agency path vs. the MyAgent
// product. "Full-Service Agency." in white is the unmistakable agency
// signal; "AI-Powered" in primary blue is the modern differentiator.
const HEADLINE_PRE = "Full-Service Agency.";
const HEADLINE_POST = "AI-Powered.";

// Rotating subtitles — homepage default. Count is derived from
// TOTAL_SERVICES so it never drifts out of sync with the catalog.
const SUBTITLES = [
  "Start with an assessment, then build only what pays back.",
  `Pick from ${TOTAL_SERVICES} proven functions once the map is clear.`,
  "Designed and implemented around your actual operations.",
];

// "menu" framing — used on /services BELOW the two-path offer block, where
// this catalog is the menu of what gets built after a visitor picks a path
// (not a competing third entry point). No assessment-first / numeric copy.
const MENU_SUBTITLES = [
  "Your agent and your roadmap both pull from this menu.",
  "Productized capabilities across six business functions.",
  "Designed and implemented around your actual operations.",
];

interface HomepageServicesProps {
  // "homepage" (default) keeps the original framing byte-identical;
  // "menu" reframes the section as the post-path build menu on /services.
  variant?: "homepage" | "menu";
  eyebrow?: string;
  headlinePre?: string;
  headlinePost?: string;
}

// How many service pills are shown before the "Show all" expand kicks in.
// 4 = the count of the smallest category (CX), so every card starts the
// same length regardless of category size.
const VISIBLE_PILLS = 4;

const HomepageServices = ({
  variant = "homepage",
  eyebrow = "Services",
  headlinePre = HEADLINE_PRE,
  headlinePost = HEADLINE_POST,
}: HomepageServicesProps = {}) => {
  const subtitles = variant === "menu" ? MENU_SUBTITLES : SUBTITLES;
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const toggleExpanded = (id: string) =>
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  // Per-pill expand state — clicking a pill reveals its outcome line.
  // Multiple pills can be expanded simultaneously across cards.
  const [expandedPills, setExpandedPills] = useState<Set<string>>(new Set());
  const togglePill = (categoryId: string, serviceName: string) => {
    const key = `${categoryId}::${serviceName}`;
    setExpandedPills((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section
      id="homepage-services"
      className="relative flex flex-col items-center px-2 sm:px-6 pt-12 md:pt-16 pb-20 md:pb-28 overflow-hidden border-t border-border/40"
    >
      {/* Ambient glow — slightly warmer tint to subtly mark Path B (agency) territory */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.025] blur-[150px] pointer-events-none" />

      {/* Section entrance — small subtle pill in the navbar caps style.
          Matches the existing /services page treatment so the homepage
          and the dedicated services route read as one system. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-10 md:mb-14"
      >
        <span
          className="inline-block px-4 py-1.5 text-primary border border-primary/30 rounded-full font-accent uppercase"
          style={{
            fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </span>
      </motion.div>

      {/* Headline cluster — Poppins-bold mark with rotating subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto mb-8 md:mb-10"
      >
        <h2
          className="font-poppins font-bold tracking-tight text-foreground leading-[1.02] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          {headlinePre}{" "}
          <span className="text-primary inline-block whitespace-nowrap">{headlinePost}</span>
        </h2>

        <div className="min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSubtitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4"
            >
              {subtitles[currentSubtitle]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Service cards — every category lists every service it ships,
          with the canonical MyAgent pill aesthetic (icon + name on a
          brand-blue tinted chip). Categories use brand-consistent dark
          chrome with a subtle primary-blue accent, not per-category
          colors that drift away from the Natyv visual system. */}
      <motion.div
        className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full max-w-6xl mx-auto mb-10 px-2 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {functions.map((fn, index) => {
          const isExpanded = !!expandedCards[fn.id];
          const visibleServices = isExpanded
            ? fn.services
            : fn.services.slice(0, VISIBLE_PILLS);
          const hasMore = fn.services.length > VISIBLE_PILLS;

          return (
            <motion.article
              key={fn.id}
              id={fn.id}
              className="group relative flex flex-col rounded-2xl backdrop-blur-md transition-all duration-300 overflow-hidden border border-border/40 scroll-mt-24"
              // No outside colored border (per Damian's feedback - it
              // read as inconsistent). Just a subtle neutral border, a
              // gradient bg tinted with the category color, and a soft
              // outer glow.
              style={{
                background: `linear-gradient(140deg, ${fn.color}14 0%, hsl(var(--background) / 0.75) 55%, hsl(var(--background) / 0.9) 100%)`,
                boxShadow: `0 20px 50px -20px ${fn.color}33`,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 + index * 0.06 }}
            >
              {/* Top accent stripe — solid colored bar across the full
                  card width. The "subtle banner that separates the top
                  of the card." */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0"
                style={{ height: 4, background: fn.color }}
              />

              <div className="flex flex-col h-full p-5 md:p-6 pt-5 md:pt-6">
                {/* Card header — solid colored circle + title only.
                    Tagline removed per request; the title carries the
                    section by itself, the services below carry the
                    rest. */}
                <Link
                  to={`/services#${fn.id}`}
                  className="flex items-center gap-3 mb-4"
                  aria-label={`${fn.title} - view all services`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: fn.color,
                      boxShadow: `0 8px 24px -8px ${fn.color}99`,
                    }}
                  >
                    <fn.icon className="w-6 h-6 text-white" strokeWidth={2.25} aria-hidden="true" />
                  </div>
                  <h3
                    className="font-poppins font-bold text-xl md:text-2xl leading-tight"
                    style={{ color: fn.color }}
                  >
                    {fn.title}
                  </h3>
                </Link>

                {/* Subtle divider that separates header from pills. */}
                <div
                  aria-hidden="true"
                  className="w-full mb-4"
                  style={{
                    height: 1,
                    background: `${fn.color}33`,
                  }}
                />

                {/* Service pills — one per row. Click a pill to reveal
                    its outcome line; click again to collapse. */}
                <ul className="flex flex-col gap-1.5 flex-1">
                  {visibleServices.map((service) => {
                    const pillKey = `${fn.id}::${service.name}`;
                    const pillExpanded = expandedPills.has(pillKey);
                    return (
                      <li
                        key={service.name}
                        className="overflow-hidden transition-all"
                        style={{
                          background: `${fn.color}14`,
                          border: `1px solid ${fn.color}55`,
                          // rounded-full when collapsed, rounded-xl when
                          // expanded so the multi-line shape doesn't read
                          // as a stretched ellipse.
                          borderRadius: pillExpanded ? "0.75rem" : "9999px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => togglePill(fn.id, service.name)}
                          aria-expanded={pillExpanded}
                          className="w-full flex items-center gap-2 px-3 py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-0 text-left text-xs font-medium text-foreground/95"
                        >
                          <service.icon
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: fn.color }}
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                          <span className="leading-none flex-1">{service.name}</span>
                          <ChevronDown
                            className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                              pillExpanded ? "rotate-180" : ""
                            }`}
                            style={{ color: `${fn.color}cc` }}
                            aria-hidden="true"
                          />
                        </button>
                        {pillExpanded && (
                          <div
                            className="px-3 pb-2 pt-1.5 text-[11px] text-foreground/80 leading-relaxed"
                            style={{ borderTop: `1px solid ${fn.color}26` }}
                          >
                            {service.outcome}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Show all / show less expand affordance — only renders
                    when the category has more than VISIBLE_PILLS items. */}
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(fn.id)}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[44px] sm:min-h-0 text-xs font-poppins font-semibold transition-colors hover:opacity-80"
                    style={{ color: fn.color }}
                  >
                    {isExpanded
                      ? "Show less"
                      : `Show all ${fn.services.length} ${fn.title.toLowerCase()} services`}
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform"
                      style={{
                        transform: isExpanded ? "rotate(-90deg)" : "rotate(90deg)",
                      }}
                    />
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

    </section>
  );
};

export default HomepageServices;
