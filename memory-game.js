const images = [
  'apple', 'cat', 'dog', 'banana', 'car', 'pen'
];

const gameContainer = document.getElementById('memory-game');

let cards = [];
let matchedPairs = 0;
let selectedCards = [];

// Duplicate and shuffle cards
function createCards() {
  cards = [...images, ...images];
  cards.sort(() => Math.random() - 0.5);

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.name = card;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '?';

    cardElement.appendChild(front);
    cardElement.appendChild(back);
    gameContainer.appendChild(cardElement);

    cardElement.addEventListener('click', flipCard);
  });
}

function flipCard() {
  if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    selectedCards.push(this);

    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [first, second] = selectedCards;
  
  if (first.dataset.name === second.dataset.name) {
    matchedPairs++;
    selectedCards = [];
    if (matchedPairs === images.length) {
      alert('أحسنت! أكملت اللعبة بنجاح.');
    }
  } else {
    first.classList.remove('flipped');
    second.classList.remove('flipped');
    selectedCards = [];
  }
}

createCards();
