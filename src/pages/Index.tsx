import { useEffect } from "react";
import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomepageServices from "@/components/HomepageServices";
import MyAgentShowcase from "@/components/MyAgentShowcase";
import PartnersSection from "@/components/PartnersSection";
import AdvisorySection from "@/components/AdvisorySection";
import Hero from "@/components/Hero";
import StickyDualCTA from "@/components/StickyDualCTA";
import TwoPathsFooter from "@/components/TwoPathsFooter";
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
        {/* Hero — entry, dual fork CTAs, salon video */}
        <Hero />

        {/* Studio (Path A) — MyAgent product showcase.
            amount: "some" triggers fade-in as soon as ANY pixel enters the
            viewport. amount: 0.2 (the previous value) was unreachable for
            tall sections — 20% of a 5000px section is larger than the
            viewport, so the section never became visible. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          variants={sectionVariants}
        >
          <MyAgentShowcase />
        </motion.div>

        {/* Solutions (Path B) — agency catalog. The previous PivotBanner
            ("Want it built around your operations?") was removed; its
            intent is now folded into the rotating subtitle below the
            SERVICES section header, so the SectionHeader itself is the
            transition cue. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          variants={sectionVariants}
        >
          <HomepageServices />
        </motion.div>

        {/* Advisory — Path B endpoint (consultation booking) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          variants={sectionVariants}
        >
          <AdvisorySection />
        </motion.div>

        {/* Partners — trust signal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          variants={sectionVariants}
        >
          <PartnersSection />
        </motion.div>

        {/* Two-Paths pre-footer — final binary fork for any remaining un-converted scroller */}
        <TwoPathsFooter />
      </main>
      <StickyDualCTA />
      <Footer />
    </div>
  );
};

export default Index;
