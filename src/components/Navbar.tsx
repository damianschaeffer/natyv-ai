import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import ProtocolStatus from "./ProtocolStatus";
import NatyvLogo from "@/components/brand/NatyvLogo";
import HeaderConversionCTAs from "@/components/HeaderConversionCTAs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  // Scroll-spy: which homepage section the visitor is currently in.
  // null when on a non-homepage route or above all tracked sections.
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("natyv-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem("natyv-theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      return nextTheme;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The concierge expands beneath the live header. Keep its top edge tied to
  // the actual header height so the shell remains flush at every breakpoint.
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      if (header) {
        document.documentElement.style.setProperty(
          "--site-header-h",
          `${header.getBoundingClientRect().height}px`,
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Scroll-spy: track which homepage section is in view. STUDIO is
  // active while the visitor is anywhere inside myagent-section
  // (which ends at "Your Website. Always on."), then hands off to
  // SERVICES, ADVISORY, etc. as the visitor scrolls past each
  // section's bottom edge.
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sectionMap: Record<string, string> = {
      "myagent-section": "Studio",
      "homepage-services": "Services",
      "advisory": "Advisory",
    };
    const sectionIds = Object.keys(sectionMap);

    const compute = () => {
      // The "current" section is the one whose top edge is closest to,
      // but still above, the navbar's bottom edge (~80px from viewport top).
      const probeY = 100;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          current = sectionMap[id];
          break;
        }
      }
      setActiveSection(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [location.pathname]);

  const scrollToMyAgent = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToMyAgent: true } });
    } else {
      const element = document.getElementById("myagent-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Scroll-link handler for Advisory — mirrors scrollToMyAgent pattern.
  // On homepage: smooth-scroll to #advisory. On any other route:
  // navigate to homepage with state flag, then Index.tsx handles the
  // post-navigation scroll on mount.
  const scrollToAdvisory = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToAdvisory: true } });
    } else {
      const element = document.getElementById("advisory");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Order leads with the consulting/implementation offer (Services →
  // Advisory), then the MyAgent product (Studio) as proof, matching the
  // homepage scroll. get-myagent.com sells the product on its own; natyv.ai
  // leads with the diagnose-and-build layer that is unique to the agency.
  const navLinks = [
    { label: "Services", href: "/services", isRoute: true },
    { label: "Advisory", href: "#advisory", isScrollLink: true, onScroll: scrollToAdvisory },
    { label: "Studio", href: "#myagent-section", isScrollLink: true, onScroll: scrollToMyAgent },
  ];

  return (
    <>
      <motion.nav
        data-site-header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-[clamp(0.75rem,2vw,1.5rem)] py-[clamp(0.5rem,1.5vw,1rem)]">
          <div className="flex items-center justify-between gap-[clamp(0.5rem,2vw,1rem)]">
            {/* Logo - fluid sizing */}
            <motion.a
              href="/"
              className="inline-flex items-center min-h-[44px] sm:min-h-0 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <NatyvLogo className="h-[clamp(1rem,2.5vw,1.5rem)] w-auto" />
            </motion.a>

            {/* Desktop Navigation - Fluid sizing with clamp */}
            <div className="hidden md:flex items-center justify-center gap-[clamp(0.35rem,0.8vw,0.75rem)] flex-1 min-w-0">
              {navLinks.map((link, index) => (
                <div key={link.label} className="flex items-center gap-[clamp(0.35rem,0.8vw,0.75rem)]">
                  {index > 0 && (
                    <div
                      className="bg-primary flex-shrink-0"
                      style={{
                        width: 'clamp(4px, 0.5vw, 8px)',
                        height: 'clamp(4px, 0.5vw, 8px)',
                      }}
                    />
                  )}
                  {link.isRoute ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      whileHover={{ y: -2 }}
                    >
                      <Link
                        to={link.href}
                        className={`font-accent uppercase transition-colors duration-300 whitespace-nowrap hover:text-primary ${
                          activeSection === link.label ? "text-primary" : "text-foreground"
                        }`}
                        style={{
                          fontSize: 'clamp(0.65rem, 1.4vw, 1.25rem)',
                          letterSpacing: 'clamp(0.1em, 0.15vw, 0.2em)'
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : link.isScrollLink ? (
                    <motion.button
                      onClick={() => {
                        link.onScroll?.();
                      }}
                      className={`font-accent uppercase transition-colors duration-300 whitespace-nowrap cursor-pointer hover:text-primary ${
                        activeSection === link.label ? "text-primary" : "text-foreground"
                      }`}
                      style={{
                        fontSize: 'clamp(0.65rem, 1.4vw, 1.25rem)',
                        letterSpacing: 'clamp(0.1em, 0.15vw, 0.2em)'
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      whileHover={{ y: -2 }}
                    >
                      {link.label}
                    </motion.button>
                  ) : (
                    <motion.a
                      href={link.href}
                      className="font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap"
                      style={{ 
                        fontSize: 'clamp(0.65rem, 1.4vw, 1.25rem)',
                        letterSpacing: 'clamp(0.1em, 0.15vw, 0.2em)'
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      whileHover={{ y: -2 }}
                    >
                      {link.label}
                    </motion.a>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Theme, conversion CTAs, and protocol status */}
            <div className="hidden md:flex items-center justify-end gap-[clamp(0.25rem,0.65vw,0.625rem)] flex-shrink-0">
              <motion.button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:border-primary hover:bg-background/90 hover:text-primary"
                style={{
                  width: 'clamp(2.25rem, 2.6vw, 2.5rem)',
                  height: 'clamp(2.25rem, 2.6vw, 2.5rem)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.24, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun style={{ width: 'clamp(0.875rem, 1.1vw, 1.125rem)', height: 'clamp(0.875rem, 1.1vw, 1.125rem)' }} />
                ) : (
                  <Moon style={{ width: 'clamp(0.875rem, 1.1vw, 1.125rem)', height: 'clamp(0.875rem, 1.1vw, 1.125rem)' }} />
                )}
              </motion.button>
              <HeaderConversionCTAs />
              <div className="hidden lg:block">
                <ProtocolStatus />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-0 right-0 p-6 flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                >
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 tracking-[0.2em]"
                    >
                      {link.label}
                    </Link>
                  ) : link.isScrollLink ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        link.onScroll?.();
                      }}
                      className="text-2xl font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 tracking-[0.2em] cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 tracking-[0.2em]"
                    >
                      {link.label}
                    </a>
                  )}
                </motion.div>
              ))}

              <HeaderConversionCTAs mobile />

              <motion.button
                type="button"
                onClick={toggleTheme}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:border-primary hover:bg-background/90 hover:text-primary"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.button>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
