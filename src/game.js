let target = Math.floor(Math.random() * 100) + 1;
let score = 0;

export function newGame() {
  target = Math.floor(Math.random() * 100) + 1;
}

export function checkGuess(guess) {
  const isCorrect = Number(guess) === target;
  if (isCorrect) {
    score++;
  }
  return { isCorrect, target };
}

export function getScore() {
  return score;
}
