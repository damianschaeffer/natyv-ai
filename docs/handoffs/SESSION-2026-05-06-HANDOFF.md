# natyv.ai homepage rebuild — Session handoff

**Date:** 2026-05-06
**Repo:** `~/Developer/natyv-ai/`
**Dev server:** `localhost:5175` (preview name `natyv-dev`)
**Status:** Heavy rebuild of the homepage shipped to dev. **Not deployed.** All changes local-only on the natyv-ai branch the user is on. One companion edit also made to the get-myagent.com source (`my-agent-ai`) — also local, also undeployed.

---

## What this session did, in one sentence

Tore down the natyv.ai homepage and rebuilt it around a **binary path architecture** (Path A = self-serve MyAgent product · Path B = agency services) with a Studio section that ports the four canonical MyAgent.com product showcases verbatim.

---

## Read this BEFORE touching anything

The user has been frustrated multiple times this session over the same patterns. Don't repeat them.

### Hard rules baked into the current build

1. **Personification — the agent is a partner, never "it" or "operator."** Use "your agent" / "an agent who…". Brand thesis: MyAgent feels human, learns the user, customized over time. Saying "the operator" or "talk to it" violates the brand. We hit this issue and fixed it across Hero, Partners, and Two-Paths card titles.

2. **No effort-wedge between Path A and Path B.** Both paths must feel effortless. Don't write "Don't lift a finger." for Solutions — that implies MyAgent IS work. Differentiate by **speed/customization**, not by effort levels.

3. **100% match to MyAgent.com canonical copy for the four product sub-section headlines.** They are:
   - Full control. **Zero effort.** (sub: "Answers every call, anytime, anywhere." / "Full transparency, full control.")
   - Live your life. **Skip the rest.** (sub: "Dictate on the go. Your agent handles the rest." / "Voice in. Real work out.")
   - Your Life. **One Dashboard** (sub: "Your dashboard builds & organizes itself as your agent does the work.")
   - Your website. **Always on.** (sub: 4-phrase rotator — "Pre-trained on your business." / "Configured to sound like you." / "Ready to talk to your customers." / "Listens. Responds. Remembers.")

4. **Splice, don't recreate.** All four product showcases are verbatim ports from `my-agent-ai`. If you need a new visual primitive, check the source repo first.

5. **Pre/post screenshots for any UI change** (per long-standing supreme rule). Local Playwright screenshot tool was flaky this session — `mcp__Claude_Preview__preview_screenshot` worked when sized to 1280×900.

---

## Final homepage structure (top to bottom)

