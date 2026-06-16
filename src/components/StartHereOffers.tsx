import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Map, Rocket, ShieldCheck, X, CalendarDays } from "lucide-react";
import { MYAGENT_NORTH_STAR_PATH } from "@/components/brand/MyAgentLogo";

// "Start Here" — the three Grand Slam Offers (value-stacked, guaranteed,
// $497 center). Copy kept deliberately terse: names, scannable stacks,
// one-line guarantees. No prose. Dollar values / guarantee terms / scarcity
// are DRAFTS for Damian's sign-off before deploy — real commitments.
const offers = [
  {
    id: "visibility-audit",
    name: "Visibility Audit",
    color: "#38bdf8",
    icon: Search,
    featured: false,
    badge: "First step",
    price: "$250",
    priceNote: "48-hr turnaround",
    totalValue: "$1,450",
    stack: [
      ["AI + search visibility scan", "$500"],
      ["Revenue-ranked fixes", "$400"],
      ["Founder walkthrough", "$300"],
      ["Credited to your Map", "$250"],
    ],
    guarantee: "3 opportunities or it's free.",
    cta: "Get the audit",
    href: "https://buy.stripe.com/6oU3cxboC7Sh9sxdAR93y03",
  },
  {
    id: "opportunity-assessment",
    name: "AI Opportunity Map",
    color: "#1077FA",
    icon: Map,
    featured: true,
    badge: "Most popular",
    price: "$497",
    priceNote: "fully credited",
    totalValue: "$3,147",
    stack: [
      ["Founder strategy session", "$750"],
      ["48-hr ROI map", "$1,000"],
      ["Quick-win plan", "$500"],
      ["Bonus: build-team access", "$400"],
    ],
    guarantee: "10× ROI or it's free.",
    cta: "Book the map",
    href: "https://buy.stripe.com/3cIcN72S66OdcEJ2Wd93y02",
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
    guarantee: "Live in days or we keep going free.",
    cta: "Claim a spot",
    href: "https://buy.stripe.com/8x2aEZfES5K9fQV7ct93y04",
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
            className={`group relative flex flex-col overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-300 border ${
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
              {/* Badge row — reserved on EVERY card (empty on the plain tier)
                  so the three headers lock to the same frame and the badge
                  never overlaps the title. */}
              <div className="h-7 mb-2 flex items-center justify-center">
                {offer.badge && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-poppins font-semibold uppercase tracking-wider text-white" style={{ background: offer.color }}>
                    {offer.badge}
                  </span>
                )}
              </div>

              {/* Header — fixed min-height so a 1-line and a 2-line title
                  still align the stacks/prices across all three cards. */}
              <div className="flex items-center gap-3 mb-4 min-h-[3.25rem]">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: offer.color, boxShadow: `0 8px 24px -8px ${offer.color}99` }}>
                  <offer.icon className="w-5 h-5 text-white" strokeWidth={2.25} aria-hidden="true" />
                </div>
                <h3 className="font-poppins font-bold text-base md:text-lg leading-tight" style={{ color: offer.color }}>
                  {offer.name}
                </h3>
              </div>

              <ul className="flex flex-col gap-2 mb-4">
                {offer.stack.map(([item, val]) => (
                  <li key={item} className="flex items-center justify-between gap-3 text-xs text-foreground/90">
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: offer.color }} />
                      {item}
                    </span>
                    <span className="text-muted-foreground whitespace-nowrap tabular-nums">{val}</span>
                  </li>
                ))}
              </ul>

              <div aria-hidden="true" className="w-full mb-3" style={{ height: 1, background: `${offer.color}33` }} />

              <div className="mb-3">
                <span className="text-xs text-muted-foreground line-through mr-2">{offer.totalValue}</span>
                <span className="font-poppins font-bold text-3xl md:text-4xl text-foreground">{offer.price}</span>
                <span className="text-xs text-muted-foreground ml-2">{offer.priceNote}</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-4 mt-auto" style={{ background: `${offer.color}12`, border: `1px solid ${offer.color}40` }}>
                <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: offer.color }} strokeWidth={2.25} aria-hidden="true" />
                <span className="text-[11px] text-foreground/90">{offer.guarantee}</span>
              </div>

              <button
                type="button"
                onClick={() => setBooking(offer)}
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
        <p className="text-sm text-foreground/75 text-center max-w-md">
          Not ready to pick one? You're not stuck — talk it through with me, or
          try your agent yourself, free.
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

      {/* Booking — the calendar opens ON CLICK of a card, for that offer.
          No standalone calendar section bloating the page. */}
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
