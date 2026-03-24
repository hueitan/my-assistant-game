// Simple Template Quest overlay (uses Codex checklist style)
// For demo purposes we define a static list of required fields.

const requiredFields = [
  { key: 'population', label: 'Population' },
  { key: 'capital', label: 'Capital' },
  { key: 'area', label: 'Area' }
];

// Container expected in index.html with id="template-quest"
let container = document.getElementById('template-quest');
if (!container) {
  container = document.createElement('div');
  container.id = 'template-quest';
  document.body.appendChild(container);
}

// Create accordion UI
container.innerHTML = `
<div class="mw-ui-card" style="padding:1rem;">
  <h4>Template Quest</h4>
  <div class="accordion" id="quest-accordion">
    <div class="accordion-header" id="quest-header">Show Required Fields</div>
    <div class="accordion-body" id="quest-body"></div>
  </div>
</div>
`;

const header = document.getElementById('quest-header');
const body = document.getElementById('quest-body');
header.addEventListener('click', () => {
  const parent = document.querySelector('.accordion');
  parent.classList.toggle('open');
});

requiredFields.forEach(f => {
  const div = document.createElement('div');
  div.innerHTML = `
    <label class="mw-ui-checkbox">
      <input type="checkbox" data-key="${f.key}" disabled>
      <span>${f.label}</span>
    </label>
  `;
  body.appendChild(div);
});

// Simple simulation: when the current article title contains any of the keywords, auto‑check.
import { engine } from './main.js';
function updateQuest() {
  const currentTitle = engine.state.path[engine.state.path.length-1].toLowerCase();
  requiredFields.forEach(f => {
    const cb = body.querySelector(`input[data-key="${f.key}"]`);
    if (cb) {
      if (currentTitle.includes(f.key)) {
        cb.checked = true;
        // award bonus once per field
        if (!cb.dataset.bonusAdded) {
          engine.state.score += templateQuestBonus();
          engine._save(engine.state);
          cb.dataset.bonusAdded = 'yes';
        }
      }
    }
  });
}
engine.on(updateQuest);
updateQuest();
