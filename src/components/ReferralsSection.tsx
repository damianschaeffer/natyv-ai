import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Copy,
  FileText,
  Gift,
  Share2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  buildAssessmentReferralShareUrl,
  NATYV_BUSINESS_PAGE_SLUG,
  readStoredAssessmentReferralCode,
  readStoredReferrerShareUrl,
  startPublicAiOpportunityAssessment,
  storeReferrerShareUrl,
  SUBMIT_CONTACT_FORM_URL,
} from "@/lib/myagentAssessmentApi";

const STEPS = [
  {
    icon: Share2,
    title: "Share your link",
    body: "Tap below and copy your personal link — send it to anyone who should take the assessment.",
  },
  {
    icon: UserPlus,
    title: "They book",
    body: "They pay $150 instead of $250 when they checkout through your link.",
  },
  {
    icon: Gift,
    title: "You get $100 back",
    body: "After they pay, we send you $100 back on your assessment. Your reward is tied to their checkout, not when you share.",
  },
] as const;

const ASSESSMENT_TRUST_BADGES = [
  { icon: Clock, label: "Delivered in 48 hours" },
  { icon: Gift, label: "$100 off for friends" },
  { icon: CheckCircle, label: "One-time $250 fee" },
  { icon: FileText, label: "Three ranked opportunities" },
] as const;

const REFERRAL_RUNGS = [
  {
    title: "AI Opportunity Assessment · $250",
    body: "Automated referral — share your link. They save $100; you get $100 back after they pay.",
    cta: "share" as const,
  },
  {
    title: "Founder-Led AI Strategy Session · $497",
    body: "Send them to book with Damian first — calendar, not the intake bot.",
    href: "/services#founder-strategy-session",
    cta: "link" as const,
    linkLabel: "Open Services",
  },
  {
    title: "White-Glove Build · $999",
    body: "Bigger build? Make an intro below and we’ll handle it personally.",
    href: "#intro",
    cta: "anchor" as const,
    linkLabel: "Make an intro",
  },
] as const;

const surfaceInput =
  "w-full rounded-xl border border-border/60 bg-card/50 text-foreground placeholder:text-muted-foreground px-3 py-2.5 text-sm";

