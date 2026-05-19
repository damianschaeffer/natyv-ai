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
        <title>AI Opportunity Assessment | Natyv AI</title>
        <meta
          name="description"
          content="Book a $500 AI Opportunity Assessment with Natyv AI. Start with a guided AI interview, receive a 48-hour opportunity map, and credit the assessment toward your first build."
        />
        <link rel="canonical" href="https://natyv.ai/advisory" />
        <meta property="og:title" content="AI Opportunity Assessment — Natyv AI" />
        <meta
          property="og:description"
          content="A guided AI assessment, founder-reviewed report, ROI map, and prioritized quick-win plan for service businesses."
        />
        <meta property="og:url" content="https://natyv.ai/advisory" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://natyv.ai/advisory#service",
  "name": "AI Opportunity Assessment",
  "serviceType": "AI Operations Assessment",
  "provider": { "@id": "https://natyv.ai/#organization" },
  "areaServed": "US",
  "url": "https://natyv.ai/advisory",
  "description": "Paid AI Opportunity Assessment covering an AI-led discovery interview, 48-hour opportunity map, ROI snapshot, quick-win plan, and founder walkthrough for service businesses.",
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Service business owners, founders, and operators"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://cal.com/damian-schaeffer/consultation",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "price": "500",
    "description": "Founding assessment offer credited toward the first Natyv build when the client moves forward within 14 days."
  },
  "termsOfService": "Confidential. NDA available upon request."
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
