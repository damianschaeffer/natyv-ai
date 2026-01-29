import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube } from "lucide-react";
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
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img
              src={natyvLogoTopline}
              alt="Natyv AI"
              className="h-6 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.href}
                    className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              )
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <ProtocolStatus />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Button
                className="font-body text-sm tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Book Advisory Session
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;