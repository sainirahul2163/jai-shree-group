# Docs index

Single source of truth for the Jai Shree Group multi-site build. Last aligned: 2026-10-10.

Start with [`../PROJECT-LOG.md`](../PROJECT-LOG.md): the goal, what is required, current status, and the log of every change.

If a doc and the code disagree, the code is the truth for *how things work today*, and these docs are the truth for *what we are building*. Fix whichever is wrong and note it in `decisions.md`.

| File | What it answers | Read when |
| --- | --- | --- |
| [01-brief.md](01-brief.md) | Why we are building seven sites, scope, what is out of scope | First |
| [02-business-facts.md](02-business-facts.md) | Company facts, the 6 units, products, discontinued products, client rules | Before writing any copy |
| [03-sites.md](03-sites.md) | Each site: unit, domain, products, buyers, signature tool, theme, pages | Before building a site |
| [04-architecture.md](04-architecture.md) | One app, many domains: routing, `SiteConfig`, theming, data, leads, env | Before touching structure |
| [05-build-plan.md](05-build-plan.md) | Phases, ordered tasks, acceptance checks | Every work session |
| [06-codebase-map.md](06-codebase-map.md) | Where things live today, hard-coded hotspots, known issues | Before refactoring |
| [07-seo-rules.md](07-seo-rules.md) | Duplicate content, canonicals, legacy redirects, Search Console | Before writing pages or redirects |
| [08-content-checklist.md](08-content-checklist.md) | Content and assets each site needs, and who provides them | Before starting a site |
| [decisions.md](decisions.md) | Dated log of decisions and assumptions | When unsure why something is the way it is |
| [client/answers-2026-10-07.md](client/answers-2026-10-07.md) | The client's approved answers: unit focus, products per unit, names, contacts, holidays | Final word on business facts |
| [client/](client/) | Proposal PDF, questionnaire, and the client's filled-in answers (.docx) | Reference |
| [research/legacy-sites.md](research/legacy-sites.md) | What we found on the group's existing unit websites | Before migrating sites 1 and 2 |
| [prompts/coordinator.md](prompts/coordinator.md) | How Claude runs the Cursor build loop: authorisations, loop steps, checks, go-live procedure, lessons learned | Start of every coordinator session |
| [prompts/](prompts/) | One Cursor prompt per task (`task-<n>.md`) | When starting a task |
| [archive/](archive/) | Older docs from the single-site build (June 2026) | Reference only — may be out of date |

The client-facing version of the plan is the Claude doc "Jai Shree Group — Multi-Site Digital Plan" (https://claude.ai/code/artifact/7ecf8ef1-4bd6-4dcc-80e8-f868002c814b). These files are the developer version and go into more detail.
