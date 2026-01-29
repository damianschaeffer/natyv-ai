import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Ear, Brain, FileText, Image, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import myAgentLogo from "@/assets/myagent-logo.png";
const MyAgentSection = () => {
  const [isActive, setIsActive] = useState(false);
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
          <span className="text-primary font-body text-lg tracking-[0.3em] uppercase mb-4 block">
            Flagship Product
          </span>
          <img src={myAgentLogo} alt="MY AGENT" className="h-28 md:h-32 w-auto mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] cursor-pointer" />
          <p className="text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-6 flex items-center justify-center flex-wrap gap-1">
            Multi-Modal Google <img src="/logos/google-gemini.svg" alt="Gemini" className="h-5 inline-block" /> Gemini-Live Voice AI Agents that Understand Context, Reason, Learn, and Remember...Just Like You...
          </p>
          <a href="https://get-myagent.com" target="_blank" rel="noopener noreferrer">
            <Button className="font-accent uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 p-2">
              Experience the Magic
            </Button>
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

        {/* CTA */}
        <motion.div className="text-center mt-12" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }}>
          <motion.a href="https://get-myagent.com" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-all duration-300" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            Initialize MY AGENT
          </motion.a>
        </motion.div>
      </div>
    </section>;
};
export default MyAgentSection;