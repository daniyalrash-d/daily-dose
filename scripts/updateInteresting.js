const fs = require('fs');
const fetch = require('node-fetch');

const INTERESTING_FILE = './data/interesting.json';
const FACTS_API = 'https://uselessfacts.jsph.pl/random.json?language=en';

// Number of facts to fetch
const NUM_FACTS = 20;

async function fetchFact() {
  try {
    const res = await fetch(FACTS_API);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error('Error fetching fact:', err);
    return null;
  }
}

async function fetchFacts() {
  const facts = [];

  for (let i = 0; i < NUM_FACTS; i++) {
    const fact = await fetchFact();
    if (fact) facts.push(fact);
  }

  // Remove duplicates
  const uniqueFacts = [...new Set(facts)];

  fs.writeFileSync(INTERESTING_FILE, JSON.stringify(uniqueFacts, null, 2));
  console.log(`Saved ${uniqueFacts.length} interesting facts to ${INTERESTING_FILE}`);
}

fetchFacts();
