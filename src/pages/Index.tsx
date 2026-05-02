import { useEffect } from "react";
import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MyAgentSection from "@/components/MyAgentSection";
import PartnersSection from "@/components/PartnersSection";
import CaseStudies from "@/components/CaseStudies";
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
        <title>Natyv AI · /ˈnātiv/ — Architecting Autonomy</title>
        <meta
          name="description"
          content="Natyv (adj. /ˈnātiv/) — innate, original, native. We architect AI-native operations for service businesses, returning owners to a state of abundance. Studio · Solutions · Strategic Advisory."
        />
        <link rel="canonical" href="https://natyv.ai/" />
        <meta property="og:title" content="Natyv AI · /ˈnātiv/ — Architecting Autonomy" />
        <meta
          property="og:description"
          content="Natyv (adj. /ˈnātiv/) — innate, original, native. AI-native operations for service businesses. Studio · Solutions · Strategic Advisory."
        />
        <meta property="og:url" content="https://natyv.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>
      <Navbar />
      <main>
        {/* Hero Section - VideoSequence */}
        <VideoSequence />
        
        {/* MyAgent Section with fade-in transition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <MyAgentSection />
        </motion.div>

        {/* Partners Section with fade-in transition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <PartnersSection />
        </motion.div>

        {/* Case Studies — proof of work */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <CaseStudies />
        </motion.div>

        {/* Advisory Section with fade-in transition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <AdvisorySection />
        </motion.div>

        {/* About Section with fade-in transition */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;