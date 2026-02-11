# AGENTS.md — Modelfailure.com Agent Playbook

This file is the “single source of truth” for coding agents (Codex) and humans working on this repo.
Read this first. Follow it exactly unless a maintainer says otherwise.

---

## 0) Mission

Build and maintain **modelfailure.com**: a fast, minimal, Markdown-first public site for AI security work:

- Writings (failure notes)
- Audits (structured security review reports)
- Tools (red-teaming / evaluation tools)
- Research (my publications + paper reviews)

Primary objective: **publish weekly with low friction** and high credibility (reproducible, evidence-first).

---

## 1) Non-negotiables

- **Static site only** (no backend, no database, no auth).
- **Markdown-first** content (MD/MDX) using **Astro content collections** with schema validation.
- Keep dependencies minimal. Prefer built-in Astro patterns.
- Prioritize readability and speed over visual complexity.
- Do not add tracking/analytics unless explicitly requested.

---

## 2) Stack & Deploy

- Framework: **Astro**
- Content: Markdown/MDX + Astro content collections
- Hosting: **Cloudflare Pages**
- Repo: **GitHub**
- Branch: `main`

---

## 3) Repo layout (expected)

- `src/pages/` — route pages
- `src/layouts/` — layouts
- `src/components/` — UI components
- `src/content/` — content collections
  - `src/content/config.ts` — Zod schemas for collections
  - `src/content/writings/*.md`
  - `src/content/audits/*.md`
  - `src/content/tools/*.md`
  - `src/content/publications/*.md`
  - `src/content/paper_reviews/*.md`
- `public/` — static assets (images, robots.txt, etc.)

---

## 4) Content collections (required)

All content types must be defined as Astro content collections with schema validation in `src/content/config.ts`.

Collections:

- `writings`
- `audits`
- `tools`
- `publications`
- `paper_reviews`

Frontmatter must match schema. If schema needs to change, update:

1. `src/content/config.ts`
2. any templates/examples
3. any listing pages that assume specific fields

---

## 5) UX / Site requirements

- Clear top navigation:
  - `/writings`
  - `/audits`
  - `/tools`
  - `/research` (landing)
  - `/about`
  - `/disclosure` (Responsible Disclosure)
  - `/scope` (Scope & Safety)

- Research subsections:
  - `/research/publications`
  - `/research/reviews`

- All list pages sorted newest-first (or year-desc for publications).
- Each detail page should show: title, date/year, topics/tags, relevant links.
- SEO basics on every page:
  - title
  - meta description
  - canonical URL
  - OpenGraph/Twitter metadata

- Provide:
  - RSS feed (at least writings + audits + tools + paper_reviews)
  - sitemap
  - 404 page

---

## 6) Quality gates

Before opening a PR, ensure:

- `npm run build` passes
- `npm run check` passes (if configured)
- formatting/lint hooks pass (pre-commit)

CI should run:

- `npm ci`
- `npm run build`
- `npm run check` (if configured)

---

## 7) Git workflow (required)

Use a short-lived feature branch for every change.

1. Create new git branch:
   - `git checkout -b feature/<short-description>`

2. Checkout new git branch:
   - (already on it after the command above)
   - confirm with `git status`

3. Make changes.

4. Commit changes:
   - `git add -A`
   - `git commit -m "<type>: <summary>"`
   - Example: `git commit -m "fix: resolve pre-commit formatting errors"`

   Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
   Examples:
   - `feat: add research section landing page`
   - `fix: correct rss feed ordering`
   - `docs: add audit template`

5. Checkout main:
   - `git checkout main`

6. Merge feature branch with main:
   - `git merge <branch>`

7. Delete local feature branch:

- `git branch -d feature/<short-description>`
- If needed: `git branch -D feature/<short-description>`

---

## 8) Pre-commit hooks (recommended)

Hooks should be **fast** and operate on staged files.

Recommended:

- `prettier --write` on MD/MDX/JSON/YAML/CSS/etc.
- `eslint --fix` on JS/TS/Astro (if ESLint is configured)

Do NOT run slow checks (full build) on pre-commit.
Run slow checks in CI (and optionally pre-push).

---

## 9) “Agent operating procedure” (Codex)

When asked to make changes:

1. Read `SPEC.md` (if present), `CONTENT_MODELS.md` (if present), and this file.
2. Propose a plan:
   - file tree changes
   - new/updated routes
   - schema changes
   - scripts/hooks changes
3. Implement in small, logical commits.
4. Ensure `npm run build` passes.
5. Update README if developer workflow changes.

Agents MUST:

- Avoid introducing unnecessary dependencies.
- Avoid inventing product requirements not stated in specs.
- Prefer simple, explicit code over clever abstractions.

---

## 10) Content safety / disclosure

This site focuses on **defensive, reproducible evaluation** and mitigations.
Do not publish weaponized exploit chains or detailed instructions that enable wrongdoing.
When in doubt, include:

- minimal safe repro steps
- mitigation guidance
- responsible disclosure language
  and omit operational exploitation details.

---

## 11) Definition of done (for a PR)

A PR is “done” when:

- it satisfies the stated requirements/spec
- it includes any needed templates/examples
- it passes build + checks
- it keeps the site minimal, readable, and fast
