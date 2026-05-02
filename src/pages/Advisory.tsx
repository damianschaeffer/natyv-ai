import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";
import { Calendar, Clock, Video, Shield } from "lucide-react";
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
      <Head>
        <title>Book a Strategy Consultation | Natyv AI</title>
        <meta
          name="description"
          content="Book a 60-minute strategy consultation with Damian Schaeffer, founder of Natyv AI. Reserved for decision-makers exploring how AI-native operations can transform their service business. Confidential. NDA available."
        />
        <link rel="canonical" href="https://natyv.ai/advisory" />
        <meta property="og:title" content="Strategic AI Advisory — Natyv AI" />
        <meta
          property="og:description"
          content="60-minute 1:1 strategy session with the founder of Natyv AI. AI operations roadmap, ROI modeling, integration plan."
        />
        <meta property="og:url" content="https://natyv.ai/advisory" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://natyv.ai/advisory#service",
  "name": "Strategic AI Advisory",
  "serviceType": "AI Operations Consulting",
  "provider": { "@id": "https://natyv.ai/#organization" },
  "areaServed": "US",
  "url": "https://natyv.ai/advisory",
  "description": "1:1 strategic AI advisory engagement. 60-minute consultation with Damian Schaeffer covering AI capabilities assessment, autonomous-system roadmap, and high-impact automation opportunities for service businesses.",
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Service business owners, founders, and operators"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cal.com/damian-schaeffer/consultation",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "price": "0",
    "description": "Initial consultation at no cost. Engagement pricing follows scope assessment."
  },
  "termsOfService": "Confidential. Enterprise NDA available upon request."
}
        `}</script>
      </Head>
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
            
            <h1 className="font-accent uppercase tracking-[0.15em] text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-medium">
              Book a Strategy
              <span className="block text-primary mt-3">Consultation</span>
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
                <h3 className="font-accent uppercase tracking-[0.1em] text-sm text-foreground mb-2 font-medium">
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
                <h2 className="font-accent uppercase tracking-[0.15em] text-xl md:text-2xl text-foreground font-medium">
                  Select a Time That Works for You
                </h2>
              </div>
              
              {/* Cal.com embed — Damian's consultation booking link */}
              <div className="p-2 md:p-4">
                <iframe
                  src="https://cal.com/damian-schaeffer/consultation?layout=month_view&theme=dark"
                  title="Book a consultation with Damian Schaeffer"
                  className="w-full rounded-xl border border-border bg-background"
                  style={{ height: "720px", border: 0 }}
                  loading="lazy"
                  allow="camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture"
                />
                <p className="text-center text-xs text-muted-foreground/60 font-body mt-3">
                  Trouble loading the calendar?{" "}
                  <a
                    href="https://cal.com/damian-schaeffer/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Book directly on Cal.com →
                  </a>
                </p>
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
            <h3 className="font-accent uppercase tracking-[0.15em] text-xl md:text-2xl text-foreground mb-6 font-medium">
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
