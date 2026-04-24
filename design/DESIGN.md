```markdown
# Design System Document: The Editorial Athlete

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Sanctuary"**

This design system rejects the frantic, neon-soaked tropes of the fitness industry in favor of an elevated, editorial experience. It is designed to feel like a high-end wellness journal or a boutique architectural portfolio. The goal is to establish "Quiet Authority"—a sense of calm, absolute competence that builds trust through restraint rather than volume. 

The layout breaks the standard "web template" feel by utilizing intentional white space as a structural element. By strictly adhering to a razor-thin 0.5px border and a monochromatic-adjacent palette, we create a digital environment that feels physical, tactile, and permanent.

---

## 2. Colors
The palette is rooted in organic, architectural tones. It is designed to be experienced as a series of rhythmic shifts in temperature rather than distinct "colors."

### The Palette (Material Design Mapping)
- **Background (`surface`):** `#F8F5EF` (Warm Beige) – The primary canvas.
- **On-Background (`on-surface`):** `#1A1A1A` (Near-Black) – High-contrast text for ultimate legibility.
- **Primary:** `#1A1A1A` (Near-Black) – Used for solid buttons and critical UI.
- **Secondary (`outline`):** `#555555` (Graphite) – For secondary text and refined details.
- **Tertiary (`surface-variant`):** `#D4C8B5` (Linen) – Reserved for large-scale numerals and subtle accents.
- **Surface Tiers:**
    - `surface-container-lowest`: `#FFFFFF` (White)
    - `surface-container-low`: `#F8F5EF` (Warm Beige)
    - `surface-container`: `#EDE8DF` (Sand)

### The "No-Line" Hierarchy
While the system permits 0.5px borders for specific components, section boundaries must be defined by **alternating background shifts**. Transition from `white` (#FFFFFF) to `warm beige` (#F8F5EF) to create a rhythmic, editorial flow. Do not use lines to separate main page sections; let the change in "paper" color signal the transition.

---

## 3. Typography
Typography is the cornerstone of this system. The interplay between the romantic, fluid *Cormorant Garamond* and the technical, clean *DM Sans* creates a "Human-Performance" tension.

- **Display & Headlines:** `Cormorant Garamond` (Light/Italic). 
    - *Role:* To be used for all storytelling and high-level headings. It should feel like a signature. Use `3.5rem` for Display-LG to command the page.
- **Body & Metadata:** `DM Sans` (Light). 
    - *Role:* Provides a modern, clinical contrast to the serif. All body text should use a generous line-height (1.6 or higher) to ensure a "calm" reading experience.
- **Navigation:** `DM Sans` (Regular/Small Caps). 
    - *Role:* Small caps provide an architectural, "menu" feel that distinguishes navigation from content.

---

## 4. Elevation & Depth
This system is strictly two-dimensional. We communicate depth through **tonal layering** and **0.5px structural lines** rather than shadows.

- **The Layering Principle:** To highlight a specific piece of content, place a `white` card on a `sand` background. The subtle shift in hex code provides enough "lift" without breaking the minimalist aesthetic.
- **The 0.5px Rule:** To maintain an "Elite Editorial" feel, all borders, dividers (within components), and outlines must be exactly `0.5px` using the `Near-Black` (#1A1A1A) or `Graphite` (#555555) tokens. 
- **Absolute Rules:** 
    - No Gradients.
    - No Box Shadows.
    - No Icons (Use text labels or custom serif glyphs if absolutely necessary).

---

## 5. Components

### Buttons
- **Primary:** Solid `#1A1A1A` fill with `#FFFFFF` `DM Sans` (Light) text. Square corners (0px radius).
- **Secondary:** Transparent fill with a `0.5px` border of `#1A1A1A`.
- **States:** On hover, the secondary button fills solid black; the primary button shifts to `#555555`.

### Numbered Lists (Signature Component)
In wellness programs or "The Method" sections, use large `Cormorant Garamond` numerals in the `Linen` (#D4C8B5) color. These should be 3-4x the size of the body text and placed to the left or above the header to act as a visual anchor.

### Cards
Cards are never "boxed." They are defined by a `0.5px` top border only, or by sitting on an alternating background color. Never use a 4-sided border for a card if it sits in a grid; use the "Ghost Border" logic where the line only exists to separate, not to encase.

### Input Fields
Minimalist underline style. A `0.5px` `#1A1A1A` line at the bottom of the input area. Labels sit above in `DM Sans` (Small Caps).

### Footer
The "Weighted Anchor." The footer must be solid `#1A1A1A` (Near-Black). The logo must be the Serif brand mark in `#FFFFFF`. This provides a definitive "end" to the editorial experience.

---

## 6. Do's and Don'ts

### Do:
- **Do** use massive amounts of white space (margins of 80px+ on desktop).
- **Do** use `Italic` Cormorant Garamond for all H1 and H2 headers to emphasize the "luxury" feel.
- **Do** ensure all images are high-end, desaturated, or have a warm, film-grain aesthetic to match the palette.
- **Do** align navigation links to the far right or center in Small Caps.

### Don't:
- **Don't** use icons. If you need to indicate "Play," use the word "PLAY" in small caps.
- **Don't** use any corner radius. Every element must have a `0px` radius for a sharp, architectural look.
- **Don't** use "pure blue" or "pure red" for error states; use a muted, earthy variation that fits the sand/linen warmth.
- **Don't** use bold weights. Trust the typography's scale and the color contrast to create hierarchy.```