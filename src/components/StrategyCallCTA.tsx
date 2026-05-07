import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * "Not sure which functions to start with?" closing CTA.
 *
 * Used identically at the bottom of the homepage SERVICES section AND
 * the dedicated /services page so both reads as one closing handoff:
 * "you've seen the catalog, here's how to pick from it."
 */
const StrategyCallCTA = () => {
  return (
    <section className="container mx-auto px-6 mt-16 md:mt-24">
      <motion.div
        className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-body font-extrabold tracking-tight text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight">
          Not sure which functions to start with?
        </h2>
        <p className="text-base text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl mx-auto">
          That's literally the conversation we have on the strategy call.
          60 minutes. Confidential. We map the highest-ROI services to your
          business and walk you out with a deployment plan.
        </p>
        <Link to="/advisory">
          <Button
            size="lg"
            className="font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
          >
            Book the strategy call
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default StrategyCallCTA;
