const { firefox } = require("playwright");
const path = require("path");

(async () => {
  let browser;
  try {
    console.log("Attempting to launch Firefox");
    browser = await firefox.launch({
      headless: false,
    });
    console.log("Launch successful");

    const page = await browser.newPage();
    await page.goto(
      "https://darksky.org/what-we-do/international-dark-sky-places/all-places/",
      { waitUntil: 'networkidle', timeout: 60000 }
    );
    console.log("Page loaded");

    const city = 'Austin'
    await page.getByLabel("Keywords, name, etc.").fill(city);
    console.log("Search term entered");

    await page.locator("i.facetwp-icon").click();
    console.log("Search initiated");

    await page.waitForTimeout(5000);
    console.log("Waited for 5 seconds after search");

    const screenshotPath = path.join(process.cwd(), "screenshot.png");
    console.log("Taking screenshot...");
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    console.log("Attempting to find article cards...");
    const cards = await page.getByRole("article").all();
    console.log(`Found ${cards.length} article cards`);

    if (cards.length === 0) {
      console.log("No cards found. Checking page content...");
      const pageContent = await page.content();
      console.log("Page content length:", pageContent.length);
      console.log("First 500 characters of page content:", pageContent.substring(0, 500));
    } else {
      const numOfResults = Math.min(10, cards.length);
      console.log(`Processing ${numOfResults} cards...`);
      
      for (let i = 0; i < numOfResults; i++) {
        console.log(`Processing card ${i + 1}...`);
        const card = cards[i];
        try {
          const placeName = await card.locator('.card__ti__a').textContent();
          console.log(`Place name: ${placeName.trim()}`);
          const category = await card.locator('.card__cat__link').textContent();
          console.log(`Category: ${category.trim()}`);
          const placeUrl = await card.locator('.card__ti__a').getAttribute('href');
          console.log(`URL: ${placeUrl || 'No Url'}`);
        } catch (error) {
          console.error(`Error processing card ${i + 1}:`, error);
        }
      }
    }

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
})().catch((error) =>
  console.error("Unhandled error in main function: ", error)
);