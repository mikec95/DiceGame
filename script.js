'use strict';

// DOM elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const playerElements = document.querySelectorAll('.player');
const diceElement = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Player data
const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Create array to house images of dice.
let diceImages = [];
for (let i = 0; i <= 6; i++) {
  diceImages.push(`dice-${i}.png`);
}

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

/**
 * Button Handlers
 */
rollBtn.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll (1-6)
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Display dice roll
    diceElement.src = diceImages[diceRoll];

    // dice rolling and score manipulation
    if (diceRoll !== 1) {
      // Update current users score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // Add current score to active players total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // Check score is >= 100 ? finish game : switch players
    // Check score is >= 100 ? finish game : switch players
    if (totalScores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});
