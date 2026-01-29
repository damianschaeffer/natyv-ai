import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Ear, Brain, FileText, Image, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import myAgentLogo from "@/assets/myagent-logo.png";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";
const MyAgentSection = () => {
  const [isActive, setIsActive] = useState(false);
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

  const capabilities = [{
    icon: Eye,
    label: "See",
    description: "Visual Analysis"
  }, {
    icon: Ear,
    label: "Hear",
    description: "Audio Processing"
  }, {
    icon: Brain,
    label: "Analyze",
    description: "Multi-modal Synthesis"
  }];
  const fileTypes = [{
    icon: FileText,
    label: "Documents"
  }, {
    icon: Image,
    label: "Images"
  }, {
    icon: Mic,
    label: "Audio"
  }];

  // Generate waveform bars with staggered delays
  const waveformBars = Array.from({
    length: 40
  }, (_, i) => ({
    id: i,
    delay: i * 0.05,
    height: Math.random() * 60 + 20
  }));
  return <section className="py-32 relative overflow-hidden" id="my-agent">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          {/* Natyv Logo Header */}
          <img 
            src={natyvLogoTopline} 
            alt="Natyv AI" 
            className="w-full max-w-md mx-auto mb-2" 
          />
          {/* White separator line */}
          <div className="w-full max-w-md mx-auto h-px bg-foreground/40 mb-4" />
          {/* STUDIO label with blue vertical separators */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-[3px] h-5 bg-primary" />
            <span className="text-foreground font-body text-lg md:text-xl tracking-[0.3em] uppercase">
              Studio
            </span>
            <span className="w-[3px] h-5 bg-primary" />
          </div>
          
          <span className="text-primary font-body text-lg tracking-[0.3em] uppercase mb-4 block">
            Flagship Product
          </span>
          <img src={myAgentLogo} alt="MY AGENT" className="h-28 md:h-32 w-auto mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] cursor-pointer" />
          <div className="h-12 mb-6 flex items-center justify-center overflow-hidden">
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

        {/* Interactive Mockup */}
        <motion.div className="max-w-4xl mx-auto" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }}>
          
        </motion.div>

      </div>
    </section>;
};
export default MyAgentSection;