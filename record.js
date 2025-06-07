// الملف record.js (تسجيل الصوت ورفعه)

let recorder, audioChunks = [];

const startBtn = document.getElementById('startRecord');
if (startBtn) startBtn.onclick = function() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      audioChunks = [];
      recorder.start();
      recorder.ondataavailable = e => audioChunks.push(e.data);

      document.getElementById('stopRecord').disabled = false;
      this.disabled = true;
    })
    .catch(err => alert('خطأ في الوصول للميكروفون: ' + err.message));
};

const stopBtn = document.getElementById('stopRecord');
if (stopBtn) stopBtn.onclick = function() {
  recorder.stop();
  recorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
    const audioRef = storage.ref('recordings/' + Date.now() + '.mp3');

    audioRef.put(audioBlob)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(audioUrl => {
        const word = document.getElementById('wordToRecord').value;
        const language = document.getElementById('recLanguage').value;
        const category = document.getElementById('recCategory').value;
        const keyboardType = document.getElementById('recKeyboardType').value;

        return db.collection('recordings').add({
          childId: firebase.auth().currentUser.uid,
          word,
          language,
          category,
          keyboardType,
          audioUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        alert('تم رفع التسجيل بنجاح!');
        document.getElementById('startRecord').disabled = false;
        document.getElementById('stopRecord').disabled = true;
      })
      .catch(err => alert('خطأ في رفع التسجيل: ' + err.message));
  };
};

 