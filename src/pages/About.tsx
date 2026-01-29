import { motion } from "framer-motion";
import { MapPin, Award, Users, Heart, Linkedin, Twitter, Youtube } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import damianProfile from "@/assets/damian-profile.jpg";

const About = () => {
  const milestones = [
    {
      icon: MapPin,
      title: "Cleveland, Ohio",
      subtitle: "K&D Management",
      description: "Helped grow from a few properties to 40+ properties over 10 years, becoming one of the largest in the region."
    },
    {
      icon: Users,
      title: "Naples, Florida",
      subtitle: "Sandcastle Community Management",
      description: "Led a core team of 65+ employees serving 150+ local communities as President."
    },
    {
      icon: Award,
      title: "Industry Recognition",
      subtitle: "Best of 250+ Companies",
      description: "Perfected 15+ client deliverable workflows with systems that covered the entire industry."
    },
    {
      icon: Heart,
      title: "The Mission",
      subtitle: "Natyv AI Founded",
      description: "Building AI systems that free humans to live how they're meant to — present, fulfilled, and connected."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section - Compact Editorial Style */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl mx-auto">
            {/* Top Row - Photo + Name + Social */}
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Small Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-border/50">
                  <img 
                    src={damianProfile} 
                    alt="Damian Schaeffer, Founder of Natyv AI"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Accent decoration */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 border border-primary/20 rounded-xl -z-10" />
              </div>

              {/* Name + Title + Social */}
              <div className="text-center md:text-left flex-1">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-body tracking-widest uppercase text-primary border border-primary/30 rounded-full">
                  Founder
                </span>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                    Damian Schaeffer
                  </h1>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href="https://linkedin.com/in/damianschaeffer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                      aria-label="Connect on LinkedIn"
                      whileHover={{ scale: 1.15, backgroundColor: "hsl(var(--primary) / 0.25)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                    </motion.a>
                    <motion.a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                      aria-label="Follow on X"
                      whileHover={{ scale: 1.15, backgroundColor: "hsl(var(--primary) / 0.25)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Twitter className="w-4 h-4 text-primary" />
                    </motion.a>
                    <motion.a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                      aria-label="Subscribe on YouTube"
                      whileHover={{ scale: 1.15, backgroundColor: "hsl(var(--primary) / 0.25)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Youtube className="w-4 h-4 text-primary" />
                    </motion.a>
                  </div>
                </div>

                {/* Quick stats inline */}
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <div className="font-display text-xl text-primary">20+</div>
                    <div className="text-xs text-muted-foreground font-body">Years in Ops</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="font-display text-xl text-primary">150+</div>
                    <div className="text-xs text-muted-foreground font-body">Communities</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6 italic border-l-2 border-primary/30 pl-6">
                "I've spent 20+ years in business operations — the unsexy, behind-the-scenes work of making businesses actually run."
              </p>

              <div className="prose prose-invert max-w-none space-y-5">
                <p className="text-muted-foreground font-body leading-relaxed">
                  After graduating from The Ohio State University, I started my career in Cleveland, Ohio, 
                  helping the real estate development firm <span className="text-foreground">K&D Management</span> grow 
                  from a few properties to over 40+ properties over an amazing 10-year span, making it one of the largest in the region.
                </p>
                
                <p className="text-muted-foreground font-body leading-relaxed">
                  I then moved to the Naples, Florida area for a new challenge, continuing in real estate by 
                  starting my own brokerage firm <span className="text-foreground">Gulf Pointe Real Estate Group</span>, 
                  as well as working in property management at <span className="text-foreground">Sandcastle Community Management</span>, 
                  focusing primarily on HOA management — an industry with brutal seasonality, high-consequence financial 
                  reporting requirements, razor-thin margins, and Board of Director clients who expect perfection.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Leadership Story */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative p-8 md:p-12 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm">
              <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-1 bg-background border border-border rounded-full">
                <span className="text-xs font-body tracking-widest uppercase text-primary">The Leadership Years</span>
              </div>
              
              <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
                <p>
                  As the <span className="text-foreground font-medium">Sandcastle President</span>, I was honored to 
                  lead a core team of over <span className="text-primary">65 employees</span> serving over 
                  <span className="text-primary"> 150 local communities</span>. Every Q1, the seasonal client demand 
                  spikes 300%. We had to be flawless or we'd drown...
                </p>
                
                <p className="text-xl text-foreground font-display italic">
                  So I became maniacally obsessed with systems.
                </p>
                
                <p>
                  Not just processes and software — but systems that actually made people's lives better that you 
                  could <em>feel</em>. I couldn't stand to see my employees doing frustrating admin work that made 
                  them feel like cogs. I wanted them to feel valued. To make more money. To go home on time. 
                  And be present with their families.
                </p>
                
                <p>
                  We perfected the 15+ client deliverable workflows with systems that covered our entire industry. 
                  We won awards as the <span className="text-foreground">best of 250+ companies</span> with measurable 
                  statistics. That's great on paper.
                </p>
                
                <p className="text-lg text-foreground">
                  But more importantly: We were happier, healthier and felt more pride and value in our work.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Career Milestones */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-2xl text-center text-foreground mb-12">The Journey</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  className="p-6 rounded-xl border border-border/50 bg-card/20 hover:bg-card/40 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <milestone.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground">{milestone.title}</h3>
                      <p className="text-sm text-primary font-body mb-2">{milestone.subtitle}</p>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* The Why - Full Width Statement */}
        <section className="container mx-auto px-6 mb-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative py-16">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl" />
              
              <div className="relative space-y-8">
                <h2 className="font-display text-3xl md:text-4xl text-foreground">
                  Why "Natyv"?
                </h2>
                
                <div className="max-w-2xl mx-auto space-y-6 text-muted-foreground font-body leading-relaxed">
                  <p>
                    The name comes from "native" — as in, <span className="text-foreground">native to how humans 
                    are supposed to live</span>. I try to live a more "human" lifestyle by eating natural foods 
                    and being active in the sunlight to feel my best.
                  </p>
                  
                  <p>
                    My belief is that we've drifted too far from our nature — stuck behind screens, doing 
                    repetitive work that drains us, missing the people and moments that actually matter.
                  </p>
                  
                  <p className="text-xl text-foreground font-display">
                    AI should fix that. Not by replacing us, but by freeing us.
                  </p>
                  
                  <p className="text-lg">
                    That's what we're building here.
                  </p>
                </div>

                <div className="pt-8">
                  <p className="font-display text-lg text-foreground">— Damian Schaeffer</p>
                  <p className="text-sm text-muted-foreground font-body">Founder, Natyv AI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Connect CTA */}
        <section className="container mx-auto px-6">
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
