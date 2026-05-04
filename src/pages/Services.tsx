import { motion } from "framer-motion";
import { Head } from "vite-react-ssg";
import {
  Phone,
  TrendingUp,
  Settings2,
  CreditCard,
  Megaphone,
  Heart,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceItem {
  name: string;
  outcome: string;
}

interface ServiceFunction {
  id: string;
  title: string;
  tagline: string;
  icon: typeof Phone;
  services: ServiceItem[];
}

const functions: ServiceFunction[] = [
  {
    id: "front-desk",
    title: "Front Desk",
    tagline: "Never miss a call. Never lose a lead.",
    icon: Phone,
    services: [
      { name: "24/7 AI Voice Receptionist", outcome: "Every call answered, even at 2am or during your busiest hour." },
      { name: "Personal Call Concierge", outcome: "VIP-style screening, routing, and message handling for every caller." },
      { name: "Instant Text Response", outcome: "Sub-30-second SMS reply to any missed-call, web form, or DM." },
      { name: "VIP Priority Routing", outcome: "Top clients reach a human path; everyone else is handled cleanly." },
      { name: "Call Sentiment Analysis", outcome: "Catch frustrated callers before they churn — flagged for owner review." },
    ],
  },
  {
    id: "sales",
    title: "Sales",
    tagline: "Capture, qualify, and close — without the human-funnel bottleneck.",
    icon: TrendingUp,
    services: [
      { name: "Lead Generation Specialist", outcome: "Inbound + outbound lead sourcing tuned to your ideal customer." },
      { name: "Lead Qualification & Routing", outcome: "Hot leads land with the right person in the right channel, instantly." },
      { name: "Quote Generator", outcome: "Branded quotes drafted from a 30-second client conversation." },
      { name: "Abandoned Inquiry Recovery", outcome: "Win back the 60% of leads that ghost after the first touch." },
      { name: "Instant Lead Connection", outcome: "Pair every new lead with a live channel inside two minutes." },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    tagline: "Smart scheduling, fewer no-shows, a team that actually goes home on time.",
    icon: Settings2,
    services: [
      { name: "Smart Scheduling", outcome: "Book the right service in the right window — without back-and-forth." },
      { name: "No-Show Prevention", outcome: "Multi-touch reminder + reschedule sequences that recover 25–40% of no-shows." },
      { name: "Auto-Review Requests", outcome: "Trigger Google / Yelp / industry review asks at the perfect moment." },
      { name: "Conversation Memory", outcome: "Every caller's history at the agent's fingertips — no \"who is this\" moments." },
      { name: "Multi-Location Cloning", outcome: "Replicate your best location's playbook across the next ten." },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    tagline: "Get paid faster. Reconcile less. Sleep better.",
    icon: CreditCard,
    services: [
      { name: "Text-to-Pay Invoicing", outcome: "Send a payable link by SMS — most clients pay inside 4 hours." },
      { name: "A/R Recovery Specialist", outcome: "Polite, persistent follow-up on overdue invoices that doesn't burn relationships." },
      { name: "Recurring Payment Setup", outcome: "Move clients onto autopay without the awkward conversation." },
      { name: "Quote-to-Cash Automation", outcome: "From sent quote to received payment, fully automated." },
      { name: "Mobile Card Reader Setup", outcome: "Accept card payments anywhere — properly integrated with your books." },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Show up everywhere your customers do — without an agency for each channel.",
    icon: Megaphone,
    services: [
      { name: "Social Media Manager", outcome: "Daily on-brand posting across the channels your customers actually use." },
      { name: "Content Writing Assistant", outcome: "Blog posts, email sequences, and ad copy in your voice — drafted, you approve." },
      { name: "DIY Facebook & Google Ads", outcome: "Campaigns built, launched, and optimized without an ad-agency markup." },
      { name: "AI-Drafted Marketing Sequences", outcome: "Welcome flows, win-back flows, seasonal campaigns — all on schedule." },
      { name: "Online Directory Sync", outcome: "Your name, address, and hours stay correct across 50+ directories." },
    ],
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    tagline: "Make every customer feel remembered — even at scale.",
    icon: Heart,
    services: [
      { name: "AI-Powered Follow-Ups", outcome: "Personalized check-ins after every appointment, purchase, or interaction." },
      { name: "New Client Welcome Sequences", outcome: "First-90-days journey that turns new customers into long-term ones." },
      { name: "Past Customer Outreach", outcome: "Reactivate dormant clients with relevance-scored, high-conversion touches." },
      { name: "Branded Client Portal", outcome: "A self-service hub where clients book, pay, and get answers 24/7." },
      { name: "Birthday & Loyalty Campaigns", outcome: "Automated milestone touches that make every customer feel like the only one." },
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Services · 80+ AI Workflows for Service Businesses · Natyv AI</title>
        <meta
          name="description"
          content="Six business functions. 80+ productized AI capabilities. Hire Natyv to install, configure, and operate them — or self-serve on MyAgent."
        />
        <link rel="canonical" href="https://natyv.ai/services" />
        <meta property="og:title" content="Services · 80+ AI Workflows · Natyv AI" />
        <meta
          property="og:description"
          content="Six functions. 80+ capabilities. Hire us to run them — or self-serve on MyAgent."
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

      <main className="pt-32 pb-24">
        {/* Hero — eyebrow + tight Poppins headline + sub, matches the legacy header pattern */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-primary border border-primary/30 rounded-full">
              Services
            </span>

            <h1 className="font-body font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.05]">
              Full agency AI integrated{" "}
              <span className="text-primary">services.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto mb-10">
              Every Natyv engagement deploys from the same catalog. Pick the
              functions that move your business — we install the AI workflows
              that run them, or you self-serve on MyAgent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <Link to="/advisory">
                <Button
                  size="lg"
                  className="font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
                >
                  Talk to Natyv
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://get-myagent.com/services"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 border border-border text-foreground font-body font-semibold text-sm md:text-base rounded-md px-8 py-3 hover:bg-secondary/40 hover:border-primary/40 transition-all duration-300"
              >
                See the full 80+ on MyAgent
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Function blocks */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-6xl mx-auto space-y-20">
            {functions.map((fn, fnIdx) => (
              <motion.div
                key={fn.id}
                id={fn.id}
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Function header — eyebrow chip + Poppins title — keeps consistent vocabulary */}
                <header className="text-center mb-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <fn.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-medium text-primary">
                      Function 0{fnIdx + 1}
                    </p>
                    <h2 className="font-body font-extrabold tracking-tight text-3xl md:text-4xl text-foreground leading-tight">
                      {fn.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground font-body italic max-w-xl">
                      {fn.tagline}
                    </p>
                  </div>
                </header>

                {/* Service cards — grid pattern, AdvisorySection-style chrome */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {fn.services.map((service, sIdx) => (
                    <motion.article
                      key={service.name}
                      className="p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: sIdx * 0.04 }}
                    >
                      <h3 className="font-body font-semibold text-sm md:text-base text-foreground mb-2 leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
                        {service.outcome}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing CTA card — AdvisorySection pattern */}
        <section className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl border border-border bg-card/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-body font-extrabold tracking-tight text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight">
              Not sure which functions to start with?
            </h2>
            <p className="text-base text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl mx-auto">
              That's literally the conversation we have on the strategy call.
              60 minutes. Confidential. We map the highest-ROI services to your
              business and walk you out with a deployment plan.
            </p>
            <Link to="/advisory">
              <Button
                size="lg"
                className="font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
              >
                Book the strategy call
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
