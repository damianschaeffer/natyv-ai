import { describe, expect, it } from "vitest";
import { formatOfferPrice, PUBLIC_OFFERS } from "./publicOfferCatalog";

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
});

