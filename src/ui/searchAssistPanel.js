import { suggestNextLink } from "../searchAssist.js";
import { engine } from "./main.js";
import { getSummary } from "../mwApi.js";

let container = document.getElementById('search-assist');
if (!container) {
  container = document.createElement('div');
  container.id = 'search-assist';
  document.body.appendChild(container);
}

function render() {
  const current = engine.state.path[engine.state.path.length-1];
  const target = engine.state.targetTitle;
  container.innerHTML = `
    <div class="mw-ui-card" style="padding:1rem; margin-bottom:1rem;">
      <h4>Search Assist</h4>
      <div id="sa-loading">Loading suggestion...</div>
      <div id="sa-content" style="display:none;">
        <p id="sa-title"></p>
        <p id="sa-excerpt"></p>
        <button id="sa-go" class="mw-ui-button mw-ui-button-primary">Go</button>
      </div>
    </div>
  `;
  const loading = document.getElementById('sa-loading');
  const content = document.getElementById('sa-content');
  suggestNextLink(current, target).then(async nextTitle => {
    loading.style.display = 'none';
    if (!nextTitle) {
      content.innerHTML = '<p>No good suggestion found.</p>';
      return;
    }
    const summary = await getSummary(nextTitle);
    document.getElementById('sa-title').textContent = nextTitle;
    document.getElementById('sa-excerpt').textContent = summary.extract.split('. ')[0] + '.';
    const goBtn = document.getElementById('sa-go');
    goBtn.addEventListener('click', () => {
      engine.selectLink(nextTitle);
    });
    content.style.display = 'block';
  }).catch(err => {
    loading.textContent = 'Error loading suggestion';
    console.error(err);
  });
}

engine.on(render);
render();
