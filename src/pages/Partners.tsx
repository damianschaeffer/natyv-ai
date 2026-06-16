import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";

// Partners lives on its own route (like About) so the homepage can end on
// the CTA, while visitors who want the "what's under the hood" proof can
// still reach it from the top nav.
const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Partners · The Stack Behind Your Agent · Natyv AI</title>
        <meta
          name="description"
          content="The tier-1 vendors and infrastructure behind every Natyv AI agent — LLM-agnostic, voice-native, telephony-ready, and SOC 2 ready."
        />
        <link rel="canonical" href="https://natyv.ai/partners" />
        <meta property="og:title" content="Partners · Natyv AI" />
        <meta property="og:description" content="Eight tier-1 vendors. One unified agent." />
        <meta property="og:url" content="https://natyv.ai/partners" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>

      <Navbar />

      <main className="pt-24">
        <PartnersSection />
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
