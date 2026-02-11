# modelfailure.com

Static Astro site for AI security writings, audits, tools, and research.

## Local Development

Prerequisites:

- Node.js `>=18.20.8` (Node 20 recommended)
- npm

Commands:

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run check`

## Deploy to Cloudflare Pages

1. In Cloudflare Dashboard, go to `Workers & Pages` -> `Create` -> `Pages` -> `Connect to Git`.
2. Select repo: `kwal0203/model-failure`.
3. Configure build:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add environment variable:
   - `NODE_VERSION=20`
5. Set production branch to `main`.
6. Deploy.

## Custom Domain

This project is configured with:

- `site: https://modelfailure.com` in `astro.config.mjs`

If you want to serve from `www.modelfailure.com` as canonical:

1. In Cloudflare Pages project, open `Custom domains`.
2. Add `www.modelfailure.com`.
3. In DNS, create/update:
   - `CNAME` record for `www` pointing to your Cloudflare Pages hostname (shown in the Pages UI).
4. Decide canonical host:
   - Option A: canonical `www.modelfailure.com` and redirect apex `modelfailure.com` -> `www.modelfailure.com`
   - Option B: canonical apex `modelfailure.com` and redirect `www` -> apex
5. Keep `astro.config.mjs` `site` URL aligned to the canonical host for correct canonical tags, RSS, and sitemap URLs.

## Notes

- Pre-commit runs `lint-staged` via Husky.
- The site is static only (no backend, auth, or database).
