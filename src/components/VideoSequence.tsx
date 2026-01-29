import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const VideoSequence = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  
  // Typewriter state - tracks which line and character we're on
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const dictionaryContent = [
    { text: "/ˈnātiv/ • adj.", style: "pronunciation" },
    { text: "1.  Innate; belonging to a person by nature.", style: "definition" },
    { text: '"The natyv creativity of the human spirit."', style: "example" },
    { text: "2.  Original; not artificial or derivative.", style: "definition" },
    { text: '"Returning to our natyv state of abundance."', style: "example" },
    { text: "[ See also: Human, Liberation, Origin ]", style: "seealso" },
  ];

  const scenes = [
    { id: 0, duration: 5000 },
    { id: 1, duration: 5000 },
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

  // Typewriter effect - types out all lines sequentially, then loops
  useEffect(() => {
    if (isPlaying || currentScene < scenes.length) return;

    const currentLine = dictionaryContent[currentLineIndex];
    
    // If we've completed all lines, wait then restart
    if (isTypingComplete) {
      const restartTimer = setTimeout(() => {
        setCompletedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsTypingComplete(false);
      }, 4000);
      return () => clearTimeout(restartTimer);
    }

    // Type characters
    if (currentCharIndex < currentLine.text.length) {
      const typeTimer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(typeTimer);
    } else {
      // Line complete - move to next line
      const nextLineTimer = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLineIndex]);
        if (currentLineIndex < dictionaryContent.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setIsTypingComplete(true);
        }
      }, 800);
      return () => clearTimeout(nextLineTimer);
    }
  }, [currentCharIndex, currentLineIndex, isTypingComplete, isPlaying, currentScene]);

  const startSequence = () => {
    setCurrentScene(0);
    setIsPlaying(true);
  };

  const getLineStyle = (style: string) => {
    switch (style) {
      case "pronunciation":
        return "text-primary font-body text-xl md:text-2xl tracking-wide";
      case "definition":
        return "text-foreground font-body text-base md:text-lg text-left";
      case "example":
        return "text-muted-foreground font-body text-sm md:text-base italic text-left pl-4";
      case "seealso":
        return "text-foreground font-body text-sm md:text-base text-center mt-4";
      default:
        return "text-foreground font-body text-base";
    }
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

          {/* End state - Dictionary Logo with Typewriter */}
          {!isPlaying && currentScene >= scenes.length && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col items-center w-full max-w-3xl mx-auto"
            >
              {/* Static Header - NATYV AI */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-body font-extralight tracking-[0.2em] uppercase">
                  <span className="text-foreground">NATYV</span>
                  <span className="text-primary ml-2 md:ml-4">AI</span>
                </h1>
              </motion.div>

              {/* Top horizontal line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full h-[1px] bg-foreground/40 mb-6"
              />

              {/* Dictionary Content - Typewriter builds up line by line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="min-h-[280px] flex flex-col items-center justify-start py-4 w-full"
              >
                {dictionaryContent.map((line, index) => {
                  const isCompleted = completedLines.includes(index);
                  const isCurrentlyTyping = index === currentLineIndex && !isTypingComplete;
                  const shouldShow = isCompleted || isCurrentlyTyping;

                  if (!shouldShow) return null;

                  return (
                    <div key={index} className={`${getLineStyle(line.style)} w-full mb-2`}>
                      {isCompleted ? (
                        line.text
                      ) : (
                        <>
                          {line.text.slice(0, currentCharIndex)}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </motion.div>

              {/* Bottom horizontal line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full h-[1px] bg-foreground/40 mt-4 mb-6"
              />

              {/* Static Footer Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center justify-center gap-6 md:gap-10 text-foreground font-body text-xs md:text-sm tracking-[0.3em] uppercase"
              >
                <span>Studio</span>
                <span className="w-[3px] h-4 bg-primary" />
                <span>Solutions</span>
                <span className="w-[3px] h-4 bg-primary" />
                <span>Advisory</span>
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
