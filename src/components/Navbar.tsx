import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Facebook, Instagram, Menu, X } from "lucide-react";
import TikTokIcon from "./icons/TikTokIcon";
import ProtocolStatus from "./ProtocolStatus";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { label: "Services", href: "/services", isRoute: true },
    { label: "About", href: "/about", isRoute: true },
    { label: "Advisory", href: "/advisory", isRoute: true },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/damianschaeffer", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Natyv_AI", label: "X / Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@NatyvAI", label: "YouTube" },
    { icon: Facebook, href: "https://facebook.com/natyv_ai", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/natyv_ai", label: "Instagram" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@natyv_ai", label: "TikTok" },
  ];

  return (
    <>
      <motion.nav
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
              className="flex items-center flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src={natyvLogoTopline}
                alt="Natyv AI"
                className="h-[clamp(1rem,2.5vw,1.5rem)] w-auto"
              />
            </motion.a>

            {/* Desktop Navigation - Fluid sizing with clamp */}
            <div className="hidden md:flex items-center justify-center gap-[clamp(0.5rem,2vw,1.5rem)] flex-1 min-w-0">
              {navLinks.map((link, index) => (
                <div key={link.label} className="flex items-center gap-[clamp(0.5rem,2vw,1.5rem)]">
                  {index > 0 && (
                    <div 
                      className="bg-primary flex-shrink-0" 
                      style={{ 
                        width: 'clamp(4px, 0.5vw, 8px)', 
                        height: 'clamp(12px, 1.5vw, 20px)' 
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
                        className="font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap"
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
                        scrollToMyAgent();
                      }}
                      className="font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap cursor-pointer"
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

            {/* Right Section - Social Links & Protocol Status - Fluid sizing */}
            <div className="hidden md:flex items-center justify-end gap-[clamp(0.125rem,0.5vw,0.5rem)] flex-shrink-0">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  style={{ padding: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  <social.icon style={{ width: 'clamp(0.875rem, 1.25vw, 1.25rem)', height: 'clamp(0.875rem, 1.25vw, 1.25rem)' }} />
                </motion.a>
              ))}
              <div className="hidden lg:block">
                <ProtocolStatus />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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
                        scrollToMyAgent();
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
              
              {/* Social Links in Mobile */}
              <motion.div
                className="flex items-center gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;