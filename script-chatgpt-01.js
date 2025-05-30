 const data = {
  ar: {
    animals: {
      L: { word: "أسد", file: "lion" },
    },
    fruits: {
      A: { word: "تفاحة", file: "apple" },
    },
    objects: {
      C: { word: "ساعة", file: "clock" },
    }
  },
  en: {
    animals: {
      L: { word: "Lion", file: "lion" },
    },
    fruits: {
      A: { word: "Apple", file: "apple" },
    },
    objects: {
      C: { word: "Clock", file: "clock" },
    }
  },
  he: {
    animals: {
      L: { word: "אריה", file: "lion" },
    },
    fruits: {
      A: { word: "תפוח", file: "apple" },
    },
    objects: {
      C: { word: "שעון", file: "clock" },
    }
  }
};

const keys = document.querySelectorAll(".key");
const langSelect = document.getElementById("language");
const catSelect = document.getElementById("category");
const itemWord = document.getElementById("itemWord");
const itemImage = document.getElementById("itemImage");

keys.forEach(key => {
  key.addEventListener("click", () => {
    const lang = langSelect.value;
    const category = catSelect.value;
    const letter = key.textContent;

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
  });
});
