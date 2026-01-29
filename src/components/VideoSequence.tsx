import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import natyvLogoFull from "@/assets/natyv-logo-full.png";
import { useAudioSynth } from "@/hooks/useAudioSynth";

const VideoSequence = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const droneRef = useRef<{ oscillators: OscillatorNode[]; gainNode: GainNode } | null>(null);
  const prevSceneRef = useRef(-1);

  const {
    playAmbientDrone,
    playWhoosh,
    playChime,
    playRise,
    playBlip,
    playImpact,
    fadeOutDrone,
  } = useAudioSynth({ masterVolume: isMuted ? 0 : 0.3 });

  const scenes = [
    { id: 0, duration: 2000 }, // Logo reveal
    { id: 1, duration: 2500 }, // Tagline 1
    { id: 2, duration: 2500 }, // Tagline 2
    { id: 3, duration: 2500 }, // Stats
    { id: 4, duration: 3000 }, // Final CTA
  ];

  // Play sounds based on scene changes
  useEffect(() => {
    if (!isPlaying || isMuted || prevSceneRef.current === currentScene) return;
    prevSceneRef.current = currentScene;

    switch (currentScene) {
      case 0:
        // Start ambient drone and play rise for logo reveal
        droneRef.current = playAmbientDrone() || null;
        setTimeout(() => playRise(), 300);
        setTimeout(() => playChime(660), 800);
        break;
      case 1:
        // Whoosh for text transition
        playWhoosh();
        setTimeout(() => playChime(880), 500);
        break;
      case 2:
        // Another whoosh with different chime
        playWhoosh();
        setTimeout(() => playChime(1100), 400);
        break;
      case 3:
        // Blips for each stat
        playBlip(1);
        setTimeout(() => playBlip(1.25), 200);
        setTimeout(() => playBlip(1.5), 400);
        break;
      case 4:
        // Impact for final CTA
        playImpact();
        setTimeout(() => playChime(440), 800);
        break;
    }
  }, [isPlaying, currentScene, isMuted, playAmbientDrone, playWhoosh, playChime, playRise, playBlip, playImpact]);

  // Handle sequence end - fade out drone
  useEffect(() => {
    if (!isPlaying && currentScene >= scenes.length && droneRef.current) {
      fadeOutDrone(droneRef.current);
      droneRef.current = null;
    }
  }, [isPlaying, currentScene, scenes.length, fadeOutDrone]);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentScene >= scenes.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentScene((prev) => prev + 1);
    }, scenes[currentScene].duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentScene]);

  const startSequence = () => {
    prevSceneRef.current = -1;
    setCurrentScene(0);
    setIsPlaying(true);
  };

  const resetSequence = () => {
    if (droneRef.current) {
      fadeOutDrone(droneRef.current);
      droneRef.current = null;
    }
    prevSceneRef.current = -1;
    setIsPlaying(false);
    setCurrentScene(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          animate={isPlaying ? { 
            backgroundPosition: ["0px 0px", "60px 60px"],
          } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
                opacity: 0,
              }}
              animate={{
                y: -10,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Main content area */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Idle state - Play button */}
          {!isPlaying && currentScene === 0 && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.div
                className="w-32 h-32 rounded-full border-2 border-primary/50 flex items-center justify-center cursor-pointer group"
                whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.95 }}
                onClick={startSequence}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary) / 0.4)",
                      "0 0 0 20px hsl(var(--primary) / 0)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-10 h-10 text-primary ml-1" />
                </motion.div>
              </motion.div>
              <p className="text-muted-foreground font-body text-sm uppercase tracking-widest">
                Click to experience
              </p>
            </motion.div>
          )}

          {/* Scene 0: Logo Reveal */}
          {isPlaying && currentScene === 0 && (
            <motion.div
              key="scene0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20,
                  delay: 0.3 
                }}
              >
                <motion.img
                  src={natyvLogoFull}
                  alt="Natyv AI"
                  className="h-20 md:h-28 w-auto"
                  animate={{ 
                    filter: [
                      "drop-shadow(0 0 0px hsl(var(--primary)))",
                      "drop-shadow(0 0 30px hsl(var(--primary)))",
                      "drop-shadow(0 0 10px hsl(var(--primary)))",
                    ]
                  }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Scene 1: Tagline 1 */}
          {isPlaying && currentScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.h2
                className="text-4xl md:text-6xl font-display text-foreground"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The Future of
              </motion.h2>
              <motion.h2
                className="text-4xl md:text-6xl font-display text-primary"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Autonomous Intelligence
              </motion.h2>
            </motion.div>
          )}

          {/* Scene 2: Tagline 2 */}
          {isPlaying && currentScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body">
                  Enterprise Grade
                </span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
              </motion.div>
              <motion.p
                className="text-xl md:text-3xl font-body text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                AI agents that understand, decide, and execute with precision
              </motion.p>
            </motion.div>
          )}

          {/* Scene 3: Stats */}
          {isPlaying && currentScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-8 md:gap-16"
            >
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "< 50ms", label: "Response" },
                { value: "∞", label: "Scale" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-3xl md:text-5xl font-display text-primary mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      delay: 0.3 + index * 0.2 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Scene 4: Final CTA */}
          {isPlaying && currentScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h2
                className="text-3xl md:text-5xl font-display text-foreground"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.05em" }}
                transition={{ duration: 1.2 }}
              >
                Initialize Your Future
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.a
                  href="https://get-myagent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-sm"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </motion.div>
            </motion.div>
          )}

          {/* End state - Replay button */}
          {!isPlaying && currentScene >= scenes.length && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.h2
                className="text-3xl md:text-5xl font-display text-foreground mb-4"
              >
                Initialize Your Future
              </motion.h2>
              <div className="flex gap-4">
                <motion.a
                  href="https://get-myagent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
                <motion.button
                  onClick={resetSequence}
                  className="px-8 py-3 border border-border text-muted-foreground font-body text-sm uppercase tracking-widest rounded-sm flex items-center gap-2"
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Replay
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar and audio control */}
      {isPlaying && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48">
          <div className="h-0.5 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2 font-body">
            {currentScene + 1} / {scenes.length}
          </p>
        </div>
      )}

      {/* Mute/Unmute button */}
      {(isPlaying || currentScene >= scenes.length) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMute}
          className="absolute bottom-10 right-10 p-3 rounded-full border border-border bg-background/50 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      )}
    </section>
  );
};

export default VideoSequence;
