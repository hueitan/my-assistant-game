/** Simple SVG graph renderer (no external libs) */
export function renderGraph(container, nodes, edges) {
  container.innerHTML = "";
  const width = container.clientWidth || 300;
  const height = container.clientHeight || 200;
  const svgns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgns, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  const radius = Math.min(width, height) / 2 - 30;
  const cx = width / 2;
  const cy = height / 2;
  const angleStep = (2 * Math.PI) / nodes.length;
  const positions = nodes.map((n, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      title: n.title,
      visited: n.visited
    };
  });
  // arrowhead marker
  const defs = document.createElementNS(svgns, "defs");
  const marker = document.createElementNS(svgns, "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "0");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  const arrowPath = document.createElementNS(svgns, "path");
  arrowPath.setAttribute("d", "M0,0 L0,7 L10,3.5 z");
  arrowPath.setAttribute("fill", "#666");
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  svg.appendChild(defs);
  // draw edges
  edges.forEach(edge => {
    const srcIdx = nodes.findIndex(n => n.title === edge.source);
    const tgtIdx = nodes.findIndex(n => n.title === edge.target);
    if (srcIdx === -1 || tgtIdx === -1) return;
    const s = positions[srcIdx];
    const t = positions[tgtIdx];
    const line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", s.x);
    line.setAttribute("y1", s.y);
    line.setAttribute("x2", t.x);
    line.setAttribute("y2", t.y);
    line.setAttribute("stroke", "#666");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arrowhead)");
    svg.appendChild(line);
  });
  // draw nodes
  positions.forEach(pos => {
    const circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", pos.x);
    circle.setAttribute("cy", pos.y);
    circle.setAttribute("r", 12);
    circle.setAttribute("fill", pos.visited ? "#0066cc" : "#ccc");
    circle.setAttribute("stroke", "#333");
    const title = document.createElementNS(svgns, "title");
    title.textContent = pos.title;
    circle.appendChild(title);
    svg.appendChild(circle);
  });
  container.appendChild(svg);
}
