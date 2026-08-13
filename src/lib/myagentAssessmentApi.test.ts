import { describe, expect, it } from "vitest";
import {
  assessmentFunnelSessionStorageKey,
  assessmentFunnelTrafficClass,
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
