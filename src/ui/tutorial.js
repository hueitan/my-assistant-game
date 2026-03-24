// Simple tutorial flow using Codex tooltip style
// This implementation shows a sequence of alerts; in a real app you'd use proper tooltip library.
import { engine } from './main.js';

const steps = [
  { message: 'Welcome! This is your start article. Click any link to navigate.', targetId: null },
  { message: 'Try proposing a new link using the "Add Link" button in the header.', targetId: 'addlink-button' },
  { message: 'Open the Graph panel to see your path visualised.', targetId: 'graph-panel' },
  { message: 'Check the Template Quest panel for required fields.', targetId: 'template-quest' },
  { message: 'Good luck! Reach the target article before time runs out.', targetId: null }
];
let currentStep = 0;

function showStep() {
  const step = steps[currentStep];
  if (!step) return;
  const target = step.targetId ? document.getElementById(step.targetId) : null;
  if (target) {
    // highlight target briefly
    const original = target.style.boxShadow;
    target.style.boxShadow = '0 0 8px 2px #ff0';
    setTimeout(() => target.style.boxShadow = original, 2000);
  }
  alert(step.message);
  currentStep++;
  if (currentStep < steps.length) {
    const next = confirm('Next tip?');
    if (next) showStep();
  }
}

export function startTutorial() {
  showStep();
}
