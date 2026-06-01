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

## Deploy (Vercel)

1. Import this repo on [Vercel](https://vercel.com)
2. Framework: **Vite**
3. Build: `npm run build` · Output: `dist`
4. `vercel.json` handles client-side routing

## Deploy (Cloudflare Pages / Netlify)

- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback: all routes → `/index.html`

## Accent styling toggle

Set `STORE_COLOR_ENHANCEMENTS = false` in `src/store-site/accent.ts` to revert gold accents.
