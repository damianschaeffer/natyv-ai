import { describe, expect, it } from "vitest";
import { formatOfferPrice, PUBLIC_OFFERS, PUBLIC_SUBSCRIPTION_OFFERS } from "./publicOfferCatalog";

describe("public offer catalog", () => {
  it("contains ten uniquely addressable, positively priced offers", () => {
    const slugs = PUBLIC_OFFERS.map((offer) => offer.slug);
    expect(new Set(slugs).size).toBe(PUBLIC_OFFERS.length);
    expect(PUBLIC_OFFERS).toHaveLength(10);
    expect(PUBLIC_OFFERS.every((offer) => offer.amountCents > 0 && offer.description.length > 20)).toBe(true);
  });

  it("formats customer-facing USD prices", () => {
    expect(formatOfferPrice(4900)).toBe("$49.00");
    expect(formatOfferPrice(99900)).toBe("$999.00");
  });

  it("contains only the approved self-serve recurring rails", () => {
    const slugs = PUBLIC_SUBSCRIPTION_OFFERS.map((offer) => offer.slug);
    expect(new Set(slugs).size).toBe(PUBLIC_SUBSCRIPTION_OFFERS.length);
    expect(PUBLIC_SUBSCRIPTION_OFFERS).toHaveLength(3);
    expect(PUBLIC_SUBSCRIPTION_OFFERS[0]).toMatchObject({ slug: "agent_starter_v1", amountCents: 2999, interval: "month" });
    expect(PUBLIC_SUBSCRIPTION_OFFERS.every((offer) => offer.amountCents > 0 && offer.description.length > 20)).toBe(true);
  });
});
