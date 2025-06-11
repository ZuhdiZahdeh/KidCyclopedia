async function createBoard(category = 'animals', activityType = 'words', language = 'ar', level = 1) {
  const gameBoard = document.getElementById('game-board');
  const scoreElement = document.getElementById('score');
  const flipSound = document.getElementById('flip-sound');

  let matchedPairs = 0;
  let selectedCards = [];
  let score = 0;
  scoreElement.textContent = score;

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
    card.classList.add('card');
    card.dataset.card = cardData.content;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image:url('images/animals/${cardData.imageUrl}.png')"></div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

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
        showCongrats();
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      score = Math.max(score - 2, 0);
      scoreElement.textContent = score;
    }

    selectedCards = [];
  }

  function showCongrats() {
    document.getElementById('main-content').innerHTML = `
      <div class="congrats">
        🎉 مبروك! أنت رائع! 🎉
        <audio autoplay><source src="audio/clap.mp3" type="audio/mp3"></audio>
      </div>`;
  }
}
