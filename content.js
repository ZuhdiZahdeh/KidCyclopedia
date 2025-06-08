const letters = {
  ar: ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","هـ","و","ي"],
  en: "abcdefghijklmnopqrstuvwxyz".split(""),
  he: ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"]
};

function generateKeyboard(language) {
  const keyboardDiv = document.getElementById('keyboard');
  keyboardDiv.innerHTML = '';

  letters[language].forEach(letter => {
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = letter;
    key.addEventListener('click', () => handleKeyPress(letter));
    keyboardDiv.appendChild(key);
  });
}

document.getElementById('language').addEventListener('change', (e) => {
  generateKeyboard(e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
  generateKeyboard('ar');
});

function handleKeyPress(letter) {
  const lang = document.getElementById('language').value;
  const category = document.getElementById('category').value;

  db.collection('words').doc(lang).get().then(doc => {
    if (doc.exists) {
      const words = doc.data()[category];
      const images = doc.data().images && doc.data().images[category];
      const wordData = words[letter];

      if (wordData) {
        document.getElementById('itemWord').innerHTML = `<span class="highlight">${letter}</span>${wordData.slice(1)}`;

        let imageFile = images && images[letter] ? images[letter] : wordData.replace(/\s+/g, '_').toLowerCase();

        // عرض الصورة من المجلد المحلي
        document.getElementById('itemImage').src = `images/${category}/${imageFile}.png`;

        // رابط الصوت من مستودع GitHub
        // المسار الصحيح والمؤكد من GitHub
        const audioUrl = `https://raw.githubusercontent.com/ZuhdiZahdeh/KidCyclopedia/main/audio/${lang}/${category}/${imageFile}.mp3`;
        const audio = new Audio(audioUrl);
        
        audio.play().then(() => {
          console.log('تم تشغيل الصوت بنجاح');
        }).catch(err => {
          console.error('خطأ في تشغيل الصوت:', err);
        });

        // حفظ سجل الطالب وزيادة النقاط
        const user = firebase.auth().currentUser;
        if (user) {
          const userRef = db.collection('children').doc(user.uid);
          userRef.collection('viewedWords').add({
            word: wordData,
            language: lang,
            category: category,
            viewedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          userRef.update({ points: firebase.firestore.FieldValue.increment(5) });
        }

      } else {
        document.getElementById('itemWord').textContent = 'لا توجد بيانات لهذا الحرف';
        document.getElementById('itemImage').src = '';
      }
    } else {
      console.error('لا توجد بيانات لهذه اللغة');
    }
  }).catch(err => {
    console.error('خطأ في جلب البيانات:', err);
    alert('حدث خطأ في الاتصال بقاعدة البيانات. تأكد من الاتصال.');
  });
}
