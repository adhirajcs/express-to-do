const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Import auth routes
const todoRoutes = require('./routes/todoRoutes');  // Import todos routes

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON
app.use(express.json());

// Use the auth and todos routes
app.use('/auth', authRoutes);  // Mount the auth routes here
app.use('/todos', todoRoutes);  // Mount the todos routes here

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
