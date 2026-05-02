# Natyv.AI Launch Rebuild — Implementation Plan

**Date:** 2026-05-01
**Branch base:** `origin/main`
**Audit ref:** `docs/audits/GEO-AUDIT-REPORT-2026-05-01.md`
**Approver:** Damian Schaeffer

---

## Strategic context

Natyv.AI is the AI-native operations **agency** brand. MyAgent is the productized SaaS at get-myagent.com. The current site forces every visitor through the MyAgent door, alienating the high-value buyer who wants to hire an agency to install AI-driven operational services but does not want to interact with "agents" directly. The rebuild creates two doors: agency (Natyv) and product (MyAgent).

The audit surfaced a Tier 0 dependency the original Top 10 didn't account for: **the entire site is currently invisible to AI search.** No content sprint can succeed until SSR/prerendering ships.

---

## Phased execution

### PHASE 0 — GEO/Technical Foundation (BLOCKING)

Goal: site becomes visible to AI crawlers and search engines. No copy decisions. Pure infrastructure.

**P0.1 Build-time prerender via `vite-plugin-prerender-spa` (or `vite-plugin-ssr` / `react-snap` — pick one)**
- Add plugin to `vite.config.ts`
- Configure routes: `/`, `/about`, `/advisory`, `/services` (placeholder for now), `/industries/*` (placeholders)
- Verify each route's `dist/{route}/index.html` contains real body content (not just `<div id="root">`)
- Acceptance: `curl https://natyv.ai/about` returns full About page HTML in body (not the React shell)

**P0.2 Real `/sitemap.xml` at build time**
- Generated from route manifest (sitemap-helper or sitemap-ts package, or hand-written script in `scripts/`)
- Include all routes with `<lastmod>`, `<changefreq>`, `<priority>`
- Output to `public/sitemap.xml` or generated into `dist/`

