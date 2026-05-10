import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdvisorySection from "@/components/AdvisorySection";

// Direct URL access to /advisory now renders the same <AdvisorySection />
// the homepage does. Whether visitors reach Advisory by clicking the
// nav scroll-link, scrolling into it on /, or hitting /advisory by
// direct URL, they see the identical content. Keeps the dedicated
// route around for SEO (page-specific Head + JSON-LD) without
// maintaining a parallel content tree.
const Advisory = () => {

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Book a Strategy Consultation | Natyv AI</title>
        <meta
          name="description"
          content="Book a strategy consultation with Damian Schaeffer, founder of Natyv AI. Reserved for decision-makers exploring how AI-native operations can transform their service business. Confidential. NDA available."
        />
        <link rel="canonical" href="https://natyv.ai/advisory" />
        <meta property="og:title" content="Strategic AI Advisory — Natyv AI" />
        <meta
          property="og:description"
          content="Live 1:1 strategy session with the founder of Natyv AI. AI operations roadmap, ROI modeling, integration plan."
        />
        <meta property="og:url" content="https://natyv.ai/advisory" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://natyv.ai/advisory#service",
  "name": "Strategic AI Advisory",
  "serviceType": "AI Operations Consulting",
  "provider": { "@id": "https://natyv.ai/#organization" },
  "areaServed": "US",
  "url": "https://natyv.ai/advisory",
  "description": "1:1 strategic AI advisory engagement with Damian Schaeffer covering AI capabilities assessment, autonomous-system roadmap, and high-impact automation opportunities for service businesses.",
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Service business owners, founders, and operators"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cal.com/damian-schaeffer/consultation",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "price": "0",
    "description": "Initial consultation at no cost. Engagement pricing follows scope assessment."
  },
  "termsOfService": "Confidential. Enterprise NDA available upon request."
}
        `}</script>
      </Head>
      <Navbar />
      <main className="pt-24">
        <AdvisorySection />
      </main>
      <Footer />
    </div>
  );
};

export default Advisory;
