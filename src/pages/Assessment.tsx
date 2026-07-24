import { Head } from "vite-react-ssg";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentStartForm from "@/components/AssessmentStartForm";
import AdvisorySection from "@/components/AdvisorySection";
import PaymentSuccessReport from "@/components/PaymentSuccessReport";

export default function Assessment() {
  const [searchParams] = useSearchParams();
  const payment = searchParams.get("payment");
  const sessionId = searchParams.get("session_id");

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
            <AssessmentStartForm />
          </div>
        </section>
        <AdvisorySection />
      </main>
      <Footer />
    </div>
  );
}
