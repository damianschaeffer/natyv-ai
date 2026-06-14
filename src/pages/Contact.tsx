import { Head } from "vite-react-ssg";
import { ArrowRight, CalendarDays, Mail, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// natyv.ai Contact — two paths, mirroring the whole-site thesis: talk to the
// team (consulting), or try the product free first (the on-ramp for anyone
// not ready to book). Tucked on its own route + footer link.
const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Contact · Natyv AI</title>
        <meta name="description" content="Talk to the Natyv AI team about consulting and implementation — or try the MyAgent product free first." />
        <link rel="canonical" href="https://natyv.ai/contact" />
      </Head>

      <Navbar />

      <main className="pt-28 pb-24 px-4 sm:px-6">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-6 text-primary border border-primary/30 rounded-full font-accent uppercase" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", letterSpacing: "0.18em", fontWeight: 500 }}>
              Contact
            </span>
            <h1 className="font-poppins font-bold text-foreground leading-[1.04]" style={{ fontSize: "clamp(2.15rem, 7.2vw, 4.35rem)" }}>
              Let's talk.{" "}
              <span className="text-primary">Or just try it.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-4 max-w-xl mx-auto">
              Two easy ways in — book a no-pressure call with the team, or play with your own agent free first.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {/* Book a call — the consulting path */}
            <div className="rounded-2xl border border-primary/40 bg-primary/[0.06] backdrop-blur-md p-6 flex flex-col">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center mb-4" style={{ boxShadow: "0 8px 24px -8px hsl(var(--primary)/0.6)" }}>
                <CalendarDays className="w-5 h-5 text-white" strokeWidth={2.25} aria-hidden="true" />
              </div>
              <h2 className="font-poppins font-bold text-lg text-foreground mb-1">Book a 15-min call</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                Tell us about your business and we'll show you where AI pays back first. No sales pressure.
              </p>
              <a
                href="https://cal.com/damian-schaeffer/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-primary text-white font-poppins font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Book a call <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Try free — the product on-ramp */}
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-6 flex flex-col">
              <div className="w-11 h-11 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-primary" strokeWidth={2.25} aria-hidden="true" />
              </div>
              <h2 className="font-poppins font-bold text-lg text-foreground mb-1">Try MyAgent free</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                Not ready to talk? Stand up your own agent in 60 seconds — free, no card — then reach out when you're ready.
              </p>
              <a
                href="https://get-myagent.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full border border-foreground/30 text-foreground font-poppins font-semibold text-sm hover:border-primary/50 transition-colors"
              >
                Start free <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="mailto:damian@get-myagent.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" aria-hidden="true" /> Prefer email? damian@get-myagent.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
