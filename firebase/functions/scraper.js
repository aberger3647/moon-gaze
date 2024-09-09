const { firefox } = require("playwright");

const getCards = async (page) => {
  const placeArr = [];
  const cards = await page.getByRole("article").all();
  console.log(`Found ${cards.length} article cards`);

  for (let i = 0; i < cards.length; i++) {
    console.log(`Processing card ${i + 1}...`);
    const placeInfo = {};
    const card = cards[i];
    try {
      const placeName = await card.locator(".card__ti__a").textContent();
      placeInfo["placeName"] = placeName.trim();
      const category = await card.locator(".card__cat__link").textContent();
      placeInfo["category"] = category.trim();
      const placeUrl = await card.locator(".card__ti__a").getAttribute("href");
      placeInfo["placeUrl"] = placeUrl;
      placeArr.push(placeInfo);
    } catch (error) {
      console.error(`Error processing card ${i + 1}:`, error);
    }
  }
  return placeArr;
};

(async () => {
  let browser;
  try {
    console.log("Attempting to launch Firefox");
    browser = await firefox.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      `https://darksky.org/what-we-do/international-dark-sky-places/all-places/`,
      { waitUntil: "networkidle", timeout: 60000 }
    );
    await page.waitForTimeout(5000);

    const more = page.locator(".facetwp-load-more");
    let placeArr = [];

    for (let i = 0; i < 3; i++) {
      await more.hover();
      await more.click();
      await page.waitForTimeout(2000); // Wait for new content to load
      const newPlaces = await getCards(page);
      placeArr = [...placeArr, ...newPlaces];
    }

    console.log(placeArr);
    return placeArr;
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
})();