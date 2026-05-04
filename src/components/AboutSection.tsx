import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import damianProfile from "@/assets/damian-profile.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Image */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border border-border/50">
                <img 
                  src={damianProfile} 
                  alt="Damian Schaeffer, Founder of Natyv AI"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Accent decoration */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border border-primary/20 rounded-xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium text-primary border border-primary/30 rounded-full">
                Founder
              </span>
              
              <h2 className="font-roboto text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4 font-medium">
                Damian Schaeffer
              </h2>
              
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6 italic">
                "I've spent 20+ years in business operations — the unsexy, behind-the-scenes work of making businesses actually run."
              </p>
              
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                From growing K&D Management to 40+ properties in Cleveland, to leading 65+ employees serving 150+ communities at Sandcastle — I became obsessed with systems that make people's lives better.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body transition-colors group"
              >
                <span>Read the full story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
