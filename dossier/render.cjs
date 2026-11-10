// Erzeugt das Projektdossier als PDF:  node dossier/render.cjs [ziel.pdf]
// Benötigt Playwright mit Chromium (npx playwright install chromium).
const { chromium } = require("playwright");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

(async () => {
  const out = process.argv[2] ?? path.join(__dirname, "Winter_Post_Projektdossier.pdf");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(__dirname, "dossier.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("PDF:", out);
})();
