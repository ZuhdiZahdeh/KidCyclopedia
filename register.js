// الملف register.js (تسجيل الطالب مع التحقق من البيانات)

document.getElementById('saveStudentBtn').onclick = function() {
  const username = document.getElementById('studentName').value.trim();
  const email = document.getElementById('studentEmail').value.trim();
  const password = document.getElementById('studentPassword').value;
  const studentNumber = document.getElementById('studentNumber').value.trim();
  const idNumber = document.getElementById('studentIdNumber').value.trim();
  const age = parseInt(document.getElementById('studentAge').value, 10);
  const gender = document.getElementById('studentGender').value;

  if (!username || !email || !password || !studentNumber || !idNumber || !age) {
    alert('يرجى تعبئة جميع الحقول.');
    return;
  }

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
    .then(() => {
      alert('تم تسجيل الطالب بنجاح!');
      document.getElementById('studentName').value = '';
      document.getElementById('studentEmail').value = '';
      document.getElementById('studentPassword').value = '';
      document.getElementById('studentNumber').value = '';
      document.getElementById('studentIdNumber').value = '';
      document.getElementById('studentAge').value = '';
      document.getElementById('studentGender').selectedIndex = 0;
    })
    .catch(err => alert('خطأ في التسجيل: ' + err.message));
};
 