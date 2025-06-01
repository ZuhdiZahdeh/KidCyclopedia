// script.js المعدّل كاملاً

let recorder, audioChunks = [];
let encyclopediaData;

// تحميل ملف JSON
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
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const keyboardContainer = document.getElementById("keyboard");
const langSelect = document.getElementById("language");
const catSelect = document.getElementById("category");
const keyboardTypeSelect = document.getElementById("keyboard-type");
const itemWord = document.getElementById("itemWord");
const itemImage = document.getElementById("itemImage");

// تحقق من حالة تسجيل الدخول
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("تم تسجيل الدخول UID:", user.uid);
    window.currentUserId = user.uid;
    document.querySelector('.login-container').style.display = 'none';

    db.collection('children').doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const studentData = doc.data();
        showWelcomeMessage(studentData.username);
      } else {
        console.log('لا توجد بيانات للطالب في قاعدة البيانات.');
      }
    });
  } else {
    window.currentUserId = null;
    document.querySelector('.login-container').style.display = 'block';
  }
});

// وظيفة الترحيب
function showWelcomeMessage(username) {
  const container = document.querySelector('.container');
  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'welcome-message';
  welcomeDiv.innerHTML = `
    <h2>👋 أهلاً بك يا ${username} في موسوعة الأطفال! 🎉</h2>
  `;
  container.insertBefore(welcomeDiv, container.firstChild);
}

// تسجيل طالب جديد
const saveStudentBtn = document.getElementById('saveStudentBtn');
saveStudentBtn.onclick = function() {
  const username = document.getElementById('studentName').value;
  const email = document.getElementById('studentEmail').value;
  const password = document.getElementById('studentPassword').value;
  const studentNumber = document.getElementById('studentNumber').value;
  const idNumber = document.getElementById('studentIdNumber').value;
  const age = parseInt(document.getElementById('studentAge').value, 10);
  const gender = document.getElementById('studentGender').value;

  if (!/^\d{9}$/.test(idNumber)) {
    alert('رقم الهوية يجب أن يكون مكونًا من 9 أرقام.');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      return db.collection('children').doc(uid).set({
        username,
        email,
        studentNumber,
        idNumber,
        age,
        gender,
        points: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => alert('تم تسجيل الطالب بنجاح!'))
    .catch(err => alert('خطأ: ' + err.message));
};

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

langSelect.onchange = updateKeyboard;
keyboardTypeSelect.onchange = updateKeyboard;
catSelect.onchange = updateKeyboard;
window.onload = updateKeyboard;

// تسجيل الصوت
startRecord.onclick = function() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      audioChunks = [];
      recorder.start();
      recorder.ondataavailable = e => audioChunks.push(e.data);
      stopRecord.disabled = false;
      startRecord.disabled = true;
    })
    .catch(err => alert('خطأ في الميكروفون: ' + err.message));
};
