import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import myAgentLogo from "@/assets/myagent-logo.png";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const MyAgentSection = () => {
  const [currentLine, setCurrentLine] = useState(0);

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
    <section className="py-40 min-h-screen flex items-center relative overflow-hidden" id="my-agent">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Natyv Logo Header */}
          <img 
            src={natyvLogoTopline} 
            alt="Natyv AI" 
            className="w-full max-w-md mx-auto mb-3" 
          />
          {/* White separator line */}
          <div className="w-full max-w-md mx-auto h-px bg-foreground/40 mb-3" />
          {/* STUDIO label with blue vertical separators */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <span className="w-[9px] h-9 bg-primary" />
            <span className="text-foreground font-body text-4xl md:text-5xl tracking-[0.3em] uppercase ml-1 font-bold">
              Studio
            </span>
            <span className="w-[9px] h-9 bg-primary" />
          </div>
          
          <div className="text-primary font-body text-lg tracking-[0.3em] uppercase mb-10 flex flex-col items-center gap-3">
            <span className="text-foreground">Presents</span>
            <div className="w-16 h-px bg-primary/50" />
            <span className="text-foreground">Our Flagship Product</span>
          </div>
          <img 
            src={myAgentLogo} 
            alt="MY AGENT" 
            className="h-24 md:h-28 w-auto mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] cursor-pointer" 
          />
          <div className="h-12 mb-10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLine}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-muted-foreground font-body text-lg max-w-3xl mx-auto flex items-center justify-center flex-wrap gap-1"
              >
                {taglines[currentLine].content}
              </motion.p>
            </AnimatePresence>
          </div>
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
              <Button className="font-accent uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 p-2">
                Experience the Magic
              </Button>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MyAgentSection;
