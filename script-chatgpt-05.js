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
      ت: { word: "تُفَّاحَةٌ", file: "apple" },
      م: { word: "مَوْزٌ", file: "banana" },
      ب: { word: "بُرْتُقَالٌ", file: "orange" },
      ف: { word: "فَرَاوِلَةٌ", file: "strawberry" },
      ع: { word: "عِنَبٌ", file: "grapes" }
    },
    objects: {
      س: { word: "سَيَّارَةٌ", file: "car" },
      ز: { word: "مَنْزِلٌ", file: "house" },
      ك: { word: "كِتَابٌ", file: "book" },
      ر: { word: "كُرَةٌ", file: "ball" },
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
      z: { word: "Gazelle", file: "gazelle" }
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
      k: { word: "Book", file: "book" },
      r: { word: "Ball", file: "ball" },
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
      פ: { word: "תַּפּוּז", file: "orange" },
      ת2: { word: "תּוּת", file: "strawberry" },
      ע: { word: "עֲנָבִים", file: "grapes" }
    },
    objects: {
      מ: { word: "מְכוֹנִית", file: "car" },
      ב2: { word: "בַּיִת", file: "house" },
      ס: { word: "סֵפֶר", file: "book" },
      כ: { word: "כַּדוּר", file: "ball" },
      ע2: { word: "עֵט", file: "pen" }
    }
  }
};


const arabicLetters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
const englishLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const hebrewLetters = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const keyboardContainer = document.getElementById("keyboard");
const langSelect = document.getElementById("language");
const catSelect = document.getElementById("category");
const keyboardTypeSelect = document.getElementById("keyboard-type");
const itemWord = document.getElementById("itemWord");
const itemImage = document.getElementById("itemImage");

function generateKeyboard(keys) {
  keyboardContainer.innerHTML = "";
  keys.forEach(key => {
    const keyElement = document.createElement("div");
    keyElement.className = "key";
    keyElement.textContent = key;
    keyElement.addEventListener("click", () => handleKeyPress(key));
    keyboardContainer.appendChild(keyElement);
  });
}

function handleKeyPress(key) {
  const lang = langSelect.value;
  const category = catSelect.value;
  const entry = data[lang]?.[category]?.[key];

  if (entry) {
    itemImage.src = `images/${category}/${entry.file}.png`;
    const firstChar = entry.word[0];
    itemWord.innerHTML = `<span class="highlight">${firstChar}</span>${entry.word.slice(1)}`;
    const audio = new Audio(`audio/${lang}/${entry.file}.mp3`);
    audio.play();
  } else {
    itemWord.textContent = "لا توجد كلمة لهذا المفتاح";
    itemImage.src = "";
  }
}

// وظيفة جديدة لتحديث لوحة المفاتيح حسب الاختيار
function updateKeyboard() {
  const lang = langSelect.value;
  const keyboardType = keyboardTypeSelect.value;

  if (keyboardType === "letters") {
    if (lang === "ar") generateKeyboard(arabicLetters);
    else if (lang === "en") generateKeyboard(englishLetters);
    else if (lang === "he") generateKeyboard(hebrewLetters);
  } else if (keyboardType === "numbers") {
    generateKeyboard(numbers);
  }
}

// مراقبة التغييرات في اللغة أو نوع لوحة المفاتيح
langSelect.addEventListener("change", updateKeyboard);
keyboardTypeSelect.addEventListener("change", updateKeyboard);

// تحميل لوحة المفاتيح الافتراضية عند فتح الصفحة
window.addEventListener("DOMContentLoaded", () => {
  updateKeyboard();
});
