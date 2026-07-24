import { useEffect, useState } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";
import { fetchAssessmentBySession, type AssessmentBySessionResult } from "@/lib/myagentAssessmentApi";

// Handles the brief race between the browser landing here and Stripe's webhook having
// already written paid_at/report_pdf_url onto the assessment row.
const POLL_DELAYS_MS = [1500, 3000, 5000];

type ReadyResult = Extract<AssessmentBySessionResult, { ready: true }>;

export default function PaymentSuccessReport({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<"loading" | "ready" | "processing" | "error">("loading");
  const [result, setResult] = useState<ReadyResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    let attempt = 0;

    async function load() {
      try {
        const data = await fetchAssessmentBySession(sessionId);
        if (cancelled) return;
        if (data.ready) {
          setResult(data);
          setState("ready");
          return;
        }
        if (attempt < POLL_DELAYS_MS.length) {
          const delay = POLL_DELAYS_MS[attempt];
          attempt += 1;
          setTimeout(load, delay);
        } else {
          setState("processing");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (state === "ready" && result) {
    return (
      <div className="mb-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-5 text-foreground">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-400" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {result.first_name ? `${result.first_name}, your` : "Your"} report is ready.
            </p>
            {result.opportunities.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {result.opportunities.map((title, i) => (
                  <li key={title}>{i + 1}. {title}</li>
                ))}
              </ul>
            )}
            <a
              href={result.pdf_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> View your report
            </a>
            <p className="mt-3 text-xs text-muted-foreground">A copy is also on its way to your email.</p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-4 text-sm text-foreground">
        <Loader2 className="h-4 w-4 flex-none animate-spin text-emerald-400" aria-hidden="true" />
        <span><strong>Payment received.</strong> Pulling up your report…</span>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-4 text-sm text-foreground">
      <strong>Payment received.</strong> Your report is finishing up — it's on its way to your email now.
    </div>
  );
}