```
[Navbar]    Studio · Solutions · Advisory · About

[Hero]
  └─ "TWO PATHS. PICK YOURS." pre-headline label (uppercase, kerned, primary blue)
  └─ h1: "Run your business. Live your life." (line-height 1.25 — generous breathing room
         between the two halves; the blue accent half is `whitespace-nowrap inline-block`)
  └─ Salon video (16:9, autoplay, loop, muted, salon-hero-fast clip from get-myagent.com)
  └─ NO subtitle, NO inline CTAs, NO partner strip — all stripped per user request

[Studio] — Path A · MyAgent product
  └─ Path stamp: "—— NATYV AI · STUDIO ——"  (single line; no "PATH A · SELF-SERVE" descriptor)
  └─ MyAgent logo (height 36/55/68 across breakpoints — 65% of original)
  └─ 5 attribute pills: One ecosystem · Customized for you · Feels human · Learns your life · Handles real work
  └─ Sub-section 1: Full control. Zero effort.
       ├─ Rotating sub (2-phrase, 3s cycle)
       ├─ Take over · Listen live · Coach pills (verbatim from MyAgent)
       └─ <CallHandlingShowcase /> — Ava call video (left) + iPhone-framed OperatorPhoneDemo
          (right). Phone widget cycles Phase B (Secret Mode + Listen Live + Coach + Recent
          Instructions) → Phase C (Post-Call Report with Captured Data: Name/Phone/Email/
          Reason/Property + AI Summary). Synced to videoTimeMs from the left video.
  └─ Sub-section 2: Live your life. Skip the rest.
       ├─ Rotating sub (2-phrase, 3s cycle) — added 2026-05-06 for visual consistency
       └─ 3-pack stacked <VoiceCommandShowcase />:
          • airpods-walk-and-dictate + calendar-add (Thursday 2pm Budget review tile + team SMS)
          • email-draft-reply + email-draft (compose window + To/Subject/Body + attachment + SEND)
          • doc-to-phone + doc-to-phone (inbox search + PDF card slide + iMessage delivery)
  └─ Sub-section 3: Your Life. One Dashboard
       ├─ Static subtitle: "Your dashboard builds & organizes itself as your agent does the work."
       └─ <AutopilotDashboardDemo /> — Health/Work/Finance space switcher (auto-cycles every 7s
          until user clicks; floating breathing Sophia bubble bottom-right)
  └─ Sub-section 4: Your website. Always on.
       ├─ Rotating sub (4-phrase, 3s cycle)
       └─ <WebsiteWidgetShowcase /> — live iframe of https://get-myagent.com/demo-embed?theme=light
          inside browser-frame chrome with "Speak with Sophia" hover overlay → opens
          https://get-myagent.com/chat/<id> in new tab
  └─ Demo / Start Free Trial pill CTAs + 6 trust badges row
  └─ Inter-sub-section spacing: mb-24 md:mb-36 (matches MyAgent.com's py-24 md:py-36)

[Pivot Banner]
  └─ Diamond divider ◆
  └─ h2: "Want it built around your operations?"
  └─ Sub: "Our team designs your stack, integrates it deeply, and runs it end-to-end."
  └─ "Path B: Agency Services →" pill — smooth-scrolls to #homepage-services

[Solutions] — Path B · Natyv agency
  └─ Path stamp: "—— NATYV AI · AGENCY ——" (single line; no descriptor)
  └─ h2: "Your stack. Built around you."
  └─ Rotating subtitles (3, 4.5s cycle):
       1. "Six functional areas. One AI stack. Zero handoffs."
       2. "Pick what moves the needle. We integrate it deeply with your operations."
       3. "Built by operators who've shipped it 50× before."
  └─ 6 service chip-cards (Front Desk · Sales · Operations · Finance · Marketing · CX) — each
     card has 5 chip sub-services pulled from src/pages/Services.tsx, links to /services#<id>
  └─ "Explore all services" pill CTA + secondary "Want to talk first? Book a consultation →"

[Advisory] — Path B endpoint
  └─ h2: "Strategy first. Build second."
  └─ 3 rotating subs · 5 supporting pills · 3 benefit cards · "Schedule consultation" CTA

[Partners]
  └─ h2: "Best-in-class AI. Wired together."
  └─ Rotating sub 1 says "One unified agent." (NOT "operator" — important)
  └─ 5 pills · 8-logo auto-scroll carousel

[Two-Paths pre-footer]
  └─ "TWO PATHS. PICK YOURS." section label
  └─ Path A card: "Meet your agent" + "Self-serve. Free for 14 days. No credit card. Live in 60 seconds." + "Start free trial →"
  └─ Path B card: "Talk to a strategist" + "60-minute consultation. Confidential. NDA available. Action plan delivered." + "Book consultation →"

[Sticky CTA bar] — fixed bottom, fades in from scrollY=0, fades out when footer enters viewport
  └─ "Try MyAgent free →" + "Book consultation"
  └─ Hide threshold: footer.getBoundingClientRect().top > window.innerHeight - 80

[Footer]
  └─ Studio · Solutions · Advisory · About (same nav as Navbar)
  └─ Privacy · Terms · Security legal links (About removed from here, lives in main nav now)
```

---

## File map

### Files created or heavily rewritten this session

