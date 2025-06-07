//الملف auth.js (تسجيل الدخول وتسجيل الخروج بوضوح)
  firebase.auth().onAuthStateChanged(user => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const welcomeMessage = document.getElementById('welcomeMessage');
 

  if (user) {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) loginContainer.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
 
     db.collection('children').doc(user.uid).get().then(doc => {
       if (doc.exists) {
         welcomeMessage.innerHTML = `<h2>👋 أهلاً بك يا ${doc.data().username}! 🎉</h2>`;
       } else {
         welcomeMessage.innerHTML = '<h2>👋 أهلاً بك في الموسوعة!</h2>';
       }
     });
  } else {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) loginContainer.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (welcomeMessage) welcomeMessage.innerHTML = '';
  }
});
 
 // تسجيل الدخول
const loginBtnEl = document.getElementById('loginBtn');
if (loginBtnEl) loginBtnEl.onclick = function() {
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
 
   firebase.auth().signInWithEmailAndPassword(email, password)
     .then(() => alert('تم تسجيل الدخول بنجاح!'))
     .catch(err => alert('خطأ في تسجيل الدخول: ' + err.message));

};
 
 // تسجيل الخروج
const logoutBtnEl = document.getElementById('logoutBtn');
if (logoutBtnEl) logoutBtnEl.onclick = function() {
   firebase.auth().signOut()
     .then(() => alert('تم تسجيل الخروج بنجاح!'))
     .catch(err => alert('خطأ في تسجيل الخروج: ' + err.message));

};
