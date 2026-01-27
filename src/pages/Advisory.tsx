import { motion } from "framer-motion";
import { Calendar, Clock, Video, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Advisory = () => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-body tracking-widest uppercase text-primary border border-primary/30 rounded-full">
              Strategic Advisory
            </span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Book a Strategy
              <span className="block text-primary">Consultation</span>
            </h1>
            
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              Schedule a confidential session to explore how autonomous AI systems 
              can transform your operational architecture. Reserved for decision-makers 
              ready to lead the next wave of enterprise intelligence.
            </p>
          </motion.div>
        </section>

        {/* Benefits Grid */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Booking Section */}
        <section className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-border text-center">
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-body tracking-wide uppercase">
                    Schedule Your Session
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground">
                  Select a Time That Works for You
                </h2>
              </div>
              
              {/* Calendar Embed Placeholder */}
              <div className="p-8 md:p-12">
                <div className="aspect-video md:aspect-[16/10] w-full rounded-xl border border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center">
                  <Calendar className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground font-body text-center mb-2">
                    Calendar Integration
                  </p>
                  <p className="text-sm text-muted-foreground/60 font-body text-center max-w-md">
                    Cal.com or Calendly embed will be placed here
                  </p>
                  
                  {/* Temporary CTA */}
                  <Button
                    className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-body"
                    size="lg"
                  >
                    Book Appointment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Footer Note */}
              <div className="px-8 pb-8 text-center">
                <p className="text-xs text-muted-foreground font-body">
                  All consultations are conducted under strict confidentiality. 
                  Enterprise NDA available upon request.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What to Expect */}
        <section className="container mx-auto px-6 mt-20">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="font-display text-2xl text-foreground mb-6">
              What to Expect
            </h3>
            <div className="space-y-4 text-left">
              {[
                "Strategic assessment of your current AI capabilities and gaps",
                "Custom roadmap for autonomous system integration",
                "Identification of high-impact automation opportunities",
                "Clear next steps with actionable recommendations"
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground font-body"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Advisory;
