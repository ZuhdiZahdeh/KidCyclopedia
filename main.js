// تحديث JavaScript (main.js) لتشغيل القائمة بوضوح:

function loadPage(page) {
  const mainContent = document.getElementById('main-content');
  fetch(`${page}.html`)
    .then(response => response.text())
    .then(data => {
      mainContent.innerHTML = data;
      if (page === 'content') {
        loadScript('content.js');
      } else if (page === 'register') {
        loadScript('register.js');
      }
    })
    .catch(err => console.error('خطأ في تحميل الصفحة:', err));
}

function loadScript(src) {
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) existingScript.remove();

  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

//هذا الكود سيقوم بجلب محتوى games.html ووضعه داخل عنصر <main> بدون تحميل صفحة جديدة.
document.getElementById('gamesLink').addEventListener('click', function(event) {
  event.preventDefault(); // لمنع الانتقال لصفحة جديدة
  fetch('games.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('main-content').innerHTML = data;
    })
    .catch(error => console.error('خطأ في جلب المحتوى:', error));
});
//في موقعك الرئيسي (main-content) لاستدعاء اللعبة دون فتح صفحة جديدة:
document.getElementById('gamesLink').addEventListener('click', function(e){
  e.preventDefault();
  fetch('memory-game.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
    });
});

