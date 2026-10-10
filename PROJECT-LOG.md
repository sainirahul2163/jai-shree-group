# Project Log — Jai Shree Group Multi-Site

The one file to check first. It holds **the goal, what is required, where we are, and every change made**. Detail lives in `docs/`; this file points to it.

> **Two logs:** this file is the overview. `CURSOR-LOG.md` is Cursor's detailed diary — Cursor adds an entry there after every task, plus a one-line row here.
>
> **Rule:** every change (code, docs, files, decisions, client input) gets a row in the Change log below, on the same day, newest first. If a requirement's status changes, update its row too. No change is "done" until it is logged here.

---

## 1. Goal

Build **seven websites from one Next.js app**: the main Jai Shree Group site (jaishreegroup.com) plus one specialist site for each of the group's six manufacturing units. Each unit site shows only what that unit does, sends enquiries straight to that unit, and helps it get found on Google. Everything is managed from one admin panel. The live main site must keep working, unchanged, throughout.

No fixed dates. We work as fast as possible, **phase by phase, task by task**: a task starts only when the one before it passes its checks (user, 2026-10-11).

## 2. The seven sites (approved by the client, 2026-10-07)

| # | Site | Unit location | What it shows | Domain |
| --- | --- | --- | --- | --- |
| 0 | Jai Shree Group (main) | All | Group story, six main products, links to all units | jaishreegroup.com (live) |
| 1 | Shree Perforators | Talawade, Pune | CNC perforated sheets and hole patterns, plus expanded metal | shreeperforators.com |
| 2 | Jai Shree Metal Perforators | Talawade, Pune | Laser cutting and CNC punching job work | metalperforatedsheets.com |
| 3 | Jai Shree Industries | Bhayander, Mumbai | Expanded metal, plus CNC and mechanical punching | New domain |
| 4 | Jai Shree Perforator | Palghar | Mechanical-punched perforated sheets, in bulk | metalperforation.co.in |
| 5 | Jai Shree Filtration — "Perforated sheets available in minutes" | Masjid Bunder, Mumbai | Ready-stock perforated sheets from the godown | jaishreefiltration.com |
| 6 | Shree Weld Mesh — "Manufacturing in welded mesh" | Talawade, Pune | Welded mesh | weldedmeshindia.com |

Full specs: `docs/03-sites.md`. Client's answers: `docs/client/answers-2026-10-07.md`.

## 3. Requirements

Status: ✅ done · 🔄 in progress · ⏳ not started · ⛔ blocked

### Planning and inputs

| Requirement | Status | Where |
| --- | --- | --- |
| Research the codebase, live site and the group's old unit sites | ✅ | `docs/06-codebase-map.md`, `docs/research/legacy-sites.md` |
| Plan approved by the client: unit → site, products per unit, names, contacts, holidays | ✅ | `docs/client/answers-2026-10-07.md` |
| Separate working folder and branch so the live site stays safe | ✅ | this folder, branch `multi-site` |
| Aligned docs for Cursor and Claude (brief, facts, sites, architecture, build plan, SEO, content) | ✅ | `AGENTS.md`, `docs/`, `.cursor/rules/` |
| `public/` holds only files the code uses | ✅ | see Change log 2026-10-10 |
| Docs and cleanup committed on `multi-site` | ✅ | first commit on `multi-site`, 2026-10-10 (`git log`) |

### Step 0 — Live-site fixes (on `main`, deploys to production)

| Requirement | Status |
| --- | --- |
| Correct the cleanup branch `claude/pensive-feynman-t9pehu` (unit products, welded mesh at Shree Weld Mesh) and merge | ✅ live 2026-10-11 |
| New phones on the live site: Jai Shree Metal Perforators +91 93733 24492; Jai Shree Industries and Jai Shree Perforator +91 89089 21111 | ✅ live 2026-10-11 |
| Weekly holidays on the contact page (Thursday Pune, Sunday Mumbai) | ✅ live 2026-10-11 |
| Hide website links to units without a working site (4 units pointed at a dead or wrong domain) | ✅ live 2026-10-11 |
| Fix the location map (CARTO tiles needed an API key) | ✅ live 2026-10-11 |
| Get Vercel deploying again from GitHub | ✅ reconnected by the user 2026-10-11; pushes to `main` deploy automatically (Vercel team `jai-shree-s-projects`) |
| Merge `main` into `multi-site` | ✅ `d65a458`, build passes |

### Phase 0 — Platform (weeks 1–2)

| Requirement | Status |
| --- | --- |
| Baseline screenshots of every main-site page | ✅ 80 screenshots + heads + SEO files; guide `docs/research/baseline.md` |
| `middleware.ts` → `proxy.ts` | ✅ |
| Site config per site (`src/sites/`) | ⏳ |
| Colour tokens replace ~1,400 hard-coded colours | ⏳ |
| Pages move under `src/app/[site]/`; domain-based routing | ⏳ |
| Per-site SEO: metadata, sitemap, robots, structured data | ⏳ |
| `site` column on leads/blog/gallery/testimonials/page views; leads emailed to each unit; admin site filter | ⏳ |
| Customer auto-reply with reference number | ⏳ |
| Privacy and terms pages; Google Analytics 4 | ⏳ |
| Main site looks identical to baseline; merge to `main` | ⏳ |

