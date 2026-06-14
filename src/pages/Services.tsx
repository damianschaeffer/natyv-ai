import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageServices from "@/components/HomepageServices";
import StartHereOffers from "@/components/StartHereOffers";

// /services leads with the two-path offer system (StartHereOffers) — the
// same two-path model the homepage closes on, with the price rungs made
// explicit. The 74-capability catalog (HomepageServices) renders BELOW
// it in "menu" framing: it is what gets built once a visitor has chosen
// a path, not a competing third entry point. This keeps one coherent
// flow — choose a path → see the menu — instead of three rival taxonomies.
const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Get Started · Two Ways to Begin with AI · Natyv AI</title>
        <meta
          name="description"
          content="Two ways to start: bring on your MyAgent AI employee today, or begin with a fixed-price diagnosis that maps where AI pays back first — every dollar credited toward your build."
        />
        <link rel="canonical" href="https://natyv.ai/services" />
        <meta property="og:title" content="Get Started · Two Ways to Begin with AI · Natyv AI" />
        <meta
          property="og:description"
          content="Start with your agent, or start with a diagnosis. Fixed price, no retainer — know the value before you spend another dollar."
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
        { "@type": "ListItem", "position": 2, "name": "Get Started", "item": "https://natyv.ai/services" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://natyv.ai/services#start-here",
      "name": "Natyv AI — Two Ways to Start",
      "provider": { "@id": "https://natyv.ai/#organization" },
      "description": "Two paths to begin with AI: start with your MyAgent AI employee (free trial or white-glove Founding Member build), or start with a fixed-price diagnosis credited toward your build.",
      "offers": [
        { "@type": "Offer", "name": "Website & AI Visibility Audit", "price": "250", "priceCurrency": "USD", "url": "https://natyv.ai/services#start-here", "description": "Scored website + AI search visibility report with prioritized fixes and a founder walkthrough. 48-hour turnaround. Credited toward the Assessment." },
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
        {/* The catalog as the build MENU, not a third entry point —
            reframed via props so it reads as "what gets built after you
            pick a path." Homepage keeps the default framing (props omitted). */}
        <HomepageServices
          variant="menu"
          eyebrow="What We Build"
          headlinePre="Pick a path."
          headlinePost="We build the rest."
        />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
