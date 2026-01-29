import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtocolStatus from "./ProtocolStatus";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Products", href: "https://get-myagent.com", isExternal: true },
    { label: "About", href: "/about", isRoute: true },
    { label: "Advisory", href: "/advisory", isRoute: true },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/damianschaeffer", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
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
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img
              src={natyvLogoTopline}
              alt="Natyv AI"
              className="h-5 lg:h-6 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 flex-1 min-w-0">
            {navLinks.map((link, index) => (
              <div key={link.label} className="flex items-center gap-4 xl:gap-6">
                {index > 0 && (
                  <div className="w-[6px] xl:w-[8px] h-4 xl:h-5 bg-primary flex-shrink-0" />
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
                      className="text-base lg:text-lg xl:text-xl font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 tracking-[0.15em] xl:tracking-[0.2em] whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="text-base lg:text-lg xl:text-xl font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 tracking-[0.15em] xl:tracking-[0.2em] whitespace-nowrap"
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

          {/* Right Section - Social Links & Protocol Status */}
          <div className="hidden lg:flex items-center justify-end gap-1 xl:gap-2 flex-shrink-0">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-1.5 xl:p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 xl:w-5 xl:h-5" />
              </motion.a>
            ))}
            <div className="hidden xl:block">
              <ProtocolStatus />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;