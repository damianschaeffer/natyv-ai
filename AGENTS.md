# natyv-ai Agent Instructions

## Cursor Cloud specific instructions

Stack is Vite 5 + React 18 + shadcn/ui with static-site generation via `vite-react-ssg`. Standard scripts live in `package.json`: `npm run dev` (Vite dev server on port `8080`), `npm run build` (SSG build — renders ~11 static pages), `npm run lint` (eslint), `npm run test` (vitest).

Env: this repo has a **committed `.env`** with its own Supabase project (`vsotgufotomtwwwerzwh`) and `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`, so it runs and builds without extra setup.

Notes:
- `npm run lint` reports a few pre-existing code errors — the toolchain works; those are code issues, not environment problems.
- Browser gotcha: loading several heavy SPA tabs at once can OOM the in-VM browser (`ERR_INSUFFICIENT_RESOURCES` / "Aw, Snap"). Test one app at a time.
