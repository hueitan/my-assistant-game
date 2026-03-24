import { WikiEngine } from "../engine.js";
import { initAddLinkButton } from "./addLinkModal.js";
// CSS is loaded via <link> tags in index.html; no need to import here

export const engine = new WikiEngine();

// Ensure audio settings object exists
engine.audio = engine.audio || { enabled: true };

// Header construction (Codex styles)
let header = document.querySelector('header');
if (!header) {
  header = document.createElement('header');
  document.body.prepend(header);
}
header.innerHTML = `
  <button id="addlink-button" class="mw-ui-button mw-ui-button-primary">Add Link</button>
  <button id="tutorial-button" class="mw-ui-button">Tutorial</button>
  <button id="audio-toggle-button" class="mw-ui-button">Audio</button>
  <div id="score-display" style="margin-left:1rem; font-weight:bold;">Score: 0</div>
`;

// Initialize UI components
import "./audioToggle.js"; // creates audio toggle in header
import "./leaderboardPanel.js";
import "./searchAssistPanel.js";
import "./templateQuest.js"; // upgraded UI

// Add‑Link button
const addLinkBtn = document.getElementById('addlink-button');
initAddLinkButton(addLinkBtn);

// Tutorial button
import { startTutorial } from "./tutorial.js";
const tutorialBtn = document.getElementById('tutorial-button');
tutorialBtn.addEventListener('click', startTutorial);

// Article view area
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

// Render current article & UI
async function renderCurrent() {
  const data = await engine.loadCurrent();
  document.getElementById('article-title').textContent = data.summary.title;
  document.getElementById('article-summary').textContent = data.summary.extract;
  const linksDiv = document.getElementById('links-list');
  linksDiv.innerHTML = '';
  data.links.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'mw-ui-button mw-ui-button-quiet';
    btn.textContent = l.title;
    btn.addEventListener('click', () => engine.selectLink(l.title));
    linksDiv.appendChild(btn);
  });
  document.getElementById('score-display').textContent = `Score: ${engine.state.score}`;
}

engine.on(renderCurrent);
renderCurrent();

// Load graph panel (already registers itself on engine events)
import "./graphPanel.js";
