require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const https = require("https");

const apiKey = process.env.REACT_APP_DISTANCE_MATRIX_API_KEY;

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: true, // Ensures SSL is properly verified
  maxVersion: "TLSv1.2", // Use TLS 1.2 to avoid HTTP/2
});

app.get("/distance", async (req, res) => {
  try {
    const { origins, destinations } = req.query;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origins
    )}&destinations=${encodeURIComponent(destinations)}&key=${apiKey}`;
    console.log("url", url);
    const response = await axios.get(url, { httpsAgent: agent });
    const distanceInMeters = response.data.rows[0].elements[0].distance.value;
    const distanceInMiles = distanceInMeters * 0.000621371;
    // const distanceInKilometers = distanceInMeters * 0.001;
    res.json(distanceInMiles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
