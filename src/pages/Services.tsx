import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageServices from "@/components/HomepageServices";

// /services route uses the same HomepageServices block that the
// homepage renders, so the dedicated route and the homepage section
// are byte-identical. Visitors who land on /services see the same
// "Full-Service Agency. AI-Powered." H2 and the same six colored
// category cards (with click-to-expand outcome lines on every pill).
const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Services · 80+ AI Workflows for Service Businesses · Natyv AI</title>
        <meta
          name="description"
          content="Six business functions. 75+ productized AI capabilities. Hire Natyv to install, configure, and operate them — or self-serve on MyAgent."
        />
        <link rel="canonical" href="https://natyv.ai/services" />
        <meta property="og:title" content="Services · 80+ AI Workflows · Natyv AI" />
        <meta
          property="og:description"
          content="Six functions. 75+ capabilities. Hire us to run them — or self-serve on MyAgent."
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
        <HomepageServices />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
