# Natyv.AI Session Handoff — 2026-05-04

**Read this FIRST when picking up a new session for natyv.ai work.**

---

## TL;DR

Phase 0 (SSR/GEO foundation) and Phase 1 (positioning rebuild) shipped to production. Site is live at https://natyv.ai with: real Natyv-AI agency positioning, MyAgent product hero embedded as the "Studio" section, Cal.com booking, GEO infrastructure (robots/sitemap/llms.txt/JSON-LD), proper N favicon, and aesthetic primitives restored after the Phase-1 mangling incident.

**Damian has more aesthetic feedback queued for next session — he stopped here intentionally. Open the new session, ask what he wants to refine, and execute.**

---

## What shipped today (most recent first)

| PR | What | Notes |
|---|---|---|
| #12 `cb5cffd` | Bigger MyAgent BrandLogo, drop H1+subhead; nav rename + About to legal row | Studio/Solutions/Advisory; About moved to footer legal row |
| #11 `97cc617` | CSP allow MyAgent video as `media-src` + `connect-src` | Cross-origin video fix |
| #10 `e53f88a` | Faithful MyAgentShowcase port (real BrandLogo + exact markup) | Sourced from `~/Developer/my-agent-ai/src/pages/MyLifeHero.tsx` |
| #9  `37d5a68` | Replace MyAgent reveal section with embedded showcase | All CTAs `target="_blank"` to get-myagent.com |
| #8  `c24f805` | Restyle to MyAgent typography (drop uppercase in body) | Kept uppercase tracking only in nav/footer chrome |
| #7  `8874ba2` | Remove CaseStudies section (K&D/Sandcastle were inaccurate) | |
| #6  `6a19c20` | Phase 1 recovery: splice content into existing primitives | After Damian called out aesthetic mangling |
| #5  `30037b8` | Phase 1 positioning sprint (initial pass — partly mangled) | Recovered by #6 |
| #4  `54bb3d7` | Phase 0: SSR + GEO infrastructure foundation | vite-react-ssg, JSON-LD @graph, robots/sitemap/llms |
| #3  `f232de8` | Replace Rise favicon with Natyv N mark | |
| #2  `e2ce5e7` | Real social URLs + TikTok icon + Cal.com booking | |

Production: https://natyv.ai
Legacy reference: https://legacy-pre-phase-1.natyv-site.pages.dev (don't delete — visual reference)

---

## Pending — Damian's queue for next session

### 🎨 Aesthetic feedback (TOP PRIORITY — Damian explicitly held this)

> "I do have a few more aesthetic things that I'm going to point out, but I would like to start that in a new session."

**Action:** Start the next session by asking Damian what's next on the aesthetic list. Don't pre-empt or guess. He drives.

Reminder of the supreme rules already saved to memory:
- **Splice, don't recreate** visual primitives. Reuse existing chrome verbatim.
- **Audit live homepage before designing launch content.** The legacy branch is the reference.
- **Test UI = production widget, zero aesthetic drift.**
- **Claude is weak at visual polish; Damian drives.** Propose, don't decide on visual/layout/feel.
- **Best client experience is the only choice.** Iteration cost is my problem, not his.
- **UI changes need pre/post screenshots** on every affected page.

---

## Open items (non-blocking, but flag if related work touches them)

### Code/repo hygiene
- **Stale branches to delete:** `add-cloudflare-deploy` (local + remote). All merged feature branches can be cleaned with `git push origin --delete <name>`.
- **Orphan file:** `src/components/MyAgentSection.tsx` was the previous reveal section, now replaced by `MyAgentShowcase.tsx`. Kept as fallback. Safe to delete on next pass if Damian confirms the new showcase is final.
- **GitHub Actions Node 20 deprecation warning** in `.github/workflows/deploy.yml` — bump before September 2026.

### URL/label consistency
- **Nav says "Solutions" but route is `/services`.** Decide: rename route to `/solutions` (with redirect) or keep label/route mismatch. Damian renamed Products→Studio and Services→Solutions in nav but didn't ask to rename routes — flag, don't change unilaterally.
- **Legal links go to `#`** (Privacy / Terms / Security in footer). Need real pages or removal. Defer until legal copy is approved.

### Tier 2 (positioning depth) — deferred from launch sprint
- Industry vertical landing pages (med spa, dental, property mgmt, fitness) — high GEO value for "AI for [vertical]" queries
- `/how-we-work` methodology page — E-E-A-T depth signal
- About page enhancements — author bio, expertise markers, credentials, Damian's photo
- Case study #3 — Damian deferred, K&D/Sandcastle were rejected as inaccurate
- Newsletter (Beehiiv) signup wiring

