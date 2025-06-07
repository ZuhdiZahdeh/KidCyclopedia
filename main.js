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