### Phases 1–4 — Sites and launch

| Requirement | Status |
| --- | --- |
| Site 1 Shree Perforators: pattern library, old-URL redirects (week 3) | ⏳ |
| Site 2 Jai Shree Metal Perforators: drawing upload quote, old-URL redirects (week 4) | ⏳ |
| Site 3 Jai Shree Industries: expanded metal selector (weeks 5–8) | ⏳ |
| Site 4 Jai Shree Perforator: bulk order estimator | ⏳ |
| Site 5 Jai Shree Filtration: stock check + admin stock board | ⏳ |
| Site 6 Shree Weld Mesh: welded mesh weight calculator | ⏳ |
| Domains pointed to Vercel (agency) | ⏳ |
| Search Console, Google Business Profiles, Our Group links, monthly reports (weeks 9–10) | ⏳ |

Step-by-step tasks and acceptance checks: `docs/05-build-plan.md`.

### Content we do not have (launch with fallbacks, never invent)

Unit logos, working hours, contact names, unit photos, client names, case studies, machine list, stock list, welded mesh range, expanded metal sizes and formulas, standard mechanical-punching patterns, export details. Fallback for each: `docs/08-content-checklist.md`.

## 4. Current status

**Where we are (2026-10-11):** Step 0 is live on jaishreegroup.com (deploy `5035e14`, checked: new phones, holidays, unit products, no links to dead domains, map loads OpenStreetMap tiles). Vercel deploys automatically again on every push to `main`. Phase 0 task 0.2 is done on `multi-site` (`85f9286`, not pushed): `src/middleware.ts` is now `src/proxy.ts`. Task 0.1 baseline screenshots are still in progress.

**Next:**
1. Phase 0.3 site config.

**Open points:**
- Welded mesh: the agency said on 2026-10-02 it was discontinued; the client's approved answers say Shree Weld Mesh makes it. We follow the client.

---

## 5. Change log

Newest first. One row per change. "Files" lists what changed (folder-relative).

