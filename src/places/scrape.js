const places = require("./places.json");
const { firefox } = require("playwright");
const path = require("path");

const scrapeData = async () => {
  let browser;
  try {
    console.log("Attempting to launch Firefox");
    browser = await firefox.launch({
      headless: false,
    });
    console.log("Launch successful");

    const page = await browser.newPage();
    await page.goto("https://darksky.org/places/albanya-dark-sky-park/", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    console.log("Page loaded");

    const weatherHeader = page.locator("h3").filter({ hasText: 'Weather' })
    const weatherContent = await weatherHeader.locator(' + p').textContent();
    const regex = /\(\d+(\.\d+)?,\s*\d+(\.\d+)?\)/;
    const match = weatherContent.match(regex)
    const coords = match[0]
    console.log(coords);

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
      console.log("Browser closed");
    }
    console.log("Script finished");
  }
};
scrapeData();
