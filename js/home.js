/**
 * home.js — Renders Services and Testimonials on index.html
 * Depends on: config.js, airtable.js
 */

document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  loadTestimonials();
});

// ── Services ──────────────────────────────────────────────

async function loadServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  const records = await fetchRecords('Services');

  if (!records.length) {
    // Render fallback static cards
    grid.innerHTML = getServicesFallback();
    return;
  }

  const sorted = sortByOrder(records);
  grid.innerHTML = sorted.map((rec, i) => {
    const f = rec.fields;
    return `
      <div class="service-card">
        <div class="service-numeral">${escapeHTML(f.Number || pad(i + 1))}</div>
        <div class="service-title">${escapeHTML(f.Name || '')}</div>
        <p class="service-desc">${escapeHTML(f.Description || '')}</p>
      </div>
    `;
  }).join('');
}

function getServicesFallback() {
  const cards = [
    { num: '01', title: 'Bewegungsarchitektur', desc: 'Präzise Analyse und Optimierung Ihrer Bewegungsmuster für maximale Leistung und nachhaltige Gesundheit.' },
    { num: '02', title: 'Mentale Konditionierung', desc: 'Systematischer Aufbau mentaler Stärke — fokussiert, widerstandsfähig, unerschütterlich in jedem Kontext.' },
    { num: '03', title: 'Performance Coaching', desc: 'Maßgeschneiderte Strategien für Athleten und Führungspersönlichkeiten, die Spitzenleistung als Standard begreifen.' }
  ];
  return cards.map(c => `
    <div class="service-card">
      <div class="service-numeral">${c.num}</div>
      <div class="service-title">${c.title}</div>
      <p class="service-desc">${c.desc}</p>
    </div>
  `).join('');
}

// ── Testimonials ──────────────────────────────────────────

async function loadTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  const records = await fetchRecords('Testimonials');

  if (!records.length) {
    grid.innerHTML = getTestimonialsFallback();
    return;
  }

  const sorted = sortByOrder(records);
  grid.innerHTML = sorted.map(rec => {
    const f = rec.fields;
    return `
      <div class="testimonial-card">
        <div class="testimonial-quote-mark">&ldquo;</div>
        <p class="testimonial-text">${escapeHTML(f.Quote || '')}</p>
        <div class="testimonial-author">${escapeHTML(f.Author || '')}</div>
      </div>
    `;
  }).join('');
}

function getTestimonialsFallback() {
  const items = [
    { quote: 'Kevin hat meine Vorstellung von körperlicher Leistung vollständig verändert. Seine Methode ist keine Trainingsroutine — sie ist eine Lebensphilosophie.', author: 'M. Hartmann — Unternehmerin' },
    { quote: 'Ich habe mit vielen Trainern gearbeitet. Kevin ist der Einzige, der wirklich versteht, dass Körper und Geist eine Einheit sind.', author: 'T. Kaufmann — Profisportler' }
  ];
  return items.map(i => `
    <div class="testimonial-card">
      <div class="testimonial-quote-mark">&ldquo;</div>
      <p class="testimonial-text">${i.quote}</p>
      <div class="testimonial-author">${i.author}</div>
    </div>
  `).join('');
}

// ── Helpers ───────────────────────────────────────────────

function sortByOrder(records) {
  return [...records].sort((a, b) => {
    const oa = a.fields.Order ?? 999;
    const ob = b.fields.Order ?? 999;
    return oa - ob;
  });
}

function pad(n) {
  return String(n).padStart(2, '0');
}
