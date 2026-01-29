import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";
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
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
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
    { name: "Anthropic", logo: "/logos/anthropic.svg", scale: 0.75 },
    { name: "ElevenLabs", logo: "/logos/elevenlabs.svg" },
  ];

  return (
    <>
      {/* Partners Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Natyv Logo Header */}
            <img
              src={natyvLogoTopline}
              alt="Natyv AI"
              className="w-full max-w-md mx-auto mb-3"
            />
            {/* White separator line */}
            <div className="w-full max-w-md mx-auto h-px bg-foreground/40 mb-3" />
            {/* PARTNERS label with blue vertical separators */}
            <div className="flex items-center justify-center gap-9">
              <span className="w-[9px] h-9 bg-primary" />
              <span className="text-foreground font-body text-2xl md:text-3xl tracking-[0.3em] uppercase">
                Partners
              </span>
              <span className="w-[9px] h-9 bg-primary" />
            </div>
          </motion.div>
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-12 animate-scroll"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* First set of logos */}
              {partners.map((partner) => (
                <div
                  key={`first-${partner.name}`}
                  className="h-6 opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale flex-shrink-0"
                  style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto object-contain filter brightness-0 invert"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`second-${partner.name}`}
                  className="h-6 opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale flex-shrink-0"
                  style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto object-contain filter brightness-0 invert"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[clamp(0.5rem,1.5vw,1rem)] border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-[clamp(0.75rem,2vw,1.5rem)]">
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

            {/* Navigation Links - Fluid sizing with clamp */}
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
                  ) : (
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap"
                      style={{ 
                        fontSize: 'clamp(0.65rem, 1.4vw, 1.25rem)',
                        letterSpacing: 'clamp(0.1em, 0.15vw, 0.2em)'
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Social Links - Fluid sizing */}
            <div className="hidden md:flex items-center justify-end gap-[clamp(0.125rem,0.5vw,0.5rem)] flex-shrink-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  style={{ padding: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}
                  aria-label={social.label}
                >
                  <social.icon style={{ width: 'clamp(0.875rem, 1.25vw, 1.25rem)', height: 'clamp(0.875rem, 1.25vw, 1.25rem)' }} />
                </a>
              ))}
              <div className="hidden lg:block">
                <ProtocolStatus />
              </div>
            </div>
          </div>

          {/* Bottom Bar with Legal Links */}
          <div className="mt-2 pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
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
        </div>
      </footer>
    </>
  );
};

export default Footer;