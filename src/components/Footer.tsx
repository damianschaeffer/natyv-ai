import { motion } from "framer-motion";
import ProtocolStatus from "./ProtocolStatus";
import natyvLogoFooter from "@/assets/natyv-logo-footer.png";
const Footer = () => {
  const partners = [{
    name: "Google Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"
  }, {
    name: "Supabase",
    logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png"
  }, {
    name: "Twilio",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg"
  }, {
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
  }];
  const footerLinks = [{
    label: "Products",
    href: "#products"
  }, {
    label: "Pricing",
    href: "#pricing"
  }, {
    label: "Governance",
    href: "#governance"
  }, {
    label: "Advisory",
    href: "#advisory"
  }];
  const legalLinks = [{
    label: "Privacy",
    href: "#"
  }, {
    label: "Terms",
    href: "#"
  }, {
    label: "Security",
    href: "#"
  }];
  return <footer className="py-20 border-t border-border relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Partner Ribbon */}
        <motion.div className="mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, index) => <motion.div key={partner.name} className="h-6 opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 0.4
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            duration: 0.4
          }} whileHover={{
            opacity: 0.7
          }}>
                <img src={partner.logo} alt={partner.name} className="h-full w-auto object-contain filter brightness-0 invert" />
              </motion.div>)}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          

          {/* Navigation Links */}
          

          {/* CTA */}
          <motion.div className="md:col-span-1" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.6
        }}>
            <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Get Started
            </h4>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Ready to transform your organization with autonomous AI?
            </p>
            <motion.a href="mailto:briefing@natyv.ai" className="inline-block border border-primary font-body tracking-widest uppercase rounded-sm hover:bg-primary transition-all duration-300 px-[8px] py-[8px] text-base text-center text-primary-foreground" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              Request Briefing
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.3,
        duration: 0.6
      }}>
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Natyv AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map(link => <a key={link.label} href={link.href} className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors duration-300">
                {link.label}
              </a>)}
          </div>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;