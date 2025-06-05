document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    handleKeyPress(key.textContent);
  });
});

function handleKeyPress(letter) {
  const lang = document.getElementById('language').value;
  const category = document.getElementById('category').value;
  const wordRef = db.collection('words').doc(lang);

  wordRef.get().then(doc => {
    if (doc.exists) {
      const words = doc.data()[category];
      const wordData = words[letter];

      if (wordData) {
        document.getElementById('itemWord').innerHTML = `<span class="highlight">${letter}</span>${wordData.slice(1)}`;
        const fileName = wordData.replace(/\s+/g, '_').toLowerCase();
        document.getElementById('itemImage').src = `images/${category}/${fileName}.png`;
        
        const audio = new Audio(`audio/${lang}/${fileName}.mp3`);
        audio.play();

        const user = firebase.auth().currentUser;
        if (user) {
          const userRef = db.collection('children').doc(user.uid);
          userRef.collection('viewedWords').add({
            word: wordData,
            language: lang,
            category: category,
            viewedAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          userRef.update({
            points: firebase.firestore.FieldValue.increment(5)
          });
        }
      } else {
        document.getElementById('itemWord').textContent = 'لا توجد بيانات لهذا الحرف';
        document.getElementById('itemImage').src = '';
      }
    } else {
      console.error('لا توجد بيانات لهذه اللغة');
    }
  }).catch(err => console.error('خطأ في جلب البيانات:', err));
}
 