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
            <Button className="font-body text-sm tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              Initialize Access
            </Button>
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
      </div>
    </footer>
  );
};

export default Footer;