import { engine } from "./main.js";
import { playSuccess, playError } from "../audio.js";

// Create toggle UI in header
let header = document.querySelector('header');
if (!header) {
  header = document.createElement('header');
  document.body.prepend(header);
}

const toggleContainer = document.createElement('div');
toggleContainer.style.display = 'inline-block';
toggleContainer.style.marginLeft = '1rem';

toggleContainer.innerHTML = `
  <label class="mw-ui-checkbox" style="cursor:pointer;">
    <input type="checkbox" id="audio-toggle" ${engine.audio && engine.audio.enabled ? 'checked' : ''} />
    <span>Audio</span>
  </label>
`;
header.appendChild(toggleContainer);

const checkbox = document.getElementById('audio-toggle');
checkbox.addEventListener('change', () => {
  const enabled = checkbox.checked;
  if (!engine.audio) engine.audio = {};
  engine.audio.enabled = enabled;
  localStorage.setItem('audioEnabled', enabled);
});

// Initialize from storage
const saved = localStorage.getItem('audioEnabled');
if (saved !== null) {
  const enabled = saved === 'true';
  checkbox.checked = enabled;
  if (!engine.audio) engine.audio = {};
  engine.audio.enabled = enabled;
}

// Export nothing; engine will call playSuccess/playError based on its own logic.
