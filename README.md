# 📰 Daniyal's Daily Dose

**Daniyal's Daily Dose** is a minimal, fast, and accessible static web app that brings you daily doses of:

- 🗓 Historical events  
- 😂 Random jokes  
- 🛠 Life tips  
- 🌟 Interesting facts  

Delivered fresh every day — with automation and love!

---

## 🌐 Live Demo

🔗 [Visit Website](https://daniyalrash-d.github.io/daily-dose/)

---

## 📦 Features

- ✨ Clean and minimal design
- ⚡ Loads fast with minimal JavaScript
- 📅 History events fetched from [byabbe.se](https://byabbe.se/on-this-day/)
- 🤖 Random jokes, tips, and facts from local JSON files
- 🌓 Responsive & supports dark mode
- ♿ Accessible with ARIA roles and keyboard-friendly structure
- 🔄 Automatically updates daily using GitHub Actions

---

## 🛠 Technologies Used

- HTML5, CSS3 (Vanilla)
- JavaScript (ES6)
- JSON for dynamic content
- [GitHub Pages](https://pages.github.com/) for hosting
- [GitHub Actions](https://docs.github.com/en/actions) for scheduled updates

---

## 📂 Folder Structure
daily-dose/<br>
│<br>
├── data/<br>
│ ├── jokes.json<br>
│ ├── tips.json<br>
│ └── interesting.json<br>
│<br>
├── scripts/<br>
│ ├── updateJokes.js<br>
│ └── updateInteresting.js<br>
│<br>
├── .github/<br>
│ └── workflows/<br>
│ └── update.yml<br>
│<br>
├── index.html<br>
├── style.css<br>
├── script.js<br>
└── README.md<br>

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/daniyalrash-d/daily-dose.git
cd daily-dose
```
#### Open index.html in your browser

---

## 🕒 Automation (GitHub Actions)
This project uses a scheduled GitHub Action to:
- Fetch new jokes and facts
- Auto-commit them to the repository daily

---

## ⏰ Schedule
Runs daily at 12:00 AM IST via cron:

```bash
cron: '30 18 * * *'  # 6:30 PM UTC = 12:00 AM IST
```

---

## 💡 Tips
To add new jokes/tips manually, edit the .json files in data/
You can trigger the update manually from the Actions tab using "Run workflow"

---

## 📜 License
MIT License — open source, free to use and modify.

---

## 🤝 Contributing
Pull requests and suggestions are welcome. Let’s make Daily Dose better together!

---

## 👤 Author
Daniyal Rasheed — Creator & Maintainer
