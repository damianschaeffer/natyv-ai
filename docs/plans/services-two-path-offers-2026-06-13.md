# Plan — Natyv /services: nest 3 Stripe offers into the 2-path spine + proactive Ava

**Date:** 2026-06-13 (company launch day)
**Branch:** `feat/services-two-path-offers` (off `origin/main`, the live branch)
**Approved by Damian:** full nest-into-2-paths restructure + gentle `/services`-only Ava nudge + Ava knowledge set.

## Problem
The live site teaches three competing taxonomies of "what do I buy": **2 paths** (homepage `TwoPathsFooter`), **3 fixed prices** (`/services` `StartHereOffers`), **75 services** (`HomepageServices` catalog). The 3 offers were bolted on top of the original 2-path model. Worse, the **$999 Founding Member is mis-grouped**: it sits in a flat row beside two *diagnostic* offers, so it reads as "expensive consulting" when it is actually the white-glove version of the **product** path.

## Core insight
The 3 offers are not a third taxonomy — they are commitment rungs inside the existing 2 paths:
- **Product path** ("start with your agent"): MyAgent Free Trial (free, no card) → **Founding Member $999** (done-for-you build of the same product).
- **Consulting path** ("start with a diagnosis"): **Audit $250** → **Assessment $497** (each credited toward the build).

The homepage `TwoPathsFooter` already nails the correct 2-path model. The fix is to make `/services` conform to it, with the price rungs added — not to rebuild the homepage.

## Scope (this pass)

### A. Offer-flow restructure (P0)
1. **New component `src/components/TwoPathOffers.tsx`** — the 2-path offer system with price rungs, for the top of `/services`.
   - Card 1 — **Start with your agent** (product): primary "MyAgent Free Trial" CTA (existing trial URL) + secondary rung "Prefer it built for you?" → Founding Member **$999** (Stripe `8x2aEZfES5K9fQV7ct93y04`), "first 10 businesses only", 90-day done-for-you. Reuse `MYAGENT_BADGES`.
   - Card 2 — **Start with a diagnosis** (consulting): a two-step staircase — Audit **$250** (Stripe `6oU3cxboC7Sh9sxdAR93y03`) → credits into → Assessment **$497** (Stripe `3cIcN72S66OdcEJ2Wd93y02`, "Most popular") → credits into your build. Reuse `AGENCY_BADGES`.
   - Visual chrome reused from `TwoPathsFooter`/`StartHereOffers` (tinted gradient article, 4px accent stripe, motion entrances, blue-pill eyebrow "Start Here", Poppins headline) so the page reads as one system. Keep the Stripe security/footnote line.
2. **Extract shared badge arrays** `MYAGENT_BADGES` + `AGENCY_BADGES` into `src/components/brand/twoPathBadges.ts`; import in both `TwoPathsFooter.tsx` and the new `TwoPathOffers.tsx` (single source of truth — no duplicated definitions).
3. **`Services.tsx`**: replace `<StartHereOffers />` with `<TwoPathOffers />`. Add a one-line bridge above `<HomepageServices />`: "Whichever path you pick, here's everything we can build for you —" so the 75-service catalog reads as the menu, not a third entry point.
4. **Retire `StartHereOffers.tsx`** (delete; all 3 Stripe links migrate into `TwoPathOffers`). Confirm no other importer (`git grep StartHereOffers`).
5. **Homepage `TwoPathsFooter` unchanged** (curated/conversion-tuned closer; shares "Two Paths" language so the two pages already read as one system). Lower launch-day risk.

### B. Ava concierge upgrade (P0 knowledge + approved gentle nudge)
6. **Knowledge set** for agent `532c323e-e5bd-4ce6-bc94-45875b26bf99` (MyAgent backend / Supabase): teach the two paths, all three offers (who each is for, price, what is credited), the no-credit-card free-trial promise, and the consulting value prop, so she can answer "which should I pick?" and hand back the correct Stripe link / trial. (Data change on `my-agent-ai` side; confirm exact storage — agent instructions/knowledge table — at execution.)
7. **Proactive gentle nudge** in `NatyvConciergeWidget.tsx` (builds on the WIP theme-sync version already on this branch): a small dismissible prompt bubble that appears **only on `/services`** after ~15s dwell OR scroll past the offers; shows once per session (`sessionStorage`); copy "Not sure which step is right? I'll point you in 20 seconds." Clicking opens the existing iframe widget. Route-gated via `window.location.pathname`. No behavior change on any other page.

## Out of scope (explicitly)
- Social platform connectors (Codex is handling).
- Homepage `TwoPathsFooter` rebuild.
- Site-wide proactive Ava.
- Any change to the 75-service catalog content.

## Verification (per project rules)
- Local build with all `VITE_*` env vars from `deploy.yml`.
- Playwright: 0 console errors; pre/post screenshots of `/services` (mobile + desktop) and homepage.
- Deploy to a preview branch, verify on the deployed URL, THEN merge to `main` (CF Pages auto-deploys `main`).

## Risks
- Stripe links must remain byte-identical (live payment links — the $6K sprint depends on them). Migrate by copy, verify each href.
- `TwoPathOffers` must not regress the "Most popular" emphasis on the $497 Assessment (current top performer framing).
- Proactive nudge must never cover the Stripe CTAs or fire on non-/services routes.

---

## v2 — Revisions after Codex Gate 1 (round 1 = FAIL). Each must-fix addressed:

