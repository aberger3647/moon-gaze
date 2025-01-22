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



app.get('/api/distance', async (req, res) => {
  if (!req.query.origins || !req.query.destinations) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const { origins, destinations } = req.query;
    
    // Parse coordinates
    const [originLat, originLng] = origins.split(',').map(Number);
    const [destLat, destLng] = destinations.split(',').map(Number);

    // Haversine formula implementation
    const R = 3959; // Earth's radius in miles
    const dLat = (destLat - originLat) * Math.PI / 180;
    const dLon = (destLng - originLng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(originLat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = Math.round(R * c * 100) / 100; // Round to 2 decimal places

    // console.log(`Calculated direct distance: ${distance} miles`);
    res.json(distance);

  } catch (error) {
    console.error('Error calculating distance:', error);
    res.status(500).json({
      error: "An error occurred",
      details: error.message
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

