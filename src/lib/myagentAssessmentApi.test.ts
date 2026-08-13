import { afterEach, describe, expect, it } from "vitest";
import {
  buildAssessmentStartDestination,
  assessmentFunnelSessionStorageKey,
  assessmentFunnelTrafficClass,
  readStoredAssessmentReferralCode,
  REFERRAL_SESSIONSTORAGE_KEY,
} from "./myagentAssessmentApi";

describe("assessment funnel session isolation", () => {
  it("uses a separate anonymous class for explicit QA traffic", () => {
    expect(assessmentFunnelTrafficClass("?source=qa_conversion_audit&qa=1")).toBe("qa");
    expect(assessmentFunnelSessionStorageKey("?source=qa_conversion_audit&qa=1")).toContain("_qa");
  });

  it("keeps warm and direct prospect traffic in the clean class", () => {
    expect(assessmentFunnelTrafficClass("?source=warm_assessment")).toBe("clean");
    expect(assessmentFunnelTrafficClass("")).toBe("clean");
    expect(assessmentFunnelSessionStorageKey("?source=warm_assessment")).toContain("_clean");
  });
});

describe("assessment referral context", () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("uses the tab-scoped referral and ignores a stale localStorage value", () => {
    localStorage.setItem("myagent_ref", "STALE123");
    sessionStorage.setItem(REFERRAL_SESSIONSTORAGE_KEY, "FRESH456");

    expect(readStoredAssessmentReferralCode()).toBe("FRESH456");
  });
});

describe("assessment proof handoff", () => {
  it("preserves only supported attribution parameters", () => {
    expect(buildAssessmentStartDestination("?source=warm_assessment&ref=SRUW2GJ2&proof_id=0123456789abcdef0123&qa=1&email=hidden@example.com")).toBe(
      "/assessment?source=warm_assessment&ref=SRUW2GJ2&proof_id=0123456789abcdef0123&qa=1#start",
    );
    expect(buildAssessmentStartDestination("?source=bad source&proof_id=not-a-proof")).toBe("/assessment#start");
  });
});
