import { renderGraph } from "../graph.js";
import { engine } from "./main.js";

// Container element expected in index.html with id="graph-panel"
const container = document.getElementById('graph-panel');
if (!container) {
  const placeholder = document.createElement('div');
  placeholder.id = 'graph-panel';
  document.body.appendChild(placeholder);
}

function updateGraph() {
  const { nodes, edges } = engine.getGraphData();
  renderGraph(container, nodes, edges);
}

engine.on(updateGraph);
// Initial render
updateGraph();
