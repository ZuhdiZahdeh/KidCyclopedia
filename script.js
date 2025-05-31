let encyclopediaData;

// تحميل ملف JSON الموسع
fetch('encyclopedia_db.json')
  .then(response => response.json())
  .then(jsonData => {
    encyclopediaData = jsonData;
    updateKeyboard();
  })
  .catch(error => console.error('خطأ في تحميل ملف JSON:', error));

const arabicLetters = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ي"];
const englishLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
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

  const entryName = encyclopediaData[lang][category][key];

  if (entryName) {
    itemWord.textContent = entryName;
    const imageFileName = entryName.replace(/\s+/g, '_').toLowerCase();
    itemImage.src = `images/${category}/${imageFileName}.png`;

    const audio = new Audio(`audio/${lang}/${imageFileName}.mp3`);
    audio.play();
  } else {
    itemWord.textContent = "لا توجد بيانات لهذا المفتاح";
    itemImage.src = "";
  }
}

function updateKeyboard() {
  const lang = langSelect.value;
  const keyboardType = keyboardTypeSelect.value;

  if (keyboardType === "letters") {
    if (lang === "ar") generateKeyboard(arabicLetters);
    else if (lang === "en") generateKeyboard(englishLetters);
    else if (lang === "he") generateKeyboard(hebrewLetters);
  } else {
    generateKeyboard(numbers);
  }
}

langSelect.addEventListener("change", updateKeyboard);
keyboardTypeSelect.addEventListener("change", updateKeyboard);
catSelect.addEventListener("change", updateKeyboard);

// تحديث تلقائي للوحة المفاتيح عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", updateKeyboard);
