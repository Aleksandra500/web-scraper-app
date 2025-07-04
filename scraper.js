const puppeteer = require('puppeteer');

async function scrapeTexts() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com/', { waitUntil: 'domcontentloaded' });

  const data = await page.$$eval('.quote', quotes =>
    quotes.map(q => ({
      text: q.querySelector('.text').innerText,
      author: q.querySelector('.author').innerText
    }))
  );

  await browser.close();
  return data;
}

module.exports = scrapeTexts;
