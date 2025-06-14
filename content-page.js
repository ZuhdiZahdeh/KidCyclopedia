const languageSelect = document.getElementById("language");
const categorySelect = document.getElementById("category");
const keyboard = document.getElementById("keyboard");
const itemImage = document.getElementById("itemImage");
const itemWord = document.getElementById("itemWord");

const createKeyboard = async () => {
  keyboard.innerHTML = "";
  itemWord.textContent = "اختر حرفًا أو رقمًا";
  itemImage.src = "";

  const lang = languageSelect.value;
  const category = categorySelect.value;

  try {
    const doc = await db.collection("words").doc(lang).get();
    if (!doc.exists) {
      keyboard.innerHTML = "<p>لا توجد بيانات متاحة.</p>";
      return;
    }

    const data = doc.data();
    const letterMap = data[category];

    if (!letterMap) {
      keyboard.innerHTML = "<p>لا توجد كلمات لهذه الفئة.</p>";
      return;
    }

    const availableLetters = Object.keys(letterMap);

    availableLetters.forEach(letter => {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.onclick = () => showItem(letter);
      keyboard.appendChild(btn);
    });

  } catch (error) {
    console.error("حدث خطأ أثناء جلب الحروف:", error);
    keyboard.innerHTML = "<p>فشل تحميل لوحة المفاتيح.</p>";
  }
};

const showItem = async (letter) => {
  const lang = languageSelect.value;
  const category = categorySelect.value;

  try {
    const doc = await db.collection("words").doc(lang).get();
    const data = doc.data();

    const word = data[category]?.[letter];
    const imageFile = data.images?.[category]?.[letter];

    if (word && imageFile) {
      itemWord.textContent = word;

      const imgPath = `images/${category}/${imageFile.toLowerCase()}.png`;
      itemImage.onerror = () => {
        itemImage.src = 'images/placeholder.png';
      };
      itemImage.src = imgPath;

      const audio = new Audio(`audio/${lang}/${imageFile.toLowerCase()}.mp3`);
      audio.play();
    } else {
      itemWord.textContent = "لا توجد كلمة لهذا الحرف.";
      itemImage.src = "";
    }

  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
    itemWord.textContent = "حدث خطأ أثناء تحميل الكلمة.";
  }
};

languageSelect.onchange = createKeyboard;
categorySelect.onchange = createKeyboard;

createKeyboard();