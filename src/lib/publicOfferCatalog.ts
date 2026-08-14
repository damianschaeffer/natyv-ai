export type PublicOffer = {
  slug: string;
  name: string;
  description: string;
  amountCents: number;
  eyebrow: string;
  featured?: boolean;
};

/**
 * Display catalog for the self-serve offer shelf. The Supabase Edge Function
 * remains authoritative for amounts, descriptions, and fulfillment policy;
 * these values render the buyer-facing choices and are checked against that
 * catalog in the deployment handoff.
 */
export const PUBLIC_OFFERS: readonly PublicOffer[] = [
  {
    slug: "instant_ai_opportunity_snapshot",
    name: "Instant AI Opportunity Snapshot",
    description: "A concise, decision-ready snapshot of the highest-value AI opportunity for your business.",
    amountCents: 4900,
    eyebrow: "Fastest start",
    featured: true,
  },
  {
    slug: "revenue_leak_monitor_setup",
    name: "Revenue Leak Monitor Setup",
    description: "A focused setup that identifies and tracks the revenue leaks costing your business money.",
    amountCents: 4900,
    eyebrow: "Find missed money",
  },
  {
    slug: "ai_operator_pack",
    name: "AI Operator Pack",
    description: "A focused operator workflow pack with implementation-ready prompts, SOPs, and next actions.",
    amountCents: 7900,
    eyebrow: "Turn insight into action",
    featured: true,
  },
  {
    slug: "ai_front_desk_launch_pack",
    name: "AI Front Desk Launch Pack",
    description: "A launch-ready AI front desk package for answering, qualification, and safe handoff.",
    amountCents: 19900,
    eyebrow: "Customer response",
  },
  {
    slug: "vertical_quickstart",
    name: "Vertical Quickstart",
    description: "A practical industry-specific quickstart for deploying a narrow AI workflow fast.",
    amountCents: 19900,
    eyebrow: "Narrow and practical",
  },
  {
    slug: "missed_call_recovery_sprint",
    name: "Missed-Call Recovery Sprint",
    description: "A focused sprint to turn missed calls into captured leads and booked follow-up.",
    amountCents: 24900,
    eyebrow: "Recover demand",
  },
  {
    slug: "vertical_agent_kit",
    name: "Vertical Agent Kit",
    description: "A narrow, industry-specific agent kit designed for immediate operational use.",
    amountCents: 29900,
    eyebrow: "Deploy a workflow",
  },
  {
    slug: "revenue_leak_assessment_plus",
    name: "Revenue-Leak Assessment Plus",
    description: "A deeper, evidence-backed assessment of the highest-value revenue leaks and fixes.",
    amountCents: 75000,
    eyebrow: "Evidence-backed",
  },
  {
    slug: "agency_partner_starter_license",
    name: "Agency Partner Starter License",
    description: "A 90-day starter license for partners who want to launch their first AI client workflow.",
    amountCents: 49900,
    eyebrow: "For agencies",
  },
  {
    slug: "partner_white_label_enablement",
    name: "Partner White-label Enablement",
    description: "A partner enablement package for launching a white-label AI workflow offer.",
    amountCents: 99900,
    eyebrow: "For white-label partners",
  },
];

export function formatOfferPrice(amountCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amountCents / 100);
}

