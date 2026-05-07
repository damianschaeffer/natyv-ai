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
  Lightbulb,
  Palette,
  Film,
  MailCheck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

interface Service {
  name: string;
  icon: LucideIcon;
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
      { name: "24/7 Call Answering", icon: Phone },
      { name: "Instant Text Response", icon: MessageSquare },
      { name: "Personalized Phone Setup", icon: PhoneCall },
      { name: "Local Business Number", icon: MapPin },
      { name: "Website Chat Widget", icon: MessageCircle },
      { name: "Unified Message Inbox", icon: Inbox },
      { name: "Lead Conversation Assistant", icon: Bot },
      { name: "Direct Voicemail Drop", icon: Voicemail },
      { name: "Google Messages Connection", icon: MessagesSquare },
      { name: "Call Recording & Quality", icon: Mic },
      { name: "Call Sentiment Analysis", icon: Gauge },
      { name: "VIP Priority Line", icon: Crown },
      { name: "70+ Language Voice Support", icon: Languages },
    ],
  },
  {
    id: "sales",
    title: "Sales",
    tagline: "Capture, qualify, and close — without the bottleneck.",
    icon: TrendingUp,
    color: "#10B981", // green (emerald)
    services: [
      { name: "Instant Lead Connection", icon: Zap },
      { name: "Visual Sales Pipeline", icon: LayoutGrid },
      { name: "Fair Lead Distribution", icon: UserPlus },
      { name: "Custom Lead Forms", icon: FileText },
      { name: "Interactive Quizzes", icon: HelpCircle },
      { name: "Quote Generator", icon: Receipt },
      { name: "Local Lead Finder", icon: Search },
      { name: "Referral Partner Program", icon: Users },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    tagline: "Smart scheduling. Real systems. Hours back.",
    icon: Settings2,
    color: "#3C83F6", // blue (brand primary)
    services: [
      { name: "Smart Scheduling", icon: Calendar },
      { name: "No-Show Prevention", icon: Bell },
      { name: "Team Task Assignment", icon: ClipboardList },
      { name: "Team Notifications", icon: BellRing },
      { name: "Branded Client Portal", icon: AppWindow },
      { name: "Branded Installable Progressive Web App", icon: Smartphone },
      { name: "Multi-Location System Clone", icon: Copy },
      { name: "White-Label Platform Builder", icon: Layers },
      { name: "Applicant Tracking System", icon: Briefcase },
      { name: "Employee Training Portal", icon: GraduationCap },
      { name: "Team Performance Leaderboard", icon: Trophy },
      { name: "At-Risk Client Alerts", icon: AlertTriangle },
      { name: "Advanced Performance Analytics", icon: BarChart3 },
      { name: "Competitor Automation", icon: Eye },
      { name: "Automation Connection Hub", icon: Cable },
      { name: "Professional Website Hosting", icon: Server },
      { name: "Privacy-First Data Handling", icon: Lock },
      { name: "Accessibility Scans & Remediation", icon: ShieldAlert },
      { name: "Secure Video Hosting", icon: Video },
      { name: "Security Audit Service", icon: ShieldCheck },
      { name: "AI-Drafted Policy Templates", icon: Scale },
      { name: "Technical Setup Service", icon: Wrench },
      { name: "Priority Support Access", icon: Headphones },
      { name: "Strategy Consultation", icon: Lightbulb },
      { name: "A2P 10DLC Registration Support", icon: ShieldCheck },
      { name: "Waitlist Manager", icon: Clock },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    tagline: "Get paid faster. Reconcile less. Sleep better.",
    icon: CreditCard,
    color: "#EF4444", // red
    services: [
      { name: "Text-to-Pay Invoicing", icon: CreditCard },
      { name: "Automatic Invoicing", icon: FileCheck },
      { name: "Recurring Payments", icon: RotateCcw },
      { name: "Deposit Collection", icon: Wallet },
      { name: "Abandoned Cart Recovery", icon: ShoppingCart },
      { name: "Discount Code Manager", icon: Tag },
      { name: "Mobile Card Reader", icon: Smartphone },
      { name: "Automatic Receipts", icon: CheckCircle },
      { name: "Digital Signatures", icon: FileSignature },
      { name: "Secure Document Upload", icon: Upload },
      { name: "Merchandise Store Setup", icon: Store },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Show up everywhere — without an agency for each channel.",
    icon: Megaphone,
    color: "#FB923C", // orange
    services: [
      { name: "Instant Website Launch", icon: Globe },
      { name: "Auto-Review Requests", icon: Star },
      { name: "Online Directory Sync", icon: FolderSync },
      { name: "Auto-Review Responses", icon: Reply },
      { name: "Social Post Scheduler", icon: Share2 },
      { name: "Content Writing Assistant", icon: Pencil },
      { name: "Do-It-Yourself Facebook Ads", icon: TrendingUp },
      { name: "Do-It-Yourself Google Ads", icon: Target },
      { name: "Automated Postcard Mailings", icon: Mailbox },
      { name: "Dedicated Sending Domain", icon: Mail },
      { name: "Email Delivery Optimization", icon: MailCheck },
      { name: "Graphic Design Service", icon: Palette },
      { name: "Video Production Service", icon: Film },
    ],
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    tagline: "Make every customer feel remembered — even at scale.",
    icon: Heart,
    color: "#8B5CF6", // violet
    services: [
      { name: "Automatic Follow-Up", icon: Send },
      { name: "Past Customer Outreach", icon: Users },
      { name: "New Client Welcome Sequence", icon: ListChecks },
      { name: "Birthday Campaign Automation", icon: Cake },
    ],
  },
];

// Static headline — agency promise framed around customization (not effort)
const HEADLINE_PRE = "Your stack.";
const HEADLINE_POST = "Built around you.";

// Rotating subtitles — carry the agency-engagement message that the
// retired PivotBanner used to deliver, now native to the SERVICES section.
const SUBTITLES = [
  "Customized to your specific operations.",
  "Designed and implemented by our team.",
];

const HomepageServices = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % SUBTITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="homepage-services"
      className="relative flex flex-col items-center px-2 sm:px-6 pt-12 md:pt-16 pb-20 md:pb-28 overflow-hidden border-t border-border/40"
    >
      {/* Ambient glow — slightly warmer tint to subtly mark Path B (agency) territory */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.025] blur-[150px] pointer-events-none" />

      {/* Section entrance — sits near the TOP of the scroll-stop with
          generous separation below before "Your stack. Built around
          you." so the SectionHeader reads as the section's transition
          marker, not the page's H1. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-20 md:mb-32 lg:mb-40"
      >
        <SectionHeader section="SERVICES" />
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
          {HEADLINE_PRE}{" "}
          <span className="text-primary inline-block whitespace-nowrap">{HEADLINE_POST}</span>
        </h2>

        <div className="min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSubtitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4"
            >
              {SUBTITLES[currentSubtitle]}
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
        {functions.map((fn, index) => (
          <motion.article
            key={fn.id}
            className="group relative flex flex-col rounded-2xl backdrop-blur-md transition-all duration-300 overflow-hidden"
            // Aesthetic mirrors the get-myagent.com tier cards:
            //  - solid colored top accent bar
            //  - 2px tinted border in the category color around the whole card
            //  - gradient bg tinted with the category color
            //  - soft outer glow in the category color
            style={{
              border: `2px solid ${fn.color}80`,
              background: `linear-gradient(140deg, ${fn.color}1a 0%, hsl(var(--background) / 0.7) 55%, hsl(var(--background) / 0.85) 100%)`,
              boxShadow: `0 0 0 1px ${fn.color}1a, 0 20px 50px -20px ${fn.color}40`,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + index * 0.06 }}
          >
            {/* Top accent bar — solid colored stripe across the full
                card width, matching the get-myagent.com tier cards. */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0"
              style={{ height: 4, background: fn.color }}
            />

            <Link
              to={`/services#${fn.id}`}
              className="flex flex-col h-full p-6 md:p-7 pt-7 md:pt-8"
              aria-label={`${fn.title} — view all services`}
            >
              {/* Card header — solid colored circle replaces the agent
                  avatar from MyAgent's package cards. */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: fn.color,
                    boxShadow: `0 8px 24px -8px ${fn.color}99`,
                  }}
                >
                  <fn.icon className="w-7 h-7 text-white" strokeWidth={2.25} aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3
                    className="font-poppins font-bold text-xl md:text-2xl leading-tight"
                    style={{ color: fn.color }}
                  >
                    {fn.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-body leading-snug mt-1">
                    {fn.tagline}
                  </p>
                </div>
              </div>

              {/* Service pills.
                  - whitespace-nowrap on each pill prevents long names
                    from wrapping to 2 lines (which was causing the
                    "big oval" bug — a 2-line pill made siblings in the
                    same row stretch to match height).
                  - items-start on the UL keeps each pill at its natural
                    height regardless of neighbors.
                  - Uniform px-3 py-1.5 padding on every pill. */}
              <ul className="flex flex-wrap items-start gap-2 mb-5 flex-1">
                {fn.services.map((service) => (
                  <li
                    key={service.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-foreground/95 whitespace-nowrap transition-colors"
                    style={{
                      background: `${fn.color}14`,
                      border: `1px solid ${fn.color}55`,
                    }}
                  >
                    <service.icon
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: fn.color }}
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    <span className="leading-none">{service.name}</span>
                  </li>
                ))}
              </ul>

              {/* Inline jump-link affordance — uses the category color. */}
              <div
                className="inline-flex items-center gap-1.5 text-xs font-poppins font-semibold transition-colors mt-auto"
                style={{ color: fn.color }}
              >
                <span>See all {fn.title.toLowerCase()} services</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      {/* CTA — pill-shaped to match Studio's button chrome */}
      <motion.div
        className="relative z-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link to="/services">
          <Button
            className="h-10 sm:h-11 px-5 sm:px-6 text-sm font-poppins font-semibold rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <Sparkles className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Explore all services
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      {/* Secondary line — carry Path B forward to consultation booking */}
      <motion.p
        className="relative z-10 mt-6 text-sm text-muted-foreground font-body text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Or have us design it for you{" "}
        <Link to="/advisory" className="text-primary hover:underline font-semibold">
          → Talk to a strategist
        </Link>
      </motion.p>
    </section>
  );
};

export default HomepageServices;
