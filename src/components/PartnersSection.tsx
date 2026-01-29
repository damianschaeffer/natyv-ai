import { motion } from "framer-motion";
import natyvLogoTopline from "@/assets/natyv-logo-topline.png";

const PartnersSection = () => {
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
  );
};

export default PartnersSection;