| Date | Change | Files | Why |
| --- | --- | --- | --- |
| 2026-10-11 | 0.1 Baseline done (Claude): production build of `main` @ `5035e14`, 40 pages × desktop 1440 + phone 390 = 80 full-page screenshots, every page's `<head>`, local and live sitemap/robots — all pages 200/304, no console errors. Saved in `docs/research/baseline/` (git-ignored, 54 MB). Added reusable `scripts/baseline/capture.js` and `compare.js` (pixel diff per page) and the guide. Also: fixed the Cursor log rule so code and log go in one commit (Cursor's 0.2 log was left uncommitted), updated the codebase map for `proxy.ts` | `docs/research/baseline.md`, `scripts/baseline/`, `docs/05-build-plan.md`, `docs/06-codebase-map.md`, `CURSOR-LOG.md`, `.cursor/rules/05-cursor-log.mdc` | Phase 0 acceptance needs a before-picture |
| 2026-10-11 | Renamed `src/middleware.ts` to `src/proxy.ts` and the export to `proxy` (Next.js 16). Admin gate unchanged: logged-out `/admin/dashboard` returns 307 to `/admin/login`. Commit `85f9286`, not pushed | `src/proxy.ts` | Phase 0 task 0.2 |
| 2026-10-11 | Step 0 is live. User reconnected Vercel to GitHub; pushed an empty commit `5035e14` to trigger the deploy; Vercel status success. Checked the live site: new phones, Sunday/Thursday holidays, Welded Mesh and Ready Stock on Our Group, no jaishreefiltration.com links, no old phones, map loads 9/9 OpenStreetMap tiles. The 2026-08-23/24 commits (hex hero background, brochure Industries pages) also went live with it. Only remaining "wire mesh" text is the 1970 history line (allowed) | `jai-shree-group` `main` | User asked to redeploy after reconnecting |
| 2026-10-10 | Merged `main` (with Step 0) into `multi-site` (`d65a458`); build passes. Not pushed | `multi-site` branch | Keep the build branch on the latest live code |
| 2026-10-10 | Committed Step 0 (`2f4daec`, author = GitHub no-reply email), fast-forwarded `main`, build passed, pushed to GitHub. **Not deployed**: no Vercel status on the commit; GitHub's last deployment record is 2026-08-02; live `/brochure/icons` (added 2026-08-24) is 404. Local Vercel CLI is logged in to TrackHive, which has no Jai Shree project | `jai-shree-group` `main` | User approved commit and push live |
| 2026-10-10 | Fixed the location map (home page and Our Group page): CARTO's dark map tiles now require an API key and showed "API KEY REQUIRED". Switched to OpenStreetMap tiles (no key, credit shown) darkened with a CSS filter; Leaflet CSS now bundled instead of loaded from unpkg; "Our Locations" label no longer hidden behind the map; Mumbai pin text no longer says "filtration sectors". Checked in the browser: all tiles load, no console errors. Not committed (on `step-0-live-fixes`) | `jai-shree-group`: `src/components/shared/IndiaMap.tsx` | User reported the map was not working |
| 2026-10-10 | Step 0 changes made in the production folder on branch `step-0-live-fixes` (from the cleanup branch): new phones for 3 units; weekly holiday per unit (`weeklyOff`) and per-region hours on the contact page; unit product lists set to the client's ticks (`BRANCH_PRODUCTS`); Our Group copy now names welded mesh and ready stock instead of "filtration products"; website links hidden for Shree Weld Mesh, Jai Shree Filtration, Jai Shree Industries, Jai Shree Perforator (pointed at a dead or wrong domain). Typecheck and build pass; no new lint issues (12 old lint errors in untouched files). Not committed | `jai-shree-group`: `src/lib/constants.ts`, `src/data/branches.ts`, `src/components/contact/ContactPage.tsx`, `src/components/group/GroupPage.tsx`, `src/components/home/GroupSection.tsx` | Step 0, approved by the user |
| 2026-10-10 | First commit on `multi-site`: all docs, both logs, Cursor rules, `.env.example`, client files, `public/` cleanup. Not pushed | whole folder | User approved the commit |
| 2026-10-10 | Created `CURSOR-LOG.md` (Cursor's task diary with an entry template) and Cursor rule `05-cursor-log.mdc` that makes Cursor fill it in after every task | `CURSOR-LOG.md`, `.cursor/rules/05-cursor-log.mdc`, `AGENTS.md`, `PROJECT-LOG.md` | So "what is done and what is left" can be answered by reading the logs |
| 2026-10-10 | Created this project log; added the "log every change" rule to AGENTS.md and Cursor rules | `PROJECT-LOG.md`, `AGENTS.md`, `.cursor/rules/00-project.mdc`, `docs/README.md` | One place for goal, requirements, status and history |
| 2026-10-10 | Cleaned `public/`: 92 → 38 files, 30 MB → 14 MB. Removed 20 unused logo files (the client's logo is inline in `Logo.tsx`), Next.js starter SVGs, the 2022 brochure PDF, 30 unused brochure photos, 1 unused gallery photo, stale README. Build passes | `public/`, `docs/06-codebase-map.md`, `docs/08-content-checklist.md`, `docs/decisions.md` | Keep only what the site uses; useful photos recoverable from git commit `d379076` |
| 2026-10-10 | Recorded the client's approved questionnaire and updated all docs: new unit focus, products per unit, names, phones, holidays, domain; welded mesh active at Shree Weld Mesh; weldedmeshindia.com and jaishreefiltration.com back in use; stock board for Jai Shree Filtration; content fallbacks; Step 0 live fixes; "How we work" in the build plan | `docs/client/answers-2026-10-07.md` (+ the filled `.docx`), `docs/01`–`08`, `docs/decisions.md`, `AGENTS.md`, `.cursor/rules/` | Client approved; agency decided to build without further questions |
| 2026-10-10 | Updated the client plan doc (Claude doc) to the approved site list | Claude doc "Jai Shree Group — Multi-Site Digital Plan" | Keep the client-facing plan in line |
| 2026-10-10 | Found the cleanup task's branch `claude/pensive-feynman-t9pehu` unmerged and partly wrong after the client's answers | — | Must be corrected before Step 0 merge |
| 2026-10-07 | Client (Kanishq Jangid) filled in and approved the questionnaire | `docs/client/Jai-Shree-Unit-Websites-Answers-2026-10-07.docx` | — |
| 2026-10-05 | Made a 2-page Word questionnaire for the client with answer boxes | `docs/client/Jai-Shree-Unit-Websites-Questions.docx` | Client's chat replies were partial |
| 2026-10-05 | Client chat feedback: Palghar has no laser cutting; add expanded metal to Shree Perforators | `docs/02`, `docs/03`, `docs/decisions.md` | — |
| 2026-10-05 | Made the one-page proposal PDF for client approval | `docs/client/Jai-Shree-Unit-Websites-Proposal.pdf` (+ HTML source) | Client approval before building |
| 2026-10-05 | Created this folder (copy of the repo, branch `multi-site`, dependencies installed, build passes); wrote `AGENTS.md`, `docs/01`–`08`, `decisions.md`, `research/legacy-sites.md`, Cursor rules, `.env.example`, new README; moved old docs to `docs/archive/`; checked theme contrast (fixed two palettes) | whole `docs/`, `AGENTS.md`, `README.md`, `.cursor/rules/`, `.env.example`, `.gitignore` | Aligned context so building in Cursor stays on track |
| 2026-10-05 | Started a background task to remove discontinued-product copy from the live site | branch `claude/pensive-feynman-t9pehu` | Live site still offered discontinued products |
| 2026-10-02 | Wrote the client-facing plan (Claude doc) with benefits, upgrades, architecture and roadmap diagrams | Claude doc | Plan for client review |
| 2026-10-02 | Researched the project and the group's six unit domains; proposed one app serving all domains | — | Starting point |
