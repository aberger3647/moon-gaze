require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require('cors');
const https = require("https");
const app = express();

// Debug logging
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    url: req.url,
    originalUrl: req.originalUrl
  });
  next();
});

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true
}));

app.use(express.json());

// Add CORS headers for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const apiKey = process.env.REACT_APP_DISTANCE_MATRIX_API_KEY;

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: true,
  maxVersion: "TLSv1.2",
});

app.get('/api/distance', async (req, res) => {
  if (!req.query.origins || !req.query.destinations) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // First log the incoming coordinates
    console.log('Received coordinates:', {
      origins: req.query.origins,
      destinations: req.query.destinations
    });

    const { origins, destinations } = req.query;

    // Add all necessary parameters for the Distance Matrix API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=driving&units=imperial&key=${apiKey}`;

    console.log('Requesting URL:', url);
    const response = await axios.get(url, { httpsAgent: agent });
    
    console.log('Google API Response:', JSON.stringify(response.data, null, 2));

    // More specific error handling
    if (response.data.status !== 'OK') {
      return res.status(400).json({
        error: `API Error: ${response.data.status}`,
        details: response.data.error_message || 'Unknown error'
      });
    }

    const element = response.data.rows[0].elements[0];
    
    if (element.status === 'ZERO_RESULTS') {
      return res.status(400).json({
        error: 'No route found',
        details: 'Could not calculate distance between these points'
      });
    }

    if (element.status !== 'OK') {
      return res.status(400).json({
        error: `Route Error: ${element.status}`,
        details: 'Could not calculate distance'
      });
    }

    if (!element.distance) {
      return res.status(400).json({
        error: 'Missing distance data',
        details: 'Distance calculation failed'
      });
    }

    const distanceInMeters = element.distance.value;
    const distanceInMiles = Math.round(distanceInMeters * 0.000621371 * 100) / 100;
    
    console.log(`Successfully calculated distance: ${distanceInMiles} miles`);
    res.json(distanceInMiles);

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({
      error: "An error occurred",
      details: error.message,
      response: error.response?.data
    });
  }
});


app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

// Catch-all for unmatched routes
app.use((req, res) => {
  console.log('No route matched:', req.path);
  res.status(404).json({ error: `No route found for ${req.method} ${req.path}` });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});