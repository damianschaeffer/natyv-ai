import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const MyAgentSection = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);

  const taglines = [
    {
      content: "The Latest Multi-Modal Conversational Voice AI Agents",
    },
    {
      content: "that Understand, Reason, Learn, and Remember...Just Like You...",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-48 min-h-screen flex items-center relative overflow-hidden" id="myagent-section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          onViewportEnter={() => setHasRevealed(true)}
        >
          {/* Stage 1: Natyv Logo Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <img 
              src={natyvLogoTopline} 
              alt="Natyv AI" 
              className="w-full max-w-md mx-auto mb-4" 
            />
          </motion.div>

          {/* Stage 2: Separator line draws in */}
          <motion.div 
            className="w-full max-w-md mx-auto h-px bg-foreground/40 mb-4"
            initial={{ scaleX: 0 }}
            animate={hasRevealed ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          {/* Stage 3: STUDIO label */}
          <motion.div 
            className="flex items-center justify-center gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.span 
              className="w-[9px] h-9 bg-primary"
              initial={{ scaleY: 0 }}
              animate={hasRevealed ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 }}
            />
            <span className="text-foreground font-body text-4xl md:text-5xl tracking-[0.3em] uppercase ml-1">
              Studio
            </span>
            <motion.span 
              className="w-[9px] h-9 bg-primary"
              initial={{ scaleY: 0 }}
              animate={hasRevealed ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 }}
            />
          </motion.div>
          
          {/* Stage 4: Presents text */}
          <motion.div 
            className="text-primary font-body text-lg tracking-[0.3em] uppercase mb-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={hasRevealed ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.span 
              className="text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Presents
            </motion.span>
            <motion.div 
              className="w-16 h-px bg-primary/50"
              initial={{ scaleX: 0 }}
              animate={hasRevealed ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.6 }}
            />
            <motion.span 
              className="text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              Our Flagship Product
            </motion.span>
          </motion.div>

          {/* Stage 5: The Grand Reveal - MyAgent wordmark */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hasRevealed ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 2.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={hasRevealed ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              } : {}}
              transition={{
                duration: 1.0,
                delay: 2.4,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.04 }}
            >
              <span className="font-body font-extrabold tracking-tight text-6xl md:text-8xl leading-none cursor-pointer">
                <span className="text-primary">My</span><span className="text-foreground">Agent</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Stage 6: Tagline */}
          <motion.div 
            className="h-14 mb-14 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={hasRevealed ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLine}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-muted-foreground font-body text-lg md:text-xl max-w-3xl mx-auto flex items-center justify-center flex-wrap gap-1"
              >
                {taglines[currentLine].content}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Stage 7: CTA Button + secondary agency line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.5 }}
            className="flex flex-col items-center gap-5"
          >
            <a href="https://get-myagent.com" target="_blank" rel="noopener noreferrer">
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0 0 hsl(var(--primary) / 0)",
                    "0 0 20px 4px hsl(var(--primary) / 0.3)",
                    "0 0 0 0 hsl(var(--primary) / 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block rounded-sm"
              >
                <Button className="font-accent uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  Visit MyAgent
                </Button>
              </motion.div>
            </a>
            <a
              href="/advisory"
              className="font-accent text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Or have us install &amp; run it for you →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyAgentSection;
