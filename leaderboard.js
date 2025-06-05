document.addEventListener('DOMContentLoaded', () => {
  const leaderboardList = document.getElementById('leaderboardList');

  db.collection('children')
    .orderBy('points', 'desc')
    .limit(10)
    .get()
    .then(snapshot => {
      leaderboardList.innerHTML = '';
      snapshot.forEach(doc => {
        const student = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = `${student.username} - ${student.points} نقطة`;
        leaderboardList.appendChild(listItem);
      });
    })
    .catch(err => {
      console.error('خطأ في استرجاع البيانات:', err.message);
      leaderboardList.textContent = 'حدث خطأ أثناء تحميل البيانات.';
    });
});
