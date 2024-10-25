const places = require("./locationsWithCoords.json");
const fs = require("fs");

function filterProperties(places) {
  const arr = places.map(({ category, placeName, coords }) => ({
    category,
    placeName,
    coords,
  }));
  const jsonArr = JSON.stringify(arr, null, 2)
  fs.writeFile("placesWithCoords.json", jsonArr, (err) => {
    if (err) {
      console.error("Error writing file: ", err);
    } else {
      console.log("Places written to placesWithCoords.json");
    }
  });
}

filterProperties(places);
