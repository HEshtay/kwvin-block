# Programme Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/programme` page that lists three coaching programs from Sanity, each with name, description, price, duration, inclusions, and a booking CTA.

**Architecture:** New `programType` and `programmePageType` Sanity schemas feed a new async server component at `src/app/programme/page.tsx`. Data fetching follows the existing `safeFetch` + hardcoded-fallback pattern in `site-data.ts`. CSS follows the existing design token system in `globals.css`.

**Tech Stack:** Next.js 16 (App Router, async server components), Sanity v5 + GROQ, TypeScript, plain CSS with custom properties.

> **Note:** This codebase has no test framework. Verification is via TypeScript (`tsc --noEmit`) and the dev server (`npm run dev`).

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `src/sanity/schemaTypes/programType.ts` | Sanity schema for a single program document |
| Create | `src/sanity/schemaTypes/programmePageType.ts` | Sanity schema for the programme page singleton |
| Modify | `src/sanity/schemaTypes/index.ts` | Register both new schema types |
| Modify | `src/lib/sanity.queries.ts` | Add `Program`, `ProgrammePageSettings` types + GROQ queries |
| Modify | `src/lib/site-data.ts` | Add `getProgrammeContent()`, update nav fallback href |
| Modify | `src/app/globals.css` | Add `.programme-*` and `.detail-*` CSS classes |
| Create | `src/app/programme/page.tsx` | The `/programme` page component |

---

### Task 1: Sanity schema — `programType`

**Files:**
- Create: `src/sanity/schemaTypes/programType.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/sanity/schemaTypes/programType.ts
import { defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Programme",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Nummer",
      type: "string",
      description: 'Optional, z. B. "01"',
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: "name",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10).max(400),
    }),
    defineField({
      name: "price",
      title: "Preis",
      type: "string",
      description: 'Z. B. "€ 649" oder "Auf Anfrage"',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "duration",
      title: "Dauer",
      type: "string",
      description: 'Z. B. "12 Wochen"',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "includes",
      title: "Leistungen",
      type: "array",
      of: [{ type: "string" }],
      description: "Aufzählungspunkte (Leistungsumfang)",
    }),
    defineField({
      name: "ctaHref",
      title: "Buchungs-Link",
      type: "url",
      description: 'Optional. Standard: "/kontakt"',
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "number",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Nr. ${subtitle}` : "Programm",
      };
    },
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd next-sanity-site && npx tsc --noEmit
```

Expected: no errors related to `programType.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemaTypes/programType.ts
git commit -m "feat: add programType Sanity schema"
```

---

### Task 2: Sanity schema — `programmePageType`

**Files:**
- Create: `src/sanity/schemaTypes/programmePageType.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/sanity/schemaTypes/programmePageType.ts
import { defineField, defineType } from "sanity";

