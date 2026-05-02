# Natyv.AI GEO + SEO Audit — 2026-05-01

**Scope:** https://natyv.ai/ live + local repo at `~/Developer/natyv-ai/`
**Stack:** React + Vite + TS on Cloudflare Pages, full client-side rendered SPA
**Auditors:** 5 parallel sub-agents (geo-ai-visibility, geo-content, geo-schema, geo-technical, geo-platform-analysis)

---

## Composite GEO Score: **17 / 100 — Critical**

| Category | Score | Weight | Weighted |
|---|---|---|---|
| AI Citability | 3 / 100 | 25% | 0.75 |
| Brand Authority | 10 / 100 | 20% | 2.00 |
| Content E-E-A-T | 37 / 100 | 20% | 7.40 |
| Technical GEO | 15 / 100 | 15% | 2.25 |
| Schema & Structured Data | 5 / 100 | 10% | 0.50 |
| Platform Optimization | 18 / 100 | 10% | 1.80 |
| **Overall** | | | **14.7 → ~17/100** |

The site is functionally **invisible to AI search** today. Every other gap is downstream of one root cause: the entire body content is JavaScript-rendered, and the AI crawlers that matter (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended) do not execute JS. They see `<div id="root"></div>` and nothing else.

---

## Per-Platform Readiness

| Platform | Score | Highest-impact fix |
|---|---|---|
| Google AI Overviews | 22/100 | SSR/prerender → unlocks Googlebot 2nd-pass + AIO citation eligibility |
| ChatGPT / OAI-SearchBot | 15/100 | LinkedIn company page + Crunchbase + Org schema with `sameAs` (entity scaffolding) |
| Perplexity | 18/100 | Primary-source case studies w/ metrics + Reddit presence in r/medspa, r/Entrepreneur |
| Google Gemini | 25/100 | Google Business Profile (Cape Coral) — fastest Knowledge Graph entry |
| Microsoft Copilot / Bing | 12/100 | Bing Webmaster verification + IndexNow + LinkedIn company page |

---

## Critical Issues (Tier 0 — fix before any content work)

### 1. Pure CSR / no SSR — content invisible to AI crawlers
- Static HTML body: `<div id="root"></div>`. ~1,895 bytes total.
- All marketing copy renders client-side via React.
- **Fix:** `vite-plugin-prerender-spa` or `react-snap` — generates static HTML for each route at build time. Estimated 3-4h. Same-day ship. No framework migration. Native to Cloudflare Pages.

### 2. `/sitemap.xml` and `/llms.txt` return SPA fallback (HTML)
- Both URLs return 200 with `content-type: text/html` — file doesn't exist, SPA catch-all serves the React shell.
- Search Console would report sitemap parse error.
- **Fix:** generate both at build time. Sitemap from route table. llms.txt with structured site map per AI-crawler convention.

### 3. robots.txt does not explicitly name AI crawlers
- Wildcard `User-agent: *` allows everything by default but doesn't signal explicit intent.
- No `Sitemap:` directive.
- **Fix:** explicit allows for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`. Add `Sitemap: https://natyv.ai/sitemap.xml`.

### 4. Zero JSON-LD structured data
- No Organization, no Person, no ProfessionalService, no Service, no FAQPage, no WebSite, no BreadcrumbList.
- Only OpenGraph + Twitter meta tags exist.
- og-image URL is relative (`/og-image.png`) — should be absolute.
- **Fix:** inject Org + WebSite + Person + ProfessionalService into static `index.html` `<head>` (visible to all AI crawlers). Per-page Service + FAQ via `react-helmet-async`, then prerender.

### 5. Twilio logo in PartnersSection — supreme-rule violation
- `src/components/PartnersSection.tsx:8` includes Twilio logo.
- Per CLAUDE.md memory: **Twilio is dead. Eliminate everywhere.** Site uses Telnyx for voice.
- **Fix:** swap Twilio → Telnyx logo. Mandatory.

### 6. Broken social URL placeholders on /about
- `src/pages/About.tsx:87,99,111,123` use `https://x.com`, `https://youtube.com`, `https://instagram.com`, `https://facebook.com` — bare domains, not real profiles.
- Damages Authoritativeness (-12 pts).
- **Fix:** use the verified URLs already in Footer/Navbar (`x.com/Natyv_AI`, `youtube.com/@NatyvAI`, `instagram.com/natyv_ai`, `facebook.com/natyv_ai`, plus `tiktok.com/@natyv_ai`).

