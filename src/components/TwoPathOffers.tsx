import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Search, Map, Sparkles, ChevronRight } from "lucide-react";
import { MYAGENT_NORTH_STAR_PATH } from "@/components/brand/MyAgentLogo";
import { MYAGENT_BADGES, AGENCY_BADGES } from "@/components/TwoPathsFooter";

// "Start Here" — the two-path offer system for /services. Replaces the
// flat 3-card StartHereOffers grid. Every paid step is nested inside the
// path it actually belongs to, so the page reads as the SAME two-path
// model the homepage closes on (TwoPathsFooter), with the price rungs
// made explicit:
//
//   Path 1 — your agent (product):  Free Trial  →  Founding Member $999 (done-for-you)
//   Path 2 — a diagnosis (consult): Audit $250  →  Assessment $497 (each credited to the build)
//
// All three live Stripe Payment Links stay as prominent, tappable CTAs
// (launch-revenue intent preserved); the only change is the grouping.
// Visual chrome mirrors HomepageServices / TwoPathsFooter (tinted
// gradient article, 4px accent stripe, blue-pill eyebrow, motion
// entrances) so the whole page is one system. Owns id="start-here"
// because inbound links and the page JSON-LD point at that anchor.

const PRODUCT_COLOR = "#3b82f6"; // primary blue — the product path
const CONSULT_COLOR = "#38bdf8"; // sky — the diagnostic path
const FOUNDING_COLOR = "#f59e0b"; // amber — the done-for-you build rung

const STRIPE = {
  audit: "https://buy.stripe.com/6oU3cxboC7Sh9sxdAR93y03",
  assessment: "https://buy.stripe.com/3cIcN72S66OdcEJ2Wd93y02",
  founding: "https://buy.stripe.com/8x2aEZfES5K9fQV7ct93y04",
};
const TRIAL_URL = "https://get-myagent.com";

// Inline MyAgent wordmark lockup — same construction as TwoPathsFooter's
// free-trial button so the diamond + "MyAgent" read identically here.
const MyAgentLockup = () => (
  <span
    className="inline-flex items-center"
    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, gap: "0.25em", letterSpacing: "-0.02em", lineHeight: 1 }}
    aria-label="MyAgent"
  >
    <span
      className="inline-flex items-center justify-center bg-primary flex-shrink-0"
      style={{ width: "1em", height: "1em", borderRadius: "0.227em" }}
      aria-hidden="true"
    >
      <svg viewBox="24 24 152 152" style={{ width: "0.8em", height: "0.8em" }}>
        <path d={MYAGENT_NORTH_STAR_PATH} fill="#ffffff" />
      </svg>
    </span>
    <span style={{ whiteSpace: "nowrap" }}>
      <span style={{ color: "hsl(var(--primary))" }}>My</span>
      <span>Agent</span>
    </span>
  </span>
);

