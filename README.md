# Kevin Block — Personal Training & Performance Coaching

Static website for Kevin Block, a German-language personal training and performance coaching brand.

**No build step. No framework. No package manager.** Pure HTML, CSS, and vanilla JavaScript.

---

## How It Works

### Pages

| File | Route | Description |
|------|-------|-------------|
| `index.html` | `/` | Homepage — hero, services/method pillars, packages, social links, CTA |
| `methode.html` | `/methode` | The Method page — pillars detail, trainer quote & bio |
| `contact.html` | `/contact` | Contact page — mailto button |

### Script Load Order (matters — do not change)

Every page loads scripts in this fixed sequence:

```
config.js → utils.js → airtable.js → [page-specific script]
```

Each script depends on globals from the one before it.

| Script | Purpose |
|--------|---------|
| `js/config.js` | Holds Airtable credentials (`AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`) |
| `js/utils.js` | `escapeHTML()` and `isValidImageURL()` shared helpers |
| `js/airtable.js` | `fetchRecords(tableName)` — fetches data from Airtable API |
| `js/home.js` | Renders Services and Testimonials on `index.html` |
| `js/methode.js` | Renders Method Pillars on `methode.html` |
| `js/newsletter.js` | Newsletter form stub (currently a placeholder only) |

### Data Layer (Airtable)

Dynamic content is pulled from Airtable. If Airtable is not configured (no credentials, network error), every page falls back to static hardcoded content — the site always looks complete.

**Required Airtable tables:**

| Table | Fields |
|-------|--------|
| `Services` | Name, Number, Description, Order |
| `Testimonials` | Quote, Author, Order |
| `Method_Pillars` | Name, Number, Description, Order |

### Design System

Defined in `design/DESIGN.md` and `css/style.css`. Key rules:

- **No** box shadows, gradients, or border-radius — everything is sharp (0px)
- **Borders:** always `0.5px solid` with `--border-dark` or `--border-light`
- **Sections** are separated by alternating background colors, never by lines
- **Typography:** Cormorant Garamond (italic serif) for H1/H2; DM Sans (light) for body/nav
- **No icons** — text labels and small-caps only
- All copy is in **German**

---

## Local Development

No installation required. Open any `.html` file directly in a browser, or use a local server for cleaner relative paths:

```bash
npx serve .
# or
python -m http.server 8080
```

---

## What Is Missing / Not Yet Done

### Critical — site will not show live data without these

- **Airtable credentials** — `js/config.js` still contains placeholder values:

  ```js
  const AIRTABLE_TOKEN   = 'YOUR_PERSONAL_ACCESS_TOKEN';
  const AIRTABLE_BASE_ID = 'YOUR_BASE_ID';
  ```

  See the comments in `config.js` for how to get these from airtable.com.

- **Airtable tables** — the four tables described above need to be created and populated in your Airtable base.

### Content placeholders

- **Packages section** (`index.html` lines 62–79) — all three packages say "Beschreibung folgt". Real names, descriptions, and pricing need to be filled in.
- **Social media links** — YouTube and Instagram URLs are `#` in both the header nav and footer (on every page).
- **Newsletter form** (`js/newsletter.js`) — only fakes a submission (changes button text). Needs to be wired up to a real email service (Mailchimp, ConvertKit, Brevo, etc.). Note: there is no newsletter section in the current HTML, so this script has no effect yet.
- **Contact email** — `hello@kevinblock.de` in `contact.html` should be verified as the correct address.

### Missing files

- **Favicon** — no `favicon.ico` or `<link rel="icon">` on any page.
- **`robots.txt`** — recommended for SEO.
- **`sitemap.xml`** — recommended for SEO.
- **`.gitignore`** — the repo has no `.gitignore`. At minimum, `next-sanity-site/node_modules/` should be ignored.
- **Open Graph / meta tags** — no `og:title`, `og:description`, or `og:image` tags for social sharing previews.

---

## Unnecessary Files

These files/directories are not part of the website and can be safely removed:

| Path | Why it can be removed |
|------|-----------------------|
| `next-sanity-site/` | An abandoned Next.js + Sanity scaffold. It has nothing to do with the static site, contains a full `node_modules/` folder (hundreds of MB), and a `.next/` build cache. Delete the whole directory. |
| `docs/` | Internal planning and spec documents used during AI-assisted development. Not needed for the live site. |
| `.omc/` | Claude Code internal state files. Auto-generated, not part of the project. |
| `design/image.png`, `design/image copy.png`, `design/image copy 2.png` | Reference screenshots used during design. `design/DESIGN.md` is worth keeping as a reference. |

---

## Deploying to Netlify

This is a plain static site — Netlify requires almost no configuration.

### Option 1: Drag & Drop (fastest)

1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. On the dashboard, drag the project folder onto the "drag and drop" area.
3. Done — Netlify gives you a live URL instantly.

> Before doing this, delete `next-sanity-site/` and `node_modules` from it — otherwise you'll upload hundreds of MB of unnecessary files.

### Option 2: Connect Git Repository (recommended for ongoing work)

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project → Connect to GitHub**.
3. Select the repository.
4. Set the build settings:
   - **Build command:** *(leave blank — no build step)*
   - **Publish directory:** `.` (the repo root)
5. Click **Deploy site**.

Every future `git push` to `master` will automatically redeploy the site.

### Recommended: Add a `netlify.toml`

Create this file at the root of the repo to make settings explicit:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Environment Variables (Airtable credentials)

The Airtable token is currently hardcoded in `js/config.js`. Since this is a client-side site, the token will be visible in the browser — this is a known trade-off for a no-build static site.

For slightly more obscurity (not true security), you could use a Netlify serverless function as a proxy. For now, ensure the Airtable token scope is restricted to **read-only** on only the one base.

---

## File Structure

```
kwvin-block/
├── index.html          # Homepage
├── methode.html        # The Method page
├── contact.html        # Contact page
├── css/
│   └── style.css       # All styles + CSS custom properties (design tokens)
├── js/
│   ├── config.js       # Airtable credentials (fill in before use)
│   ├── utils.js        # escapeHTML, isValidImageURL
│   ├── airtable.js     # fetchRecords() — Airtable API client
│   ├── home.js         # Homepage dynamic content
│   ├── methode.js      # Method page dynamic content
│   └── newsletter.js   # Newsletter form handler (stub)
├── design/
│   └── DESIGN.md       # Design system reference document
└── CLAUDE.md           # AI assistant instructions (not for deployment)
```
