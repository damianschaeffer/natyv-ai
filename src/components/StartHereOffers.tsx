import { motion } from "framer-motion";
import { ArrowRight, Search, Map, Rocket } from "lucide-react";

// "Start Here" paid offers — the three fixed-price entry points that sit
// above the full service catalog on /services. Each card links to a live
// Stripe Payment Link (one-time payment, not the SaaS subscription flow),
// so a visitor can buy the first step without a sales call. Visual chrome
// intentionally mirrors HomepageServices cards (tinted gradient article,
// 4px accent stripe, motion entrances) so the page reads as one system.
const offers = [
  {
    id: "visibility-audit",
    name: "Website & AI Visibility Audit",
    price: "$250",
    priceNote: "one-time · 48-hour turnaround",
    color: "#38bdf8",
    icon: Search,
    featured: false,
    description:
      "See exactly what customers — and AI search like ChatGPT and Google AI — find when they look for your business.",
    includes: [
      "Scored report across your website + AI visibility",
      "Prioritized fix list, ranked by revenue impact",
      "20-minute walkthrough call with the founder",
      "Credited toward the Assessment if you upgrade",
    ],
    cta: "Get your audit",
    href: "https://buy.stripe.com/6oU3cxboC7Sh9sxdAR93y03",
  },
  {
    id: "opportunity-assessment",
    name: "AI Opportunity Assessment",
    price: "$497",
    priceNote: "one-time · fully credited toward your build",
    color: "#1077FA",
    icon: Map,
    featured: true,
    description:
      "A founder-led working session that maps where AI pays back fastest in your business — before you commit to anything.",
    includes: [
      "1:1 discovery session with our founder",
      "48-hour AI Opportunity Map with ROI snapshot",
      "Quick-win plan you keep, whoever builds it",
      "Full $497 credited toward your first implementation",
    ],
    cta: "Book your assessment",
    href: "https://buy.stripe.com/3cIcN72S66OdcEJ2Wd93y02",
  },
  {
    id: "founding-member",
    name: "Founding Member Launch Package",
    price: "$999",
    priceNote: "one-time · first 10 businesses only",
    color: "#f59e0b",
    icon: Rocket,
    featured: false,
    description:
      "We build your AI employee for you — white-glove — and run it for 90 days so you see the results before any subscription.",
    includes: [
      "MyAgent voice agent trained on your business",
      "Local business phone number, live in days",
      "AI business page with chat + voice widget",
      "90 days of MyAgent Growth-tier service included",
    ],
    cta: "Claim a founding spot",
    href: "https://buy.stripe.com/8x2aEZfES5K9fQV7ct93y04",
  },
];

const StartHereOffers = () => {
  return (
    <section
      id="start-here"
      className="relative flex flex-col items-center px-2 sm:px-6 pt-12 md:pt-16 pb-16 md:pb-20 overflow-hidden"
    >
      {/* Ambient glow — primary-blue tint marking the paid entry points */}
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
          style={{
            fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          Start Here
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center max-w-4xl mx-auto mb-10 md:mb-12"
      >
        <h2
          className="font-poppins font-bold tracking-tight text-foreground leading-[1.05] mb-5"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Pick your first step.{" "}
          <span className="text-primary">Fixed price. No retainer.</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4">
          Three ways to start working with us today — each one designed so you
          know exactly what AI is worth to your business before you spend
          another dollar.
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full max-w-6xl mx-auto px-2 sm:px-0 items-stretch"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        {offers.map((offer, index) => (
          <motion.article
            key={offer.id}
            className={`group relative flex flex-col rounded-2xl backdrop-blur-md transition-all duration-300 overflow-hidden border ${
              offer.featured ? "border-primary/50" : "border-border/40"
            }`}
            style={{
              background: `linear-gradient(140deg, ${offer.color}14 0%, hsl(var(--background) / 0.75) 55%, hsl(var(--background) / 0.9) 100%)`,
              boxShadow: `0 20px 50px -20px ${offer.color}33`,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0"
              style={{ height: 4, background: offer.color }}
            />

            {offer.featured && (
              <span
                className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-poppins font-semibold uppercase tracking-wider text-white"
                style={{ background: offer.color }}
              >
                Most popular
              </span>
            )}

            <div className={`flex flex-col h-full p-5 md:p-6 ${offer.featured ? "pt-12" : "pt-6"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: offer.color,
                    boxShadow: `0 8px 24px -8px ${offer.color}99`,
                  }}
                >
                  <offer.icon className="w-6 h-6 text-white" strokeWidth={2.25} aria-hidden="true" />
                </div>
                <h3
                  className="font-poppins font-bold text-lg md:text-xl leading-tight"
                  style={{ color: offer.color }}
                >
                  {offer.name}
                </h3>
              </div>

              <div className="mb-4">
                <span className="font-poppins font-bold text-3xl md:text-4xl text-foreground">
                  {offer.price}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{offer.priceNote}</p>
              </div>

              <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                {offer.description}
              </p>

              <div
                aria-hidden="true"
                className="w-full mb-4"
                style={{ height: 1, background: `${offer.color}33` }}
              />

              <ul className="flex flex-col gap-2 flex-1 mb-5">
                {offer.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: offer.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={offer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full font-poppins font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:gap-3"
                style={{
                  background: offer.color,
                  boxShadow: `0 8px 24px -10px ${offer.color}99`,
                }}
              >
                {offer.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-8 text-xs text-muted-foreground text-center max-w-xl px-4"
      >
        Secure checkout by Stripe. We reach out within one business day to
        schedule. Prefer to talk first? Email{" "}
        <a href="mailto:damian@get-myagent.com" className="text-primary hover:underline">
          damian@get-myagent.com
        </a>
        .
      </motion.p>
    </section>
  );
};

export default StartHereOffers;