| File | Role |
|---|---|
| `src/pages/Index.tsx` | Homepage assembly — wires all components in the order above |
| `src/components/Hero.tsx` | Stripped hero (label + h1 + video, nothing else) |
| `src/components/Navbar.tsx` | Added "About" right of "Advisory" |
| `src/components/Footer.tsx` | Added "About" to top nav, removed from legal links |
| `src/components/MyAgentShowcase.tsx` | Studio (Path A) — Path stamp + logo + pills + 4 sub-showcases + CTAs + trust badges |
| `src/components/HomepageServices.tsx` | Solutions (Path B) — Path stamp + headline + 6 chip-cards + CTA |
| `src/components/AdvisorySection.tsx` | Strategy first. Build second. + benefit cards |
| `src/components/PartnersSection.tsx` | Best-in-class AI. Wired together. + scrolling logo carousel |
| `src/components/PivotBanner.tsx` | Single biggest conversion lever — explicit Path A → Path B handoff |
| `src/components/StickyDualCTA.tsx` | Always-on bottom bar, hides only at footer |
| `src/components/TwoPathsFooter.tsx` | Pre-footer binary fork card pair |

### Voice-command showcase ports (`src/components/voice-command-showcase/`)

All ported verbatim from `~/Developer/my-agent-ai/src/components/voice-command-showcase/` and `my-agent-ai/src/components/landing/`. Avatar and video URLs rewritten to absolute `https://get-myagent.com/...` paths (CSP confirmed open for cross-origin).

| File | What it is |
|---|---|
| `CinematicClip.tsx` | Video player + WebVTT subtitle parser + per-frame timeline emitter |
| `VoiceCommandShowcase.tsx` | 60/40 grid composite — video left, dashboard scene right; routes by `dashboardScene` prop |
| `CalendarAddScene.tsx` | Calendar widget (Thursday 2pm Budget review + team SMS card) |
| `JobRescheduleScene.tsx` | Plumber job-reschedule scene — **NOT used on homepage** but imported (was in earlier draft) |
| `EmailDraftScene.tsx` | Email compose window with attachment + SEND lock |
| `DocToPhoneScene.tsx` | Inbox search + PDF card + iMessage delivery |
| `CallDashboardScene.tsx` | Earlier transcript-style call panel — **NOT used on homepage** but ported (kept around in case future need) |
| `IPhoneFrame.tsx` | The iPhone chrome (Dynamic Island + status bar + home indicator) |
| `CallHandlingVideo.tsx` | Ava call video with onTimeUpdate emitter for syncing the phone widget |
| `OperatorPhoneDemo.tsx` | The Ava + Secret Mode + Coach + Post-Call Report widget — 557 lines, cycles Phase B → C |
| `CallHandlingShowcase.tsx` | Wraps `CallHandlingVideo` + `IPhoneFrame` + `OperatorPhoneDemo` with shared `videoTimeMs` clock |
| `AutopilotDashboardDemo.tsx` | 877-line Health/Work/Finance space switcher with floating Sophia bubble |
| `WebsiteWidgetShowcase.tsx` | Browser-frame chrome + cross-origin iframe to get-myagent.com/demo-embed + hover-to-open-chat overlay; PhraseRotator + WidgetTypewriterSub inlined |

### Cross-origin assets (already public, no further work needed)

- Videos: `https://get-myagent.com/videos/cinematic/{salon-hero-fast,airpods-walk-and-dictate-fast,email-draft-reply-fast,doc-to-phone-v2-standard,listen-live-coach-v5}*.mp4`
- VTT captions: `https://get-myagent.com/videos/cinematic/captions/{airpods-walk-and-dictate,email-draft-reply,doc-to-phone,listen-live-coach-v5}.vtt`
- Avatar: `https://get-myagent.com/avatars/agent-sophia.png`
- Live widget iframe: `https://get-myagent.com/demo-embed?theme=light` — verified `access-control-allow-origin: *`, no `X-Frame-Options`, no `frame-ancestors` restriction → embeds cleanly from natyv.ai
- Sophia chat: `https://get-myagent.com/chat/b516aaab-99d8-457e-b2f4-ceef92222211`

---

## Companion edit in MyAgent.com source (uncommitted)

