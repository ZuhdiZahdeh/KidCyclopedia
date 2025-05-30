const data = {
  ar: {
    animals: {
      أ: { word: "أَسَدٌ", file: "lion" },
    },
    fruits: {
      ت: { word: "تُفَّاحَةٌ", file: "apple" },
    },
    objects: {
      س: { word: "سَاعَةٌ", file: "clock" },
    }
  },
  en: {
    animals: {
      l: { word: "Lion", file: "lion" },
    },
    fruits: {
      a: { word: "Apple", file: "apple" },
    },
    objects: {
      c: { word: "Clock", file: "clock" },
    }
  },
  he: {
    animals: {
      א: { word: "אַרְיֵה", file: "lion" },
    },
    fruits: {
      ת: { word: "תַּפּוּחַ", file: "apple" },
    },
    objects: {
      ש: { word: "שָׁעוֹן", file: "clock" },
    }
  }
};

const arabicLetters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
const englishLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const hebrewLetters = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];

const keyboardContainer = document.querySelector(".keyboard");
const langSelect = document.getElementById("language");
const catSelect = document.getElementById("category");
const itemWord = document.getElementById("itemWord");
const itemImage = document.getElementById("itemImage");

function generateKeyboard(letters) {
  keyboardContainer.innerHTML = "";
  letters.forEach(letter => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = letter;
    key.addEventListener("click", () => handleKeyPress(letter));
    keyboardContainer.appendChild(key);
  });
}

function handleKeyPress(letter) {
  const lang = langSelect.value;
  const category = catSelect.value;
  const entry = data[lang]?.[category]?.[letter];

  if (entry) {
    itemImage.src = `images/${category}/${entry.file}.png`;
    const firstChar = entry.word[0];
    itemWord.innerHTML = `<span class="highlight">${firstChar}</span>${entry.word.slice(1)}`;
    const audio = new Audio(`audio/${lang}/${entry.file}.mp3`);
    audio.play();
  } else {
    itemWord.textContent = "لا توجد كلمة لهذا الحرف";
    itemImage.src = "";
  }
}

langSelect.addEventListener("change", () => {
  const selectedLang = langSelect.value;
  if (selectedLang === "ar") {
    generateKeyboard(arabicLetters);
  } else if (selectedLang === "en") {
    generateKeyboard(englishLetters);
  } else if (selectedLang === "he") {
    generateKeyboard(hebrewLetters);
  }
});

// البدء بالحروف العربية عند التحميل
generateKeyboard(arabicLetters);
