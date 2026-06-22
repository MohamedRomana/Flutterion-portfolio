# Mohamed Romana — Flutter Developer Portfolio

> **Performance in Motion** — a premium portfolio for **Mohamed Romana**, Flutter Developer.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion for React, and lucide-react.
Dark mode by default, light mode toggle (persisted), 12 real Flutter projects with dedicated case studies.

## Tech stack

- **Next.js 16** (App Router, Server Components, SSG)
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first theme tokens)
- **Motion for React** (animations, respects `prefers-reduced-motion`)
- **lucide-react** (icons)

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (static export of all routes)
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
src/
  app/                 # routes, metadata, sitemap, robots, manifest, 404
    projects/[slug]/   # dynamic case-study pages (SSG)
  components/
    layout/            # Navbar, Footer
    providers/         # ThemeProvider (useSyncExternalStore)
    sections/          # home + case-study sections
    ui/                # reusable primitives (Button, Reveal, PhoneFrame, …)
  data/                # ALL editable content (profile, projects, skills, …)
  hooks/               # useMediaQuery / useIsDesktop
  lib/                 # cn() helper
  types/               # shared content types
public/
  logo.png             # supplied logo asset
  projects/<slug>/*.jpg# real app screenshots
```

## Editing content

All copy lives in `src/data/`. Search for `TODO` to find editable placeholders:

- **Project store links** (`src/data/projects.ts`) use `"#"` placeholders — replace with real
  App Store / Google Play URLs.
- **LinkedIn URL** (`src/data/profile.ts`) is a placeholder — replace with the real profile URL.
- **Naji Restaurant** has `needsContentReview: true` and shows a "Draft content" badge — its copy is
  not from the CV and must be confirmed.
- **AdEC Request** is marked `isPrivate: true` (government / NDA) and intentionally has no public links.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — framework auto-detects as **Next.js**.
3. No env vars required. Click **Deploy**.
4. Update `SITE_URL` in `src/app/layout.tsx`, `sitemap.ts`, and `robots.ts` to your real domain.

Or via CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```
