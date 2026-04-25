# Kevin Block — Next.js + Sanity Site

The production website for Kevin Block, Personal Training & Performance Coaching.

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Sanity CMS**. All content is editable via the embedded Sanity Studio. The site always displays content — if Sanity returns nothing, every page falls back to hardcoded German copy automatically.

---

## How It Works

### Architecture

```
Next.js (App Router, SSR)
  └── fetches content from Sanity CMS at request time
        └── falls back to hardcoded German copy if Sanity is unavailable

Sanity Studio
  └── embedded at /studio (same Next.js app, no separate deployment needed)
```

### Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Homepage — hero, services grid, editorial feature section, CTA |
| `/methode` | `src/app/methode/page.tsx` | Method page — pillars, trainer bio & quote, CTA |
| `/kontakt` | `src/app/kontakt/page.tsx` | Contact page — mailto button |
| `/studio` | `src/app/studio/` | Embedded Sanity Studio (CMS editor) |

### Data Flow

```
page.tsx
  → src/lib/site-data.ts     (calls safeFetch, applies fallbacks)
    → src/lib/sanity.client.ts   (creates the Sanity client)
      → src/lib/sanity.queries.ts   (GROQ queries + TypeScript types)
```

`safeFetch<T>(query, fallback)` in `src/lib/site-data.ts` wraps every Sanity call. If the query throws or returns empty, it returns the hardcoded fallback — the site never breaks even with no Sanity credentials.

### Sanity Schema Types

| Schema type | What it controls |
|-------------|-----------------|
| `siteChrome` | Nav brand, nav links, CTA button, footer links, footer copy |
| `homePage` | Hero text, feature section body, CTA heading/button |
| `methodPage` | Method hero, quote, bio paragraphs, CTA |
| `contactPage` | Contact hero text, email address |
| `service` | Individual service/programme cards on the homepage |
| `methodPillar` | The three method pillars on the Method page |
| `testimonial` | Client quotes used in the homepage feature section |

The Studio sidebar at `/studio` labels these in German: **Site Chrome**, **Startseite**, **Methodenseite**, **Kontaktseite**.

### Shared Components

| File | What it renders |
|------|----------------|
| `src/components/site-chrome.tsx` | `<SiteHeader>` and `<SiteFooter>` — used on every page, content comes from Sanity |
| `src/lib/sanity.image.ts` | `buildImageUrl()` helper using `@sanity/image-url` for Sanity-hosted images |

### Design System

Same editorial aesthetic as the original static site, implemented in `src/app/globals.css`:

- **Fonts:** Cormorant Garamond (light/italic) for headings, DM Sans (light) for body — loaded via `next/font/google`
- **No** box shadows, gradients, or border-radius — everything is sharp
- **Borders:** 0.5px lines only
- **Sections** separated by alternating background colors, never by lines
- All copy is in **German**
- SVG placeholder images in `public/` — replace with real photography when ready

---

## Local Development

### 1. Install dependencies

```bash
cd next-sanity-site
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

The file should look like this:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=bvfl9kqv          # already set — your project
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-24
SANITY_API_READ_TOKEN=your_sanity_read_token_here   # get this from sanity.io/manage
```

`SANITY_API_READ_TOKEN` is optional for public content. Without it the site uses Sanity's CDN cache, which works fine for published content. You only need a token to access **draft** or **private** content.

