# Cursor Log

Cursor's own work diary for the Jai Shree Group multi-site build. **Cursor writes here at the end of every task**, so anyone (Rahul, or Claude when asked "what is done and what is left") can read exactly what happened without opening the code.

## Rules for Cursor

1. **Add an entry at the end of every task or chat that changed anything** — code, docs, files, config, database. Newest entry at the top, under "Entries".
2. Use the template below exactly. Be specific: name the files, say what changed and why.
3. Be honest about checks. If lint or build failed, or you skipped them, say so. If something is half done, mark it 🔄 and say what is missing.
4. Order: make the change → run the checks → write this entry, tick the build plan, add the PROJECT-LOG row → **then commit everything in one commit** (code + logs together). After writing the entry here, also:
   - tick the task's box in `docs/05-build-plan.md` (only if its acceptance check passed),
   - add a one-line row to the Change log in `PROJECT-LOG.md` and update its requirement status.
5. Never delete or rewrite old entries. If an earlier entry was wrong, add a new entry that corrects it.
6. If you were unsure about something or made an assumption, write it under "Questions / assumptions" so it gets reviewed.

## Template

```markdown
### YYYY-MM-DD — <build-plan task number and name, e.g. "0.4 Theme tokens: components/home">

- **Status:** ✅ done | 🔄 partly done | ⛔ blocked
- **What I did:**
  - …
- **Files changed:** `path/one.tsx`, `path/two.ts`
- **Checks:** lint ✅/❌ · build ✅/❌ · screenshots match baseline ✅/❌/n.a. · other: …
- **Commit:** "<message>" (this entry is part of that commit — no hash needed)
- **Left to do in this task:** … (or "nothing")
- **Next task:** <number and name>
- **Questions / assumptions:** … (or "none")
```

---

## Entries

### 2026-10-11 — 0.3 Site config

- **Status:** ✅ done
- **What I did:**
  - Added `src/sites/types.ts` (`SiteKey`, `ProductSlug`, `ThemeTokens`, `SiteConfig`, plus `FontKey`, `HomeSectionKey`, `ToolKey`).
  - Added `src/sites/domains.ts`, a plain object with no imports: `jaishreegroup.com` and `www.jaishreegroup.com` → `group`, and apex plus `www` for shreeperforators.com, metalperforatedsheets.com, metalperforation.co.in, jaishreefiltration.com, weldedmeshindia.com. Skipped Jai Shree Industries ("New domain").
  - Added `src/sites/group.ts` with today's `COMPANY`, `NAV_LINKS`, `FOOTER` and `SEO`, theme hex from `globals.css`, and `origin` = `NEXT_PUBLIC_SITE_URL` if set, otherwise `https://www.jaishreegroup.com`.
  - Added `src/sites/index.ts`: `getSite`, `ALL_SITES` (group only), `isSiteKey`.
  - `src/lib/constants.ts` re-exports those values. No component or page edits. No unit-site config files.
- **Files changed:** `src/sites/types.ts`, `src/sites/domains.ts`, `src/sites/group.ts`, `src/sites/index.ts`, `src/lib/constants.ts`, `docs/06-codebase-map.md`, `.gitignore`, `docs/05-build-plan.md`, `PROJECT-LOG.md`, `CURSOR-LOG.md`
- **Checks:** lint ❌ exit 1 — no problems in the files above. 12 existing errors in untouched components, plus 8 `no-require-imports` errors in `scripts/baseline/*.js` from task 0.1 · build ✅ · screenshots: production capture on port 3000 into `docs/research/after-0.3` (git-ignored), compared with `scripts/baseline/compare.js`. 80 shots, no height changes. 47/80 are 0.00%. The rest are 0.01–0.16% and the diff images show only the areas the guide calls out (home hero carousel, landing motion, map tiles) plus 3D/canvas viewers (product pages, gallery dimple sheet), the brochure flame, and a few single-pixel specks. Largest: desktop `pune/expanded-metal-manufacturers` 0.16% (map). Capture statuses 200/304, deliberate 404 on the missing page. Brochure pages also logged a resource 404; the brochure diff is the flame only, so the missing asset was already missing in the baseline picture.
- **Commit:** "0.3 Add the group site config and re-export it from constants" (this entry is part of that commit — no hash needed)
- **Left to do in this task:** nothing
- **Next task:** 0.4 Theme tokens
- **Questions / assumptions:** Group `weeklyHoliday` is Thursday because the company address is the Talawade plant (the contact page lists both Thursday and Sunday). `hours` is the contact page line "9:00 AM – 6:00 PM". `titleTemplate` is `"%s"` because the root layout has no title template. `tool` is `open-area-calculator`. `leadEmail` is `shreeperforator@gmail.com` (the API's fallback today). `brandText` is the same hex as `brand`. Domain map includes `www` as well as apex, per the routing section. `getSite` throws for the six unit keys until those configs exist.

### 2026-10-11 — 0.2 Proxy rename

- **Status:** ✅ done
- **What I did:**
  - Renamed `src/middleware.ts` to `src/proxy.ts` and the exported function from `middleware` to `proxy`, following the Next.js 16 proxy file convention. The admin gate logic and the `/admin/:path*` matcher are unchanged.
- **Files changed:** `src/proxy.ts` (renamed from `src/middleware.ts`)
- **Checks:** lint ❌ exit 1, but only the 12 existing errors (plus 6 warnings) in untouched files; nothing in `src/proxy.ts` · build ✅ · screenshots match baseline n.a. · other: logged out, `HEAD http://127.0.0.1:3000/admin/dashboard` returned 307 `location: /admin/login`; `/admin/login` returned 200. The dev log for the login request shows `proxy.ts` running.
- **Commit:** `85f9286` "0.2 Rename middleware.ts to proxy.ts for Next.js 16"
- **Left to do in this task:** nothing
- **Next task:** 0.1 Baseline screenshots are still open (another session). After that, 0.3 Site config.
- **Questions / assumptions:** `docs/06-codebase-map.md` still says the admin gate lives in `src/middleware.ts`. Left it, because this task said to change nothing else. `PROJECT-LOG.md` and `docs/05-build-plan.md` already had uncommitted "no fixed dates" edits; those are not in `85f9286`.


