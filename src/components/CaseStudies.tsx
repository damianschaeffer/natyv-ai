import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Home, Sparkles } from "lucide-react";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  period: string;
  before: string;
  intervention: string;
  result: string;
  metric: { value: string; label: string };
  quote?: string;
  icon: typeof Building2;
  status: "shipped" | "coming-soon";
}

const caseStudies: CaseStudy[] = [
  {
    id: "kd-management",
    client: "K&D Management",
    industry: "Real Estate Development",
    location: "Cleveland, OH",
    period: "2010s · 10-year scale-up",
    icon: Building2,
    before:
      "A handful of properties. Manual leasing operations, fragmented tenant communication, and the kind of paper-trail back-office that breaks at scale.",
    intervention:
      "Built and operated the systems that let leasing, accounting, and tenant ops scale linearly while headcount didn't.",
    result:
      "Grew from a handful of properties to 40+ properties across 10 years — becoming one of the largest real estate development firms in the region.",
    metric: { value: "40+", label: "Properties scaled" },
    quote:
      "We perfected the systems that scale doesn't break. That's the operating discipline we now bring to AI.",
    status: "shipped",
  },
  {
    id: "sandcastle",
    client: "Sandcastle Community Management",
    industry: "HOA / Property Management",
    location: "Naples, FL",
    period: "President · multi-year tenure",
    icon: Home,
    before:
      "Brutal seasonality. Q1 client demand spikes 300%. Razor-thin margins. Board-of-Director clients who expect perfection. Employees burning out on admin work.",
    intervention:
      "Perfected 15+ client deliverable workflows with systems that covered the entire industry. Designed processes around the humans, not just the throughput.",
    result:
      "Led 65+ employees serving 150+ communities. Won industry awards as the best of 250+ companies on measurable performance — while making the team happier and freeing them to be present at home.",
    metric: { value: "150+", label: "Communities served" },
    quote:
      "We won awards as the best of 250+ companies. But the metric I care about — my employees got home on time. That's what AI should be for.",
    status: "shipped",
  },
  {
    id: "first-ai-engagement",
    client: "Coming Soon",
    industry: "First AI-Native Engagement",
    location: "—",
    period: "—",
    icon: Sparkles,
    before:
      "Real client outcomes from our first AI-native deployment will land here as the engagement closes its first 90 days.",
    intervention:
      "We're recording the before / after with the same operational discipline we brought to scaling K&D and Sandcastle — quantified call capture, lead-conversion lift, hours returned to the owner.",
    result:
      "Watch this space. If you'd like to be the case study we publish next, the advisory door is open.",
    metric: { value: "·", label: "In-flight" },
    status: "coming-soon",
  },
];

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="py-24 md:py-32 relative overflow-hidden bg-background border-t border-border/40"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-body tracking-widest uppercase text-primary border border-primary/30 rounded-full">
            Proof Of Work
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            We didn't learn operations from a deck.
            <span className="block text-primary mt-2">
              We ran them at scale.
            </span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            Every AI system we deploy is built on twenty years of operating real
            service businesses through the messy parts — seasonality, churn,
            margin pressure, and the human side of running a team.
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, i) => {
            const isComingSoon = study.status === "coming-soon";
            return (
              <motion.article
                key={study.id}
                className={`group relative flex flex-col rounded-2xl border bg-card/30 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300 ${
                  isComingSoon
                    ? "border-dashed border-border/40 hover:border-primary/30"
                    : "border-border hover:border-primary/40"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Icon + status pill */}
                <header className="flex items-start justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isComingSoon ? "bg-primary/5" : "bg-primary/10"
                    }`}
                  >
                    <study.icon
                      className={`w-6 h-6 ${isComingSoon ? "text-primary/50" : "text-primary"}`}
                      aria-hidden="true"
                    />
                  </div>
                  {isComingSoon && (
                    <span className="text-[10px] font-body tracking-widest uppercase text-muted-foreground/70 px-2 py-1 border border-border/50 rounded-full">
                      Open Slot
                    </span>
                  )}
                </header>

                {/* Client + industry */}
                <div className="mb-5">
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">
                    {study.client}
                  </h3>
                  <p className="text-xs text-primary font-body uppercase tracking-wider mb-1">
                    {study.industry}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {study.location} · {study.period}
                  </p>
                </div>

                {/* Headline metric */}
                <div className="mb-6 pb-6 border-b border-border/40">
                  <div
                    className={`font-display text-4xl md:text-5xl mb-1 ${
                      isComingSoon ? "text-primary/40" : "text-primary"
                    }`}
                  >
                    {study.metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-body uppercase tracking-wider">
                    {study.metric.label}
                  </div>
                </div>

                {/* Before / Intervention / Result */}
                <dl className="space-y-4 text-sm font-body leading-relaxed flex-1">
                  <div>
                    <dt className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-1.5 font-body">
                      Before
                    </dt>
                    <dd className="text-muted-foreground">{study.before}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-1.5 font-body">
                      What we did
                    </dt>
                    <dd className="text-muted-foreground">{study.intervention}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-primary/80 uppercase tracking-wider mb-1.5 font-body">
                      Result
                    </dt>
                    <dd className="text-foreground">{study.result}</dd>
                  </div>
                </dl>

                {/* Quote */}
                {study.quote && (
                  <blockquote className="mt-6 pt-6 border-t border-border/40 text-sm italic text-muted-foreground font-body leading-relaxed">
                    "{study.quote}"
                    <footer className="mt-2 not-italic text-xs text-muted-foreground/70 uppercase tracking-wider font-body">
                      — Damian Schaeffer
                    </footer>
                  </blockquote>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/advisory"
            className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm md:text-base transition-colors"
          >
            <span>Want your case study to be the next one?</span>
            <ArrowUpRight
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
