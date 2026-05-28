import { motion } from "framer-motion";

const HEADLINE_PRE = "Finally, AI that";
const HEADLINE_POST = "handles real work.";

// Salon hero video — splice from get-myagent.com brand assets
const HERO_VIDEO =
  "https://get-myagent.com/videos/cinematic/salon-hero-fast-2026-04-17T14-53-47-171Z.mp4";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-2 sm:px-6 pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
      {/* Ambient glow — same primitive as MyAgentShowcase + Solutions */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.05] blur-[160px] pointer-events-none" />

      {/* Headline cluster — pre-headline label + h1 with vertical breathing room between halves */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative z-10 text-center max-w-5xl mx-auto mb-5 md:mb-7"
      >
        {/* Two-paths eyebrow lives in the sticky bar now (persistent) so the
            H1 leads the hero unobstructed. */}

        <h1 className="font-poppins font-bold text-[36px] sm:text-6xl md:text-7xl lg:text-[80px] !leading-[1.14] tracking-[-0.04em] text-foreground">
          {HEADLINE_PRE}
          <br />
          <span className="text-primary inline-block whitespace-nowrap">
            {HEADLINE_POST}
          </span>
        </h1>
      </motion.div>

      {/* Hero video — same chrome as MyAgentShowcase video frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-2xl shadow-black/80">
          <div className="relative aspect-video bg-gradient-to-br from-[#0a0a0a] to-[#111]">
            <video
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
