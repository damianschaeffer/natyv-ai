import { motion } from "framer-motion";
import { Building2, Home, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  period: string;
  metric: { value: string; label: string };
  result: string;
  quote?: string;
  icon: typeof Building2;
  status: "shipped" | "open";
}

const caseStudies: CaseStudy[] = [
  {
    id: "kd-management",
    client: "K&D Management",
    industry: "Real Estate Development",
    location: "Cleveland, OH",
    period: "10-year scale-up",
    icon: Building2,
    metric: { value: "40+", label: "Properties scaled" },
    result:
      "Grew from a handful of properties to one of the largest real estate development firms in the region — by perfecting the systems that scale doesn't break.",
    quote: "We perfected the systems that scale doesn't break.",
    status: "shipped",
  },
  {
    id: "sandcastle",
    client: "Sandcastle Community Management",
    industry: "HOA / Property Management",
    location: "Naples, FL",
    period: "President · multi-year tenure",
    icon: Home,
    metric: { value: "150+", label: "Communities served" },
    result:
      "Led 65+ employees serving 150+ communities through 300% Q1 demand spikes. Won industry awards as the best of 250+ companies — while making the team happier and freeing them to be present at home.",
    quote: "We won awards as the best of 250+ companies. The metric I care about — my employees got home on time.",
    status: "shipped",
  },
  {
    id: "first-ai-engagement",
    client: "Your business",
    industry: "First AI-Native Engagement",
    location: "Open slot",
    period: "Coming soon",
    icon: Sparkles,
    metric: { value: "·", label: "Reserved" },
    result:
      "The next case study published here will be a service business we deploy AI for in the coming weeks. Same operational discipline. Quantified outcomes.",
    status: "open",
  },
];

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient — matches AdvisorySection */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header — eyebrow + headline + sub, matches AdvisorySection pattern */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-body tracking-widest uppercase text-primary border border-primary/30 rounded-full">
            Proof Of Work
          </span>

          <h2 className="font-accent uppercase tracking-[0.15em] text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-tight font-medium">
            We didn't learn operations from a deck.
            <span className="block text-primary mt-2">
              We ran them at scale.
            </span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            Every AI system we deploy is built on twenty years of operating real
            service businesses through the messy parts — seasonality, churn,
            margin pressure, and the human side of running a team.
          </p>
        </motion.div>

        {/* Case study cards — AdvisorySection grid pattern */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {caseStudies.map((study, index) => {
            const isOpen = study.status === "open";
            return (
              <motion.div
                key={study.id}
                className={`p-6 md:p-8 rounded-xl border bg-card/50 backdrop-blur-sm flex flex-col ${
                  isOpen
                    ? "border-dashed border-border/40 hover:border-primary/30"
                    : "border-border hover:border-primary/40"
                } transition-colors duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
              >
                {/* Icon — matches AdvisorySection icon container */}
                <div
                  className={`w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center ${
                    isOpen ? "bg-primary/5" : "bg-primary/10"
                  }`}
                >
                  <study.icon
                    className={`w-6 h-6 ${
                      isOpen ? "text-primary/50" : "text-primary"
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Client + meta */}
                <div className="text-center mb-6">
                  <h3 className="font-accent uppercase tracking-[0.1em] text-base text-foreground mb-2 leading-snug font-medium">
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
                <div className="text-center mb-6 pb-6 border-b border-border/40">
                  <div
                    className={`font-body font-bold text-4xl md:text-5xl mb-1 leading-none ${
                      isOpen ? "text-primary/40" : "text-primary"
                    }`}
                  >
                    {study.metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-body uppercase tracking-wider">
                    {study.metric.label}
                  </div>
                </div>

                {/* Result */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed text-center flex-1">
                  {study.result}
                </p>

                {/* Quote */}
                {study.quote && (
                  <blockquote className="mt-6 pt-6 border-t border-border/40 text-center">
                    <p className="text-sm italic text-muted-foreground/90 font-body leading-relaxed mb-2">
                      "{study.quote}"
                    </p>
                    <footer className="text-[10px] text-muted-foreground/70 uppercase tracking-widest font-body">
                      — Damian Schaeffer
                    </footer>
                  </blockquote>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Closing CTA — matches AdvisorySection button pattern */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/advisory">
            <Button
              size="lg"
              className="font-accent uppercase tracking-[0.15em] bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
            >
              Be the next case study
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
