const express = require('express');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const db = require('./config/db');

// Create Express app
const app = express();

// DB Connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    }
    else {
        console.log('Database connection successful');
    }
});

// Main route
app.get('/', (req, res) => {
    res.send('Hello, Express World!');
});

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});