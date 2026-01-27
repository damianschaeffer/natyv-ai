import { motion } from "framer-motion";
import { Briefcase, Lightbulb, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const sections = [
    {
      icon: Briefcase,
      title: "Professional Background",
      content: [
        "Placeholder for professional background content.",
        "This section will be populated with experience from LinkedIn and other sources.",
        "Focus on leadership roles, key achievements, and industry expertise."
      ]
    },
    {
      icon: Target,
      title: "Experience Highlights",
      content: [
        "Placeholder for notable career milestones and achievements.",
        "Key projects, partnerships, and transformative initiatives.",
        "Recognition, speaking engagements, and thought leadership contributions."
      ]
    },
    {
      icon: Lightbulb,
      title: "Vision & Philosophy",
      content: [
        "Placeholder for guiding principles and strategic vision.",
        "Perspective on the future of AI and autonomous systems.",
        "Commitment to ethical AI development and human-centric design."
      ]
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
              About
            </span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Damian Schaeffer
            </h1>
            
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              Architect of autonomous intelligence systems. Building the infrastructure 
              for the next generation of AI-native operations.
            </p>
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl text-foreground">
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="pl-16 space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-muted-foreground font-body leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Divider */}
                {index < sections.length - 1 && (
                  <div className="mt-16 border-b border-border/50" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Connect CTA */}
        <section className="container mx-auto px-6 mt-24">
          <motion.div
            className="max-w-2xl mx-auto text-center p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="font-display text-xl text-foreground mb-3">
              Let's Connect
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              Interested in exploring strategic opportunities or advisory engagements?
            </p>
            <a
              href="/advisory"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm rounded-md transition-colors"
            >
              Book a Consultation
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