export default function ReferralsSection() {
  const storedFriendReferral = useMemo(() => readStoredAssessmentReferralCode(), []);

  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState(() => readStoredReferrerShareUrl());
  const [shareBusy, setShareBusy] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareForm, setShareForm] = useState({ firstName: "", email: "" });

  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _hp: "",
  });

  const openShare = () => {
    setShareError(null);
    setCopied(false);
    const cached = readStoredReferrerShareUrl();
    if (cached) setShareUrl(cached);
    setShareOpen(true);
  };

  const issueShareLink = async (event: FormEvent) => {
    event.preventDefault();
    setShareError(null);
    setShareBusy(true);
    try {
      const started = await startPublicAiOpportunityAssessment({
        first_name: shareForm.firstName.trim(),
        email: shareForm.email.trim(),
        create_checkout: false,
      });
      const code = started.referral_code;
      const url =
        started.referral_share_url || (code ? buildAssessmentReferralShareUrl(code) : "");
      if (!url) throw new Error("We couldn't create your link. Please try again.");
      setShareUrl(url);
      storeReferrerShareUrl(url);
    } catch (err) {
      setShareError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setShareBusy(false);
    }
  };

  const copyShareLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareError("Copy failed — select the link and copy manually.");
    }
  };

  const handleIntroSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData._hp) return;
    setFormState("sending");
    try {
      const res = await fetch(SUBMIT_CONTACT_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: NATYV_BUSINESS_PAGE_SLUG,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `[Referral intro — other business]\n\n${formData.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };

  const showShareLinkStep = Boolean(shareUrl);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {storedFriendReferral && (
              <p className="mb-4 text-sm font-medium text-primary max-w-xl mx-auto">
                A friend&apos;s referral is active — you can book the assessment at the $150 referred price.
              </p>
            )}

            <span
              className="inline-block px-4 py-1.5 mb-6 text-primary border border-primary/30 rounded-full font-accent uppercase"
              style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.85rem)", letterSpacing: "0.18em", fontWeight: 500 }}
            >
              Referrals
            </span>

            <h1 className="font-poppins font-bold text-3xl md:text-5xl lg:text-[56px] !leading-[1.14] tracking-[-0.03em] mb-4">
              Give $100.
              <br />
              <span className="text-primary">Get $100.</span>
            </h1>

            <p className="text-base md:text-lg leading-snug max-w-2xl mx-auto mb-8 text-muted-foreground">
              Our $100 / $100 program is built for the AI Opportunity Assessment — share your link, they save at
              checkout, you get paid back after they do. You can also point people at any step on the ladder below.
            </p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 text-left md:text-center">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="flex md:flex-col items-center md:items-center gap-3 md:gap-2"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-foreground">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-snug text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              size="lg"
              className="rounded-full px-8 h-12 text-base font-bold mb-6 bg-primary hover:bg-primary/90"
              onClick={openShare}
            >
              Share with a friend
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:flex items-center justify-center gap-x-2 gap-y-1.5 md:gap-4 lg:gap-5 rounded-xl md:rounded-full bg-card/40 backdrop-blur-md border border-border/50 px-3 py-2 md:px-5 md:py-2.5 shadow-lg w-full max-w-[min(100%,920px)] mx-auto">
                {ASSESSMENT_TRUST_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center justify-center gap-1 md:gap-1.5 text-[10px] md:text-xs font-medium text-foreground/90"
                  >
                    <b.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" strokeWidth={2} />
                    <span className="whitespace-nowrap">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-10 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-lg md:text-xl font-bold text-center mb-2 text-foreground">
            Refer at any step
          </h2>
          <p className="text-sm text-center max-w-2xl mx-auto mb-8 text-muted-foreground">
            One page, three doors — pick the offer that fits who you&apos;re sending.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {REFERRAL_RUNGS.map((rung) => (
              <div
                key={rung.title}
                className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-4 text-left"
              >
                <h3 className="text-sm font-bold leading-snug mb-2 text-foreground">{rung.title}</h3>
                <p className="text-xs leading-relaxed mb-3 text-muted-foreground">{rung.body}</p>
                {rung.cta === "share" ? (
                  <button
                    type="button"
                    onClick={openShare}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Share with a friend
                    <ArrowRight className="h-3 w-3" />
                  </button>
                ) : (
                  <a
                    href={rung.href}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {rung.linkLabel}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="intro" className="py-8 md:py-10 border-t border-border/40">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-xl md:text-2xl font-bold mb-2 text-primary">Make an Intro</h2>
          <p className="text-sm mb-6 leading-relaxed text-muted-foreground">
            Founder session or White-Glove Build — or anything else. Send us who they are and we&apos;ll reach out
            gently. Not sure it&apos;s a fit? Tell them to try{" "}
            <a
              href="https://get-myagent.com"
              className="text-primary hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              MyAgent
            </a>{" "}
            free first.
          </p>

          {formState === "sent" ? (
            <p className="text-sm font-medium py-6 text-foreground">Thanks — we&apos;ll take it from here.</p>
          ) : (
            <form
              className="space-y-3 text-left"
              onSubmit={(e) => {
                void handleIntroSubmit(e);
              }}
            >
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={surfaceInput}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={surfaceInput}
              />
              <input
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={surfaceInput}
              />
              <textarea
                required
                placeholder="Who should we meet, and why?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${surfaceInput} min-h-[100px] resize-y`}
              />
              {formState === "error" && (
                <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
              )}
              <Button
                type="submit"
                size="lg"
                className="rounded-full w-full h-11 font-semibold bg-primary hover:bg-primary/90"
                disabled={formState === "sending"}
              >
                {formState === "sending" ? "Sending…" : "Refer a business"}
                {formState !== "sending" && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </form>
          )}
        </div>
      </section>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-poppins text-xl">Share with a friend</DialogTitle>
            <DialogDescription>
              {showShareLinkStep
                ? "Copy your link and send it to someone who should take the assessment."
                : "Enter your name and email — we'll generate your personal referral link."}
            </DialogDescription>
          </DialogHeader>

          {showShareLinkStep ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-border/60 bg-muted/30 p-3 text-left">
                <p className="text-xs mb-2 text-muted-foreground">Your referral link</p>
                <p className="text-sm break-all font-mono text-foreground">{shareUrl}</p>
              </div>
              {shareError && <p className="text-sm text-destructive">{shareError}</p>}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  className="rounded-full flex-1 font-semibold bg-primary hover:bg-primary/90"
                  onClick={() => {
                    void copyShareLink();
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copy link
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setShareUrl("");
                    storeReferrerShareUrl("");
                  }}
                >
                  New link
                </Button>
              </div>
            </div>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                void issueShareLink(e);
              }}
            >
              <input
                required
                minLength={2}
                placeholder="First name"
                value={shareForm.firstName}
                onChange={(e) => setShareForm({ ...shareForm, firstName: e.target.value })}
                className={surfaceInput}
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={shareForm.email}
                onChange={(e) => setShareForm({ ...shareForm, email: e.target.value })}
                className={surfaceInput}
              />
              {shareError && <p className="text-sm text-destructive">{shareError}</p>}
              <Button
                type="submit"
                className="rounded-full w-full font-semibold bg-primary hover:bg-primary/90"
                disabled={shareBusy}
              >
                {shareBusy ? "Creating link…" : "Get my link"}
                {!shareBusy && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
