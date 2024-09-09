const cheerio = require('cheerio');
const { xml } = require("./darkskyplaces.js");

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

console.log(data);
