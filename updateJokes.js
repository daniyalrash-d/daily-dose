const fs = require('fs');
const fetch = require('node-fetch');

const JOKES_FILE = './data/jokes.json';
const API_BASE = 'https://official-joke-api.appspot.com/jokes';

// Categories to fetch
const categories = ['programming', 'general', 'knock-knock'];

async function fetchJokesFromCategory(category) {
  try {
    const res = await fetch(`${API_BASE}/${category}/ten`);
    if (!res.ok) throw new Error(`API returned status ${res.status} for category ${category}`);
    const jokes = await res.json();
    return jokes.map(j => `${j.setup} ${j.punchline}`);
  } catch (err) {
    console.error(`Error fetching jokes for category ${category}:`, err);
    return [];
  }
}

async function fetchAllJokes() {
  try {
    const allJokesArrays = await Promise.all(categories.map(fetchJokesFromCategory));
    const allJokes = allJokesArrays.flat();

    // Optionally remove duplicates
    const uniqueJokes = [...new Set(allJokes)];

    fs.writeFileSync(JOKES_FILE, JSON.stringify(uniqueJokes, null, 2));
    console.log(`Saved ${uniqueJokes.length} unique jokes to ${JOKES_FILE}`);
  } catch (err) {
    console.error('Error fetching all jokes:', err);
  }
}

fetchAllJokes();
