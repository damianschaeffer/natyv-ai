import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  TrendingUp,
  Settings2,
  CreditCard,
  Megaphone,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

interface ServiceFunction {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Phone;
  // Brand-aligned category color — used for the icon, the card's
  // ambient glow, and the inner service pills so each functional area
  // has its own visual identity instead of all six being uniform.
  color: string;
  services: string[];
}

// Mirrors src/pages/Services.tsx — keep in sync when service catalog changes.
// Service names are written as outcomes/services, not roles (so a visitor
// reads "this is what gets done" instead of "this is who we're hiring").
const functions: ServiceFunction[] = [
  {
    id: "front-desk",
    title: "Front Desk",
    tagline: "Never miss a call. Never lose a lead.",
    icon: Phone,
    color: "#3C83F6", // blue (brand primary)
    services: [
      "24/7 AI Voice Receptionist",
      "Personal Call Concierge",
      "Instant Text Response",
      "VIP Priority Routing",
      "Call Sentiment Analysis",
    ],
  },
  {
    id: "sales",
    title: "Sales",
    tagline: "Capture, qualify, and close — without the bottleneck.",
    icon: TrendingUp,
    color: "#f59e0b", // amber
    services: [
      "Lead Generation",
      "Lead Qualification & Routing",
      "Quote Generator",
      "Abandoned Inquiry Recovery",
      "Instant Lead Connection",
    ],
  },
  {
    id: "operations",
    title: "Operations",
    tagline: "Smart scheduling. Fewer no-shows. Hours back.",
    icon: Settings2,
    color: "#8b5cf6", // violet
    services: [
      "Smart Scheduling",
      "No-Show Prevention",
      "Auto-Review Requests",
      "Conversation Memory",
      "Multi-Location Cloning",
    ],
  },
  {
    id: "finance",
    title: "Finance",
    tagline: "Get paid faster. Reconcile less. Sleep better.",
    icon: CreditCard,
    color: "#10b981", // emerald
    services: [
      "Text-to-Pay Invoicing",
      "Automated A/R Recovery",
      "Recurring Payment Setup",
      "Quote-to-Cash Automation",
      "Mobile Card Reader Setup",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Show up everywhere — without an agency for each channel.",
    icon: Megaphone,
    color: "#f43f5e", // rose
    services: [
      "Social Media Posting",
      "Content Drafting",
      "DIY Facebook & Google Ads",
      "AI-Drafted Marketing Sequences",
      "Online Directory Sync",
    ],
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    tagline: "Make every customer feel remembered — even at scale.",
    icon: Heart,
    color: "#06b6d4", // cyan
    services: [
      "AI-Powered Follow-Ups",
      "New Client Welcome Sequences",
      "Past Customer Outreach",
      "Branded Client Portal",
      "Birthday & Loyalty Campaigns",
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

      {/* Headline cluster — Poppins-bold mark with rotating headline + subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto mb-8 md:mb-10"
      >
        {/* Static headline — same pattern as MyAgent.com section headers */}
        <h2
          className="font-poppins font-bold tracking-tight text-foreground leading-[1.02] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          {HEADLINE_PRE}{" "}
          <span className="text-primary inline-block whitespace-nowrap">{HEADLINE_POST}</span>
        </h2>

        {/* Rotating subtitle — fixed height container so cards don't jump */}
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

      {/* Service cards — each card lists its 5 sub-services as chips */}
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
            className="group relative flex flex-col p-6 rounded-2xl backdrop-blur-md transition-all duration-300 overflow-hidden"
            style={{
              // Card border + subtle tint use the category color so each
              // card has its own visual identity without losing the dark
              // brand atmosphere.
              border: `1px solid ${fn.color}33`,
              background: `linear-gradient(145deg, ${fn.color}08 0%, hsl(var(--background) / 0.5) 60%)`,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + index * 0.06 }}
          >
            {/* Ambient color glow in the card's top-right corner —
                tints the card with the category color. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"
              style={{ background: fn.color }}
            />

            <Link
              to={`/services#${fn.id}`}
              className="relative flex flex-col h-full"
              aria-label={`${fn.title} — view all services`}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    background: `${fn.color}1a`,
                    border: `1px solid ${fn.color}33`,
                  }}
                >
                  <fn.icon
                    className="w-5 h-5"
                    style={{ color: fn.color }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-poppins font-bold text-lg md:text-xl text-foreground leading-tight">
                  {fn.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                {fn.tagline}
              </p>

              {/* Service chips — tinted with the category color so each
                  set of services reads as one visual cluster. */}
              <ul className="flex flex-wrap gap-1.5 mb-4 flex-1">
                {fn.services.map((service) => (
                  <li
                    key={service}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-foreground/90 transition-colors"
                    style={{
                      background: `${fn.color}14`,
                      border: `1px solid ${fn.color}40`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: fn.color }}
                    />
                    {service}
                  </li>
                ))}
              </ul>

              {/* Inline jump-link affordance — uses the category color */}
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
      <div className="relative z-10 mt-4">
        <Link
          to="/advisory"
          className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          Want to talk first? Book a consultation →
        </Link>
      </div>
    </section>
  );
};

export default HomepageServices;
