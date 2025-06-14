// main.js

// انتظار تحميل الصفحة بالكامل

document.addEventListener('DOMContentLoaded', function () {

  // دالة لتحميل محتوى HTML وجافا سكريبت لأي صفحة بشكل ديناميكي
  const loadContent = (page) => {
    fetch(`${page}.html`)
      .then(res => res.text())
      .then(html => {
        document.querySelector('.content-main').innerHTML = html;
        const script = document.createElement('script');
        script.src = `${page}.js`;
        document.body.appendChild(script);
      })
      .catch(err => console.error("Error loading page:", err));
  };

  // تحميل اللعبة عند الضغط على رابط "لعبة الذاكرة"
  const loadMemoryGame = () => {
    fetch('memory-game.html')
      .then(response => response.text())
      .then(html => {
        document.querySelector('.content-main').innerHTML = html;
        const gameScript = document.createElement('script');
        gameScript.src = 'memory-game.js';
        document.body.appendChild(gameScript);
      })
      .catch(err => console.error('خطأ في تحميل اللعبة:', err));
  };

  // روابط الـ header
  const contentLink = document.querySelector('a[href="content-page.html"]');
  const gamesLink = document.querySelector('a[href="games-menu.html"]');
  const registerLink = document.querySelector('a[href="register-page.html"]');
  const homeLink = document.querySelector('a[href="index.html"]');

  if (contentLink) {
    contentLink.onclick = (e) => { e.preventDefault(); loadContent('content-page'); };
  }

  if (gamesLink) {
    gamesLink.onclick = (e) => { e.preventDefault(); loadContent('games-menu'); };
  }

  if (registerLink) {
    registerLink.onclick = (e) => { e.preventDefault(); loadContent('register-page'); };
  }

  if (homeLink) {
    homeLink.onclick = (e) => { e.preventDefault(); location.reload(); };
  }

  // رابط لعبة الذاكرة
  document.addEventListener('click', function(e) {
    if(e.target && e.target.textContent === "لعبة الذاكرة") {
      e.preventDefault();
      loadMemoryGame();
    }
  });

  // Responsive adjustments for game board
  const adjustGameBoard = () => {
    const gameBoard = document.querySelector('.game-board');
    if (gameBoard) {
      const cardsCount = gameBoard.children.length;
      const columns = Math.sqrt(cardsCount);
      gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
  };

  window.addEventListener('resize', adjustGameBoard);

  // أزرار القائمة الجانبية
  const loginBtn = document.querySelector('.sidebar-right-top button:nth-child(1)');
  const logoutBtn = document.querySelector('.sidebar-right-top button:nth-child(2)');
  const leaderboardBtn = document.querySelector('.sidebar-right-top button:nth-child(3)');

  if (loginBtn) {
    loginBtn.onclick = () => { loadContent('login-page'); };
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      auth.signOut().then(() => alert('تم تسجيل الخروج بنجاح!'));
    };
  }

  if (leaderboardBtn) {
    leaderboardBtn.onclick = () => { loadContent('leaderboard-page'); };
  }

});
