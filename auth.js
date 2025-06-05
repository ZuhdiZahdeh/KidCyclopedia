//الملف auth.js (تسجيل الدخول وتسجيل الخروج بوضوح)

firebase.auth().onAuthStateChanged(user => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const welcomeMessage = document.getElementById('welcomeMessage');

  if (user) {
    document.querySelector('.login-container').style.display = 'none';
    logoutBtn.style.display = 'inline-block';

    db.collection('children').doc(user.uid).get().then(doc => {
      if (doc.exists) {
        welcomeMessage.innerHTML = `<h2>👋 أهلاً بك يا ${doc.data().username}! 🎉</h2>`;
      } else {
        welcomeMessage.innerHTML = '<h2>👋 أهلاً بك في الموسوعة!</h2>';
      }
    });
  } else {
    document.querySelector('.login-container').style.display = 'block';
    logoutBtn.style.display = 'none';
    welcomeMessage.innerHTML = '';
  }
});

// تسجيل الدخول
document.getElementById('loginBtn').onclick = function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert('تم تسجيل الدخول بنجاح!'))
    .catch(err => alert('خطأ في تسجيل الدخول: ' + err.message));
};

// تسجيل الخروج
document.getElementById('logoutBtn').onclick = function() {
  firebase.auth().signOut()
    .then(() => alert('تم تسجيل الخروج بنجاح!'))
    .catch(err => alert('خطأ في تسجيل الخروج: ' + err.message));
};
