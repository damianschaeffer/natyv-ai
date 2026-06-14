# Handoff — natyv.ai offer redesign + cross-site marriage (2026-06-14)

**MC session:** `908b049d-13f6-4f6d-a90b-ff68801b1de3` (project: natyv-ai)
**Branch:** `feat/services-two-path-offers` (natyv-ai repo) — **NOT yet committed, NOT on main/prod**
**Preview (live, verified):** https://offers-redesign-preview.natyv-site.pages.dev
**Production natyv.ai:** UNTOUCHED (still serving old main)

---

## ⚠️ Coordination (other sessions active)
- **Spawned task `task_20c9d8ac`** is restoring the one-panel chat embed in **my-agent-ai** (`src/pages/ChatInterface.tsx`, the `get-myagent.com/chat/:id?embed=true` target). **Do NOT touch chat-widget files in my-agent-ai from the natyv session** — collision risk.
- A **Codex session** is also active (was "debugging this browser"). The 3-panel *demo mockup* in natyv's Studio section (`src/components/voice-command-showcase/WebsiteWidgetShowcase.tsx`) regressed from one-panel; **confirm with Codex before editing it.**
- Two separate "3-panel" issues: (1) live widget = my-agent-ai embed (task_20c9d8ac); (2) static demo mockup = natyv WebsiteWidgetShowcase (Codex?).

## DONE tonight (all on preview, working-tree on the branch)
- **Close redesigned as Grand Slam Offer** (`StartHereOffers.tsx`): headline "Stop guessing. / Start scaling." (matches Advisory size, white/blue); 3 colored cards — **Visibility Audit $250 / AI Opportunity Map $497 (center, Most Popular) / White-Glove Build $999 (10 spots)**; each with top pill (First step / Most popular / 10 spots), **4 bullets each**, value-stack with anchored totals, one-line guarantee. Clicking a card opens an **in-modal Cal.com booking** (no standalone calendar). Bottom row: **Book a 15-min call** + **Meet MyAgent — free** (scrolls to Studio). NOTE: $ values / guarantees / "10 spots" are DRAFTS — need Damian sign-off before prod (real commitments).
- **Homepage flow** (`Index.tsx`): Hero → Studio showcase (value) → Services catalog → Advisory (compact) → **CLOSE** → ends on CTA. Partners removed from homepage.
- **AdvisorySection** compacted: map auto-plays nodes 1→2→3; full 5-item roadmap hidden behind "See the full sample roadmap" toggle.
- **Partners** back in top nav + footer (own `/partners` page already existed).
- **Footer parity** (`Footer.tsx`): order now mirrors header — Services · Advisory · Studio · Partners · About.
- **FAQ page** (`/faq`, `FAQ.tsx`): consulting-focused accordion, two-way aware (nudges free MyAgent trial). In footer.
- **Contact page** (`/contact`, `Contact.tsx`): two cards — Book a call / Try MyAgent free. In footer.

## TO PROMOTE TO PRODUCTION (when Damian approves preview)
1. Get Damian's sign-off on the **draft $ values / guarantees / scarcity** in StartHereOffers.
2. `cd ~/Developer/natyv-ai` → commit branch (exclude `.claude/`), then merge `feat/services-two-path-offers` → `main` and push. CF Pages auto-deploys natyv.ai from main (`deploy.yml`, project `natyv-site`). Local-build deploy used tonight: `npm run build && npx wrangler pages deploy dist/ --project-name=natyv-site --branch=offers-redesign-preview` (creds in `~/.config/myagent-deploy/env.sh`).

## 🚧 BLOCKER (found 2026-06-14, do not force)
The **my-agent-ai** working tree has **97 uncommitted files** on branch `feat/outbound-call-templates`, INCLUDING `src/pages/ChatInterface.tsx` (the chat-fix task) + call-handling/voice work. **Do NOT add the get-myagent.com cross-site changes onto that tree** — it will clobber active work. Wait until that session commits/settles, then do the get-myagent side cleanly (ideally a fresh branch off the then-current main). Natyv-side cross-site work is fully done below.

## NATYV-SIDE cross-site (DONE on preview)
- `/faq` (consulting, two-way aware) · `/contact` (book-a-call OR try-free) · `/referrals` (refer a business; $250 reward is DRAFT) — all in footer utility row. Footer/header parity done.

## PENDING — cross-site marriage (fast-follow, AFTER my-agent-ai settles)
**Thesis:** natyv.ai = consulting/implementation wing (CTA: book assessment); get-myagent.com = product wing (CTA: free trial). Each covers the other's gap.
1. **get-myagent.com side** (my-agent-ai repo): add a "Stuck? The Natyv team will build it with you → book a call" nudge + link to Natyv Advisory, for lost/intimidated users.
2. **Referrals** on both sites (port + adapt: MyAgent = refer-a-friend credit; Natyv = refer-a-business).
3. **FAQ split**: MyAgent FAQ = product; Natyv FAQ (done) = consulting. Cross-link.
4. **Widget knowledge-base cross-training** (Supabase agent knowledge_docs): Natyv widget (agent 532c323e-e5bd-4ce6-bc94-45875b26bf99) knows consulting + that the free product exists; MyAgent widget knows the product + that the Natyv team can build it. CONTENT task — coordinate with task_20c9d8ac.
5. Header/footer parity on get-myagent.com.
