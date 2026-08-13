import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { REFERRAL_SESSIONSTORAGE_KEY } from "@/lib/myagentAssessmentApi";

const REFERRAL_CAPTURED_AT_KEY = "myagent_ref_captured_at";

export function ReferralCapture() {
  const location = useLocation();
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const raw = params.get("ref");
      if (!raw) return;
      const cleaned = raw.toLowerCase().trim();
      if (!/^[a-z0-9-]{4,30}$/.test(cleaned)) return;
      if (cleaned === "assessment") return;
      sessionStorage.setItem(REFERRAL_SESSIONSTORAGE_KEY, cleaned);
      sessionStorage.setItem(REFERRAL_CAPTURED_AT_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
  }, [location.search]);
  return null;
}
