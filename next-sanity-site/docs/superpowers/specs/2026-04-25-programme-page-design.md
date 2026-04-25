# Programme Page — Design Spec

**Date:** 2026-04-25  
**Status:** Approved

---

## Overview

Add a dedicated `/programme` page to the Kevin Block Next.js + Sanity site. The page lists three standalone coaching programs, each with a name, description, price, duration, inclusions list, and a booking CTA. No tier breakdown (no Essential/Premium/VIP) — each program is its own offering.

---

## Data Model

### New Sanity schema: `programType`

A repeatable document type (not a singleton). Fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `number` | string | no | "01", "02", "03" — display label |
| `name` | string | yes | Program title |
| `description` | text | yes | Short program description |
| `price` | string | no | e.g. "€ 649" — stored as string to allow "Auf Anfrage" |
| `duration` | string | no | e.g. "12 Wochen" |
| `includes` | array of string | no | Bullet list items (inclusions) |
| `ctaHref` | url | no | Booking link; falls back to `/kontakt` |
| `order` | number | no | Sort order |

### New Sanity query: `programsQuery`

GROQ: fetch all `programType` documents, ordered by `order` ascending.

---

## New Page: `/programme`

**File:** `src/app/programme/page.tsx`

### Sections (top to bottom)

1. **Page header** — uses existing `.page-header-block.page-header-centered` pattern  
   - Eyebrow: from Sanity `programmePage` singleton or hardcoded fallback `"Programme"`  
   - H1: e.g. `"Strukturiert. Individuell. Wirksam."`  
   - Subtitle: short description  
   - Vertical divider (`.vertical-divider`)

2. **Programme list** — `.section-block` with `background: var(--surface-lowest)`  
   - Stacked `<article>` rows, each bordered top with `var(--border-dark)`  
   - 2-column grid: left = copy, right = detail panel  
   - **Left column:** large linen number, H2 name, secondary-color description  
   - **Right column:** bordered panel (`border: var(--border-dark)`) containing:
     - Price (serif italic, ~2.4rem) + Duration (small-caps) side by side, separated by border-bottom
     - Inclusions list (em-dash prefix, secondary color)
     - `btn btn-secondary` "Jetzt buchen" link → `ctaHref` or `/kontakt`

3. **CTA block** — `.cta-block.cta-block-dark.section-block`  
   - Eyebrow, H2, `btn btn-inverted` button → `/kontakt`  
   - Content comes from a new `programmePage` singleton or hardcoded fallback

### Fallback content

Three hardcoded programs used when Sanity returns nothing:

| # | Name | Price | Duration |
|---|---|---|---|
| 01 | Strength Foundation | € 649 | 12 Wochen |
| 02 | Performance Block | € 899 | 12 Wochen |
| 03 | Editorial Athlete | € 1.799 | 24 Wochen |

---

## New Singleton: `programmePageType`

Controls page-level copy. Same pattern as `homePageType`. Fields:

| Field | Type | Fallback |
|---|---|---|
| `heroEyebrow` | string | `"Programme"` |
| `heroHeading` | string | `"Strukturiert. Individuell. Wirksam."` |
| `heroSubtitle` | text | `"Drei Programme — jedes auf ein klares Ziel ausgerichtet."` |
| `ctaHeading` | string | `"Nicht sicher, welches Programm passt?"` |
| `ctaButtonLabel` | string | `"Kostenlose Beratung buchen"` |
| `ctaButtonHref` | string | `"/kontakt"` |

---

## Data Fetching

New function `getProgrammeContent()` in `src/lib/site-data.ts`:
- Fetches `programsQuery` + `programmePageQuery`
- Returns `{ settings, programs }` with hardcoded fallbacks
- Follows the existing `safeFetch()` pattern

---

## Navigation Update

The site chrome already has a "Programme" nav item pointing to `/#leistungen`. This needs to be updated to point to `/programme` instead. Update the fallback nav in `site-data.ts`.

---

## CSS

New classes needed in `globals.css`:

```css
.programme-section { background: var(--surface-lowest); }
.programme-list { display: flex; flex-direction: column; }
.programme-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
  padding-top: 56px;
  padding-bottom: 56px;
  border-top: var(--border-dark);
}
.programme-item:last-child { border-bottom: var(--border-dark); }
.programme-number {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-style: italic;
  color: var(--linen);
  line-height: 1;
  margin-bottom: 18px;
}
.programme-detail {
  border: var(--border-dark);
  background: var(--surface);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.detail-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 18px;
  border-bottom: var(--border-dark);
}
.detail-price {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 2.4rem;
  font-weight: 300;
  line-height: 1;
}
.detail-duration {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--secondary);
}
.detail-includes { display: flex; flex-direction: column; gap: 6px; }
.detail-includes li {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--secondary);
  padding-left: 16px;
  position: relative;
}
.detail-includes li::before { content: "—"; position: absolute; left: 0; color: var(--linen); }
```

Responsive: at ≤900px, `.programme-item` collapses to single column (same breakpoint as `.services-grid`).

---

## Files to Create / Modify

| Action | File |
|---|---|
| Create | `src/sanity/schemaTypes/programType.ts` |
| Create | `src/sanity/schemaTypes/programmePageType.ts` |
| Modify | `src/sanity/schemaTypes/index.ts` — add new types |
| Create | `src/app/programme/page.tsx` |
| Modify | `src/lib/sanity.queries.ts` — add queries + types |
| Modify | `src/lib/site-data.ts` — add `getProgrammeContent()`, update nav fallback |
| Modify | `src/app/globals.css` — add programme CSS classes |
