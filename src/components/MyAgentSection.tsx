import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Ear, Brain, FileText, Image, Mic } from "lucide-react";
import myAgentLogo from "@/assets/myagent-logo.png";

const MyAgentSection = () => {
  const [isActive, setIsActive] = useState(false);

  const capabilities = [
    { icon: Eye, label: "See", description: "Visual Analysis" },
    { icon: Ear, label: "Hear", description: "Audio Processing" },
    { icon: Brain, label: "Analyze", description: "Multi-modal Synthesis" },
  ];

  const fileTypes = [
    { icon: FileText, label: "Documents" },
    { icon: Image, label: "Images" },
    { icon: Mic, label: "Audio" },
  ];

  // Generate waveform bars with staggered delays
  const waveformBars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: i * 0.05,
    height: Math.random() * 60 + 20,
  }));

  return (
    <section className="py-32 relative overflow-hidden" id="my-agent">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4 block">
            Flagship Product
          </span>
          <img 
            src={myAgentLogo} 
            alt="MY AGENT" 
            className="h-16 md:h-20 w-auto mx-auto mb-4"
          />
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            Multi-modal Voice AI that can see, hear, and analyze simultaneously
          </p>
        </motion.div>

        {/* Interactive Mockup */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className={`glass rounded-lg p-8 transition-all duration-500 cursor-pointer ${
              isActive ? "blue-glow" : ""
            }`}
            onClick={() => setIsActive(!isActive)}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            {/* Waveform Visualization */}
            <div className="h-32 flex items-center justify-center gap-[3px] mb-8 overflow-hidden">
              {waveformBars.map((bar) => (
                <motion.div
                  key={bar.id}
                  className="w-1 bg-primary rounded-full origin-center"
                  initial={{ height: 8 }}
                  animate={{
                    height: isActive ? bar.height : 8,
                    opacity: isActive ? 1 : 0.3,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: bar.delay,
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                    repeatDelay: 0.1,
                  }}
                />
              ))}
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-protocol-active pulse-green" : "bg-muted"
                }`}
              />
              <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                {isActive ? "Listening..." : "Hover to Activate"}
              </span>
            </div>

            {/* Capabilities */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/50"
                    }`}
                  >
                    <cap.icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <h4 className="font-display text-xl text-foreground mb-1">
                    {cap.label}
                  </h4>
                  <p className="text-xs text-muted-foreground font-body tracking-wide">
                    {cap.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* File Types */}
            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-[0.2em] mb-4 text-center">
                Supported Inputs
              </p>
              <div className="flex justify-center gap-8">
                {fileTypes.map((file, index) => (
                  <motion.div
                    key={file.label}
                    className="flex items-center gap-2 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0.5 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <file.icon className="w-4 h-4" />
                    <span className="text-xs font-body">{file.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href="https://get-myagent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Initialize MY AGENT
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default MyAgentSection;