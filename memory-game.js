async function createBoard(category, activityType, language, level) {
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const celebration = document.getElementById('celebration');
  
  let matchedPairs = 0, selectedCards = [], score = 0;
  scoreElement.textContent = score;
  celebration.style.display = 'none';

  const snapshot = await firebase.firestore()
    .collection('memoryCards').doc(category).collection('cards').limit(level * 4).get();

  const cardsArray = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    cardsArray.push({
      content: data[activityType][language],
      imageUrl: data.imageUrl
    });
  });

  let cards = [...cardsArray, ...cardsArray];
  cards.sort(() => Math.random() - 0.5);
  gameBoard.innerHTML = '';

  cards.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('memory-game-card');
    card.dataset.card = cardData.content;

    card.innerHTML = `
      <div class="game-card-inner">
        <div class="game-card-front"></div>
        <div class="game-card-back" style="background-image:url('${cardData.imageUrl}')">
          <span class="card-text">${cardData.content}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      selectedCards.push(this);
      if (selectedCards.length === 2) setTimeout(checkMatch, 800);
    }
  }

  function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.card === card2.dataset.card) {
      matchedPairs++;
      score += 10;
      scoreElement.textContent = score;
      if (matchedPairs === cardsArray.length) {
        celebration.style.display = 'block';
        document.getElementById('clapSound').play();
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      score = Math.max(score - 2, 0);
      scoreElement.textContent = score;
    }
    selectedCards = [];
  }
}

document.getElementById('startGameBtn').onclick = function () {
  const category = document.getElementById('categorySelect').value;
  const activityType = document.getElementById('activityType').value;
  const language = document.getElementById('languageSelect').value;
  const level = parseInt(document.getElementById('levelSelect').value, 10);
  
  const gameBoard = document.getElementById('game-board');
  gameBoard.className = 'game-board'; // reset class
  gameBoard.classList.add(`level-${level}`); // apply class based on level
  
  createBoard(category, activityType, language, level);
};
