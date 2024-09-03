const functions = require("firebase-functions");
const scraper = require("./scraper");
const admin = require("firebase-admin");
import { addDoc, collection } from "firebase/firestore"; 

admin.initializeApp();
const db = admin.firestore();

// const getToday = () => {
//   const today = new Date();
//   return `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`;
// };

exports.pubsub = functions
  .region("us-central1")
  .runWith({ memory: "2GB" })
  .pubsub.schedule("0 0 * * *") //runs at midnight every day
  .timeZone("America/Chicago")
  .onRun(async () => {
    try {
      const scrapedData = await scraper.scrapeData();
      //   await db.collection("days").doc(getToday()).set(scrapedData);
      await addDoc(collection(db, "places"), scrapedData);
    } catch (err) {
      throw new Error(err);
    }
  });
