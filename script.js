document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  loadJoke();
  loadTip();
  loadInteresting();
});

// Cache DOM elements outside async functions to reduce repeated queries
const historyList = document.getElementById('history-list');
const jokeText = document.getElementById('joke-text');
const tipText = document.getElementById('tip-text');
const interestingText = document.getElementById('interesting-text');

async function loadHistory() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const historyUrl = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;

  try {
    const res = await fetch(historyUrl);
    if (!res.ok) throw new Error('Failed to fetch history data');
    const data = await res.json();
    const events = data.events.slice(0, 4);

    // Prepare all cards HTML first
    const cardsHtmlArray = await Promise.all(events.map(async (event) => {
      const title = event.description;
      const page = event.wikipedia[0]?.title || '';
      const img = await getWikiImage(page);
      return `
        <div class="event-card">
          <img src="${img}" alt="${page || 'No image available'}" loading="lazy" />
          <p><strong>${event.year}</strong>: ${title}</p>
        </div>
      `;
    }));

    historyList.innerHTML = cardsHtmlArray.join('');
  } catch (err) {
    historyList.innerHTML = '<p>Could not load history events.</p>';
    console.error(err);
  }
}

async function getWikiImage(title) {
  if (!title) return 'https://via.placeholder.com/100?text=No+Image';
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
    if (!response.ok) throw new Error('Failed to fetch wiki image');
    const data = await response.json();
    return data.thumbnail?.source || 'https://via.placeholder.com/100?text=No+Image';
  } catch {
    return 'https://via.placeholder.com/100?text=No+Image';
  }
}

async function loadFromFile(file, element) {
  try {
    const res = await fetch(`data/${file}`);
    if (!res.ok) throw new Error(`Failed to fetch ${file}`);
    const items = await res.json();
    const randomItem = items[Math.floor(Math.random() * items.length)];
    element.textContent = randomItem;
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
    element.textContent = "Couldn't load content.";
  }
}

function loadJoke() {
  loadFromFile('jokes.json', jokeText);
}

function loadTip() {
  loadFromFile('tips.json', tipText);
}

function loadInteresting() {
  loadFromFile('interesting.json', interestingText);
}
