import { motion } from "framer-motion";
import { Calendar, Clock, Video, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdvisorySection = () => {
  const benefits = [
    {
      icon: Video,
      title: "1:1 Strategy Session",
      description: "Direct consultation with senior AI strategist"
    },
    {
      icon: Clock,
      title: "60-Minute Deep Dive",
      description: "Comprehensive analysis of your operational landscape"
    },
    {
      icon: Shield,
      title: "Confidential Brief",
      description: "Enterprise-grade discretion and NDA available"
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="advisory">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-primary border border-primary/30 rounded-full">
            Strategic Advisory
          </span>

          <h2 className="font-body font-extrabold tracking-tight text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.1]">
            Book a strategy{" "}
            <span className="text-primary">consultation.</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            Schedule a confidential session to explore how autonomous AI systems 
            can transform your operational architecture.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-body font-semibold text-base md:text-lg text-foreground mb-2 leading-snug">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
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
              className="font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvisorySection;
