import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import natyvLogoFull from "@/assets/natyv-logo-full.png";

const VideoSequence = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    { id: 0, duration: 5000 }, // Mission Part 1
    { id: 1, duration: 5000 }, // Mission Part 2
  ];

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
    setCurrentScene(0);
    setIsPlaying(true);
  };

  const resetSequence = () => {
    setIsPlaying(false);
    setCurrentScene(0);
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
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
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

          {/* Scene 0: Mission Part 1 */}
          {isPlaying && currentScene === 0 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h2
                className="text-4xl md:text-6xl font-display text-foreground"
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
              >
                Building AI systems
              </motion.h2>
              <motion.h2
                className="text-4xl md:text-6xl font-display text-primary"
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 1.8, ease: "easeOut" }}
              >
                that free humans
              </motion.h2>
            </motion.div>
          )}

          {/* Scene 1: Mission Part 2 */}
          {isPlaying && currentScene === 1 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h2
                className="text-4xl md:text-6xl font-display text-foreground"
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
              >
                to live as we are meant to —
              </motion.h2>
              <motion.h2
                className="text-4xl md:text-6xl font-display text-primary"
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 1.8, ease: "easeOut" }}
              >
                present, fulfilled, connected
              </motion.h2>
            </motion.div>
          )}

          {/* End state - Large Logo with Replay */}
          {!isPlaying && currentScene >= scenes.length && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.1, 0.25, 1],
                scale: { type: "spring", stiffness: 100, damping: 20 }
              }}
              className="flex flex-col items-center gap-8"
            >
              <motion.img
                src={natyvLogoFull}
                alt="Natyv AI"
                className="max-w-3xl w-full mx-auto mb-8"
                initial={{ 
                  opacity: 0, 
                  y: 30,
                  filter: "drop-shadow(0 0 0px hsl(var(--primary)))" 
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  filter: [
                    "drop-shadow(0 0 0px hsl(var(--primary)))",
                    "drop-shadow(0 0 30px hsl(var(--primary)))",
                    "drop-shadow(0 0 15px hsl(var(--primary)))",
                  ]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.2,
                  filter: { duration: 2, times: [0, 0.5, 1] }
                }}
              />
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.a
                  href="https://get-myagent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
                <motion.button
                  onClick={resetSequence}
                  className="px-8 py-3 border border-border text-muted-foreground font-body text-sm uppercase tracking-widest rounded-sm flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Replay
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
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
    </section>
  );
};

export default VideoSequence;
