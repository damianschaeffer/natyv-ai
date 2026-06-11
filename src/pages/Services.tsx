import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageServices from "@/components/HomepageServices";
import StartHereOffers from "@/components/StartHereOffers";

// /services route uses the same HomepageServices block that the
// homepage renders, so the dedicated route and the homepage section
// are byte-identical. Visitors who land on /services see the same
// "Full-Service Agency. AI-Powered." H2 and the same six colored
// category cards (with click-to-expand outcome lines on every pill).
// The assessment copy establishes the paid diagnostic as the clean
// starting point before a visitor buys a build.
const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Services · AI Assessment + 75+ Workflows · Natyv AI</title>
        <meta
          name="description"
          content="Start with an AI Opportunity Assessment, then choose from 75+ productized AI capabilities across front desk, sales, operations, finance, marketing, and customer experience."
        />
        <link rel="canonical" href="https://natyv.ai/services" />
        <meta property="og:title" content="Services · AI Assessment + 75+ Workflows · Natyv AI" />
        <meta
          property="og:description"
          content="Diagnose first, then build the highest-ROI AI workflows for your service business."
        />
        <meta property="og:url" content="https://natyv.ai/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://natyv.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://natyv.ai/services" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://natyv.ai/services#start-here",
      "name": "Natyv AI Fixed-Price Starting Points",
      "provider": { "@id": "https://natyv.ai/#organization" },
      "offers": [
        { "@type": "Offer", "name": "Website & AI Visibility Audit", "price": "250", "priceCurrency": "USD", "url": "https://natyv.ai/services#start-here", "description": "Scored website + AI search visibility report with prioritized fixes and a founder walkthrough. 48-hour turnaround." },
        { "@type": "Offer", "name": "AI Opportunity Assessment", "price": "497", "priceCurrency": "USD", "url": "https://natyv.ai/services#start-here", "description": "Founder-led AI discovery session and 48-hour AI Opportunity Map with ROI snapshot. Fully credited toward your first implementation." },
        { "@type": "Offer", "name": "Founding Member Launch Package", "price": "999", "priceCurrency": "USD", "url": "https://natyv.ai/services#start-here", "description": "White-glove MyAgent voice agent setup with local number, AI business page, and 90 days of Growth-tier service included. Limited to the first 10 businesses." }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://natyv.ai/services#catalog",
      "name": "Natyv AI Service Catalog",
      "provider": { "@id": "https://natyv.ai/#organization" },
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Front Desk", "description": "AI receptionist, call concierge, instant text response, VIP routing, and call sentiment analysis." },
        { "@type": "OfferCatalog", "name": "Sales", "description": "Lead generation, qualification, quote generation, recovery, and instant connection." },
        { "@type": "OfferCatalog", "name": "Operations", "description": "Smart scheduling, no-show prevention, review requests, conversation memory, and multi-location cloning." },
        { "@type": "OfferCatalog", "name": "Finance", "description": "Text-to-pay invoicing, A/R recovery, recurring payments, quote-to-cash automation, and mobile card readers." },
        { "@type": "OfferCatalog", "name": "Marketing", "description": "Social media management, content writing, ad campaigns, marketing sequences, and directory sync." },
        { "@type": "OfferCatalog", "name": "Customer Experience", "description": "AI follow-ups, welcome sequences, dormant-customer outreach, branded portals, and loyalty campaigns." }
      ]
    }
  ]
}
        `}</script>
      </Head>

      <Navbar />

      <main className="pt-24">
        <StartHereOffers />
        <HomepageServices />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
