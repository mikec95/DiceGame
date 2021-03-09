'use strict';

// DOM elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const player0ScoreElement = document.getElementById(`current--0`);
const player1ScoreElement = document.getElementById('current--1');
const player0TotalScoreElement = document.getElementById(`score--0`);
const player1TotalScoreElement = document.getElementById('score--1');

const diceElement = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Player data
let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Create array to house images of dice.
let diceImages = [];
for (let i = 0; i <= 6; i++) {
  diceImages.push(`images/dice-${i}.png`);
}

/**
 * Button Handlers
 */
newGameBtn.addEventListener('click', init);

rollBtn.addEventListener('click', function () {
  if (playing) {
    // Show dice image
    diceElement.classList.remove('hidden');

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

    // Check score is >= 100 if so, complete the game. Else, switch players
    if (totalScores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //hide dice after win
      diceElement.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

function init() {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.querySelector('.player--winner').classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  player0ScoreElement.textContent = 0;
  player0TotalScoreElement.textContent = 0;
  player1ScoreElement.textContent = 0;
  player1TotalScoreElement.textContent = 0;
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