To get a read token:
1. Go to [sanity.io/manage](https://sanity.io/manage) → your project (`bvfl9kqv`)
2. **API** → **Tokens** → **Add API token**
3. Set permissions to **Viewer**
4. Paste the token into `.env.local`

### 3. Start the dev server

```bash
npm run dev
```

> **Important:** `npm run dev` automatically runs two seed scripts first (via the `predev` npm hook):
> - `scripts/ensure-sanity-dataset.mjs` — creates the `production` dataset if it doesn't exist yet
> - `scripts/seed-sanity-content.mjs` — seeds initial content into your Sanity project
>
> This means the **first** `npm run dev` will populate your Sanity project with starter content. You can re-run it manually at any time with `npm run seed:content`.

The site runs at `http://localhost:3000`. The Sanity Studio editor is at `http://localhost:3000/studio`.

---

## What Is Missing / Not Yet Done

### Features not yet built

- **Social media links** — YouTube and Instagram are not in the fallback site chrome. Real URLs need to be added via the Studio (Site Chrome → footer links).

### Real images needed

The editorial SVG placeholders in `public/` are stand-ins. Replace them with real photography when available:

| File | Used on |
|------|---------|
| `public/editorial-athlete-hero.svg` | Homepage feature section |
| `public/editorial-method-scene.svg` | Method page feature section |

Replace the SVG files in `public/` with real photography when ready.

### Missing files

- **Open Graph tags** — `src/app/layout.tsx` has basic title/description but no `og:image` for social sharing previews.
- **Favicon** — only the default Next.js `favicon.ico`. Replace with the actual brand mark.

### Unused default files (safe to delete)

These were generated by `create-next-app` and are not used:

- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

---

## Deploying to Netlify

This is a Next.js SSR app — Netlify handles it via the **Next.js Runtime** (applied automatically when it detects Next.js).

### 1. Add a `netlify.toml`

Create this file inside `next-sanity-site/`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

If the repo root is `kwvin-block/` and you're connecting the whole repo (not just `next-sanity-site/`), set the base directory in the Netlify UI to `next-sanity-site` or add `base = "next-sanity-site"` to the toml.

### 2. Set environment variables in Netlify

In the Netlify dashboard: **Site configuration → Environment variables**, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `bvfl9kqv` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-04-24` |
| `SANITY_API_READ_TOKEN` | your Sanity read token |

> Never commit `.env.local` to git. Keep real tokens only in the Netlify dashboard.

### 3. Connect your Git repository

1. Push the repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → Connect to GitHub**.
3. Select the repository and confirm the base directory is `next-sanity-site`.
4. Netlify auto-detects Next.js and fills in the build settings.
5. Deploy.

Every push to `master` triggers a new deploy automatically.

### Alternative: Deploy to Vercel (easier for Next.js)

Vercel is made by the Next.js team and requires zero configuration:

1. Push to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Set the **Root Directory** to `next-sanity-site`.
4. Add the same four environment variables.
5. Deploy.

---

## Available Scripts

Run these from inside `next-sanity-site/`:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server (seeds Sanity content first) |
| `npm run build` | Production build |
| `npm run start` | Start production server after a build |
| `npm run lint` | Run ESLint |
| `npm run seed:content` | Manually re-seed Sanity with starter content |

---

## File Structure

```
next-sanity-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Root layout — fonts, metadata
│   │   ├── page.tsx                     # Homepage (/)
│   │   ├── methode/page.tsx             # Method page (/methode)
│   │   ├── kontakt/page.tsx             # Contact page (/kontakt)
│   │   ├── studio/                      # Embedded Sanity Studio (/studio)
│   │   └── globals.css                  # All styles and CSS design tokens
│   ├── components/
│   │   └── site-chrome.tsx              # SiteHeader + SiteFooter (shared)
│   ├── lib/
│   │   ├── sanity.client.ts             # Sanity client with token handling
│   │   ├── sanity.env.ts                # Reads NEXT_PUBLIC_ env vars
│   │   ├── sanity.image.ts              # buildImageUrl() for Sanity images
│   │   ├── sanity.queries.ts            # All GROQ queries + TypeScript types
│   │   └── site-data.ts                 # Data-fetching functions + fallback content
│   └── sanity/
│       └── schemaTypes/                 # One .ts file per Sanity document type
├── scripts/
│   ├── ensure-sanity-dataset.mjs        # Creates dataset if missing (runs on predev)
│   └── seed-sanity-content.mjs          # Seeds initial content into Sanity
├── public/
│   ├── editorial-athlete-hero.svg       # Placeholder — replace with real image
│   └── editorial-method-scene.svg       # Placeholder — replace with real image
├── sanity.config.ts                     # Sanity Studio structure + schema config
├── sanity.cli.ts                        # Sanity CLI config (project ID, dataset)
├── next.config.ts                       # Next.js config (allows cdn.sanity.io images)
├── .env.example                         # Environment variable template
├── .env.local                           # Your local secrets (do not commit)
└── package.json
```
