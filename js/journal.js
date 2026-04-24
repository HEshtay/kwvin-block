/**
 * journal.js — Renders Featured Article and Articles Grid on journal.html
 * Depends on: config.js, airtable.js
 */

document.addEventListener('DOMContentLoaded', () => {
  loadJournal();
});

async function loadJournal() {
  const featuredEl = document.getElementById('featured-article');
  const gridEl     = document.getElementById('articles-grid');

  const records = await fetchRecords('Journal');

  if (!records.length) {
    if (featuredEl) featuredEl.innerHTML = getFeaturedFallback();
    if (gridEl)     gridEl.innerHTML     = getArticlesFallback();
    return;
  }

  // Sort by date descending
  const sorted = [...records].sort((a, b) => {
    const da = a.fields.Date ? new Date(a.fields.Date) : new Date(0);
    const db = b.fields.Date ? new Date(b.fields.Date) : new Date(0);
    return db - da;
  });

  const featured = sorted.find(r => r.fields.Featured === true) || sorted[0];
  const rest     = sorted.filter(r => r.id !== featured.id);

  if (featuredEl) featuredEl.innerHTML = renderFeatured(featured.fields);
  if (gridEl)     gridEl.innerHTML     = rest.map(r => renderArticleCard(r.fields)).join('');
}

function renderFeatured(f) {
  const imgContent = f['Image URL'] && isValidImageURL(f['Image URL'])
    ? `<img src="${escapeHTML(f['Image URL'])}" alt="${escapeHTML(f.Title || '')}" style="width:100%;height:100%;object-fit:cover;">`
    : `<span>${escapeHTML(f.Title || 'Artikel Bild')}</span>`;

  return `
    <div class="featured-inner">
      <div class="featured-image">${imgContent}</div>
      <div class="featured-content">
        <div class="featured-meta">
          ${f.Category ? `<span class="small-caps">${escapeHTML(f.Category)}</span>` : ''}
          ${f.Date     ? `<span class="small-caps" style="color:var(--linen);">${formatDate(f.Date)}</span>` : ''}
        </div>
        <h2>${escapeHTML(f.Title || '')}</h2>
        <p class="featured-excerpt">${escapeHTML(f.Excerpt || '')}</p>
        <a href="#" class="btn btn-secondary">Weiterlesen</a>
      </div>
    </div>
  `;
}

function renderArticleCard(f) {
  const imgContent = f['Image URL'] && isValidImageURL(f['Image URL'])
    ? `<img src="${escapeHTML(f['Image URL'])}" alt="${escapeHTML(f.Title || '')}" style="width:100%;height:100%;object-fit:cover;">`
    : `<span>${escapeHTML(f.Category || 'Artikel')}</span>`;

  return `
    <div class="article-card">
      <div class="article-img-placeholder">${imgContent}</div>
      <div class="article-meta">
        ${f.Date     ? `<span class="small-caps" style="color:var(--secondary);font-size:0.68rem;">${formatDate(f.Date)}</span>` : ''}
        ${f.Date && f.Category ? `<span style="color:var(--linen);">·</span>` : ''}
        ${f.Category ? `<span class="small-caps" style="color:var(--secondary);font-size:0.68rem;">${escapeHTML(f.Category)}</span>` : ''}
      </div>
      <div class="article-title">${escapeHTML(f.Title || '')}</div>
    </div>
  `;
}

// ── Fallbacks (no Airtable data yet) ──────────────────────

function getFeaturedFallback() {
  return `
    <div class="featured-inner">
      <div class="featured-image"><span>Artikel Bild</span></div>
      <div class="featured-content">
        <div class="featured-meta">
          <span class="small-caps">Philosophie</span>
          <span class="small-caps" style="color:var(--linen);">April 2025</span>
        </div>
        <h2>Die Architektur der Bewegung: Warum Form über Gewicht geht</h2>
        <p class="featured-excerpt">Präzision in der Bewegung ist keine Frage des Talents — es ist eine Frage der bewussten Praxis. In diesem Essay erkundet Kevin Block, warum die Art der Bewegung langfristig mehr zählt als jede Zahl auf der Waage.</p>
        <a href="#" class="btn btn-secondary">Weiterlesen</a>
      </div>
    </div>
  `;
}

function getArticlesFallback() {
  const articles = [
    { cat: 'Ernährung',  date: 'März 2025',    title: 'Ernährung ohne Dogma: Ein evidenzbasierter Ansatz' },
    { cat: 'Mindset',    date: 'Februar 2025',  title: 'Mentale Vorbereitung als tägliche Praxis' },
    { cat: 'Training',   date: 'Januar 2025',   title: 'Progressive Überlastung — das Kernprinzip jedes Fortschritts' },
    { cat: 'Lifestyle',  date: 'Dezember 2024', title: 'Regeneration: Die unterschätzte Hälfte des Trainings' }
  ];
  return articles.map(a => `
    <div class="article-card">
      <div class="article-img-placeholder"><span>${a.cat}</span></div>
      <div class="article-meta">
        <span class="small-caps" style="color:var(--secondary);font-size:0.68rem;">${a.date}</span>
        <span style="color:var(--linen);">·</span>
        <span class="small-caps" style="color:var(--secondary);font-size:0.68rem;">${a.cat}</span>
      </div>
      <div class="article-title">${a.title}</div>
    </div>
  `).join('');
}

// ── Helpers ───────────────────────────────────────────────

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('de-DE', { year: 'numeric', month: 'long' });
}
