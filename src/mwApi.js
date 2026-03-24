const BASE = "https://en.wikipedia.org/api/rest_v1";

/** Fetch article summary */
export async function getSummary(title) {
  const res = await fetch(`${BASE}/page/summary/${encodeURIComponent(title)}`);
  return res.json();
}

/** Fetch outbound links */
export async function getLinks(title) {
  const res = await fetch(`${BASE}/page/links/${encodeURIComponent(title)}`);
  const data = await res.json();
  return data.links.map(l => ({ title: l.title }));
}

/** Fetch categories */
export async function getCategories(title) {
  const res = await fetch(`${BASE}/page/categories/${encodeURIComponent(title)}`);
  const data = await res.json();
  return data.items.map(i => ({ title: i.title }));
}

/** Fetch references */
export async function getReferences(title) {
  const res = await fetch(`${BASE}/page/references/${encodeURIComponent(title)}`);
  const data = await res.json();
  return (data.references || []).slice(0,3).map(r => ({
    href: r.url,
    title: r.title,
    thumbnail: r.thumbnail?.source
  }));
}

/** Simple vandalism proxy using pageviews */
export async function isVandalized(title) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth()+1).padStart(2,"0");
  const day = String(now.getUTCDate()).padStart(2,"0");
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${year}/${month}/${day}/en.wikipedia/all-access/all-agents/${encodeURIComponent(title)}/daily/20230101/20230131`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const total = data?.items?.reduce((s,i)=>s+i.views,0) ?? 0;
    return total < 10;
  } catch(e) { return false; }
}

/** Get a random article title */
export async function getRandom() {
  const res = await fetch(`${BASE}/page/random/title`);
  const { title } = await res.json();
  return title;
}
