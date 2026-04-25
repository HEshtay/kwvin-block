# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Kevin Block**, a German-language personal training and performance coaching brand. No build step, no package manager, no framework — plain HTML, CSS, and vanilla JS served directly from files.

## Development

Open any `.html` file directly in a browser, or use a local static server:

```bash
npx serve .
# or
python -m http.server 8080
```

There are no lint, test, or build commands.

## Architecture

### Pages & Script Dependencies

Each page loads scripts in this fixed order (order matters — globals must exist before use):

```
config.js → utils.js → airtable.js → [page-specific JS]
```

| Page | Page-specific script |
|------|----------------------|
| `index.html` | `home.js` + `newsletter.js` |
| `methode.html` | `methode.js` |

### Data Layer (Airtable)

`js/config.js` holds `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID` (fill in before use).

`js/airtable.js` exports a single async function `fetchRecords(tableName)` that returns an array of Airtable record objects (each with a `.fields` property).

**Required Airtable tables:**

| Table | Key fields |
|-------|-----------|
| `Services` | Name, Number, Description, Order |
| `Testimonials` | Quote, Author, Order |
| `Method_Pillars` | Name, Number, Description, Order |

Every page-specific JS module provides static **fallback content** rendered when Airtable returns no records (no credentials configured, network error, etc.). This means pages always display something meaningful without live data.

### Shared Utilities (`js/utils.js`)

- `escapeHTML(str)` — sanitize all Airtable field values before inserting into innerHTML
- `isValidImageURL(url)` — validates image URLs before rendering `<img>` tags

All dynamic HTML rendering must use `escapeHTML()` on user-sourced data.

### CSS Design System

CSS custom properties in `:root` (defined in `css/style.css`) encode the full design token set. Key constraints from `design/DESIGN.md`:

- **No box shadows, no gradients, no border-radius** — all corners are sharp (0px)
- **Borders:** always `0.5px solid` using `--border-dark` or `--border-light`
- **Section separation:** alternate background colors (`--surface-lowest` → `--surface` → `--surface-container`), never horizontal rules or lines
- **Typography:** `--font-serif` (Cormorant Garamond, italic) for H1/H2; `--font-sans` (DM Sans, light) for body and navigation (small caps for nav)
- **No icons** — use text labels or small-caps words instead

### Content-Security-Policy

`index.html` defines a strict CSP via `<meta http-equiv>`. If adding new external resources (fonts, scripts, APIs), update the CSP to whitelist them. Current allowlist: `fonts.googleapis.com`, `fonts.gstatic.com`, `api.airtable.com`.

### Language

All UI copy is in German (`lang="de"`). Keep all user-visible strings in German.
