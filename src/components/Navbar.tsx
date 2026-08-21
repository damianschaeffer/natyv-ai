import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Monitor, Moon, Sun, X } from "lucide-react";
import ProtocolStatus from "./ProtocolStatus";
import NatyvLogo from "@/components/brand/NatyvLogo";
import HeaderConversionCTAs from "@/components/HeaderConversionCTAs";

type ThemeMode = "dark" | "light" | "auto";

const THEME_MODES: ThemeMode[] = ["dark", "light", "auto"];
const THEME_LABELS: Record<ThemeMode, string> = {
  dark: "Dark",
  light: "Light",
  auto: "Auto",
};

const applyThemeMode = (mode: ThemeMode, mediaQuery: MediaQueryList) => {
  const isDark = mode === "dark" || (mode === "auto" && mediaQuery.matches);
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.dataset.themeMode = mode;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  // Scroll-spy: which homepage section the visitor is currently in.
  // null when on a non-homepage route or above all tracked sections.
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("natyv-theme");
    if (savedTheme === "dark" || savedTheme === "light" || savedTheme === "auto") {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => applyThemeMode(themeMode, mediaQuery);

    syncTheme();
    if (themeMode !== "auto") return;

    mediaQuery.addEventListener("change", syncTheme);
    return () => mediaQuery.removeEventListener("change", syncTheme);
  }, [themeMode]);

  const nextThemeMode = THEME_MODES[(THEME_MODES.indexOf(themeMode) + 1) % THEME_MODES.length];
  const themeButtonLabel = `Theme: ${THEME_LABELS[themeMode]}. Click to switch to ${THEME_LABELS[nextThemeMode]}.`;
  const ThemeIcon = themeMode === "dark" ? Moon : themeMode === "light" ? Sun : Monitor;

  const toggleTheme = () => {
    setThemeMode(nextThemeMode);
    window.localStorage.setItem("natyv-theme", nextThemeMode);
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

  // Public chrome matches get-myagent.com. /offers stays live for anyone
  // with the URL, but is not in the natural nav until the shelf is ready.
  const navLinks = [
    { label: "Studio", href: "#myagent-section", isScrollLink: true, onScroll: scrollToMyAgent },
    { label: "Services", href: "/services", isRoute: true },
    { label: "Advisory", href: "#advisory", isScrollLink: true, onScroll: scrollToAdvisory },
    { label: "Referrals", href: "/referrals", isRoute: true },
    { label: "FAQ", href: "/faq", isRoute: true },
  ];

  const isNavActive = (link: { label: string; href: string; isRoute?: boolean }) =>
    activeSection === link.label || Boolean(link.isRoute && location.pathname === link.href);

  // Identical to get-myagent.com header links: Poppins 14px, sentence case.
  const desktopNavClass = (active: boolean) =>
    `font-poppins text-sm whitespace-nowrap transition-colors hover:text-primary ${
      active ? "text-primary" : "text-foreground"
    }`;
  const mobileNavClass =
    "font-poppins text-lg text-foreground hover:text-primary transition-colors";

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
        <div className="container mx-auto flex h-10 items-center justify-between gap-2 px-4 pt-0 pb-0 sm:h-14">
            {/* Logo - fluid sizing */}
            <motion.a
              href="/"
              className="inline-flex items-center flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <NatyvLogo className="h-[clamp(1rem,2.5vw,1.5rem)] w-auto" />
            </motion.a>

            {/* Desktop Navigation — same system as get-myagent.com */}
            <nav className="hidden md:flex items-center justify-center gap-6 flex-1 min-w-0">
              {navLinks.map((link, index) => (
                link.isRoute ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={desktopNavClass(isNavActive(link))}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : link.isScrollLink ? (
                  <motion.button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      link.onScroll?.();
                    }}
                    className={`${desktopNavClass(isNavActive(link))} cursor-pointer`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    {link.label}
                  </motion.button>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={desktopNavClass(false)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    {link.label}
                  </motion.a>
                )
              ))}
            </nav>

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
                aria-label={themeButtonLabel}
                title={themeButtonLabel}
                data-theme-mode={themeMode}
              >
                <ThemeIcon style={{ width: 'clamp(0.875rem, 1.1vw, 1.125rem)', height: 'clamp(0.875rem, 1.1vw, 1.125rem)' }} />
              </motion.button>
              <HeaderConversionCTAs />
              <div className="hidden lg:block">
                <ProtocolStatus />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden inline-flex h-8 w-8 items-center justify-center text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
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
                      className={mobileNavClass}
                    >
                      {link.label}
                    </Link>
                  ) : link.isScrollLink ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        link.onScroll?.();
                      }}
                      className={`${mobileNavClass} cursor-pointer`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileNavClass}
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
                aria-label={themeButtonLabel}
                title={themeButtonLabel}
                data-theme-mode={themeMode}
              >
                <ThemeIcon className="h-4 w-4" />
              </motion.button>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
