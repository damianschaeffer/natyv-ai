import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";
import TikTokIcon from "./icons/TikTokIcon";
import ProtocolStatus from "./ProtocolStatus";
import NatyvLogo from "@/components/brand/NatyvLogo";

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

  // One footer row, same type size as the header. /offers stays reachable
  // by URL but is not listed until the public shelf is ready.
  const navLinks = [
    { label: "Studio", href: "#myagent-section", isScrollLink: true },
    { label: "Services", href: "/services" },
    { label: "Advisory", href: "/advisory" },
    { label: "Referrals", href: "/referrals" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Partners", href: "/partners" },
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/damianschaeffer", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Natyv_AI", label: "X / Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@NatyvAI", label: "YouTube" },
    { icon: Facebook, href: "https://facebook.com/natyv_ai", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/natyv_ai", label: "Instagram" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@natyv_ai", label: "TikTok" },
  ];

  const navLinkClass =
    "font-poppins text-base font-semibold text-muted-foreground hover:text-primary transition-colors whitespace-nowrap";

  return (
    <footer className="border-t border-border relative overflow-hidden py-[clamp(0.75rem,1.5vw,1.25rem)]">
      <div className="container mx-auto px-[clamp(0.75rem,2vw,1.5rem)]">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-4">
          <motion.a
            href="/"
            className="inline-flex items-center min-h-[44px] sm:min-h-0 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <NatyvLogo className="h-7 w-auto" loading="lazy" />
          </motion.a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5">
            {navLinks.map((link) =>
              link.isScrollLink ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={scrollToMyAgent}
                  className={`${navLinkClass} cursor-pointer`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={navLinkClass}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center justify-center gap-[clamp(0.125rem,0.5vw,0.5rem)] flex-shrink-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                style={{ padding: "clamp(0.25rem, 0.5vw, 0.5rem)" }}
                aria-label={social.label}
              >
                <social.icon style={{ width: "clamp(0.875rem, 1.25vw, 1.25rem)", height: "clamp(0.875rem, 1.25vw, 1.25rem)" }} />
              </a>
            ))}
            <div className="hidden lg:block">
              <ProtocolStatus />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-3 md:flex-row">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Natyv AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
