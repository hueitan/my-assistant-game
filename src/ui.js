import { newGame, checkGuess, getScore } from './game.js';

const extractEl = document.getElementById('extract'); // We'll reuse this for instructions
const guessInput = document.getElementById('guess');
const goBtn = document.getElementById('go');
const resetBtn = document.getElementById('reset');
const hintBtn = document.getElementById('hint');
const logEl = document.getElementById('log');
const scoreEl = document.getElementById('score');
const darkToggle = document.getElementById('dark-toggle');

function init() {
  newGame();
  showMessage('I have chosen a number between 1 and 100. Try to guess it!');
  updateScore();
}

function showMessage(msg) {
  extractEl.textContent = msg;
}

function updateScore() {
  scoreEl.textContent = `Score: ${getScore()}`;
}

function log(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

function handleGuess() {
  const val = guessInput.value.trim();
  if (!val) return;
  const { isCorrect, target } = checkGuess(val);
  if (isCorrect) {
    log(`✅ Correct! The number was ${target}.`);
    updateScore();
    // start new round after short delay
    setTimeout(() => {
      newGame();
      showMessage('New number chosen. Guess again!');
    }, 1500);
  } else {
    log(`❌ ${val} is not correct.`);
  }
  guessInput.value = '';
  guessInput.focus();
}

function toggleDark() {
  document.body.classList.toggle('dark');
}

goBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', () => { newGame(); showMessage('Game reset. New number chosen.'); });
hintBtn.addEventListener('click', () => {
  // reveal target as hint (for demo purpose)
  const hint = `Hint: number is between ${Math.max(1, target-10)} and ${Math.min(100, target+10)}`;
  log(hint);
});
if (darkToggle) darkToggle.addEventListener('click', toggleDark);

init();
