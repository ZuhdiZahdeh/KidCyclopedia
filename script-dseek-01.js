        // قاعدة البيانات للكلمات والصور
        const database = {
            animals: [
                { ar: "أسد", en: "Lion", he: "אריה", image: "https://cdn.pixabay.com/photo/2017/11/06/09/53/tiger-2923186_640.jpg" },
                { ar: "فيل", en: "Elephant", he: "פיל", image: "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_640.jpg" },
                { ar: "زرافة", en: "Giraffe", he: "ג'ירפה", image: "https://cdn.pixabay.com/photo/2017/04/11/21/34/giraffe-2222908_640.jpg" },
                { ar: "نمر", en: "Tiger", he: "טיגריס", image: "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_640.jpg" },
                { ar: "دب", en: "Bear", he: "דב", image: "https://cdn.pixabay.com/photo/2018/05/21/05/52/bear-3417338_640.jpg" },
                { ar: "غزال", en: "Deer", he: "צבי", image: "https://cdn.pixabay.com/photo/2016/11/29/05/45/animal-1867566_640.jpg" }
            ],
            fruits: [
                { ar: "تفاح", en: "Apple", he: "תפוח", image: "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_640.jpg" },
                { ar: "موز", en: "Banana", he: "בננה", image: "https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_640.jpg" },
                { ar: "برتقال", en: "Orange", he: "תפוז", image: "https://cdn.pixabay.com/photo/2017/01/20/15/06/orange-1995056_640.jpg" },
                { ar: "فراولة", en: "Strawberry", he: "תות", image: "https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_640.jpg" },
                { ar: "عنب", en: "Grapes", he: "ענבים", image: "https://cdn.pixabay.com/photo/2017/05/23/17/54/grapes-2337198_640.jpg" }
            ],
            objects: [
                { ar: "سيارة", en: "Car", he: "מכונית", image: "https://cdn.pixabay.com/photo/2013/07/13/11/34/car-158548_640.png" },
                { ar: "منزل", en: "House", he: "בית", image: "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg" },
                { ar: "كتاب", en: "Book", he: "ספר", image: "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg" },
                { ar: "كرة", en: "Ball", he: "כדור", image: "https://cdn.pixabay.com/photo/2016/11/22/20/10/ball-1850121_640.jpg" },
                { ar: "قلم", en: "Pen", he: "עט", image: "https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_640.jpg" }
            ]
        };

        // العناصر الرئيسية
        const keyboard = document.getElementById('keyboard');
        const displayWord = document.getElementById('display-word');
        const displayImage = document.getElementById('display-image');
        const languageSelect = document.getElementById('language');
        const categorySelect = document.getElementById('category');
        const keyboardTypeSelect = document.getElementById('keyboard-type');
        const soundPlayer = document.getElementById('sound-player');

        // لوحات المفاتيح لكل لغة
        const keyboards = {
            ar: {
                letters: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
                numbers: '0123456789'
            },
            en: {
                letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                numbers: '0123456789'
            },
            he: {
                letters: 'אבגדהוזחטיכלמנסעפצקרשת',
                numbers: '0123456789'
            }
        };

        // إنشاء لوحة المفاتيح
        function createKeyboard() {
            keyboard.innerHTML = '';
            
            const lang = languageSelect.value;
            const type = keyboardTypeSelect.value;
            const chars = keyboards[lang][type];
            
            for (let i = 0; i < chars.length; i++) {
                const key = document.createElement('button');
                key.className = 'key';
                key.textContent = chars[i];
                keyboard.appendChild(key);
            }
        }

        // عند تحميل الصفحة
        window.addEventListener('DOMContentLoaded', () => {
            createKeyboard();
            
            // إضافة أحداث التغيير
            languageSelect.addEventListener('change', createKeyboard);
            keyboardTypeSelect.addEventListener('change', createKeyboard);
            
            // عند الضغط على أي مفتاح
            keyboard.addEventListener('click', (e) => {
                if (e.target.classList.contains('key')) {
                    const lang = languageSelect.value;
                    const category = categorySelect.value;
                    const items = database[category];
                    
                    // التأكد من وجود عناصر في الفئة المحددة
                    if (items && items.length > 0) {
                        const randomItem = items[Math.floor(Math.random() * items.length)];
                        
                        // عرض الصورة
                        displayImage.src = randomItem.image;
                        displayImage.alt = randomItem[lang];
                        
                        // عرض الكلمة مع تمييز الحرف الأول
                        const word = randomItem[lang];
                        if (word) {
                            displayWord.innerHTML = `<span class="highlight">${word[0]}</span>${word.slice(1)}`;
                        }
                        
                        // نطق الكلمة
                        speakWord(word, lang);
                        
                        // إضافة تأثير للزر المضغوط
                        e.target.classList.add('pressed');
                        setTimeout(() => {
                            e.target.classList.remove('pressed');
                        }, 300);
                    } else {
                        displayWord.textContent = 'لا توجد عناصر في هذه الفئة';
                        displayImage.src = '';
                    }
                }
            });
        });

        // دالة النطق
        function speakWord(word, lang) {
            if ('speechSynthesis' in window) {
                // إيقاف أي نطق جاري
                window.speechSynthesis.cancel();
                
                const utterance = new SpeechSynthesisUtterance(word);
                
                // تحديد اللغة
                switch(lang) {
                    case 'ar': 
                        utterance.lang = 'ar-SA'; 
                        utterance.rate = 0.9; // سرعة أقل للعربية
                        break;
                    case 'he': 
                        utterance.lang = 'he-IL'; 
                        break;
                    default: 
                        utterance.lang = 'en-US';
                }
                
                // إعدادات الصوت
                utterance.volume = 1;
                utterance.pitch = 1.2; // نبرة أعلى للأطفال
                utterance.rate = 1.1;  // سرعة متوسطة
                
                window.speechSynthesis.speak(utterance);
            }
        }