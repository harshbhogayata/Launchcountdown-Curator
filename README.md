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

## Deploy (Cloudflare Pages) — free

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Choose **Launchcountdown-Curator** from GitHub
3. Build settings:

| Setting | Value |
|---------|--------|
| Production branch | `main` |
| Framework preset | Vite (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |

4. **Deploy site** — no env vars needed for the launch page
5. **Custom domain** (optional): Pages → your project → **Custom domains** → add e.g. `thecurator.com`

`public/_redirects` is included so `/privacy`, `/terms`, and `/support` work on refresh.

**Free tier includes:** unlimited static requests, global CDN, HTTPS, and one Pages project on the free plan (generous bandwidth for a launch site).

## Deploy (Vercel)

1. Import this repo on [Vercel](https://vercel.com)
2. Framework: **Vite**
3. Build: `npm run build` · Output: `dist`
4. `vercel.json` handles client-side routing

## Accent styling toggle

Set `STORE_COLOR_ENHANCEMENTS = false` in `src/store-site/accent.ts` to revert gold accents.
