import { useEffect } from "react";
import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroAgency from "@/components/HeroAgency";
import MyAgentSection from "@/components/MyAgentSection";
import CaseStudies from "@/components/CaseStudies";
import PartnersSection from "@/components/PartnersSection";
import AdvisorySection from "@/components/AdvisorySection";
import AboutSection from "@/components/AboutSection";
import VideoSequence from "@/components/VideoSequence";
import Footer from "@/components/Footer";

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: "blur(8px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    }
  }
};

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToMyAgent) {
      setTimeout(() => {
        const element = document.getElementById("myagent-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      // Clear the state so it doesn't scroll again on re-render
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Natyv AI — AI-Native Operations Agency for Service Businesses</title>
        <meta
          name="description"
          content="Natyv AI is the AI-native operations agency. We design and deploy voice AI, autonomous workflows, and bespoke agent systems for service businesses — built on MyAgent, run by people who know your industry."
        />
        <link rel="canonical" href="https://natyv.ai/" />
        <meta property="og:title" content="Natyv AI — AI-Native Operations Agency" />
        <meta
          property="og:description"
          content="The agency that installs AI-native operations for service businesses. Built on MyAgent."
        />
        <meta property="og:url" content="https://natyv.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>
      <Navbar />
      <main>
        {/* Hero — outcome-first agency positioning */}
        <HeroAgency />

        {/* MyAgent Section — reframed dual-track (platform + agency) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <MyAgentSection />
        </motion.div>

        {/* Case Studies — proof of work (K&D + Sandcastle + open slot) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <CaseStudies />
        </motion.div>

        {/* Partners — tech stack + trust */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <PartnersSection />
        </motion.div>

        {/* Advisory — strategic consultation hook */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <AdvisorySection />
        </motion.div>

        {/* About — Damian intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.div>

        {/* Mission moment — the "why" we close on */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <VideoSequence />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;