const TwoPathOffers = () => {
  return (
    <section
      id="start-here"
      className="relative flex flex-col items-center px-2 sm:px-6 pt-12 md:pt-16 pb-16 md:pb-20 overflow-hidden scroll-mt-24"
    >
      {/* Ambient glow — neutral primary tint, centered so neither path is biased */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full bg-primary/[0.03] blur-[150px] pointer-events-none" />

      {/* Eyebrow */}
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

      {/* Headline */}
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
          Two ways to start.{" "}
          <span className="text-primary">Fixed price. No retainer.</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto px-4">
          Bring on your AI agent today, or start with a diagnosis that shows
          exactly what AI is worth to your business first. Either way, you know
          the value before you spend another dollar.
        </p>
      </motion.div>

      {/* Two paths — identical card chrome, distinct identity through content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-5 md:gap-6 w-full max-w-5xl mx-auto px-2 sm:px-0 items-stretch">

        {/* ───────── Path 1 — Your agent (product) ───────── */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="group relative flex flex-col rounded-2xl backdrop-blur-md overflow-hidden border border-primary/30"
          style={{
            background: `linear-gradient(140deg, ${PRODUCT_COLOR}14 0%, hsl(var(--background) / 0.75) 55%, hsl(var(--background) / 0.9) 100%)`,
            boxShadow: `0 20px 50px -20px ${PRODUCT_COLOR}33`,
          }}
        >
          <div aria-hidden="true" className="absolute top-0 left-0 right-0" style={{ height: 4, background: PRODUCT_COLOR }} />

          <div className="flex flex-col h-full p-6 md:p-7">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: PRODUCT_COLOR, boxShadow: `0 8px 24px -8px ${PRODUCT_COLOR}99` }}
              >
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.25} aria-hidden="true" />
              </div>
              <h3 className="font-poppins font-bold text-xl md:text-2xl leading-tight" style={{ color: PRODUCT_COLOR }}>
                Start with your agent
              </h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-6">
              You know you want it. Stand up your own AI agent that answers
              calls, captures leads, and books appointments 24/7 — try it free,
              or have us build it for you.
            </p>

            {/* Rung 1 — Free trial (self-serve head of the product path) */}
            <a
              href={TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-foreground/15 bg-background/50 hover:bg-background/80 hover:border-foreground/30 transition-all p-4 mb-3"
              aria-label="Start your MyAgent free trial"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-base">
                    <MyAgentLockup />
                    <span className="font-poppins font-semibold text-foreground">Free Trial</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Free · no credit card · live in 60 seconds</p>
                </div>
                <ArrowRight className="w-4 h-4 text-foreground/60 flex-shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </a>

            {/* Rung 2 — Founding Member $999 (done-for-you build). Co-equal,
                always-visible CTA — never demoted beneath the free trial. */}
            <a
              href={STRIPE.founding}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl p-4 transition-all hover:opacity-95"
              style={{ background: `${FOUNDING_COLOR}12`, border: `1px solid ${FOUNDING_COLOR}55` }}
              aria-label="Claim a Founding Member spot — have your agent built for you, $999"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 flex-shrink-0" style={{ color: FOUNDING_COLOR }} strokeWidth={2.25} aria-hidden="true" />
                    <span className="font-poppins font-semibold text-foreground leading-tight">Have us build it for you</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Founding Member — white-glove, 90 days of service · first 10 only
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-poppins font-bold text-xl text-foreground">$999</span>
                </div>
              </div>
            </a>

            <div aria-hidden="true" className="w-full my-5" style={{ height: 1, background: `${PRODUCT_COLOR}26` }} />

            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-auto">
              {MYAGENT_BADGES.map((b) => (
                <li key={b.label} className="flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground">
                  <b.Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* ───────── Path 2 — A diagnosis (consulting) ───────── */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="group relative flex flex-col rounded-2xl backdrop-blur-md overflow-hidden border border-primary/30"
          style={{
            background: `linear-gradient(140deg, ${CONSULT_COLOR}14 0%, hsl(var(--background) / 0.75) 55%, hsl(var(--background) / 0.9) 100%)`,
            boxShadow: `0 20px 50px -20px ${CONSULT_COLOR}33`,
          }}
        >
          <div aria-hidden="true" className="absolute top-0 left-0 right-0" style={{ height: 4, background: CONSULT_COLOR }} />

          <div className="flex flex-col h-full p-6 md:p-7">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: CONSULT_COLOR, boxShadow: `0 8px 24px -8px ${CONSULT_COLOR}99` }}
              >
                <Map className="w-5 h-5 text-white" strokeWidth={2.25} aria-hidden="true" />
              </div>
              <h3 className="font-poppins font-bold text-xl md:text-2xl leading-tight" style={{ color: CONSULT_COLOR }}>
                Start with a diagnosis
              </h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-6">
              Not sure where AI pays back first? Begin with a diagnostic —
              every dollar you spend here is credited toward the build if you
              move forward. A clean staircase, not a leap.
            </p>

            {/* Rung 1 — Audit $250 (lightest on-ramp) */}
            <a
              href={STRIPE.audit}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-foreground/15 bg-background/50 hover:bg-background/80 hover:border-foreground/30 transition-all p-4 mb-2.5"
              aria-label="Get your Website & AI Visibility Audit, $250"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 flex-shrink-0" style={{ color: CONSULT_COLOR }} strokeWidth={2.25} aria-hidden="true" />
                    <span className="font-poppins font-semibold text-foreground leading-tight">Website &amp; AI Visibility Audit</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">48-hour turnaround · credited toward the Assessment</p>
                </div>
                <span className="font-poppins font-bold text-xl text-foreground flex-shrink-0">$250</span>
              </div>
            </a>

            {/* Credit connector — visually ties the two rungs into one staircase */}
            <div className="flex items-center gap-1.5 pl-4 mb-2.5 text-[11px] text-muted-foreground" aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 rotate-90" style={{ color: `${CONSULT_COLOR}cc` }} />
              <span>credits into</span>
            </div>

            {/* Rung 2 — Assessment $497 (flagship, Most popular) */}
            <a
              href={STRIPE.assessment}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl p-4 transition-all hover:opacity-95 relative"
              style={{ background: `${PRODUCT_COLOR}12`, border: `1px solid ${PRODUCT_COLOR}66` }}
              aria-label="Book your AI Opportunity Assessment, $497, most popular"
            >
              <span
                className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-poppins font-semibold uppercase tracking-wider text-white"
                style={{ background: PRODUCT_COLOR }}
              >
                Most popular
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 flex-shrink-0" style={{ color: PRODUCT_COLOR }} strokeWidth={2.25} aria-hidden="true" />
                    <span className="font-poppins font-semibold text-foreground leading-tight">AI Opportunity Assessment</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Founder-led · 48-hour ROI map · fully credited to your build</p>
                </div>
                <span className="font-poppins font-bold text-xl text-foreground flex-shrink-0">$497</span>
              </div>
            </a>

            <div aria-hidden="true" className="w-full my-5" style={{ height: 1, background: `${CONSULT_COLOR}26` }} />

            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-auto">
              {AGENCY_BADGES.map((b) => (
                <li key={b.label} className="flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground">
                  <b.Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-8 text-xs text-muted-foreground text-center max-w-xl px-4"
      >
        Secure checkout by Stripe. We reach out within one business day to
        schedule. Prefer to talk it through first?{" "}
        <a href="mailto:damian@get-myagent.com" className="text-primary hover:underline">
          damian@get-myagent.com
        </a>
        .
      </motion.p>
    </section>
  );
};

export default TwoPathOffers;
