import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReferralsSection from "@/components/ReferralsSection";

const Referrals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Referrals · Give $100, Get $100 · Natyv AI</title>
        <meta
          name="description"
          content="Share the AI Opportunity Assessment with a friend — they save $100 at checkout, you get $100 back. Refer at any step: assessment, founder session, or White-Glove Build."
        />
        <link rel="canonical" href="https://natyv.ai/referrals" />
        <meta property="og:title" content="Referrals · Natyv AI" />
        <meta
          property="og:description"
          content="Give $100, get $100 on the AI Opportunity Assessment — plus ways to refer founder sessions and White-Glove builds."
        />
        <meta property="og:url" content="https://natyv.ai/referrals" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>

      <Navbar />

      <main className="pt-24 pb-16">
        <ReferralsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Referrals;
