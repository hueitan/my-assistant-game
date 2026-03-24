import { search } from "../search.js";
import { engine } from "./main.js"; // assume engine exported from main

// Create modal DOM (hidden by default)
const modal = document.createElement('div');
modal.className = 'modal';
modal.style.display = 'none';
modal.innerHTML = `
  <div class="modal-content">
    <h3>Add Link</h3>
    <input type="text" id="addlink-input" placeholder="Search article" autocomplete="off" />
    <ul id="addlink-suggestions" style="list-style:none;padding:0;margin:0;max-height:150px;overflow:auto;"></ul>
    <button id="addlink-submit" class="mw-ui-button mw-ui-button-primary">Propose Link</button>
    <button id="addlink-cancel" class="mw-ui-button">Cancel</button>
    <div id="addlink-badge" class="badge link" style="display:none; margin-top:0.5rem;">+8</div>
  </div>
`;
document.body.appendChild(modal);

const input = modal.querySelector('#addlink-input');
const suggestions = modal.querySelector('#addlink-suggestions');
const submitBtn = modal.querySelector('#addlink-submit');
const cancelBtn = modal.querySelector('#addlink-cancel');
const badge = modal.querySelector('#addlink-badge');

let currentSelection = null;

function openModal() {
  modal.style.display = 'flex';
  input.value = '';
  suggestions.innerHTML = '';
  badge.style.display = 'none';
  input.focus();
}
function closeModal() {
  modal.style.display = 'none';
}

// Autocomplete handling
let debounceTimer = null;
input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  const query = input.value.trim();
  if (!query) { suggestions.innerHTML=''; return; }
  debounceTimer = setTimeout(async () => {
    const results = await search(query);
    suggestions.innerHTML='';
    results.forEach(title => {
      const li = document.createElement('li');
      li.textContent = title;
      li.style.padding='4px';
      li.style.cursor='pointer';
      li.addEventListener('click', () => {
        input.value = title;
        suggestions.innerHTML='';
        currentSelection = title;
      });
      suggestions.appendChild(li);
    });
  }, 250);
});

submitBtn.addEventListener('click', async () => {
  const target = input.value.trim();
  if (!target) return;
  const source = engine.state.path[engine.state.path.length-1];
  try {
    await engine.proposeLink(source, target);
    badge.style.display = 'inline-block';
    setTimeout(() => badge.style.display='none', 1500);
    closeModal();
  } catch (e) {
    alert('Error proposing link: '+e.message);
  }
});

cancelBtn.addEventListener('click', closeModal);

export function initAddLinkButton(buttonEl) {
  buttonEl.addEventListener('click', openModal);
}
