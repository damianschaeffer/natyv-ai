import { motion } from "framer-motion";
import {
  Phone,
  TrendingUp,
  Settings2,
  CreditCard,
  Megaphone,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FunctionPreview {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Phone;
}

const functions: FunctionPreview[] = [
  { id: "front-desk", title: "Front Desk", tagline: "Never miss a call. Never lose a lead.", icon: Phone },
  { id: "sales", title: "Sales", tagline: "Capture, qualify, and close — without a human bottleneck.", icon: TrendingUp },
  { id: "operations", title: "Operations", tagline: "Smart scheduling, fewer no-shows, hours back in the day.", icon: Settings2 },
  { id: "finance", title: "Finance", tagline: "Get paid faster. Reconcile less. Sleep better.", icon: CreditCard },
  { id: "marketing", title: "Marketing", tagline: "Show up everywhere — without an agency for each channel.", icon: Megaphone },
  { id: "customer-experience", title: "Customer Experience", tagline: "Every customer feels remembered, even at scale.", icon: Heart },
];

const HomepageServices = () => {
  return (
    <section id="homepage-services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Same gradient as AdvisorySection — keeps homepage rhythm */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-primary border border-primary/30 rounded-full">
            Services
          </span>

          <h2 className="font-body font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.05]">
            Full agency AI integrated{" "}
            <span className="text-primary">services.</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            Every Natyv engagement deploys from the same catalog. Pick the
            functions that move your business — we install the AI workflows
            that run them, or you self-serve on MyAgent.
          </p>
        </motion.div>

        {/* 6 function tiles */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {functions.map((fn, index) => (
            <motion.article
              key={fn.id}
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.06 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <fn.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-body font-semibold text-lg md:text-xl text-foreground leading-tight">
                  {fn.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {fn.tagline}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/services">
            <Button
              size="lg"
              className="font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
            >
              Explore all services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageServices;
