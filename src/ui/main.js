import { WikiEngine } from "../engine.js";
import "./styles.css";

// Instantiate the global engine
export const engine = new WikiEngine();

/* ---------- Header ---------- */
let header = document.querySelector('header');
if (!header) {
  header = document.createElement('header');
  document.body.prepend(header);
}
header.innerHTML = `
  <button id="reset-btn" class="mw-ui-button mw-ui-button-primary">Reset</button>
  <span id="score-display" style="margin-left:1rem; font-weight:bold;">Score: 0</span>
`;

document.getElementById('reset-btn').addEventListener('click', () => engine.reset());

/* ---------- Article view ---------- */
let articleContainer = document.getElementById('article-container');
if (!articleContainer) {
  articleContainer = document.createElement('section');
  articleContainer.id = 'article-container';
  document.body.appendChild(articleContainer);
}
articleContainer.innerHTML = `
  <h2 id="article-title"></h2>
  <p id="article-summary"></p>
  <div id="links-list"></div>
`;

/** Render the current article and UI state */
async function render() {
  try {
    const data = await engine.loadCurrent();
    document.getElementById('article-title').textContent = data.summary.title;
    document.getElementById('article-summary').textContent = data.summary.extract;
    const linksDiv = document.getElementById('links-list');
    linksDiv.innerHTML = '';
    (data.links || []).forEach(l => {
      const btn = document.createElement('button');
      btn.className = 'mw-ui-button mw-ui-button-quiet';
      btn.textContent = l.title;
      btn.addEventListener('click', () => engine.selectLink(l.title));
      linksDiv.appendChild(btn);
    });
    document.getElementById('score-display').textContent = `Score: ${engine.state.score}`;
    // win detection (alert once)
    if (engine.state.path[engine.state.path.length - 1] === engine.state.targetTitle) {
      alert(`You reached the target article! Final score: ${engine.state.score}`);
    }
  } catch (e) {
    console.error('Failed to load article data:', e);
    const container = document.getElementById('article-container');
    container.innerHTML = `<p style="color:red;">Error loading article. Please try again later.</p>`;
  }
}

engine.on(render);
render();
