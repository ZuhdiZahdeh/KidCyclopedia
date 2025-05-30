 const data = {
  ar: {
    animals: {
      أ: { word: "أَسَدٌ", file: "lion" },
      ف: { word: "فِيلٌ", file: "elephant" },
      ز: { word: "زَرَافَةٌ", file: "giraffe" },
      ن: { word: "نَمِرٌ", file: "tiger" },
      د: { word: "دُبٌّ", file: "bear" },
      غ: { word: "غَزَالٌ", file: "gazelle" }
    },
    fruits: {
      ت: { word: "تُفَّاحَةٌ", file: "apple" },
      م: { word: "مَوْزٌ", file: "banana" },
      ب: { word: "بُرْتُقَالٌ", file: "orange" },
      ف: { word: "فَرَاوِلَةٌ", file: "strawberry" },
      ع: { word: "عِنَبٌ", file: "grapes" }
    },
    objects: {
      س: { word: "سَيَّارَةٌ", file: "car" },
      م: { word: "مَنْزِلٌ", file: "house" },
      ك: { word: "كِتَابٌ", file: "book" },
      ك: { word: "كُرَةٌ", file: "ball" },
      ق: { word: "قَلَمٌ", file: "pen" }
    }
  },

  en: {
    animals: {
      l: { word: "Lion", file: "lion" },
      e: { word: "Elephant", file: "elephant" },
      g: { word: "Giraffe", file: "giraffe" },
      t: { word: "Tiger", file: "tiger" },
      b: { word: "Bear", file: "bear" },
      g2: { word: "Gazelle", file: "gazelle" }
    },
    fruits: {
      a: { word: "Apple", file: "apple" },
      b: { word: "Banana", file: "banana" },
      o: { word: "Orange", file: "orange" },
      s: { word: "Strawberry", file: "strawberry" },
      g: { word: "Grapes", file: "grapes" }
    },
    objects: {
      c: { word: "Car", file: "car" },
      h: { word: "House", file: "house" },
      b2: { word: "Book", file: "book" },
      b3: { word: "Ball", file: "ball" },
      p: { word: "Pen", file: "pen" }
    }
  },

  he: {
    animals: {
      א: { word: "אַרְיֵה", file: "lion" },
      פ: { word: "פִּיל", file: "elephant" },
      ג: { word: "גִ'ירָפָה", file: "giraffe" },
      ט: { word: "טִיגְרִיס", file: "tiger" },
      ד: { word: "דּוֹב", file: "bear" },
      צ: { word: "צְבִי", file: "gazelle" }
    },
    fruits: {
      ת: { word: "תַּפּוּחַ", file: "apple" },
      ב: { word: "בָּנָנָה", file: "banana" },
      פ2: { word: "תַּפּוּז", file: "orange" },
      ת2: { word: "תּוּת", file: "strawberry" },
      ע: { word: "עֲנָבִים", file: "grapes" }
    },
    objects: {
      מ: { word: "מְכוֹנִית", file: "car" },
      ב: { word: "בַּיִת", file: "house" },
      ס: { word: "סֵפֶר", file: "book" },
      כ: { word: "כַּדוּר", file: "ball" },
      ע2: { word: "עֵט", file: "pen" }
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

