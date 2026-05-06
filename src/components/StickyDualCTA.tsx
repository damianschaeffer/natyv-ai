import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Same North Star path used by MyAgentBrandLogo in MyAgentShowcase.tsx —
// keeping the exact MyAgent identity mark on the chip.
const NORTH_STAR_PATH =
  "M100 34 Q108 88 166 100 Q108 112 100 166 Q92 112 34 100 Q92 88 100 34Z";

// Always-on conversion path: visible from the very top of the hero through
// the entire page, hides only once the footer enters the viewport so the
// final-page legal nav isn't covered.
//
// Two-paths wayfinder: persistent eyebrow + asymmetric button pair so the
// fork (MyAgent product vs. agency services) is always visible. The visual
// treatments themselves communicate the choice — MyAgent-branded chip on
// the left, blue Agency-services pill on the right.
const StickyDualCTA = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        setVisible(true);
        return;
      }
      const footerTop = footer.getBoundingClientRect().top;
      // Hide once footer is within ~80px of entering the viewport so the
      // sticky bar never overlaps the legal/copyright row.
      setVisible(footerTop > window.innerHeight - 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-background/85 border-t border-border/50 shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.6)]"
          role="region"
          aria-label="Quick start options"
        >
          <div className="container mx-auto px-3 sm:px-6 pt-2 pb-2.5 flex flex-col items-center gap-1.5">
            {/* Persistent two-paths eyebrow — moved out of the page sections
                so the wayfinder is always visible above the buttons. */}
            <div
              className="flex items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground/70 font-accent"
              aria-hidden="true"
            >
              <span className="h-px w-6 sm:w-10 bg-primary/40" />
              <span>Two paths. Pick yours.</span>
              <span className="h-px w-6 sm:w-10 bg-primary/40" />
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
              {/* Left — MyAgent-branded chip. Dark fill + MyAgent diamond
                  carries the MyAgent product identity, so the eye reads
                  "this is the MyAgent path" before reading the label. */}
              <a
                href="https://get-myagent.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial max-w-[220px] sm:max-w-none"
              >
                <Button
                  variant="outline"
                  className="w-full h-10 px-3 sm:px-5 text-xs sm:text-sm font-poppins font-semibold rounded-full bg-background/90 hover:bg-background border border-foreground/30 hover:border-foreground/50 text-foreground transition-all"
                >
                  {/* "[lockup] Free Trial" wrapped as a SINGLE flex child
                      so Button's gap-2 only applies between this block
                      and the arrow (matching the right button's "Agency
                      Services →" rhythm). The MyAgent logo anchors the
                      far-left of the pill so the brand reads first. */}
                  <span className="hidden sm:inline whitespace-nowrap">
                    <span
                      className="inline-flex items-center align-middle"
                      style={{
                        gap: "0.25em",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        verticalAlign: "middle",
                      }}
                      aria-label="MyAgent"
                    >
                      <span
                        className="inline-flex items-center justify-center bg-primary flex-shrink-0"
                        style={{
                          width: "1em",
                          height: "1em",
                          borderRadius: "0.227em",
                        }}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="24 24 152 152"
                          style={{ width: "0.8em", height: "0.8em" }}
                        >
                          <path d={NORTH_STAR_PATH} fill="#ffffff" />
                        </svg>
                      </span>
                      <span style={{ whiteSpace: "nowrap" }}>
                        <span className="text-primary">My</span>
                        <span>Agent</span>
                      </span>
                    </span>
                    {" "}Free Trial
                  </span>

                  {/* Mobile-only compact lockup — same canonical logo. */}
                  <span
                    className="sm:hidden inline-flex items-center"
                    style={{
                      gap: "0.25em",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                    aria-label="MyAgent"
                  >
                    <span
                      className="inline-flex items-center justify-center bg-primary flex-shrink-0"
                      style={{
                        width: "1em",
                        height: "1em",
                        borderRadius: "0.227em",
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="24 24 152 152"
                        style={{ width: "0.8em", height: "0.8em" }}
                      >
                        <path d={NORTH_STAR_PATH} fill="#ffffff" />
                      </svg>
                    </span>
                    <span style={{ whiteSpace: "nowrap" }}>
                      <span className="text-primary">My</span>
                      <span>Agent</span>
                    </span>
                  </span>

                  <ArrowRight className="ml-1 sm:ml-1.5 w-3.5 h-3.5" />
                </Button>
              </a>

              {/* Right — Agency services. Blue pill = the prominent house CTA
                  for visitors who want hands-on agency engagement instead of
                  the self-serve product. */}
              <Link
                to="/services"
                className="flex-1 sm:flex-initial max-w-[220px] sm:max-w-none"
              >
                <Button className="w-full h-10 px-3 sm:px-5 text-xs sm:text-sm font-poppins font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  <span className="hidden sm:inline">Agency Services</span>
                  <span className="sm:hidden">Services</span>
                  <ArrowRight className="ml-1 sm:ml-1.5 w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyDualCTA;
