import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const MyAgentSection = () => {
  return (
    <section
      id="myagent-section"
      className="py-24 md:py-32 relative overflow-hidden border-t border-border/40"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header — anchor MyAgent as platform, not the headline */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-body tracking-widest uppercase text-primary border border-primary/30 rounded-full">
            The Platform We Deploy
          </span>

          {/* MyAgent wordmark — clean text rendering */}
          <h2 className="font-display mb-6 leading-tight">
            <span className="block text-2xl md:text-3xl text-muted-foreground font-body uppercase tracking-[0.3em] mb-3">
              Meet
            </span>
            <span className="block text-5xl md:text-7xl text-foreground tracking-tight">
              <span className="text-primary">My</span>
              <span>Agent</span>
              <span className="inline-block ml-2 text-primary">
                <Sparkles className="inline w-8 h-8 md:w-12 md:h-12" aria-hidden="true" />
              </span>
            </span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            <span className="text-foreground">MyAgent</span> is our productized AI platform —
            a 24/7 voice and text agent purpose-built for service businesses.
            <span className="block mt-2">
              <strong className="text-foreground font-medium">80+ capabilities</strong> across
              six packages, from $99/mo to Enterprise. Self-serve, or have us run it for you.
            </span>
          </p>
        </motion.div>

        {/* Dual-track split — the fix for the agency vs. product blind spot */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Track A — Self-serve product (MyAgent direct) */}
          <motion.div
            className="group relative rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-8 md:p-10 hover:border-primary/40 transition-colors duration-300 flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <header className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-foreground">
                  Self-serve on MyAgent
                </h3>
                <p className="text-xs text-primary font-body uppercase tracking-wider mt-1">
                  Direct platform · From $99/mo
                </p>
              </div>
            </header>

            <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed mb-6 flex-1">
              You know what you need. Spin up your AI receptionist, follow-up
              flows, scheduling, and capture systems on the same platform Natyv
              deploys for white-glove engagements. Six packages from $99 to
              Enterprise — pick the tier, configure the agents, ship.
            </p>

            <ul className="text-sm font-body space-y-2 mb-8 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>24/7 AI voice + text reception, 80+ capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Six tiers: Starter · Foundation · Essential · Growth · Pro · Enterprise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Free trial · No credit card required</span>
              </li>
            </ul>

            <a
              href="https://get-myagent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-accent uppercase tracking-[0.15em] text-xs md:text-sm rounded-sm px-6 py-3 hover:bg-primary/90 transition-all duration-300"
            >
              See MyAgent
              <ArrowRight
                className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Track B — Agency engagement (Natyv hands-on) */}
          <motion.div
            className="group relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card/30 to-card/30 backdrop-blur-sm p-8 md:p-10 hover:border-primary/50 transition-colors duration-300 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <header className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-foreground">
                  Or hire Natyv to run it
                </h3>
                <p className="text-xs text-primary font-body uppercase tracking-wider mt-1">
                  White-glove agency engagement
                </p>
              </div>
            </header>

            <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed mb-6 flex-1">
              Tell us your business, your seasonality, and what's burning hours.
              We architect the AI layer, deploy MyAgent tuned for your industry,
              and operate the system alongside your team. You stay focused on
              the parts only humans should do.
            </p>

            <ul className="text-sm font-body space-y-2 mb-8 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Audit · Architect · Implement · Optimize methodology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Industry-tuned configurations + integration with your stack</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">›</span>
                <span>Confidential. NDA available. Outcomes you can measure.</span>
              </li>
            </ul>

            <Link
              to="/advisory"
              className="group/cta inline-flex items-center justify-center gap-2 border border-primary/40 bg-primary/10 text-foreground font-accent uppercase tracking-[0.15em] text-xs md:text-sm rounded-sm px-6 py-3 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300"
            >
              Talk to Natyv
              <ArrowRight
                className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>

        {/* Reassurance footnote */}
        <motion.p
          className="text-center text-xs md:text-sm text-muted-foreground/70 font-body mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Same platform. Same 80 capabilities. The only difference is whether
          you want to drive — or have us at the wheel.
        </motion.p>
      </div>
    </section>
  );
};

export default MyAgentSection;
