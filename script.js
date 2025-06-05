// script.js
// from : firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyATXdsB_HxP3xY60qsZ6kAydC9zdQGDTaU",
  authDomain: "encyclopedialphabet.firebaseapp.com",
  projectId: "encyclopedialphabet",
  storageBucket: "encyclopedialphabet.appspot.com",
  messagingSenderId: "225712774247",
  appId: "1:225712774247:android:a5c82fbbcd341b137c08c2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function login() {
  const email = prompt("أدخل بريدك الإلكتروني:");
  const password = prompt("أدخل كلمة المرور:");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert('تم تسجيل الدخول بنجاح!'))
    .catch(err => alert('خطأ في تسجيل الدخول: ' + err.message));
}

function logout() {
  firebase.auth().signOut()
    .then(() => alert('تم تسجيل الخروج بنجاح!'))
    .catch(err => alert('خطأ في تسجيل الخروج: ' + err.message));
}

function loadContent(page) {
  fetch(page)
    .then(response => response.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
      const script = document.createElement('script');
      script.src = page.replace('.html', '.js');
      document.body.appendChild(script);
    })
    .catch(err => console.error('خطأ في تحميل الصفحة:', err));
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    loadViewedWords(user.uid);
    loadLeaderboard();
  }
});

function loadViewedWords(userId) {
  db.collection('children').doc(userId).collection('viewedWords')
    .orderBy('viewedAt', 'desc').limit(10)
    .onSnapshot(snapshot => {
      const list = document.getElementById('viewedWordsList');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.word} (${data.category}) [${data.language}]`;
        list.appendChild(li);
      });
    });
}

function loadLeaderboard() {
  db.collection('children').orderBy('points', 'desc').limit(5)
    .get().then(snapshot => {
      const list = document.getElementById('leaderboard');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.username} (${data.points})`;
        list.appendChild(li);
      });
    });
}
 
// اختبار الاتصال مع Firestore
db.collection("words").get()
  .then(snapshot => {
    console.log("Firestore connection successful. Number of documents:", snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });
  })
  .catch(error => {
    console.error("Error connecting to Firestore:", error);
  });