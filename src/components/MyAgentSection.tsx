import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Ear, Brain, FileText, Image, Mic } from "lucide-react";
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
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4 block">
            Flagship Product
          </span>
          <img src={myAgentLogo} alt="MY AGENT" className="h-16 md:h-20 w-auto mx-auto mb-4" />
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Multi-modal Voice AI that can see, hear, and analyze simultaneously
          </p>
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