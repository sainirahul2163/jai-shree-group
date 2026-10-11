# Jai Shree Group — Multi-Site Platform

One Next.js app that serves the Jai Shree Group main site and six unit websites, each on its own domain.

- **Start here:** [PROJECT-LOG.md](PROJECT-LOG.md) (goal, requirements, status, change log), then [AGENTS.md](AGENTS.md) and [docs/README.md](docs/README.md)
- **Build plan:** [docs/05-build-plan.md](docs/05-build-plan.md)
- **Branch:** `multi-site` (merges to `main` after Phase 0 passes; `main` auto-deploys to production on Vercel)

## Run locally

```bash
npm ci
cp .env.example .env.local   # then fill in values; never commit .env.local
npm run dev
```

- Main site: http://localhost:3000
- A unit site (after Phase 0): http://shree-perforators.localhost:3000

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase, Resend, Vercel.