**F1 — SSG-safe, route-reactive concierge.** App builds with `vite-react-ssg` (`src/main.tsx` ViteReactSSG); widget is globally mounted in `Layout`. The nudge will: (a) read `window`/`sessionStorage` ONLY inside `useEffect` (never during render), (b) gate the route with react-router `useLocation()` (reactive to client nav), not a one-time `window.location` read, (c) register dwell timer + scroll listener + `MutationObserver`/message listeners with explicit cleanup on unmount and on route change. Default `nudgeVisible=false` so prerendered HTML never contains it.

**F2 — Nudge placement is a design constraint, not a risk.** The nudge is a compact pill anchored directly ABOVE the existing avatar button (same bottom-right cluster, shares its stacking context), max-width ~260px, never a free-floating overlay over page content. It only appears AFTER the user scrolls past the offer block (so it can never sit over an offer CTA during the decision), and is hidden whenever the iframe is open. On mobile it sits above the 64px avatar, clear of full-width card CTAs.

**F3 — Actually eliminate the third taxonomy.** `HomepageServices` gets two optional props (`headlinePre/headlinePost/subtitles` override + `eyebrow`) so `/services` renders it as the MENU ("Everything we can build for you" / "Pick from 75 proven functions once you've chosen a path"), while the homepage keeps its current "Full-Service Agency. AI-Powered." framing unchanged. Also REMOVE the "AI Opportunity Assessment" service pill from the Operations catalog list (`HomepageServices.tsx:183`) — it duplicates the paid $497 rung and must not masquerade as one of the 75 services. (Props default to current values → homepage byte-identical.)

**F4 — Do NOT bury the $999.** Founding Member stays a prominent, always-visible CTA inside the product card (co-equal button, not a hover/expand secondary). Product path card shows BOTH: "Start free — no card" (trial) and "Have us build it — $999" as two distinct, tappable CTAs. All three live Stripe links remain visible tappable CTAs on the page (revenue intent preserved); the 2-path grouping is the only change.

**F5 — Update Head + JSON-LD.** `Services.tsx` `<Head>`: rewrite title/description from "AI Assessment + 75+ Workflows / Diagnose first" to the two-path framing. Keep the three `Offer` entries in JSON-LD (still valid purchasable products) but align names/`url` anchors to the new section. Preserve the `#start-here` anchor.

**F6 — Anchors.** New `TwoPathOffers` section keeps `id="start-here"` (schema + inbound links depend on it). Fix the pre-existing broken category jump by adding `id={fn.id}` to each catalog `<article>` (`HomepageServices.tsx:374`) so `/services#front-desk` etc. work — supports the "catalog as menu" framing. One-line, low risk.

**F7 — Minimal homepage churn for shared badges.** No new shared module / no import churn beyond one token: add `export` to the existing `MYAGENT_BADGES` / `AGENCY_BADGES` consts in `TwoPathsFooter.tsx` and import them into `TwoPathOffers`. Zero visual/behavior change to the homepage footer; screenshot-verify it is pixel-identical.

**F8 — Ava knowledge store made concrete.** Resolve storage FIRST as step 0 of execution: query Supabase (`mpbiwfisywymkdjlwivg`) for agent `532c323e-e5bd-4ce6-bc94-45875b26bf99`, locate its instructions/knowledge column, update with the offer/path knowledge, verify by opening the LIVE widget and asking "which should I pick?" → confirm correct routing + correct Stripe links. Front-end work is DECOUPLED from this and does not block on it; if the store is non-trivial, knowledge ships as a follow-up the same day.

**Build order:** F8 storage lookup (read-only) → A (offer restructure: TwoPathOffers, Services.tsx head/schema/anchors, HomepageServices props + pill removal + id fix, retire StartHereOffers) → B7 nudge → verify (local build + Playwright + pre/post screenshots desktop+mobile) → preview deploy → main.

---

## v3 — Revisions after Codex Gate 1 (round 2 = FAIL). 4 remaining must-fixes resolved definitively:

**F2 (trigger, unambiguous).** Remove the "15s dwell OR" ambiguity. The nudge uses an `IntersectionObserver` on the `#start-here` offer section: it may appear ONLY once that section is fully scrolled out of the viewport (offers no longer visible) AND the page has been open ≥8s, whichever is later. It is force-hidden whenever the chat iframe is open (`isOpen`), once-per-session via `sessionStorage`, and is dismissible. It never renders while any offer CTA is on screen.

**F3 (count integrity).** Remove the "AI Opportunity Assessment" pill from the Operations catalog list (it is a paid rung, not a free service). Replace every hard-coded "75" with a computed `TOTAL_SERVICES = functions.reduce((n,f)=>n+f.services.length,0)` so the count is always truthful after the removal (now 74) on BOTH homepage and `/services`. The homepage subtitle's literal number becomes the derived value (one truthful copy change; screenshot-verify homepage). `/services` Head "75+" copy is rewritten to the two-path framing anyway (F5).

**F6 (scroll offset).** Each catalog `<article id={fn.id}>` also gets `scroll-mt-24` (≈ fixed navbar height in `Navbar.tsx`) so `/services#front-desk` jumps land below the fixed nav, not under it. Apply the same `scroll-mt` to `#start-here`.

**F8 (Ava knowledge is BLOCKING for the nudge).** Hard gate: the proactive nudge ships ONLY after Ava's knowledge is updated AND verified live (open widget → ask "which should I pick?" → confirm correct path routing + correct Stripe links). Execution order enforces this: knowledge update + live verification happens BEFORE the nudge is enabled. If knowledge can't be verified in the launch window, the offer restructure (A) still ships, but the nudge (B7) is held until Ava passes verification. No nudge that tells users to "choose a path" goes live against an un-verified agent.

**Verdict target:** these 4 are adopted verbatim from Codex round 2; re-running for PASS confirmation.