**P0.3 Real `/llms.txt`**
- Static file in `public/llms.txt` (no generation needed)
- Format per llms.txt spec (https://llmstxt.org)
- Sections: About, Services, Products (MyAgent), Industries, Insights (placeholder), Contact

**P0.4 Update `robots.txt`**
- Explicit `User-agent:` blocks for: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot
- Add `Sitemap: https://natyv.ai/sitemap.xml`
- Keep existing wildcard allow

**P0.5 JSON-LD scaffolding in `index.html`**
- Organization (Natyv AI) with `sameAs` to LinkedIn/X/YouTube/FB/IG/TikTok and `subOrganization` link to MyAgent
- WebSite with SearchAction
- Person (Damian Schaeffer) referenced via `@id`
- ProfessionalService (B2B service business, not LocalBusiness storefront)
- All in static `<head>` so AI crawlers see them with zero JS execution

**P0.6 Per-route meta + canonical via `react-helmet-async`**
- Install `react-helmet-async`
- Wrap App in `<HelmetProvider>`
- Add Helmet to each page: route-specific title, description, canonical, OG image
- Prerender picks up the meta into static HTML

**P0.7 `_headers` file (Cloudflare Pages security)**
- HSTS: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- CSP: minimal `script-src 'self'; style-src 'self' fonts.googleapis.com 'unsafe-inline'; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' cal.com`
- X-Frame-Options: `DENY`
- Permissions-Policy: minimal restrictive
- Referrer-Policy: keep `strict-origin-when-cross-origin`
- X-Content-Type-Options: keep `nosniff`

**P0.8 `_redirects` file (canonicalization)**
- `https://www.natyv.ai/* https://natyv.ai/:splat 301`
- Trailing-slash policy: pick one (recommend no-trailing-slash to match React Router default)

**Phase 0 deliverables:** PR with Vite config + plugin + JSON-LD + 3 static config files. Zero copy changes. Single deploy. Verifiable with `curl` + Rich Results Test.

**Estimated effort:** 4-6 hours.

---

### PHASE 1 — Positioning & Credibility Sprint (Damian's original Tier 1)

Goal: replace placeholder vibe with real agency positioning. Now visible to AI crawlers because Phase 0 shipped.

**P1.1 Hero rewrite (replace VideoSequence as primary hero)**
- Keep VideoSequence as a downstream "mission" section (it's beautiful and on-brand for /about depth) OR retire it
- New hero: outcome-first H1, sub-promise, two CTAs
  - H1 candidates: *"AI-Native Operations for Service Businesses"* / *"Hire AI Operators. Not Vendors."* / *"The Agency Building AI Into Your Business."*
  - Sub: *"We deploy 80+ revenue-and-retention workflows for service businesses — built on MyAgent, run by people who know your industry."*
  - Primary CTA: `Book a strategy call →` (to /advisory)
  - Secondary CTA: `See MyAgent →` (to get-myagent.com)
- File: new component `src/components/HeroAgency.tsx` (orphan HeroSection.tsx deleted)

**P1.2 New `/services` page (top-nav item replaces "Products")**
- 80 services grouped by 6 business functions: Front Desk · Sales · Operations · Finance · Marketing · Customer Experience
- Each service card: outcome statement + 1-line implementation summary + target industries
- Source the 80 from get-myagent.com/services subscription tiers but reposition as agency deliverables (not subscription bundles)
- Page-level FAQPage schema
- Page-level BreadcrumbList schema

**P1.3 Tech & trust bar (rebuild PartnersSection)**
- **Remove Twilio** — replace with Telnyx (mandatory, supreme rule)
- Add explicit "Built on" framing: Anthropic Claude, OpenAI, Google Gemini, ElevenLabs, Telnyx, Supabase, GoHighLevel, Cloudflare
- New "Trusted by" sub-band — placeholder for client logos as they come in (start with 3 anonymized industry icons if no logos)
- Optional: add "Pending: SOC 2 / HIPAA-aware" badges with explicit "in progress" framing

**P1.4 Case studies / Proof section (new section on home + /case-studies route)**
- 3 case studies minimum:
  1. **K&D Management** (Cleveland) — 40+ properties scale-up, decade of operational systems
  2. **Sandcastle Community Management** (Naples) — 65 employees / 150+ communities / Q1 300% spike / "best of 250+" award
  3. Placeholder — first MyAgent client outcome (med spa or dental) with quantified call-capture/booked-appointment metrics. Mark as "early access pilot" if not yet deployed.
- Each: Before · Intervention · Result · Quote · Date stamp
- Article + Person + ClaimReview schema where appropriate

**P1.5 MyAgent section reframe**
- File: `src/components/MyAgentSection.tsx` rebuild
- Drop "Studio presents Our Flagship Product" framing
- Drop "Experience the Magic" CTA
- Drop OLD MyAgent logo (verify which logo file is the current correct one — possibly `src/assets/myagent-logo.png` is wrong)
- New layout: tighter section with two-track explainer
  - Left: *"MyAgent — the platform we deploy. 80 capabilities, six packages, $99–$999/mo for self-serve."* → CTA `See MyAgent →` (to get-myagent.com)
  - Right: *"Or hire us to install, configure, and run it. White-glove deployment for service businesses."* → CTA `Talk to Natyv →` (to /advisory)
- This is the dual-track funnel that fixes the agency-vs-product blind spot

**Phase 1 deliverables:** PR with hero + services page + trust bar + 3 case studies + MyAgent reframe. Visible to AI crawlers thanks to Phase 0.

**Estimated effort:** 8-12 hours.

---

### PHASE 2 — Authority & Depth (within 2 weeks of launch)

**P2.1 Industry vertical pages — `/industries/{med-spa, dental, property-management, fitness, home-services, fnb}`**
- Each: pain points → which of the 80 services map → expected outcomes → light case study → Service schema with `audience` per vertical
- SEO/GEO workhorse — these rank for *"AI for [industry]"* queries

**P2.2 Methodology page — `/how-we-work`**
- 4-step engagement: Audit → Architect → Implement → Optimize
- Service businesses understand process

**P2.3 About page enhancements**
- Fix broken social URL placeholders (use Footer/Navbar verified URLs)
- Add Person schema with full credential signals
- Add additional case-study-style milestones with verifiable claims

---

### PHASE 3 — Compounding Assets (start in parallel with P1)

**P3.1 Newsletter — "Architecting Autonomy" (Beehiiv preferred)**
- Lead magnet: free AI Readiness Audit (10-question form → 1-page recommendation)
- Embed signup on home + /services + /insights

**P3.2 Insights blog**
- 5-10 cornerstone articles to start
- Topics: *"How to evaluate an AI agency"*, *"ROI of AI for med spas"*, *"Voice AI vs chatbot — when each wins"*, *"AI for HOA / Property Management"*, *"After-hours call capture economics"*
- Each: Damian byline, dated, Article + Person schema

**P3.3 External entity establishment**
- LinkedIn company page for Natyv.AI (separate from Damian's profile)
- Crunchbase profile
- Google Business Profile (Cape Coral, FL)
- Bing Webmaster Tools verification + IndexNow
- Each adds a `sameAs` link to grow the entity graph

---

## Dependencies + sequencing rules

- **Phase 0 must ship before Phase 1.** Content without SSR is invisible to AI crawlers.
- Phase 1 depends on Phase 0.
- Phase 2 depends on Phase 1 (industry pages need /services as parent).
- Phase 3 starts parallel with Phase 1; compounding value over months.

## Out-of-scope for this plan

- Migration to Astro/Next.js (deferred — vite-plugin-prerender is sufficient for 4-12 page site)
- E-commerce / payment flows (MyAgent handles)
- Custom CRM (use existing Cal.com + future newsletter platform)
- Reddit seed strategy (separate playbook)

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| Prerender plugin breaks framer-motion / dynamic imports | Test with single route first; if breaks, fall back to react-snap (Puppeteer-based) |
| Helmet meta gets duplicated across prerendered + client-side hydration | Use `react-helmet-async` (designed for this); validate with Rich Results Test |
| CSP breaks Cal.com iframe or Google Fonts | Allowlist `cal.com` and `fonts.googleapis.com` explicitly; test before deploy |
| Old MyAgent logo replacement requires asset I don't have | Pull current logo from get-myagent.com or ask Damian for source file |
| Case study #3 (MyAgent client) has no real client to feature yet | Use anonymized "early access pilot" framing OR feature K&D/Sandcastle as third case |

## Rollback

- Phase 0: revert single PR; site returns to current SPA-only state. No data loss.
- Phase 1+: each phase its own PR; revert independently.

## Verification (per phase)

- **Phase 0:** `curl https://natyv.ai/about` returns full HTML body. `/sitemap.xml` returns valid XML. `/llms.txt` returns plaintext. Rich Results Test detects Organization + Person + WebSite. PSI score doesn't regress.
- **Phase 1:** Live URLs match design intent. No Twilio anywhere. All 6 social links resolve to real profiles. MyAgent section has dual CTAs. Case studies have schema markup. Hard-refresh check on natyv.ai live.
- **Phase 2 / 3:** Per-page acceptance criteria TBD when those phases plan.

## Column-write map (for Phase 0 + 1)

Files modified or created:

**Phase 0:**
- `vite.config.ts` — add prerender plugin
- `package.json` — add prerender + helmet-async deps
- `index.html` — add JSON-LD `<script>` blocks
- `public/robots.txt` — explicit AI crawler allows + Sitemap directive
- `public/llms.txt` — NEW
- `scripts/build-sitemap.ts` — NEW (or use plugin output)
- `public/_headers` — NEW
- `public/_redirects` — NEW
- `src/main.tsx` — wrap App in HelmetProvider
- `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/Advisory.tsx` — add Helmet meta blocks

**Phase 1:**
- `src/components/HeroAgency.tsx` — NEW
- `src/components/HeroSection.tsx` — DELETE (orphan)
- `src/pages/Services.tsx` — NEW
- `src/components/services/ServiceCard.tsx` — NEW
- `src/App.tsx` — add `/services` route
- `src/components/Navbar.tsx` — change "Products" → "Services" nav link
- `src/components/PartnersSection.tsx` — Twilio → Telnyx
- `src/components/CaseStudies.tsx` — NEW (rendered on Index)
- `src/components/MyAgentSection.tsx` — full rewrite (dual-track CTAs, drop old logo)
- `src/pages/Index.tsx` — add CaseStudies, possibly retire VideoSequence as primary hero
- `src/components/ProductMatrixPreview.tsx` — DELETE (dead code)

## Sign-offs

- [ ] Damian: scope + sequencing approval (this doc)
- [ ] Codex Gate 1: adversarial review of plan (mandatory per CLAUDE.md supreme rule)
- [ ] Phase 0 ship + production verify
- [ ] Phase 1 ship + production verify
