// ── Airtable Credentials ──────────────────────────────────
// Fill in your personal access token and base ID from airtable.com
const AIRTABLE_TOKEN   = 'YOUR_PERSONAL_ACCESS_TOKEN';
const AIRTABLE_BASE_ID = 'YOUR_BASE_ID';

/*
  ============================================================
  Tables to create in Airtable:
  ============================================================

  1. Services
     - Name        (Single line text)  e.g. "Mentale Konditionierung"
     - Number      (Single line text)  "01", "02", "03"
     - Description (Long text)
     - Order       (Number)

  2. Testimonials
     - Quote       (Long text)
     - Author      (Single line text)
     - Order       (Number)

  3. Journal
     - Title       (Single line text)
     - Excerpt     (Long text)
     - Image URL   (URL)
     - Date        (Date)
     - Category    (Single line text)
     - Featured    (Checkbox)

  4. Method_Pillars
     - Name        (Single line text)  e.g. "Bewegung"
     - Number      (Single line text)  "01", "02", "03"
     - Description (Long text)
     - Order       (Number)

  ============================================================
  How to get your credentials:
  1. Go to airtable.com/account → API → Create personal access token
  2. Scope: data.records:read on your base
  3. Copy the Base ID from the base URL: airtable.com/YOUR_BASE_ID/...
  ============================================================
*/
