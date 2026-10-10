# Coordinator handbook — Claude runs the Cursor build loop

You are Claude Code, running in `/Users/rahul/Documents/jai-shree-multisite` on the user's Mac. You coordinate the Cursor CLI agent, which does the coding. You verify every task before the next one starts. The user (Rahul, agency Viralbizz) may be away for many hours: work through the plan carefully and keep going.

## 0. Read first, every new session

1. `PROJECT-LOG.md` — goal, requirements, current status, change log
2. `AGENTS.md` — hard rules
3. `CURSOR-LOG.md` — what Cursor did, task by task
4. `docs/05-build-plan.md` — the task list (work it in order)
5. `docs/04-architecture.md`, `docs/03-sites.md`, `docs/02-business-facts.md`, `docs/client/answers-2026-10-07.md`, `docs/08-content-checklist.md`, `docs/07-seo-rules.md`
6. `git log --oneline -15` on branch `multi-site`

## 1. What the user has authorised (2026-10-11)

- Run the whole build plan as far as possible: **Phase 0 (0.5 → 0.8), then Phases 1, 2 and 3 (the six unit sites)**, then Phase 4 items that don't need the user.
- **Supabase:** the Supabase MCP is connected to the right account. You may run SQL on the dev project **jai-shree-dev** (`icbamzscfgqwcbhkdzml`) freely. On the **live** project **Jaishree Project** (`myhqzpnxwyytqtgoxldy`) you may apply the tested, additive migrations needed to go live (e.g. the `site` column, `stock_items`) — only after they worked on dev. Never drop, delete or rewrite live data.
- **Main site:** you may merge to `main` (which auto-deploys jaishreegroup.com via Vercel) when a phase passes all its checks, "done properly". The live group site must look and work the same unless a task intentionally changes it.
- **Google Analytics (GA4): skip for now.** In 0.8 build privacy and terms pages; leave analytics out (or behind an empty env var, off by default).
- Domains for unit sites are handled by the agency later; unit sites can be finished and previewed without them.

## 2. The loop

For each task in `docs/05-build-plan.md`, in order:

1. **Write the task prompt** to `docs/prompts/task-<n>.md` (use `docs/prompts/task-0.5.md` as the model: read-first list, exact scope, requirements, checks, logging + one-commit rule, "do not push"). One task per prompt. Task 0.5's prompt is already written and reviewed.
2. **Run Cursor in a fresh session**, in the background, and wait for the completion notification:
   ```bash
   cd /Users/rahul/Documents/jai-shree-multisite && ~/.local/bin/agent -p --force --trust --sandbox disabled --model <model> --output-format text "$(cat docs/prompts/task-<n>.md)" > /tmp/cursor-<n>.log 2>&1
   ```
   Models: `claude-opus-5-5-high` for hard work (0.5, 0.6, 0.7, every site build, tricky fixes); `claude-opus-5-5-medium` for simple work (0.8, small fixes, log/doc tidy-ups).
3. **Verify** (don't trust the report — check):
   - `git log` / `git show --stat`: one task, code + `CURSOR-LOG.md` + `PROJECT-LOG.md` + build-plan tick in the same commit; nothing outside scope; no secrets, no stray scripts.
   - `npm run build` passes; `npm run lint` shows only the 12 old errors (18 problems: 12 errors, 6 warnings).
   - Quick check on a production build (use port **3100** for your own server; Cursor uses 3000; kill stale servers with `lsof -ti tcp:<port>`): the task's own checks plus `/`, `/contact`, `/products/perforated-sheets`.
   - For site tasks: the site's launch checklist in `docs/05-build-plan.md`, content facts against `docs/02-business-facts.md` and the client answers, no copy shared between sites, contrast per `docs/03-sites.md`.
4. **Pass →** push `multi-site` (`git push origin multi-site`), add a short "Reviewed by Claude" row to `PROJECT-LOG.md` (commit + push), next task.
   **Fail →** resume the same Cursor session with a precise fix list (`--resume <chatId>` or `--continue`), max 2 fix rounds; then fix it yourself or record it as blocked in PROJECT-LOG "Current status" and move on to the next task that doesn't depend on it.
5. **Phase boundaries:** update PROJECT-LOG "Current status" with a clean summary.

## 3. Phase 0 finish (after 0.8)

1. Apply the 0.7 migration(s) to **jai-shree-dev** with the Supabase MCP and test: a test enquiry from the local site lands with `site='group'`; admin panel login (`jaishree02026@gmail.com`, in `ADMIN_EMAILS`) shows the site filter.
2. **Full screenshot compare** (only time it runs): `docs/research/baseline.md` — capture into `docs/research/after-phase-0`, compare against `docs/research/baseline`. Every page ~0.00% except known animated areas; no height changes; `<head>` diff clean except intended changes; sitemap/robots same.
3. Go live with Phase 0: apply the same migration to the **live** project; merge `multi-site` into `main` from `/Users/rahul/Documents/jai-shree-group` (pull first), build, push. Commit as author `sainirahul2163 <196232752+sainirahul2163@users.noreply.github.com>` (Vercel needs the GitHub-matched email). Watch the deploy: `gh api repos/sainirahul2163/jai-shree-group/commits/<sha>/status`. Check the live site (contact phones, a product page, the map, `/sitemap.xml`, a test of `/admin/login`). If anything is wrong, revert on `main` immediately and log it.
4. Then merge `main` back into `multi-site` and continue with Phase 1.

## 4. Things already learned

- `.env.local` in this folder points at **jai-shree-dev**; it has no Resend key (test enquiries send no email) and `ADMIN_EMAILS=jaishree02026@gmail.com`. Never commit `.env.local`. `jai-shree-group/.env.local` points at the live project — leave it alone.
- `.env.local` line `RESEND_FROM` contains `<…>`, so `source .env.local` fails in zsh; read single values with `grep '^KEY=' .env.local | cut -d= -f2-`.
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000` locally, so local sitemaps/canonicals use localhost.
- Cursor tends to commit code before writing its logs — the rule now says one commit; check it.
- Known follow-up for the first **light-theme** site: hard-coded neutral greys remain (`ProductShowcase` `#0F0F0F`, `LandingLocations` `#141414`, map popup `#CCCCCC`, `ProductViewer3D` shades, `email.ts`). Fix them when building Jai Shree Industries (first light site).
- The 13-hour `caffeinate` started 2026-10-11 ~02:00 keeps the Mac awake; the lid must stay open.

## 5. Never

- Invent specs, stock lists, machines, client names, certifications or numbers (use `docs/08-content-checklist.md` fallbacks).
- Offer wire mesh, crimped mesh or demister pads (welded mesh only on Shree Weld Mesh).
- Delete or rewrite live database data; disable RLS; expose the service role key to the browser.
- Push secrets, or force-push `main`.
- Leave the user without a record: every change goes in `PROJECT-LOG.md`.

## 6. When the user returns

Give a short report: done and verified, live now, waiting on them, problems. Read the logs and git first.
