import { FormEvent, useEffect, useState } from "react";
import { Head } from "vite-react-ssg";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PUBLIC_OFFERS,
  PUBLIC_SUBSCRIPTION_OFFERS,
  formatOfferPrice,
  type PublicOffer,
  type PublicSubscriptionOffer,
} from "@/lib/publicOfferCatalog";
import { startPublicOfferCheckout, startPublicSubscriptionCheckout } from "@/lib/myagentAssessmentApi";

export default function Offers() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  useEffect(() => {
    const checkout = searchParams.get("checkout");
    if (checkout === "success") {
      toast.success("Checkout returned successfully. Your order is being reconciled now.");
    } else if (checkout === "cancelled") {
      toast("Checkout was cancelled. Nothing was charged.");
    } else if (checkout === "subscription_success") {
      toast.success("Subscription checkout returned. Your plan is being activated from the signed Stripe event.");
    } else if (checkout === "subscription_cancelled") {
      toast("Subscription checkout was cancelled. Nothing was charged.");
    }
  }, [searchParams]);

  const startCheckout = async (event: FormEvent<HTMLFormElement>, offer: PublicOffer) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      toast.error("Enter your email so Stripe can send your receipt.");
      return;
    }

    setActiveOffer(offer.slug);
    try {
      const result = await startPublicOfferCheckout({ offerSlug: offer.slug, email: trimmedEmail, name });
      window.location.assign(result.checkout_url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not start checkout. Please try again.");
      setActiveOffer(null);
    }
  };

  const startSubscriptionCheckout = async (event: FormEvent<HTMLFormElement>, offer: PublicSubscriptionOffer) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      toast.error("Enter your email so Stripe can send your receipt.");
      return;
    }

    setActiveOffer(offer.slug);
    try {
      const result = await startPublicSubscriptionCheckout({ offerSlug: offer.slug, email: trimmedEmail, name });
      window.location.assign(result.checkout_url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not start subscription checkout. Please try again.");
      setActiveOffer(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Start with a focused AI outcome | Natyv AI</title>
        <meta name="description" content="Choose a focused, one-time Natyv AI package and start securely through Stripe without a sales call." />
        <link rel="canonical" href="https://natyv.ai/offers" />
        <meta property="og:title" content="Start with a focused AI outcome | Natyv AI" />
        <meta property="og:description" content="Ten focused AI-native packages, with clear pricing and secure self-serve checkout." />
        <meta property="og:url" content="https://natyv.ai/offers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>

      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden px-4 pb-14 pt-8 sm:px-6 sm:pb-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[170px]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-primary">Natyv AI offers</p>
              <h1 className="mt-3 font-poppins text-4xl font-bold leading-tight text-foreground sm:text-5xl">Start with one useful AI outcome.</h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Choose a focused package you can buy without a sales call. Start small, see the result, and expand only when it earns its place.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/30 bg-primary/[0.05] p-5 backdrop-blur-xl sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h2 className="font-poppins text-base font-semibold text-foreground">Where should we send your receipt?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Your email is used for checkout and fulfillment only.</p>
                </div>
                <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="offer-name">Name <span className="font-normal text-muted-foreground">(optional)</span></Label>
                    <Input id="offer-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="offer-email">Email</Label>
                    <Input id="offer-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" autoComplete="email" />
                  </div>
                </div>
              </div>
            </div>

            {searchParams.get("checkout") === "success" && (
              <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-4 text-sm text-foreground">
                <strong>Checkout returned successfully.</strong> We are reconciling the signed Stripe payment and preparing the next step. No external delivery is claimed until the fulfillment record is ready.
              </div>
            )}
            {searchParams.get("checkout") === "cancelled" && (
              <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-border/60 bg-card/50 px-5 py-4 text-sm text-muted-foreground">
                Checkout was cancelled. Nothing was charged; choose another offer whenever you are ready.
              </div>
            )}

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PUBLIC_OFFERS.map((offer) => {
                const isActive = activeOffer === offer.slug;
                return (
                  <article key={offer.slug} className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card/60 p-5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/50 ${offer.featured ? "border-primary/60 shadow-[0_24px_60px_-30px_hsl(var(--primary))]" : "border-border/50"}`}>
                    <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-1 bg-primary" />
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-accent text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{offer.eyebrow}</span>
                      {offer.featured && <span className="rounded-full bg-primary/10 px-2 py-1 font-accent text-[10px] font-semibold uppercase tracking-wide text-primary">Recommended</span>}
                    </div>
                    <h2 className="mt-4 font-poppins text-xl font-bold leading-tight text-foreground">{offer.name}</h2>
                    <p className="mt-2 min-h-14 text-sm leading-6 text-muted-foreground">{offer.description}</p>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="font-poppins text-3xl font-bold text-foreground">{formatOfferPrice(offer.amountCents)}</span>
                      <span className="pb-1 text-xs text-muted-foreground">one time</span>
                    </div>
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Prepared for your specific goal</li>
                      <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Clear next actions and evidence</li>
                      <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />No subscription required</li>
                    </ul>
                    <form className="mt-6" onSubmit={(event) => startCheckout(event, offer)}>
                      <button type="submit" disabled={Boolean(activeOffer)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 font-poppins text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-16px_hsl(var(--primary))] transition hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70">
                        {isActive ? <><Loader2 className="h-4 w-4 animate-spin" />Opening secure checkout…</> : <>Get started <ArrowRight className="h-4 w-4" /></>}
                      </button>
                    </form>
                  </article>
                );
              })}
            </div>

            <section className="mt-16 border-t border-border/40 pt-14">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-primary">Recurring, self-serve</p>
                <h2 className="mt-3 font-poppins text-3xl font-bold leading-tight text-foreground sm:text-4xl">Keep the value working every month.</h2>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Start with a focused recurring capability. Checkout is secure, priced by the server, and begins without a sales call or trial delay.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {PUBLIC_SUBSCRIPTION_OFFERS.map((offer) => {
                  const isActive = activeOffer === offer.slug;
                  return (
                    <article key={offer.slug} className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card/60 p-5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/50 ${offer.featured ? "border-primary/60 shadow-[0_24px_60px_-30px_hsl(var(--primary))]" : "border-border/50"}`}>
                      <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-1 bg-primary" />
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-accent text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{offer.eyebrow}</span>
                        {offer.featured && <span className="rounded-full bg-primary/10 px-2 py-1 font-accent text-[10px] font-semibold uppercase tracking-wide text-primary">Best entry</span>}
                      </div>
                      <h2 className="mt-4 font-poppins text-xl font-bold leading-tight text-foreground">{offer.name}</h2>
                      <p className="mt-2 min-h-14 text-sm leading-6 text-muted-foreground">{offer.description}</p>
                      <div className="mt-5 flex items-end gap-2">
                        <span className="font-poppins text-3xl font-bold text-foreground">{formatOfferPrice(offer.amountCents)}</span>
                        <span className="pb-1 text-xs text-muted-foreground">/{offer.interval}</span>
                      </div>
                      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Secure Stripe subscription</li>
                        <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />No founder call required</li>
                        <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Upgrade when your workflow grows</li>
                      </ul>
                      <form className="mt-6" onSubmit={(event) => startSubscriptionCheckout(event, offer)}>
                        <button type="submit" disabled={Boolean(activeOffer)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 font-poppins text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-16px_hsl(var(--primary))] transition hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70">
                          {isActive ? <><Loader2 className="h-4 w-4 animate-spin" />Opening secure checkout…</> : <>Start monthly plan <ArrowRight className="h-4 w-4" /></>}
                        </button>
                      </form>
                    </article>
                  );
                })}
              </div>
            </section>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />Secure Stripe Checkout</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Server-priced offers</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Choose one-time or monthly</span>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-muted-foreground">Looking for the referral credit? Start with the <a className="text-primary underline-offset-2 hover:underline" href="/assessment#start">AI Opportunity Assessment</a> so the referral rail can apply automatically.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
