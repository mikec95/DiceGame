'use strict';

//** Game data */
let totalScore = 0; // Score on top in UI
let currentScore = 0; // Score on bottom in UI
let player0Turn = true;
let activePlayer = 0;
let playing = true;
let scores = [0, 0];

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const diceElement = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

function switchPlayer() {
  // switch player
  document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}
function playerWin() {
  //player wins
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  diceElement.classList.add('hidden');
  playing = false;
}
const init = function () {
  totalScore = 0; // Score on top in UI
  currentScore = 0; // Score on bottom in UI
  player0Turn = true;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  document.querySelector('#current--0').innerHTML = currentScore;
  document.querySelector('#current--1').innerHTML = currentScore;
  document.querySelector('#score--0').innerHTML = scores[0];
  document.querySelector('#score--1').innerHTML = scores[1];

  diceElement.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    let randomDiceRoll = Math.floor(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.setAttribute('src', `dice-${randomDiceRoll}.png`);

    if (randomDiceRoll !== 1) {
      // add dice roll to current score
      currentScore += randomDiceRoll;

      // Display new score
      document.querySelector(`#current--${activePlayer}`).innerHTML =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  // Add current score to active players total score
  scores[activePlayer] += currentScore;

  // Display total score
  document.querySelector(`#score--${activePlayer}`).innerHTML =
    scores[activePlayer];

  //If player won, invoke win experience, else switch player
  if (scores[activePlayer] >= 10) {
    playerWin();
  } else {
    switchPlayer();
  }
});
newGameBtn.addEventListener('click', init);

