import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Rocket, ShieldCheck, X, CalendarDays, UserRound } from "lucide-react";
import { MYAGENT_NORTH_STAR_PATH } from "@/components/brand/MyAgentLogo";

type CtaMode = "cal" | "link";

const offers = [
  {
    id: "ai-opportunity-assessment",
    name: "AI Opportunity Assessment",
    color: "#38bdf8",
    icon: Sparkles,
    featured: false,
    badge: "First step",
    price: "$250",
    priceNote: "48-hr report",
    totalValue: null as string | null,
    stack: [
      ["Private intake with Ava", ""],
      ["Human-reviewed report", ""],
      ["Three ranked opportunities", ""],
      ["$250 credited toward White-Glove Build", ""],
    ],
    guarantee: "Three practical opportunities—or your money back.",
    cta: "Book the assessment",
    ctaMode: "link" as CtaMode,
    href: "/assessment",
  },
  {
    id: "founder-strategy-session",
    name: "Founder-Led AI Strategy Session",
    titleLines: ["Founder-Led", "AI Strategy Session"] as const,
    color: "#1077FA",
    icon: UserRound,
    featured: true,
    badge: "Most popular",
    price: "$497",
    priceNote: "fully credited",
    totalValue: "$3,147",
    stack: [
      ["Live session with Damian (founder)", ""],
      ["Your first point of contact — not the intake bot", ""],
      ["Clear next step before any build", ""],
      ["$497 credited toward White-Glove Build", ""],
    ],
    guarantee: "Clear next step—or we continue at no extra fee.",
    cta: "Book with the founder",
    ctaMode: "cal" as CtaMode,
  },
  {
    id: "founding-member",
    name: "White-Glove Build",
    color: "#f59e0b",
    icon: Rocket,
    featured: false,
    badge: "10 spots",
    price: "$999",
    priceNote: "first 10 only",
    totalValue: "$5,700",
    stack: [
      ["Agent trained on you", "$2,000"],
      ["Number + page + widget", "$1,200"],
      ["90 days of service", "$1,500"],
      ["White-glove setup", "$1,000"],
    ],
    guarantee: "Live in days—or we keep going free.",
    cta: "Claim a spot",
    ctaMode: "cal" as CtaMode,
  },
];

type Offer = (typeof offers)[number];

