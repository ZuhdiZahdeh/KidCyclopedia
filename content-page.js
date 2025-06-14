const letters = {
  ar: ["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","هـ","و","ي"],
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  he: ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"]
};

const languageSelect = document.getElementById("language");
const categorySelect = document.getElementById("category");
const keyboard = document.getElementById("keyboard");
const itemImage = document.getElementById("itemImage");
const itemWord = document.getElementById("itemWord");

// دالة تشغيل الصوت مع Fallback في حال لم يوجد الملف
const playSoundWithFallback = (path, fallbackPath) => {
  const audio = new Audio(path);
  audio.onerror = () => {
    if (fallbackPath !== path) {
      const fallback = new Audio(fallbackPath);
      fallback.play();
    }
  };
  audio.play();
};

const createKeyboard = () => {
  keyboard.innerHTML = "";
  itemWord.textContent = "اختر حرفًا أو رقمًا";
  itemImage.src = "";

  const lang = languageSelect.value;
  const currentLetters = letters[lang] || [];

  currentLetters.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => showItem(letter);
    keyboard.appendChild(btn);
  });
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
      // وجدنا الكلمة والصورة
      itemWord.textContent = word;

      const imgPath = `images/${category}/${imageFile.toLowerCase()}.png`;
      itemImage.onerror = () => {
        itemImage.src = 'images/placeholder.png';
      };
      itemImage.src = imgPath;

      const soundPath = `audio/${lang}/${category}/${imageFile.toLowerCase()}.mp3`;
      const fallbackSound = `audio/${lang}/${category}/placeholder.mp3`;
      playSoundWithFallback(soundPath, fallbackSound);

    } else {
      // لا يوجد كلمة/صورة لهذا الحرف
      itemWord.textContent = "لا توجد كلمة لهذا الحرف.";
      itemImage.src = "images/placeholder.png";
      const fallbackSound = `audio/${lang}/${category}/placeholder.mp3`;
      playSoundWithFallback(fallbackSound, fallbackSound);
    }

  } catch (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
    itemWord.textContent = "حدث خطأ أثناء تحميل الكلمة.";
    itemImage.src = "images/placeholder.png";
    const lang = languageSelect.value;
    const category = categorySelect.value;
    const fallbackSound = `audio/${lang}/${category}/placeholder.mp3`;
    playSoundWithFallback(fallbackSound, fallbackSound);
  }
};

// دوال إضافية لأصوات التصفيق وقلب البطاقة
const playClapSound = () => {
  playSoundWithFallback("audio/clap.mp3", "audio/flip.mp3");
};
const playFlipSound = () => {
  playSoundWithFallback("audio/flip.mp3", "audio/clap.mp3");
};

languageSelect.onchange = createKeyboard;
categorySelect.onchange = createKeyboard;

// إنشاء لوحة المفاتيح عند البدء
createKeyboard();
