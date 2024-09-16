const places = require("./places.json");
const { firefox } = require("playwright");
const fs = require("fs");

const scrapeData = async (place) => {
  let browser;
  try {
    console.log("Attempting to launch Firefox");
    browser = await firefox.launch({
      headless: true,
    });
    console.log("Launch successful");

    const page = await browser.newPage();
    await page.goto(place.link, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    console.log("Page loaded");

    let [coords, mapsLink, address] = [null, null, null];
    try {
      const weatherHeader = page.locator("h3")?.filter({ hasText: "Weather" });
      const weatherContent = await weatherHeader.locator(" + p").textContent();
      const regex = /\(\d+(\.\d+)?,\s*\d+(\.\d+)?\)/;
      const match = weatherContent.match(regex);
      coords = match[0];
      console.log(coords);
    } catch (error) {
      console.error(`Failed to extract coordinates`);
    }

    try {
      const addressHeader = page.locator("h3").filter({ hasText: "Address" });
      const addressContent = addressHeader.locator(" + p");
      address = await addressContent.textContent();
      mapsLink = await addressContent.locator("a").getAttribute("href");
      console.log(mapsLink);
    } catch (error) {
      console.error(`Failed to extract maps link`);
    }

    return {
      ...place,
      coords: coords,
      mapsLink: mapsLink,
      address: address,
    };
  } catch (error) {
    console.error(`An error occurred in ${place.link}: `, error);
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
      console.log("Browser closed");
    }
    console.log(`${place.link} finished`);
  }
};

const main = async () => {
  // Split places array in 5 link chunks
  // create a results array
  // process chunks in batches
  // save to file

  const results = [];
  const chunkSize = 5;
  for (let i = 0; i < places.length; i += chunkSize) {
    results.push(
      await Promise.all(
        places.slice(i, i + chunkSize).map(async (place) => scrapeData(place))
      )
    );
  }

  console.log(results);
  fs.writeFile(
    "scrapeLocations.json",
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file: ", err);
      } else {
        console.log("Places written to scrapeLocations.json");
      }
    }
  );
};

main();
