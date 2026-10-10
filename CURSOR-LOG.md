# Cursor Log

Cursor's own work diary for the Jai Shree Group multi-site build. **Cursor writes here at the end of every task**, so anyone (Rahul, or Claude when asked "what is done and what is left") can read exactly what happened without opening the code.

## Rules for Cursor

1. **Add an entry at the end of every task or chat that changed anything** — code, docs, files, config, database. Newest entry at the top, under "Entries".
2. Use the template below exactly. Be specific: name the files, say what changed and why.
3. Be honest about checks. If lint or build failed, or you skipped them, say so. If something is half done, mark it 🔄 and say what is missing.
4. After writing the entry here, also:
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
- **Commit:** `<short hash>` "<message>" (or "not committed")
- **Left to do in this task:** … (or "nothing")
- **Next task:** <number and name>
- **Questions / assumptions:** … (or "none")
```

---

## Entries

_No entries yet. Building starts at Step 0 / Phase 0 in `docs/05-build-plan.md`._
