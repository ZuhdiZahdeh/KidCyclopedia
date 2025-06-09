const cardsArray = ['sheep', 'camel', 'cat', 'dog', 'horse', 'bear', 'snake', 'giraffe'];

let matchedPairs = 0;
let selectedCards = [];
let score = 0;

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const flipSound = document.getElementById('flip-sound');

  matchedPairs = 0;
  selectedCards = [];
  score = 0;
  scoreElement.textContent = score;

  let cards = [...cardsArray, ...cardsArray];
  cards.sort(() => Math.random() - 0.5);

  gameBoard.innerHTML = '';

  cards.forEach(cardName => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.card = cardName;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image: url('images/animals/${cardName}.png')"></div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    document.getElementById('flip-sound').play();
    selectedCards.push(this);

    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const scoreElement = document.getElementById('score');
  const [card1, card2] = selectedCards;

  if (card1.dataset.card === card2.dataset.card) {
    matchedPairs++;
    score += 10;
    scoreElement.textContent = score;

    if (matchedPairs === cardsArray.length) {
      setTimeout(() => alert('ممتاز! أكملت المستوى بنجاح!'), 300);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    score -= 2;
    if (score < 0) score = 0;
    scoreElement.textContent = score;
  }

  selectedCards = [];
}
