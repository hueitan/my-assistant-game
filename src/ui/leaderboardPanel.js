import { getTop } from "../leaderboard.js";
import { engine } from "./main.js";

// Create container if not present
let container = document.getElementById('leaderboard-panel');
if (!container) {
  container = document.createElement('div');
  container.id = 'leaderboard-panel';
  document.body.appendChild(container);
}

function render() {
  const top = getTop(10);
  const html = `
    <div class="mw-ui-card" style="padding:1rem; margin-bottom:1rem;">
      <h4>Leaderboard <span id="trophy" style="color:gold;">🏆</span></h4>
      <button id="lb-refresh" class="mw-ui-button mw-ui-button-primary" style="float:right;">Refresh</button>
      <table class="mw-ui-table" style="width:100%; margin-top:0.5rem;">
        <thead><tr><th>#</th><th>Name</th><th>Score</th><th>Time</th></tr></thead>
        <tbody id="lb-body"></tbody>
      </table>
    </div>
  `;
  container.innerHTML = html;
  document.getElementById('lb-refresh').addEventListener('click', render);
  const tbody = document.getElementById('lb-body');
  tbody.innerHTML = '';
  top.forEach((entry, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${idx+1}</td><td>${entry.name}</td><td>${entry.score}</td><td>${new Date(entry.timestamp).toLocaleTimeString()}</td>`;
    tbody.appendChild(tr);
  });
}

// Initial render and subscribe to engine events for live updates
engine.on(render);
render();
