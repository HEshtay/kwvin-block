/**
 * airtable.js — Fetch records from an Airtable table.
 * Depends on: config.js (must be loaded first)
 */

/**
 * Fetch all records from the given Airtable table.
 * @param {string} tableName  The exact table name in your Airtable base.
 * @returns {Promise<Array>}  Array of record objects, each with an `.fields` property.
 */
async function fetchRecords(tableName) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn('[Airtable] Could not load data.');
      return [];
    }

    const data = await response.json();
    return data.records || [];
  } catch {
    console.warn('[Airtable] Network error.');
    return [];
  }
}
