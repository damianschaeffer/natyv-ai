import { Head } from "vite-react-ssg";
import { ArrowRight, Gift, HeartHandshake, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// natyv.ai Referrals — refer a business for consulting/implementation. Two-way
// aware: a referral who isn't ready can start with the free product first.
// NOTE: the reward amount below is a DRAFT (real payout commitment) — needs
// Damian sign-off before prod, same as the offer $ values.
const Referrals = () => {
  const REFERRAL_EMAIL =
    "mailto:damian@get-myagent.com?subject=Natyv%20AI%20Referral&body=Who%20I'm%20referring%20(name%20%2B%20business)%3A%0AHow%20to%20reach%20them%3A%0AWhy%20they'd%20be%20a%20fit%3A%0A%0AMy%20name%20%2B%20best%20contact%3A";

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Referrals · Natyv AI</title>
        <meta name="description" content="Know a business that needs AI done right? Refer them to Natyv AI — they get taken care of, you get a reward." />
        <link rel="canonical" href="https://natyv.ai/referrals" />
      </Head>

      <Navbar />

      <main className="pt-28 pb-24 px-4 sm:px-6">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-6 text-primary border border-primary/30 rounded-full font-accent uppercase" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", letterSpacing: "0.18em", fontWeight: 500 }}>
              Referrals
            </span>
            <h1 className="font-poppins font-bold text-foreground leading-[1.04]" style={{ fontSize: "clamp(2.15rem, 7.2vw, 4.35rem)" }}>
              Know someone?{" "}
              <span className="text-primary">Everybody wins.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-4 max-w-xl mx-auto">
              Refer a business that needs AI done right. They get the same no-pressure start you did — and you get a thank-you when they come on board.
            </p>
          </div>

          {/* How it works — 3 quick steps */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Send, t: "Send them over", d: "Intro us, or drop their details below." },
              { icon: HeartHandshake, t: "We take care of them", d: "Free product trial or a strategy call — their choice." },
              { icon: Gift, t: "You get rewarded", d: "A $250 thank-you when they start a build." },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-primary" strokeWidth={2.25} aria-hidden="true" />
                </div>
                <h2 className="font-poppins font-semibold text-foreground text-sm mb-1">{s.t}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-primary/40 bg-primary/[0.06] backdrop-blur-md p-6 md:p-8 text-center">
            <h2 className="font-poppins font-bold text-xl text-foreground mb-2">Make an intro</h2>
            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
              Send us who they are and we'll reach out gently — no spam, no pressure. Not sure if it's a fit? Tell them to try{" "}
              <a href="https://get-myagent.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MyAgent free</a> first.
            </p>
            <a
              href={REFERRAL_EMAIL}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-poppins font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Refer a business <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Referrals;
