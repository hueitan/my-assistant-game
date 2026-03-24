/** MediaWiki REST API wrapper for Wiki Sprint Champion */
const BASE = "https://en.wikipedia.org/api/rest_v1";

/** Get a random article title */
export async function getRandom() {
  const res = await fetch(`${BASE}/page/random/title`);
  const data = await res.json();
  return data.title;
}

/** Get article summary */
export async function getSummary(title) {
  const res = await fetch(`${BASE}/page/summary/${encodeURIComponent(title)}`);
  return await res.json();
}

/** Get outbound links */
export async function getLinks(title) {
  const res = await fetch(`${BASE}/page/links/${encodeURIComponent(title)}`);
  const data = await res.json();
  return (data.links || []).map(l => ({ title: l.title }));
}

/** Get categories */
export async function getCategories(title) {
  const res = await fetch(`${BASE}/page/categories/${encodeURIComponent(title)}`);
  const data = await res.json();
  return (data.items || []).map(i => ({ title: i.title }));
}
