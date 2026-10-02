# Natyv AI — Company Website

Repository: `damianschaeffer/natyv-ai`. Default: `main`. Last source inspection: 2026-10-02.

## Purpose and architecture

React/Vite marketing app with vite-react-ssg; src/components and src/pages; public assets in public.

## Read first

Current deployment workflow uses Node 20, npm install and Pages project natyv-site; validate Node 20 plus npm ci for reusable setup. README.md is a generic stale Lovable starter. Canonical brand kit is mission-control/client/src/lib/brand-kit-data.ts; read it through a connected GitHub source when not checked out. npm run build:csr is a fallback diagnostic, not proof the SSG production build passes. Tracked .env requires review for portability before cloud snapshots; do not print it.

## Reproducible commands

Install:

```bash
npm ci --no-audit --no-fund
```

Checks (choose the task-relevant reviewed scope):

```bash
npm test && npm run build
```

Development startup:

```text
npm run dev -- --host 127.0.0.1
```

## Delivery boundary

natyv.ai; confirm actual deployment workflow before any release.

## Start every task

1. Read repository instructions and this card, then `git status --short --branch` and `git log -1 --oneline`. Record pre-existing changes; preserve other chats' work.
2. Establish the concrete outcome and required evidence. Offline tests, public connectivity, authenticated staging actions, deployment provenance and native device proof are separate capabilities.
3. Reuse the published environment and existing checkout. Dependencies/caches may persist; restart running services as required. Inspect runtime policy and credential readiness with the cloud-environment runtime skill. Never dump environment variables or secret values.
4. Use explicit-path staging and draft PRs. No merge, deployment, activation, purchase, reset credit, paid API fallback, customer-data read or provider side effect is granted by this setup.

## Shared context

GitHub is the portable code/rules source. Second Brain is the coordination map, not an automatic mounted dependency. Curate only the task-relevant handoff into a repo or start skill; do not copy all history. Brain API bootstrap/search may be used only with separately supplied, approved access. Personal local skills, Mac .env files, local chats and 1Password sessions do not automatically transfer.

Use a dedicated staging account/fixture for authenticated user-flow proof. Public GET status does not establish account permissions or persistence. Keep production deploy credentials in existing authorized delivery runners.
