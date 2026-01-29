import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtocolStatus from "./ProtocolStatus";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const Footer = () => {
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

  const legalLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ];

  const partners = [
    { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
    { name: "Supabase", logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" },
    { name: "Twilio", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg" },
    { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { name: "Google Gemini", logo: "/logos/google-gemini.svg" },
    { name: "GoHighLevel", logo: "/logos/gohighlevel.png" },
    { name: "Anthropic", logo: "/logos/anthropic.svg" },
  ];

  return (
    <footer className="py-6 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6">
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <ProtocolStatus />
            </div>
            <Link to="/advisory">
              <Button className="font-body text-base tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground p-2">
                Book Advisory Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Natyv AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Partner Ribbon */}
        <motion.div
          className="mt-8 pt-6 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="h-6 opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ opacity: 0.7 }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto object-contain filter brightness-0 invert"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;