export const programmePageType = defineType({
  name: "programmePage",
  title: "Programme-Seite",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "heroHeading",
      title: "Überschrift",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Untertitel",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA-Überschrift",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA-Button Text",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "ctaButtonHref",
      title: "CTA-Button Link",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Programme-Seite" };
    },
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemaTypes/programmePageType.ts
git commit -m "feat: add programmePageType Sanity schema"
```

---

### Task 3: Register schemas in `index.ts`

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1: Update the file**

Replace the entire file with:

```typescript
// src/sanity/schemaTypes/index.ts
import { contactPageType } from "./contactPageType";
import { homePageType } from "./homePageType";
import { methodPageType } from "./methodPageType";
import { methodPillarType } from "./methodPillarType";
import { programmePageType } from "./programmePageType";
import { programType } from "./programType";
import { serviceType } from "./serviceType";
import { siteChromeType } from "./siteChromeType";
import { testimonialType } from "./testimonialType";

export const schemaTypes = [
  siteChromeType,
  homePageType,
  methodPageType,
  programmePageType,
  contactPageType,
  serviceType,
  testimonialType,
  methodPillarType,
  programType,
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemaTypes/index.ts
git commit -m "feat: register programType and programmePageType schemas"
```

---

### Task 4: Add types and GROQ queries to `sanity.queries.ts`

**Files:**
- Modify: `src/lib/sanity.queries.ts`

- [ ] **Step 1: Append to the end of the file**

Add the following after the last export in `src/lib/sanity.queries.ts`:

```typescript
export type Program = {
  _id: string;
  number?: string;
  name: string;
  description?: string;
  price?: string;
  duration?: string;
  includes?: string[];
  ctaHref?: string;
  order?: number;
};

export type ProgrammePageSettings = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubtitle?: string;
  ctaHeading?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
};

export const programsQuery = groq`
  *[_type == "program"] | order(coalesce(order, 999) asc) {
    _id,
    name,
    number,
    description,
    price,
    duration,
    includes,
    ctaHref,
    order
  }
`;

export const programmePageQuery = groq`
  *[_type == "programmePage"][0] {
    heroEyebrow,
    heroHeading,
    heroSubtitle,
    ctaHeading,
    ctaButtonLabel,
    ctaButtonHref
  }
`;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/sanity.queries.ts
git commit -m "feat: add Program types and GROQ queries for programme page"
```

---

### Task 5: Add data fetching and update nav fallback in `site-data.ts`

**Files:**
- Modify: `src/lib/site-data.ts`

- [ ] **Step 1: Add the new imports at the top of the import block**

Change the import from `@/lib/sanity.queries` to include the new exports. The full import block becomes:

```typescript
import { sanityClient } from "@/lib/sanity.client";
import {
  contactPageQuery,
  homePageQuery,
  methodPageQuery,
  methodPillarsQuery,
  programmePageQuery,
  programsQuery,
  servicesQuery,
  siteChromeQuery,
  testimonialsQuery,
  type ContactPageSettings,
  type HomePageSettings,
  type MethodPageSettings,
  type MethodPillar,
  type Program,
  type ProgrammePageSettings,
  type Service,
  type SiteChromeSettings,
  type Testimonial,
} from "@/lib/sanity.queries";
```

- [ ] **Step 2: Update the nav fallback href for "Programme"**

In `fallbackSiteChromeSettings`, change `href: "/#leistungen"` to `href: "/programme"`:

```typescript
const fallbackSiteChromeSettings: SiteChromeSettings = {
  brand: "Kevin Block",
  navAriaLabel: "Hauptnavigation",
  navItems: [
    { key: "home", href: "/programme", label: "Programme" },
    { key: "methode", href: "/methode", label: "Die Methode" },
    { key: "about", href: "/methode#ueber-mich", label: "Über mich" },
  ],
  navCtaLabel: "Beratung buchen",
  navCtaHref: "/kontakt",
  footerAriaLabel: "Fußnavigation",
  footerLinks: [
    { href: "/methode", label: "Methode" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  footerCopy: "© 2026 Kevin Block. Alle Rechte vorbehalten.",
};
```

- [ ] **Step 3: Add fallback data for programmes**

Add these two constants after `fallbackContactPageSettings`:

```typescript
const fallbackPrograms: Program[] = [
  {
    _id: "fallback-program-1",
    number: "01",
    name: "Strength Foundation",
    description:
      "Aufbau von Grundkraft und Körperstruktur. Ideal für Einsteiger und Wiedereinsteiger, die systematisch Fortschritte erzielen wollen.",
    price: "€ 649",
    duration: "12 Wochen",
    includes: [
      "Individueller Trainingsplan",
      "Ernährungsleitfaden",
      "2× Check-in pro Woche",
      "Video-Analyse der Ausführung",
    ],
    ctaHref: "/kontakt",
    order: 1,
  },
  {
    _id: "fallback-program-2",
    number: "02",
    name: "Performance Block",
    description:
      "Für Fortgeschrittene, die gezielt an Leistungsgrenzen arbeiten — Athletik, Kondition und mentale Stärke kombiniert.",
    price: "€ 899",
    duration: "12 Wochen",
    includes: [
      "Athletik- und Kraftplan",
      "Ernährungsstrategie",
      "3× Check-in pro Woche",
      "Video-Analyse",
      "Performance-Tracking",
    ],
    ctaHref: "/kontakt",
    order: 2,
  },
  {
    _id: "fallback-program-3",
    number: "03",
    name: "Editorial Athlete",
    description:
      "Das Rundum-Paket für ambitionierte Klienten, die Körper, Geist und Leistung ganzheitlich entwickeln wollen.",
    price: "€ 1.799",
    duration: "24 Wochen",
    includes: [
      "Vollständige 1:1-Betreuung",
      "Ernährungs- und Lifestyle-Plan",
      "Täglicher Support",
      "Wöchentliche Video-Calls",
      "Video-Analyse",
      "Priority Access",
    ],
    ctaHref: "/kontakt",
    order: 3,
  },
];

const fallbackProgrammePageSettings: ProgrammePageSettings = {
  heroEyebrow: "Programme",
  heroHeading: "Strukturiert. Individuell. Wirksam.",
  heroSubtitle:
    "Drei Programme — jedes auf ein klares Ziel ausgerichtet. Wähle das, das zu dir passt.",
  ctaHeading: "Nicht sicher, welches Programm passt?",
  ctaButtonLabel: "Kostenlose Beratung buchen",
  ctaButtonHref: "/kontakt",
};
```

- [ ] **Step 4: Add `getProgrammeContent()` at the bottom of the file**

```typescript
export async function getProgrammeContent() {
  const [settings, programs] = await Promise.all([
    safeFetch<ProgrammePageSettings>(
      programmePageQuery,
      fallbackProgrammePageSettings,
    ),
    safeFetch<Program[]>(programsQuery, fallbackPrograms),
  ]);

  return { settings, programs };
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/site-data.ts
git commit -m "feat: add getProgrammeContent and update nav fallback to /programme"
```

---

### Task 6: Add CSS classes to `globals.css`

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append the new classes at the end of the file, before the first `@media` block**

Find the line `@media (max-width: 1100px)` and insert the following block immediately before it:

```css
/* Programme page */
.programme-section {
  background: var(--surface-lowest);
}

.programme-list {
  display: flex;
  flex-direction: column;
}

.programme-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
  padding-top: 56px;
  padding-bottom: 56px;
  border-top: var(--border-dark);
}

.programme-item:last-child {
  border-bottom: var(--border-dark);
}

.programme-number {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-style: italic;
  color: var(--linen);
  line-height: 1;
  margin-bottom: 18px;
}

.programme-name {
  margin-bottom: 16px;
}

.programme-desc {
  color: var(--secondary);
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

.detail-includes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-includes li {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--secondary);
  padding-left: 16px;
  position: relative;
}

.detail-includes li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--linen);
}
```

- [ ] **Step 2: Add responsive rule inside the `@media (max-width: 900px)` block**

Inside the existing `@media (max-width: 900px)` block, after the last rule, add:

```css
  .programme-item {
    grid-template-columns: 1fr;
    gap: 32px;
  }
```

- [ ] **Step 3: Start dev server and visually verify no layout regressions on existing pages**

```bash
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/methode — confirm they look unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add programme and detail CSS classes"
```

---

### Task 7: Create the `/programme` page component

**Files:**
- Create: `src/app/programme/page.tsx`

- [ ] **Step 1: Create the directory and file**

```typescript
// src/app/programme/page.tsx
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getProgrammeContent } from "@/lib/site-data";

