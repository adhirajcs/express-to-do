// server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Import auth routes

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON
app.use(express.json());

// Use the auth routes
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running ... http://localhost:${port}`);
});
