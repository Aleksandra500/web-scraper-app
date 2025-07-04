const express = require('express');
const scrapeTexts = require('./scraper');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const quotes = await scrapeTexts();
    let html = '<h1>Scraped Quotes</h1>';
    quotes.forEach(q => {
      html += `<p><strong>${q.author}</strong>: ${q.text}</p>`;
    });
    res.send(html);
  } catch (err) {
    res.status(500).send('Scraping failed: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
