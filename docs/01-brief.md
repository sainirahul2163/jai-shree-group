# 01 — Brief

## Goal

Give each of the group's six manufacturing units its own specialist website. All seven sites (six unit sites plus the main group site) run on **one shared Next.js app and one Supabase project**, so a fix or feature ships to every site at once.

Each unit site goes deep on **one product line the group makes today** and one set of buyers. That depth is what lets Google treat the sites as separate businesses instead of copies of the main site.

## Why

| Benefit | How |
| --- | --- |
| More search visibility | Each site ranks for its own product, buyer and city searches, in more depth than one page on the main site can give |
| More, better leads | Every site has a quote form with drawing upload, WhatsApp, call, and a free signature tool that brings buyers back |
| Leads reach the right unit | Each enquiry is saved with its site and emailed to the unit that makes that product |
| Credible group brand | Modern sites replace two dated sites from another vendor and four domains that no longer load |
| One place to manage | One admin panel for leads, blog, gallery and testimonials, filtered by site |
| Lower running cost | One codebase, one Vercel project, one Supabase project |
| Keep existing rankings | Old pages on the two live unit sites redirect to their new equivalents |

## In scope

- Turning the current single-site app into a multi-site platform (Phase 0)
- Six unit sites (Phases 1–3), launched one by one
- Shared upgrades every site gets: privacy and terms pages, analytics, auto-reply on enquiries, spec-sheet downloads, export page
- Per-site SEO: metadata, sitemap, robots, structured data, legacy redirects
- Admin panel: site filter and per-site lead routing

## Out of scope (for now)

- Separate codebases or repos per site
- Online payments or e-commerce
- Languages other than English
- A redesign of the main group site (it changes only where Phase 0 requires, and must look identical afterwards)

## Status — 2026-10-10

- Planning done. Client-facing plan: Claude doc "Jai Shree Group — Multi-Site Digital Plan".
- New working folder `/Users/rahul/Documents/jai-shree-multisite`, branch `multi-site`, created from `main` at commit `d379076`.
- All six units are active. The client approved each unit's focus, products, names, contacts and holidays on 2026-10-07 (`client/answers-2026-10-07.md`). No further client questions before building (agency decision, 2026-10-10).
- Domains are handled by the agency (Viralbizz); no client approval needed.
- Next step: Phase 0 in `05-build-plan.md`.

## People

| Who | Role |
| --- | --- |
| Kanishq Jangid | Client contact, Jai Shree Group |
| Viralbizz (Rahul, Subhash) | Agency: design, build, hosting, domains |
