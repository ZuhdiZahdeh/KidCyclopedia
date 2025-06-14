firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('children').doc(user.uid).collection('viewedWords')
      .orderBy('viewedAt', 'desc').limit(10).onSnapshot(snapshot => {
        const list = document.getElementById('viewedWordsList');
        list.innerHTML = '';
        snapshot.forEach(doc => {
          const data = doc.data();
          list.innerHTML += `<li>${data.word} - ${data.category} [${data.language}]</li>`;
        });
      });
  }
});
 