import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";
import TikTokIcon from "./icons/TikTokIcon";
import ProtocolStatus from "./ProtocolStatus";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: "Studio", href: "#myagent-section", isScrollLink: true },
    { label: "Solutions", href: "/services", isRoute: true },
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

  const legalLinks = [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ];


  return (
    <>
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
                  ) : link.isScrollLink ? (
                    <button
                      onClick={scrollToMyAgent}
                      className="font-accent uppercase text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap cursor-pointer"
                      style={{ 
                        fontSize: 'clamp(0.65rem, 1.4vw, 1.25rem)',
                        letterSpacing: 'clamp(0.1em, 0.15vw, 0.2em)'
                      }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
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