import { describe, expect, it } from "vitest";
import { PUBLIC_OFFER_CHECKOUT_URL, PUBLIC_SUBSCRIPTION_CHECKOUT_URL } from "./myagentAssessmentApi";

describe("public offer checkout rail", () => {
  it("points at the shared Supabase checkout worker", () => {
    expect(PUBLIC_OFFER_CHECKOUT_URL).toContain("/functions/v1/create-public-offer-checkout");
    expect(PUBLIC_SUBSCRIPTION_CHECKOUT_URL).toContain("/functions/v1/create-public-subscription-checkout");
  });
});
