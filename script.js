'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const playerOne = document.getElementById('name--0');
const playerTwo = document.getElementById('name--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winnerScreen = document.getElementById('game-screen');
const playButton = document.querySelector('.player--submit');
const playerNameSection = document.querySelector('.player--section');
const player1 = document.getElementById('player--one');
const player2 = document.getElementById('player--two');
const header = document.createElement('h1');

let scores, currentScore, activePlayer, playing, winner;

//Players name Entry
//Promt
// let player1 = prompt('Enter Player 1 Name: ');
// let player2 = prompt('Enter Player 2 Name: ');

// function getPlayerName() {

// var result = document.getElementById('result');

// if (nameField.length < 2) {
//     result.textContent = 'Username must contain at least 2 characters';
//     //alert('Username must contain at least 3 characters');
// } else {
//     result.textContent = 'Your username is: ' + nameField;
//     //alert(nameField);
// }
// }

// console.log(player1);

playButton.addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    playerOne.textContent = player1.value;
    playerTwo.textContent = player2.value;
    playerNameSection.classList.add('game');
    winnerScreen.classList.remove('game');
  },
  true
);
console.log(player1.value);
console.log(player2.value);

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const winnerDecider = function () {
  header.textContent = `Congratulations! ${winner} is the winner. 🥇🎉`;
  header.style.fontSize = '40px';
  header.style.color = '#fff';
  document.body.append(header);
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById('game-screen').classList.add('game');
      if (!activePlayer) {
        winner = playerOne.textContent;
      } else {
        winner = playerTwo.textContent;
      }

      winnerDecider();

      // document.body.append(btnNew);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init;
  playerNameSection.classList.remove('game');
  winnerScreen.classList.add('game');
});
