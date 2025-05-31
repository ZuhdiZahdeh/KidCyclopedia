// script.js
let encyclopediaData;

fetch('encyclopedia_db.json')
  .then(response => response.json())
  .then(jsonData => {
    encyclopediaData = jsonData;
    updateKeyboard();
  })
  .catch(error => console.error('خطأ في تحميل ملف JSON:', error));

const arabicLetters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
const englishLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const hebrewLetters = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
const numbers = ["1","2","3","4","5","6","7","8","9","0"];

const keyboardContainer = document.getElementById("keyboard");
const langSelect = document.getElementById("language");
const catSelect = document.getElementById("category");
const keyboardTypeSelect = document.getElementById("keyboard-type");
const itemWord = document.getElementById("itemWord");
const itemImage = document.getElementById("itemImage");

// Firebase Auth
document.getElementById("registerBtn").onclick = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert('تم تسجيل الحساب بنجاح'))
    .catch(error => alert('خطأ في التسجيل: ' + error.message));
};

document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert('تم تسجيل الدخول بنجاح'))
    .catch(error => alert('خطأ في تسجيل الدخول: ' + error.message));
};

// وظائف الكيبورد والعرض
function generateKeyboard(keys) {
  keyboardContainer.innerHTML = "";
  keys.forEach(key => {
    const keyElement = document.createElement("div");
    keyElement.className = "key";
    keyElement.textContent = key;
    keyElement.onclick = () => handleKeyPress(key);
    keyboardContainer.appendChild(keyElement);
  });
}

function handleKeyPress(key) {
  const lang = langSelect.value;
  const category = catSelect.value;
  const entryName = encyclopediaData[lang][category][key];
  
  if (entryName) {
    itemWord.textContent = entryName;
    const fileName = entryName.replace(/\s+/g, '_').toLowerCase();
    itemImage.src = `images/${category}/${fileName}.png`;
    new Audio(`audio/${lang}/${fileName}.mp3`).play();
  } else {
    itemWord.textContent = "لا توجد بيانات لهذا المفتاح";
    itemImage.src = "";
  }
}

function updateKeyboard() {
  const lang = langSelect.value;
  const keyboardType = keyboardTypeSelect.value;
  if (keyboardType === "letters") {
    generateKeyboard(lang === "ar" ? arabicLetters : lang === "en" ? englishLetters : hebrewLetters);
  } else {
    generateKeyboard(numbers);
  }
}

//لضمان التحديث المباشر والآني، يمكنك استخدام ميزة Realtime Updates في Firestore:
firebase.firestore().collection('children')
  .orderBy('points', 'desc')
  .limit(10)
  .onSnapshot(snapshot => {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    snapshot.forEach(doc => {
      const child = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${child.username} - ${child.points} نقطة`;
      leaderboardList.appendChild(listItem);
    });
  });


langSelect.onchange = updateKeyboard;
keyboardTypeSelect.onchange = updateKeyboard;
catSelect.onchange = updateKeyboard;

window.onload = updateKeyboard;
