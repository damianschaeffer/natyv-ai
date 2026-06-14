import { useState } from "react";
import { Head } from "vite-react-ssg";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// natyv.ai FAQ — consulting/implementation-focused (the Natyv wing). Every
// answer is two-way aware of the product wing (get-myagent.com): the
// intimidated visitor is told they can try the product free first. Tucked
// on its own route + footer link so it never clutters the CTA flow.
const FAQS: { q: string; a: string }[] = [
  {
    q: "I don't really know anything about AI — is this for me?",
    a: "Especially for you. Start by trying the product free at get-myagent.com — play with your own agent, no card, no commitment — then book a call once you've seen it work. You'll get far more out of the conversation, and there's zero pressure.",
  },
  {
    q: "What's the difference between Natyv AI and MyAgent?",
    a: "MyAgent is the product — a self-serve AI agent you can try free and run for a monthly rate. Natyv AI is the team that diagnoses where AI pays back in your business and builds it for you, white-glove. Same family; one is do-it-yourself, one is done-with-you.",
  },
  {
    q: "Do I have to pay to find out if this is even worth it?",
    a: "No. The Visibility Audit and AI Opportunity Map are fixed-price and credited toward your build — and the product itself has a free trial. You'll know the value before you spend another dollar.",
  },
  {
    q: "How fast will I see results?",
    a: "The agent can be live in days, and most engagements are modeled to pay back in weeks, not months. The Map gives you the ROI before you commit.",
  },
  {
    q: "What if I just want to try it myself first?",
    a: "Please do. Start the free MyAgent trial, get comfortable, then book a call when you're ready to go further. Trying it first usually makes the call more productive.",
  },
  {
    q: "Who actually does the work?",
    a: "The Natyv team. We don't hand you a slide deck and leave — we build and run your AI employee, tuned to your business, and only continue if the numbers make sense. No retainer.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. SOC 2 compliant, your data stays yours, and nothing is shared across businesses.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>FAQ · Natyv AI</title>
        <meta name="description" content="Common questions about working with Natyv AI — consulting, implementation, pricing, and how it relates to the MyAgent product." />
        <link rel="canonical" href="https://natyv.ai/faq" />
      </Head>

      <Navbar />

      <main className="pt-28 pb-24 px-4 sm:px-6">
        <section className="relative max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-4 py-1.5 mb-6 text-primary border border-primary/30 rounded-full font-accent uppercase" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", letterSpacing: "0.18em", fontWeight: 500 }}>
              FAQ
            </span>
            <h1 className="font-poppins font-bold text-foreground leading-[1.04]" style={{ fontSize: "clamp(2.15rem, 7.2vw, 4.35rem)" }}>
              Questions?{" "}
              <span className="text-primary">Good.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-4">
              No pressure, no jargon. If your question isn't here, just ask the agent in the corner — or{" "}
              <a href="/contact" className="text-primary hover:underline">reach the team</a>.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-poppins font-semibold text-foreground text-sm md:text-base">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/#start-here"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-poppins font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              See where to start
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