### Tier 3 (off-site authority) — deferred
- LinkedIn company page for Natyv AI (separate from Damian's personal)
- Crunchbase profile
- Google Business Profile
- Bing Webmaster Tools verification
- /insights blog scaffolding

### GEO measurement
- **Re-run `geo-audit` skill** to confirm score improvement. Baseline before this sprint was **17/100**. Target: 70+. Run it the next time we have a clean session start so the LLM context isn't cluttered.

---

## Architecture state (cold pickup reference)

### Stack
- **Framework:** React 18 + Vite 5 + vite-react-ssg 0.9.1-beta.1 (NOT Vike — Vite 5 incompatible)
- **Routing:** React Router v6, routes exported from `src/App.tsx` as `RouteRecord[]`, consumed by `src/main.tsx` via `ViteReactSSG({ routes })`
- **Layout:** `src/Layout.tsx` wraps QueryClient + Tooltip + Toaster + `<Outlet />`
- **Head/SEO:** `<Head>` from `vite-react-ssg` (NOT raw `<Helmet>` — won't reach SSG output)
- **Styling:** Tailwind + shadcn primitives. Fonts: `font-poppins` (MyAgent surfaces), `font-body` (Inter), `font-display` (Playfair, dictionary tension only), `font-accent` (Poppins utility), `font-roboto`
- **Deploy:** Cloudflare Pages via GitHub Actions, `master` → prod, `npm install` (NOT `npm ci` — bun.lockb + package-lock drift)
- **Domain:** apex `natyv.ai`, `_redirects` handles www → apex

### Critical files
- `src/pages/Index.tsx` — homepage flow: VideoSequence → HomepageServices → MyAgentShowcase → PartnersSection → AdvisorySection → AboutSection
- `src/components/VideoSequence.tsx` — dictionary tension hero (DO NOT modify without Damian's explicit OK; this is the brand thesis surface)
- `src/components/MyAgentShowcase.tsx` — embedded MyAgent product preview (faithful port)
- `src/components/Navbar.tsx` / `src/components/Footer.tsx` — nav: Studio (scroll) / Solutions (`/services`) / Advisory (`/advisory`); legal row: About / Privacy / Terms / Security
- `public/_headers` — CSP includes `media-src 'self' https://get-myagent.com` and `connect-src` for cross-origin video
- `public/robots.txt` — explicit allows for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, anthropic-ai, Google-Extended, Applebot-Extended
- `public/llms.txt`, `public/sitemap.xml`, `public/_redirects`
- `index.html` — JSON-LD @graph: Organization / WebSite / Person (Damian) / ProfessionalService

### Brand-tension thesis (Damian's words, do not lose)
Modern NATYV AI wordmark + old-style dictionary entry create deliberate tension. The thesis: **"Natyv = native; AI is a return, not a departure."** Old-style writing alone (without the modern wordmark counterweight) is BANNED. Every old-style use must purposely create the tension.

### MyAgent showcase — faithful port sources
When iterating on `MyAgentShowcase.tsx`, source-of-truth files in the MyAgent repo:
- `~/Developer/my-agent-ai/src/pages/MyLifeHero.tsx` — pill markup, video framing
- `~/Developer/my-agent-ai/src/components/BrandLogo.tsx` — North Star path + Poppins wordmark
- `~/Developer/my-agent-ai/src/components/TrustBadgesPill.tsx` — trust badge row markup

NEVER guess MyAgent visual specifics. Read the source.

---

## Hard-won lessons (already saved to memory but worth re-stating)

1. **Splice, don't recreate.** Phase 1 round-1 mangled aesthetics by inventing parallel chrome. Recovery PR took an entire round to fix. The legacy branch exists as the visual reference for a reason.
2. **Verify CSP for cross-origin media.** `default-src 'self'` blocks `<video src="https://...">`. Always add `media-src` AND `connect-src` for cross-origin video.
3. **Lockfile drift kills deploys.** `bun.lockb` + stale `package-lock.json` + `npm ci` = silent build break. Use `npm install` in CI or regenerate lockfile after every dep change.
4. **Codex Gate 1 CLI was hung.** Three attempts failed (stdin, heredoc, `$(cat)`). Fall back to comprehensive self-Gate with npm registry verification when CLI is broken.
5. **Don't commit to local main.** Always `git checkout -b <branch>` before editing.

---

## Pickup checklist for next session

```
[ ] cd ~/Developer/natyv-ai && git pull origin main
[ ] Open https://natyv.ai in browser, do a full visual scan
[ ] Open this handoff
[ ] Ask Damian: "What's the first aesthetic item on your list?"
[ ] DO NOT pre-empt. He drives visual decisions.
[ ] Apply splice-don't-recreate rule to every change
[ ] Pre/post screenshots for every UI PR
[ ] Branch from main, never commit to main directly
[ ] Verify on production (natyv.ai), not preview, before claiming done
```

---

**End of handoff. New session: read top-to-bottom, then ask Damian what's next.**
