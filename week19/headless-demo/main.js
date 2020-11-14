const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/main.html');
  const hrefElement = await page.$('a');
  console.log(await hrefElement.asElement().boxModel());
})();