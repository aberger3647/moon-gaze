const { firefox } = require("playwright");
const places = require("./scrapeLocations.json");
const fs = require("fs");

const getCoords = async (place) => {
  let browser;
  try {
    // console.log("Attempting to launch Firefox");
    browser = await firefox.launch({
      headless: true,
    });
    // console.log("Launch successful");

    let url = "";
    if (place.mapsLink && place.mapsLink.match("goo")) {
      url = place.mapsLink;
    } else {
      return place;
    }

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    // console.log("Page loaded");
    const mapsUrl = page.url();
    const coords = mapsUrl
      .split("/")[6]
      .split("@")[1]
      .split(",")
      .slice(0, 2)
      .join(",");
    console.log(coords);
    return { ...place, coords: coords };
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (browser) {
      //   console.log("Closing browser...");
      await browser.close();
      //   console.log("Browser closed");
    }
    // console.log("Script finished");
  }
};

const main = async () => {
  // Split places array in 5 link chunks
  // create a results array
  // process chunks in batches
  // save to file

  let results = [];
  const chunkSize = 5;
  for (let i = 0; i < places.length; i += chunkSize) {
    results = results.concat(
      await Promise.all(
        places.slice(i, i + chunkSize).map(async (place) => getCoords(place))
      )
    );
    console.log(`${i}/${places.length} finished`);
  }

  fs.writeFile(
    "locationsWithCoords.json",
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file: ", err);
      } else {
        console.log("Places written to locationsWithCoords.json");
      }
    }
  );
};

main();
