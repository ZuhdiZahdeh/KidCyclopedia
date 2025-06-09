const cardsArray = ['apple', 'banana', 'cat', 'dog', 'car', 'pen', 'sun', 'moon'];

let gameBoard = document.getElementById('game-board');
let scoreElement = document.getElementById('score');
let flipSound = document.getElementById('flip-sound');

let matchedPairs = 0;
let selectedCards = [];
let score = 0;

function createBoard() {
  let cards = [...cardsArray, ...cardsArray]; // مضاعفة البطاقات
  cards.sort(() => Math.random() - 0.5);

  cards.forEach(cardName => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.card = cardName;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image: url('images/cards/${cardName}.png')"></div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flipSound.play();
    selectedCards.push(this);

    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = selectedCards;

  if (card1.dataset.card === card2.dataset.card) {
    matchedPairs++;
    score += 10;
    scoreElement.textContent = score;
    if (matchedPairs === cardsArray.length) {
      alert('ممتاز! أكملت المستوى بنجاح!');
      // هنا يمكن زيادة الصعوبة (إضافة بطاقات جديدة)
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

createBoard();
