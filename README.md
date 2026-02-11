# Model Failure

Model Failure is a static Astro site for defensive AI security publishing.

## Focus

- Writings: short failure notes and checklists
- Audits: structured security review reports
- Tools: red-team and evaluation tooling pages
- Research: publications and paper reviews

## Stack

- Astro (static output)
- Markdown/MDX content collections with Zod validation
- Tailwind CSS
- RSS + sitemap
- Cloudflare Pages target deployment

## Required Routes

- `/writings`
- `/audits`
- `/tools`
- `/research`
- `/research/publications`
- `/research/reviews`
- `/about`
- `/disclosure`
- `/scope`

## Content Collections

Defined in `src/content/config.ts`:

- `writings`
- `audits`
- `tools`
- `publications`
- `paper_reviews`

Content lives under `src/content/<collection>/`.

## Local Development

```bash
# use Node 20 with nvm
source "$HOME/.nvm/nvm.sh"
nvm use 20

npm install
npm run dev
```

## Checks

```bash
npm run check
npm run build
```

## Git Workflow

Follow `AGENTS.md`:

1. Create feature branch: `git checkout -b feature/<short-description>`
2. Make changes
3. Commit with conventional type prefix (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`)
4. Merge back into `main`

## Pre-commit Hook

Repository hooks are configured under `.githooks/`.

- Prettier runs on staged markdown/json/yaml/css/html files
- Biome runs on staged js/ts/astro/json files

Enable locally (already configured in this repo):

```bash
git config core.hooksPath .githooks
```

## Notes

- The site is static-only: no backend, auth, or database.
- Keep content defensive and reproducible; avoid weaponized exploit detail.
