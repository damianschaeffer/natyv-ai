import { motion } from "framer-motion";
import natyvLogoFull from "@/assets/natyv-logo-full.png";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl" animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.2, 0.4, 0.2]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div className="max-w-4xl mx-auto" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1
      }}>
          {/* The Signature Dictionary Definition */}
          <motion.div className="mb-12" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <img src={natyvLogoFull} alt="Natyv AI - /'nātiv/ adjective: Returning to our native state of abundance" className="max-w-2xl w-full mx-auto" />
          </motion.div>

          {/* Subtitle */}
          

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }}>
            <motion.button className="bg-primary text-primary-foreground font-body tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-all duration-300 blue-glow text-center px-[8px] py-[8px] text-base" whileHover={{
            scale: 1.02,
            y: -2
          }} whileTap={{
            scale: 0.98
          }}>
              ​Go to products     
            </motion.button>
            <motion.button className="border border-border text-foreground font-body tracking-widest uppercase rounded-sm transition-all duration-300 text-center bg-primary text-base px-[8px] py-[8px]" whileHover={{
            scale: 1.02,
            y: -2
          }} whileTap={{
            scale: 0.98
          }}>
              Request Briefing
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1.2,
          duration: 0.6
        }}>
            <motion.div className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-2" animate={{
            y: [0, 8, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}>
              <div className="w-1 h-2 bg-primary rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <motion.div className="absolute left-0 top-1/3 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" initial={{
      scaleX: 0,
      opacity: 0
    }} animate={{
      scaleX: 1,
      opacity: 1
    }} transition={{
      delay: 1,
      duration: 0.8
    }} />
      <motion.div className="absolute right-0 top-2/3 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" initial={{
      scaleX: 0,
      opacity: 0
    }} animate={{
      scaleX: 1,
      opacity: 1
    }} transition={{
      delay: 1.2,
      duration: 0.8
    }} />
    </section>;
};
export default HeroSection;