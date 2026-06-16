import { useEffect } from "react";
import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomepageServices from "@/components/HomepageServices";
import MyAgentShowcase from "@/components/MyAgentShowcase";
import AdvisorySection from "@/components/AdvisorySection";
import Hero from "@/components/Hero";
import StartHereOffers from "@/components/StartHereOffers";
import Footer from "@/components/Footer";
import { MotionSection } from "@/components/MotionSection";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Post-navigation scroll: when the visitor clicked a homepage-anchor
    // nav link (Studio or Advisory) from a non-homepage route, the
    // Navbar pushes a state flag and we scroll to the right id once the
    // homepage has mounted.
    const targetId = location.state?.scrollToMyAgent
      ? "myagent-section"
      : location.state?.scrollToAdvisory
        ? "advisory"
        : null;

    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
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
          content="Natyv (adj. /ˈnātiv/) - innate, original, native. We architect AI-native operations for service businesses, starting with an AI Opportunity Assessment."
        />
        <link rel="canonical" href="https://natyv.ai/" />
        <meta property="og:title" content="Natyv AI · /ˈnātiv/ — Architecting Autonomy" />
        <meta
          property="og:description"
          content="AI-native operations for service businesses. Start with an AI Opportunity Assessment, then build the systems that pay back first."
        />
        <meta property="og:url" content="https://natyv.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>
      <Navbar />
      <main>
        {/* Hero — entry, dual fork CTAs, salon video */}
        <Hero />

        {/* Hero hands straight to the product SHOWING real work — no
            commodity "here are your problems" grid in between. */}
        <MotionSection>
          <MyAgentShowcase />
        </MotionSection>

        {/* The breadth — agency-level power across the whole operation. */}
        <MotionSection>
          <HomepageServices />
        </MotionSection>

        {/* PROOF — the worked SAMPLE of the AI Opportunity Assessment + the
            roadmap. This demonstrates exactly what the offer produces, so it
            MUST come before the close (show the demonstration, then ask). */}
        <MotionSection>
          <AdvisorySection />
        </MotionSection>

        {/* THE CLOSE — the final beat. Three Grand Slam offers, the $497
            Opportunity Map as the credited center. The page ENDS here on the
            CTA — nothing follows it (Partners moved off the homepage). */}
        <MotionSection>
          <StartHereOffers />
        </MotionSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