---

## High-Priority Issues (Tier 1)

### 7. Wrong meta description + title positioning
- Current: *"Multi-modal Voice AI solutions for the enterprise. Studio, Solutions, and Strategic Advisory."*
- Reads as product-marketing, frames Natyv as a product brand.
- Positioning bug: Natyv = umbrella AGENCY. Product = MyAgent at get-myagent.com.
- **Fix:** rewrite meta + add `<title>` per-route via prerender.

### 8. Hero (VideoSequence) conveys zero buyer-relevant content
- Animated dictionary definition: *"Innate; belonging to a person by nature"*.
- Beautiful but service-business owners learn nothing about what Natyv does for them.
- **Fix:** outcome-first agency-framed hero. Lead with what they GET.

### 9. MyAgent section uses old logo + "flagship product / Experience the Magic" framing
- Section makes MyAgent the centerpiece — wrong positioning for the agency homepage.
- Old MyAgent logo (Damian called this out — file at `src/assets/myagent-logo.png` is the wrong/old version).
- **Fix:** reframe as dual-track section: "Hire Natyv to install" vs. "Self-serve on MyAgent." Two CTAs side-by-side.

### 10. Zero case studies, zero client logos, zero testimonials, zero press mentions
- Trustworthiness = 5/25 on homepage.
- **Fix:** ship at least 3 case studies with metrics + Damian's K&D / Sandcastle stories quantified.

### 11. ProductMatrixPreview is dead code
- `src/components/ProductMatrixPreview.tsx` — renders empty `<section>`.
- Imports + data structure exist but JSX returns nothing.
- **Fix:** replace with /services page link + featured-services preview block.

### 12. HeroSection.tsx is dead code
- Not imported in Index.tsx (Index uses VideoSequence). HeroSection.tsx orphaned.
- **Fix:** delete or repurpose.

---

## Medium-Priority Issues (Tier 2)

- No `<link rel="canonical">` on any route
- No HSTS, CSP, X-Frame-Options, Permissions-Policy headers
- `www.natyv.ai` resolves 200 (no 301 to apex) — mixed canonical signal
- No author bylines / Person schema
- No Insights / blog / content engine
- Render-blocking Google Fonts CSS (LCP risk)
- No Wikipedia/Wikidata entity, no Crunchbase, no Google Business Profile, LinkedIn company page unverified
- No `/industries/*` vertical pages

---

## E-E-A-T Page Scores

| Page | Score | Notes |
|---|---|---|
| `/` (Index) | 31/100 | Partners marquee good. Hero conveys zero buyer content. Twilio violation. |
| `/about` | 58/100 | **Strongest page.** Specific numbers (40+ properties, 65 employees, 150+ communities, 300% Q1 spike). Broken social placeholders. No Person schema. |
| `/advisory` | 22/100 | ~120 words. No author named. Cal.com works. Boilerplate copy. |

---

## Top 10 Quick Wins (sequenced)

1. **SSR/prerender via vite-plugin-prerender-spa** (Tier 0 unlock — gates everything else)
2. **Real /sitemap.xml + /llms.txt at build time + explicit AI bot allows in robots.txt**
3. **JSON-LD Organization + WebSite + Person + ProfessionalService in `index.html`**
4. **Replace Twilio logo with Telnyx in PartnersSection** (rule violation fix)
5. **Fix broken social URLs on /about** (use verified URLs from Footer/Navbar)
6. **Rewrite meta description + per-route titles via react-helmet-async**
7. **Hero rewrite — agency-positioned, outcome-first**
8. **MyAgent section reframe** — drop old logo, dual-track CTAs
9. **Add 3 case studies w/ metrics** (Damian's stories quantified)
10. **Add `_headers` (security) + `_redirects` (www→apex + trailing slash) on Cloudflare Pages**

---

## Files Audited

- `index.html` (static shell)
- `src/pages/Index.tsx`, `About.tsx`, `Advisory.tsx`, `NotFound.tsx`
- `src/components/HeroSection.tsx` (orphan), `VideoSequence.tsx`, `MyAgentSection.tsx`, `PartnersSection.tsx`, `AdvisorySection.tsx`, `AboutSection.tsx`, `ProductMatrixPreview.tsx` (dead JSX), `Navbar.tsx`, `Footer.tsx`
- `vite.config.ts`, `package.json`, `.github/workflows/deploy.yml`
- Live URLs: `/`, `/about`, `/advisory`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/favicon.svg`
