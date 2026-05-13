# 🧠 AI "Aqlli" Moliyaviy Yordamchi (AI Expense Analyzer)

> Moliya va xarajatlarni boshqarishning eng aqlli usuli. Xarajatlaringizni oddiy tilda yozing, sun'iy intellekt (Gemini API) uni o'zi taxlil qiladi va hisoblaydi!

---

## ✨ Loyiha Haqida

**AI Expense Analyzer** - bu sizning shaxsiy moliyaviy yordamchingiz. Siz unga shunchaki "Bugun tushlikka 50 dollar va taksiga 12 ming so'm ketdi" deb yozsangiz kifoya. U darhol bu matnni tahlil qilib, **kategoriyalarni**, **summalarni** va **valyutani** avtomatik aniqlaydi va bazaga qo'shib, chiroyli statistikalarni shakllantiradi.

## 🚀 Imkoniyatlari

- **Tabiiy tilni tushunish (NLP)**: O'zbek, Rus, Ingliz va aralash tillardagi matnlarni muammosiz qabul qiladi.
- **Avtomatik Kategorizatsiya**: Xarajatlarni transport, ovqatlanish, ta'lim, sog'liq kabi toifalarga o'zi ajratadi.
- **Valyuta Konvertatsiyasi**: UZS, USD, EUR, RUB ni avtomatik taniy qoladi va umumiy hisobotni hisoblaydi.
- **Offline / LocalStorage**: Ma'lumotlaringiz xavfsiz holda faqat o'zingizning brauzeringizda saqlanadi.
- **Zamonaviy Dasturlash**: Eng zamonaviy React, TailwindCSS hamda Recharts kutubxonalari yordamida yozilgan.

## 🛠 Texnologiyalar

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integratsiya**: Google Gemini API (@google/genai)
- **Grafiklar**: Recharts
- **Build tool**: Vite
- **Deployment**: GitHub Actions yordamida GitHub Pages'ga avtomatik yuklash.

## 📦 O'rnatish va Ishga tushirish

Loyihani o'z kompyuteringizda ishga tushirish uchun quyidagi qadamlarni bajaring:

### 1-qadam: Repozitoriyni nusxalash
```bash
git clone https://github.com/your-username/ai-expense-analyzer.git
cd ai-expense-analyzer
```

### 2-qadam: Kutubxonalarni o'rnatish
```bash
npm install
```

### 3-qadam: Atrof-muhit o'zgaruvchilarini sozlash
Loyihaning asosiy papkasida `.env` faylini yarating va undagi Google Gemini API kalitingizni kiriting:
```ini
GEMINI_API_KEY="SIZNING_GEMINI_API_KALITINGIZ"
```

### 4-qadam: Dasturni ishga tushirish
```bash
npm run dev
```

## 🌐 GitHub Pages'da joylash (Deployment)

Ushbu loyihada `GitHub Actions` sozlangan. `main` yoki `master` branch-ga push qilinganda loyiha avtomatik ravishda GitHub Pages-ga joylanadi. 

**Muhim**: GitHub repository settings (sozlamalari) da **Secrets and variables** -> **Actions** qismiga kirib `GEMINI_API_KEY` nomli secret yarating va uning ichiga o'zingizning Gemini API kalitingizni kiriting. Bu ilovaning ishlashi uchun zarur hisoblanadi.

## 👨‍💻 Muallif

**Sanjarbek Otabekov** 

Loyihaga bo'lgan e'tiboringiz uchun rahmat! Taklif va murojaatlaringiz bo'lsa xursand bo'laman.
