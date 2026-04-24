/**
 * methode.js — Renders Method Pillars on methode.html
 * Depends on: config.js, airtable.js
 */

document.addEventListener('DOMContentLoaded', () => {
  loadPillars();
});

async function loadPillars() {
  const grid = document.getElementById('pillars-grid');
  if (!grid) return;

  const records = await fetchRecords('Method_Pillars');

  if (!records.length) {
    grid.innerHTML = getPillarsFallback();
    return;
  }

  const sorted = [...records].sort((a, b) => {
    const oa = a.fields.Order ?? 999;
    const ob = b.fields.Order ?? 999;
    return oa - ob;
  });

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

function getPillarsFallback() {
  const pillars = [
    {
      num: '01',
      title: 'Bewegung',
      desc: 'Bewegung als Sprache des Körpers. Wir verfeinern Technik, Mobilität und Kraft durch bewusstes, präzises Training — jede Wiederholung zählt.'
    },
    {
      num: '02',
      title: 'Ernährung',
      desc: 'Kein Dogma, keine Diät. Evidenzbasierte Ernährungsstrategien, die zu Ihrem Leben passen und langfristige Leistungsfähigkeit unterstützen.'
    },
    {
      num: '03',
      title: 'Mindset',
      desc: 'Der Geist führt den Körper. Durch mentale Konditionierung und psychologische Techniken entwickeln wir die innere Architektur für Spitzenleistung.'
    }
  ];
  return pillars.map(p => `
    <div class="service-card">
      <div class="service-numeral">${p.num}</div>
      <div class="service-title">${p.title}</div>
      <p class="service-desc">${p.desc}</p>
    </div>
  `).join('');
}

function pad(n) {
  return String(n).padStart(2, '0');
}
