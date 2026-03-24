/** Search‑as‑you‑type helper using MediaWiki opensearch */
export async function search(query) {
  if (!query) return [];
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(query)}&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  // data[1] contains array of titles
  return data[1].slice(0,5);
}