export default async function ProgrammePage() {
  const { settings, programs } = await getProgrammeContent();

  return (
    <div className="page-shell">
      <SiteHeader active="programme" />

      <main className="page-main">
        <section className="page-header-block page-header-centered">
          <div className="page-header-inner">
            {settings.heroEyebrow && (
              <span className="eyebrow">{settings.heroEyebrow}</span>
            )}
            <h1>{settings.heroHeading}</h1>
            {settings.heroSubtitle && (
              <p className="page-subtitle">{settings.heroSubtitle}</p>
            )}
            <div className="vertical-divider" aria-hidden="true" />
          </div>
        </section>

        <section className="section-block programme-section">
          <div className="section-inner">
            <div className="programme-list">
              {programs.map((program, index) => (
                <article key={program._id} className="programme-item">
                  <div className="programme-left">
                    <div className="programme-number">
                      {program.number || String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="programme-name">{program.name}</h2>
                    {program.description && (
                      <p className="programme-desc">{program.description}</p>
                    )}
                  </div>

                  <div className="programme-detail">
                    {(program.price || program.duration) && (
                      <div className="detail-meta">
                        {program.price && (
                          <span className="detail-price">{program.price}</span>
                        )}
                        {program.duration && (
                          <span className="detail-duration">
                            {program.duration}
                          </span>
                        )}
                      </div>
                    )}

                    {program.includes && program.includes.length > 0 && (
                      <ul className="detail-includes">
                        {program.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={program.ctaHref || "/kontakt"}
                      className="btn btn-secondary"
                    >
                      Jetzt buchen
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block cta-block cta-block-dark">
          <div className="cta-inner">
            <h2>{settings.ctaHeading}</h2>
            <div className="hero-actions">
              <Link
                href={settings.ctaButtonHref || "/kontakt"}
                className="btn btn-inverted"
              >
                {settings.ctaButtonLabel || "Kostenlose Beratung buchen"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 2: Fix the TypeScript error in `SiteHeader` — `active` type does not include `"programme"`**

Open `src/components/site-chrome.tsx` and update the `ActivePage` type:

```typescript
type ActivePage = "home" | "methode" | "kontakt" | "programme";
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Open the page in the browser**

With `npm run dev` still running, open http://localhost:3000/programme

Verify:
- Hero section renders with eyebrow, H1, subtitle, and vertical divider
- Three program rows appear, each with number, name, description on the left
- Each row has a detail panel on the right with price, duration, inclusions list, and "Jetzt buchen" button
- CTA dark section at the bottom renders correctly
- Header "Programme" nav link is active (darker color)
- Clicking "Jetzt buchen" navigates to `/kontakt`

- [ ] **Step 5: Check nav on other pages**

Open http://localhost:3000 — confirm the "Programme" nav link in the header now points to `/programme` (not `/#leistungen`).

- [ ] **Step 6: Commit**

```bash
git add src/app/programme/page.tsx src/components/site-chrome.tsx
git commit -m "feat: add /programme page with program list and CTA"
```
