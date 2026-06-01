# The Curator — Launch Countdown

Standalone coming-soon / store listing site for **The Curator**.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Coming soon + app preview |
| `/privacy` | Privacy policy (App Store / Play) |
| `/terms` | Terms of use |
| `/support` | Support contact |

## Local dev

```bash
npm install
npm run dev
```

## Deploy (Cloudflare) — free

Your Cloudflare project settings should be:

| Setting | Value |
|---------|--------|
| Root directory | `/` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Build output | `dist` (handled by `wrangler.jsonc`) |
| Environment variables | none |

**Do not** add a custom `_redirects` file — SPA routing is handled by `wrangler.jsonc` (`not_found_handling: single-page-application`). A `_redirects` rule causes an infinite-loop deploy error.

After pushing, trigger **Retry deployment** in the Cloudflare dashboard.

### Alternative: Cloudflare Pages (Git only)

If you use **Pages** instead of Workers deploy, leave **Deploy command empty** and set output directory to `dist`. Pages serves static files without Wrangler.

## Deploy (Vercel)

1. Import this repo on [Vercel](https://vercel.com)
2. Framework: **Vite**
3. Build: `npm run build` · Output: `dist`
4. `vercel.json` handles client-side routing

## Accent styling toggle

Set `STORE_COLOR_ENHANCEMENTS = false` in `src/store-site/accent.ts` to revert gold accents.
