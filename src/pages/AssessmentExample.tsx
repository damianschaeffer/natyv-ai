import { Head } from "vite-react-ssg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentProofPreview from "@/components/AssessmentProofPreview";

/**
 * A focused, no-form preview for warm contacts who need to see the finished
 * decision artifact before they spend attention on the intake.
 */
export default function AssessmentExample() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>See a Finished AI Opportunity Assessment | Natyv AI</title>
        <meta name="description" content="See an anonymized finished AI Opportunity Assessment with ranked products, costs, tradeoffs, integration fit, and a candid MyAgent alternative before starting." />
        <link rel="canonical" href="https://natyv.ai/assessment/example" />
        <meta property="og:title" content="See a Finished AI Opportunity Assessment | Natyv AI" />
        <meta property="og:description" content="Review the kind of ranked, product-specific decision page your private assessment is designed to produce—before you start." />
        <meta property="og:url" content="https://natyv.ai/assessment/example" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://natyv.ai/og-image.png" />
      </Head>
      <Navbar />
      <main className="pt-28">
        <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[170px]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-primary">No signup to preview</p>
              <h1 className="mt-3 font-poppins text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                See the decision before you start.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                This anonymized example shows the ranked products, official sources, costs, tradeoffs, integration fit, and honest MyAgent alternative you can react to after your private intake.
              </p>
            </div>
            <AssessmentProofPreview />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
