import { Head } from "vite-react-ssg";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentStartForm from "@/components/AssessmentStartForm";
import AdvisorySection from "@/components/AdvisorySection";
import PaymentSuccessReport from "@/components/PaymentSuccessReport";
import AssessmentProofPreview from "@/components/AssessmentProofPreview";
import { trackAssessmentFunnelEvent } from "@/lib/myagentAssessmentApi";

export default function Assessment() {
  const [searchParams] = useSearchParams();
  const payment = searchParams.get("payment");
  const sessionId = searchParams.get("session_id");
  const referralCode = searchParams.get("ref");
  const proofId = searchParams.get("proof_id");
  // Keep the SSG HTML and the first hydrated render identical. Query-aware
  // layout changes only after mount, avoiding a hydration error on referral
  // and proof handoff URLs.
  const [handoffMode, setHandoffMode] = useState(false);
  useEffect(() => {
    setHandoffMode(Boolean(referralCode || proofId));
  }, [proofId, referralCode]);
  // A referral or proof CTA is already a committed handoff. Re-rendering the
  // full interactive example above the form makes the recipient scroll through
  // the same sales story twice and buries the one action we want next.
  const exampleHref = referralCode
    ? `/assessment/example?source=referral&ref=${encodeURIComponent(referralCode)}`
    : proofId
      ? `/assessment/example?source=warm_assessment&proof_id=${encodeURIComponent(proofId)}`
      : "/assessment/example";

  useEffect(() => {
    trackAssessmentFunnelEvent("page_view", { referral_present: Boolean(referralCode) });
  }, [referralCode]);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Start Your AI Opportunity Assessment | Natyv AI</title>
        <meta name="description" content="Start a private 15-minute AI intake with no upfront payment. Receive exactly three ranked AI opportunities, likely value, and the simplest first step." />
        <link rel="canonical" href="https://natyv.ai/assessment" />
        <meta property="og:title" content="Your 3 Best AI Opportunities — Natyv AI" />
        <meta property="og:description" content="A no-upfront-payment, 15-minute intake that becomes a human-reviewed AI Opportunity Assessment." />
        <meta property="og:url" content="https://natyv.ai/assessment" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>
      <Navbar />
      <main className="pt-28">
        <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[170px]" />
          <div className="relative mx-auto max-w-6xl">
            {payment === "success" && (
              sessionId ? (
                <PaymentSuccessReport sessionId={sessionId} />
              ) : (
                <div className="mb-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-4 text-sm text-foreground">
                  <strong>Payment received.</strong> Your completed assessment is being sent to your email now.
                </div>
              )
            )}
            {payment === "cancelled" && (
              <div className="mb-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-4 text-sm text-foreground">
                Nothing was charged. Your assessment remains saved if you want to return later.
              </div>
            )}
            {handoffMode ? (
              <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/[0.06] px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-poppins font-semibold text-foreground">One short next step</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {referralCode
                      ? "Your invitation is attached. Add your details and Ava will open the private intake; your referral savings are confirmed before you start."
                      : "You have seen the finished example. Add your details and Ava will turn your situation into the same kind of ranked decision."}
                  </p>
                </div>
                <a href={exampleHref} className="inline-flex shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-background/55 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/[0.08]">
                  Review the example again
                </a>
              </div>
            ) : (
              <AssessmentProofPreview compact />
            )}
            <div className="mt-8">
              <AssessmentStartForm referralCode={referralCode} compact={handoffMode} />
            </div>
          </div>
        </section>
        <AdvisorySection />
      </main>
      <Footer />
    </div>
  );
}