`~/Developer/my-agent-ai/src/pages/MyLifeHero.tsx` — added a `VOICE_COMMANDS_PHRASES` constant (lines ~648) and inserted a `<PhraseRotator>` after the "Live your life. Skip the rest." h2 (lines ~840-849) for visual consistency with the call-handling and widget sections that already had rotating subs.

**Status:** local-only, not committed, not pushed. **Verify before deploying** — review the diff, then commit + push if you still want it. If you don't, `git checkout` the file to revert.

---

## Open items the user flagged but didn't fully resolve

1. **Aesthetic polish pass** — the user explicitly said "I wanted to make a couple more aesthetic changes, but I would like to do that in a new session." That's the agenda for the next session. Don't pre-empt — open with "What's the first aesthetic tweak?"

2. **Production deploy** — nothing in this session has shipped. The dev server running at localhost:5175 is the only place these changes exist. Production deploy steps live in `~/Developer/natyv-ai/` standard Cloudflare Pages workflow.

3. **VideoSequence.tsx** — orphaned. The original typewriter dictionary hero is no longer imported anywhere but the file still lives at `src/components/VideoSequence.tsx`. Safe to delete when you're sure you don't want it back.

4. **AboutSection.tsx** — orphaned. The About section was removed from the homepage earlier; About is now a route only (`/about`). The component file may still exist; check if `Index.tsx` imports it (it doesn't, as of this session). Safe to delete if confirmed unused.

5. **Speed/payload audit** — Studio now has 5 autoplaying videos + cross-origin iframe. User explicitly accepted this trade-off ("MyAgent.com runs the same components, fine"), so no work needed unless real users complain post-deploy.

---

## Critical user feedback patterns to NOT repeat

These came up multiple times this session — don't drift again.

| Pattern | What happened | Don't do this |
|---|---|---|
| **Picking the easier port instead of the right one** | I shipped `CallDashboardScene` (transcript widget) when user wanted the actual `OperatorPhoneDemo` (iPhone-framed Post-Call Report). User had shown me the right reference 3× | If a screenshot is being shown 2+ times, treat it as authoritative. Don't substitute. |
| **Asking permission to fix a screw-up I already admitted to** | I said "I screwed this up" then asked "do you want me to fix it or leave it?" | If you said it's broken, fix it. Don't ask. |
| **Underselling the product** | Reduced MyAgent to one feature ("dictate on the go") when MyAgent.com has 4 distinct product sections | When in doubt, port more. The user's reference is the canonical source. |
| **Effort-wedge between paths** | "Don't lift a finger" implied MyAgent was work | Both paths are effortless. Differentiate by speed/customization. |
| **Generic mechanical language** | "Operator" / "the product" / "talk to it" | Personify. "Your agent." "Meet your agent." |
| **Compulsive trailing summaries** | Every response ended with a multi-bullet recap | User can read the diff. Tighten responses. |

---

## Quick verification commands for the next session

```bash
# Make sure the dev server is up
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5175/

# If down, start it
# (use Claude Code preview tools — preview_start name="natyv-dev")

# Watch for issues in source
grep -rn "operator\|talk to it\|Don't lift a finger" \
  ~/Developer/natyv-ai/src/components/ ~/Developer/natyv-ai/src/pages/Index.tsx
# Should return only legitimate uses (e.g., "operators who've shipped it 50× before"
# is intentional in Solutions subtitle 3)
```

```javascript
// In browser console at localhost:5175 — full structure check
[...document.querySelectorAll('main h1, main h2, main h3')].map(h => h.textContent.trim())
// Expected order:
// "Run your business. Live your life."           ← Hero h1
// "Want it built around your operations?"        ← Pivot Banner h2
// "Your stack. Built around you."                ← Solutions h2
// "Strategy first. Build second."                ← Advisory h2
// "Best-in-class AI. Wired together."            ← Partners h2
// + the 4 Studio sub-section h3s in between
```

---

## Suggested opening for the next session

> Read `~/Developer/natyv-ai/docs/handoffs/SESSION-2026-05-06-HANDOFF.md` first. Then ask Damian: "What's the first aesthetic tweak you want to make?" Don't propose anything until he names a target.
