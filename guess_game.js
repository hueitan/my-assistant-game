#!/usr/bin/env node
// Simple number guessing game
// The computer picks a random integer between 1 and 100.
// You try to guess it. After each guess you get 'higher' or 'lower' clues.
// Type your guess and press Enter. To quit, type 'exit' or Ctrl+C.

const readline = require('readline');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const target = randomInt(1, 100);
let attempts = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Your guess (1-100): '
});

console.log('Welcome to the Number Guessing Game!');
console.log('I have chosen a number between 1 and 100. Can you guess it?');
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    rl.close();
    return;
  }
  const guess = Number(input);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    console.log('Please enter an integer between 1 and 100.');
  } else {
    attempts++;
    if (guess === target) {
      console.log(`🎉 Correct! You guessed it in ${attempts} ${attempts===1?'try':'tries'}.`);
      rl.close();
      return;
    } else if (guess < target) {
      console.log('Higher!');
    } else {
      console.log('Lower!');
    }
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});
