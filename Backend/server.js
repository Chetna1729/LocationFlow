// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage for demo purposes
let addresses = [];

// Save address endpoint
app.post('/save-address', (req, res) => {
  const { houseNumber, area, category, lat, lng } = req.body;
  const newAddress = { id: Date.now(), houseNumber, area, category, lat, lng };
  addresses.push(newAddress);
  res.status(200).json(newAddress);
});

// Get all saved addresses endpoint
app.get('/addresses', (req, res) => {
  res.status(200).json(addresses);
});

// Delete address endpoint
app.delete('/delete-address/:id', (req, res) => {
  const { id } = req.params;
  addresses = addresses.filter((address) => address.id !== Number(id));
  res.status(200).json({ message: 'Address deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
