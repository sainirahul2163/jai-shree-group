<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Jai Shree Group — Multi-Site Platform

Read this file first. It is the entry point for every AI tool (Cursor, Claude Code, Copilot) and every developer.

Stack: **Next.js 16.2.7, React 19.2.4, Tailwind CSS v4, TypeScript, Supabase, Resend, Vercel.** Known Next 16 change that affects us: `middleware.ts` is deprecated and is now `proxy.ts` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).

## What we are building

One Next.js app that serves **seven websites** from one codebase: the main Jai Shree Group site plus one specialist site for each of the group's six manufacturing units. The app picks the site by the domain the visitor used. Full brief: `docs/01-brief.md`.

## Read order before you write code

0. `PROJECT-LOG.md` — goal, requirements, current status, and the log of every change
   `CURSOR-LOG.md` — Cursor's detailed task diary (Cursor: add an entry after every task, using its template)
1. `docs/README.md` — index of all docs
2. `docs/02-business-facts.md` — the company, the 6 units, what they make and **what they no longer make**
3. `docs/03-sites.md` — the 7 sites: products, buyers, signature tool, theme
4. `docs/04-architecture.md` — how one app serves seven domains
5. `docs/05-build-plan.md` — phases, tasks, acceptance checks (work top to bottom)
6. `docs/06-codebase-map.md` — where things live today and what is hard-coded

## Hard rules

- **Never break the live main site.** `main` deploys to production on Vercel. All multi-site work happens on the `multi-site` branch. The main site must look identical after every Phase 0 change (see the screenshot check in `docs/05-build-plan.md`).
- **Products:** the group's six are perforated sheets, laser cutting, expanded metal, turret punching, precision sheet leveling and custom components. **Welded mesh** is made only by Shree Weld Mesh and appears only on its site and on the main site's Our Group page. Never offer wire mesh, crimped mesh or demister pads (discontinued; history mentions are fine). Each unit site offers only the products its unit makes — see `docs/03-sites.md`.
- **Client answers are final:** `docs/client/answers-2026-10-07.md` (approved by Kanishq Jangid). We are not asking the client more questions before building; where data is missing, use the fallbacks in `docs/08-content-checklist.md` and never invent specs, stock, machines or clients.
- **No hard-coded brand values in components.** Colours, names, phones, emails, domains and SEO text come from the active site's `SiteConfig` (`src/sites/`). Use token classes (`bg-brand`, `text-foreground`), never `bg-[#E8521A]`. See `docs/04-architecture.md` → Theming.
- **No duplicate content across sites.** Each site gets its own copy. Shared components are fine; shared paragraphs are not. See `docs/07-seo-rules.md`.
- **Client content rules** (from the client, do not revert): "Global delivery", not "Pan India"; 6 manufacturing units, not 8; Carbon Steel is not offered; specs use thickness only, no sheet sizes; the main-site hero H1 is locked (PERFORATED SHEET / MANUFACTURERS / SINCE 1970).
- **Log every change in `PROJECT-LOG.md`.** After any change (code, docs, files, config, client input), add a dated row to its Change log (newest first) and update the requirement status and "Current status" if they changed. A task is not done until it is logged.
- **Record decisions.** Any decision that changes scope, a site or a rule also goes into `docs/decisions.md` with the date.
- Do not commit secrets. `.env.local` is git-ignored; see `docs/04-architecture.md` → Environment variables.

## Commands

```bash
npm run dev      # http://localhost:3000 = main site; per-site preview: docs/04-architecture.md → Local development
npm run lint
npm run build
```