const StartHereOffers = () => {
  const [booking, setBooking] = useState<Offer | null>(null);

  const calSrc = booking
    ? `https://cal.com/damian-schaeffer/consultation?layout=month_view&theme=dark&hideEventTypeDetails=true&notes=${encodeURIComponent(
        `Interested in ${booking.name} (${booking.price})`
      )}`
    : "";

  const onOfferClick = (offer: Offer) => {
    if (offer.ctaMode === "link" && offer.href) {
      window.location.href = offer.href;
      return;
    }
    setBooking(offer);
  };

  return (
    <section
      id="start-here"
      className="relative flex flex-col items-center px-2 sm:px-6 pt-12 md:pt-16 pb-16 md:pb-20 overflow-hidden scroll-mt-24 border-t border-border/40"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8 md:mb-10"
      >
        <span
          className="inline-block px-4 py-1.5 text-primary border border-primary/30 rounded-full font-accent uppercase"
          style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", letterSpacing: "0.18em", fontWeight: 500 }}
        >
          Start Here
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center font-poppins font-bold text-foreground leading-[1.04] mb-10 md:mb-14 max-w-[calc(100vw-2rem)] mx-auto break-words"
        style={{ fontSize: "clamp(2.15rem, 7.2vw, 4.35rem)", letterSpacing: "0" }}
      >
        Stop guessing.
        <span className="block text-primary">Start scaling.</span>
      </motion.h2>

      <motion.div
        className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full max-w-6xl mx-auto px-2 sm:px-0 items-stretch"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {offers.map((offer, index) => (
          <motion.article
            key={offer.id}
            id={offer.id}
            className={`group relative flex flex-col overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-300 border scroll-mt-28 ${
              offer.featured ? "border-primary/60 lg:scale-[1.03] lg:-translate-y-1 shadow-2xl" : "border-border/40"
            }`}
            style={{
              background: `linear-gradient(140deg, ${offer.color}14 0%, hsl(var(--background) / 0.75) 55%, hsl(var(--background) / 0.9) 100%)`,
              boxShadow: offer.featured ? `0 28px 60px -18px ${offer.color}55` : `0 20px 50px -20px ${offer.color}33`,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 + index * 0.06 }}
          >
            <div aria-hidden="true" className="absolute top-0 left-0 right-0" style={{ height: 4, background: offer.color }} />

            <div className="flex flex-col h-full p-5 md:p-6 pt-5">
              <div className="h-7 mb-2 flex items-center justify-center">
                {offer.badge && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-poppins font-semibold uppercase tracking-wider text-white" style={{ background: offer.color }}>
                    {offer.badge}
                  </span>
                )}
              </div>

              <div className={`flex gap-3 mb-4 ${offer.titleLines ? "items-start min-h-[3.75rem]" : "items-center min-h-[3.25rem]"}`}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: offer.color, boxShadow: `0 8px 24px -8px ${offer.color}99` }}>
                  <offer.icon className="w-5 h-5 text-white" strokeWidth={2.25} aria-hidden="true" />
                </div>
                <h3
                  className={`font-poppins font-bold text-base md:text-lg text-left ${
                    offer.titleLines ? "leading-[1.08]" : "leading-tight"
                  }`}
                  style={{ color: offer.color }}
                >
                  {"titleLines" in offer && offer.titleLines ? (
                    <>
                      <span className="block">{offer.titleLines[0]}</span>
                      <span className="block mt-px">{offer.titleLines[1]}</span>
                    </>
                  ) : (
                    offer.name
                  )}
                </h3>
              </div>

              <ul className="flex flex-col gap-2 mb-4">
                {offer.stack.map(([item, val]) => (
                  <li key={item} className="flex items-center justify-between gap-3 text-xs text-foreground/90">
                    <span className="flex items-center gap-2 text-left">
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: offer.color }} />
                      {item}
                    </span>
                    {val ? <span className="text-muted-foreground whitespace-nowrap tabular-nums">{val}</span> : null}
                  </li>
                ))}
              </ul>

              <div aria-hidden="true" className="w-full mb-3" style={{ height: 1, background: `${offer.color}33` }} />

              <div className="mb-3">
                {offer.totalValue ? (
                  <span className="text-xs text-muted-foreground line-through mr-2">{offer.totalValue}</span>
                ) : null}
                <span className="font-poppins font-bold text-3xl md:text-4xl text-foreground">{offer.price}</span>
                <span className="text-xs text-muted-foreground ml-2">{offer.priceNote}</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-4 mt-auto min-h-[2.75rem]" style={{ background: `${offer.color}12`, border: `1px solid ${offer.color}40` }}>
                <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: offer.color }} strokeWidth={2.25} aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] text-foreground/90 text-left leading-snug lg:whitespace-nowrap">
                  {offer.guarantee}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onOfferClick(offer)}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full font-poppins font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:gap-3"
                style={{ background: offer.color, boxShadow: `0 8px 24px -10px ${offer.color}99` }}
              >
                {offer.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-4"
      >
        <p className="text-sm text-foreground/75 text-center max-w-lg">
          Assessment fees stack toward White-Glove Build — $250 and $497 both credit to the $999 package.
          Not sure which door? Talk it through, or try MyAgent free.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => setBooking(offers[1])}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border/60 bg-card/50 text-foreground font-poppins font-semibold text-sm hover:border-primary/50 transition-colors"
          >
            <CalendarDays className="w-4 h-4 text-primary" aria-hidden="true" />
            Book a 15-min call
          </button>
          <button
            type="button"
            onClick={() => document.getElementById("myagent-section")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-primary/10 text-foreground font-poppins font-semibold text-sm hover:bg-primary/15 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-primary flex-shrink-0" aria-hidden="true">
              <svg viewBox="24 24 152 152" className="w-3 h-3"><path d={MYAGENT_NORTH_STAR_PATH} fill="#fff" /></svg>
            </span>
            Meet MyAgent — free
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">No credit card · cancel anytime</p>
      </motion.div>

      <AnimatePresence>
        {booking && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={() => setBooking(null)} />
            <motion.div
              className="relative z-10 w-full max-w-3xl rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border/60">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: booking.color, boxShadow: `0 8px 24px -8px ${booking.color}99` }}>
                    <booking.icon className="w-4.5 h-4.5 text-white" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-poppins font-bold text-foreground leading-tight truncate">{booking.name}</div>
                    <div className="text-xs text-muted-foreground">Pick a time — {booking.price}, {booking.priceNote}</div>
                  </div>
                </div>
                <button type="button" onClick={() => setBooking(null)} aria-label="Close" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors flex-shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe
                title={`Book ${booking.name}`}
                src={calSrc}
                className="w-full h-[60vh] sm:h-[520px] bg-background"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StartHereOffers;
