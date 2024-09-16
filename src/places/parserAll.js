const cheerio = require('cheerio');
const { xml } = require("./darkskyplaces.js");
const fs = require('fs')

const cleanData = (text) => {
  return text ? text.trim().replace(/\s+/g, ' ') : '';
}

const $ = cheerio.load(xml, { xml: true });

const data = $.extract({
  cards: [
    {
      selector: "article",
      value: {
        category: {
          selector: "span",
          value: "textContent",
        },
        placeName: {
          selector: "a",
          value: "title",
        },
        link: {
          selector: "a",
          value: "href",
        },
      },
    },
  ],
});

const cleanedData = {
  cards: data.cards.map(card => ({
    ...card,
    category: cleanData(card.category)
  }))
}

const jsonData = JSON.stringify(cleanedData, null, 2)

fs.writeFile('places.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file: ', err);
  } else {
    console.log('Places written to places.json')
  }
})
