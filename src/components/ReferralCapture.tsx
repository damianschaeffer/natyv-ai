import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { REFERRAL_LOCALSTORAGE_KEY } from "@/lib/myagentAssessmentApi";

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
      localStorage.setItem(REFERRAL_LOCALSTORAGE_KEY, cleaned);
      localStorage.setItem(REFERRAL_CAPTURED_AT_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
  }, [location.search]);
  return null;
}
