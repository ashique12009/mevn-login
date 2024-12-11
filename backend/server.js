const express = require('express');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Create Express app
const app = express();

// Middleware to parse JSON requests bodies
app.use(express.json());

// DB Connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    }
    else {
        // Database connection successful
        console.log('Database connection successful');
        // Create the users table if it doesn't exist
        require('./config/tableCreation');
    }
});

// Main route
app.get('/', (req, res) => {
    res.send('Hello, Express World!');
});

// User routes
app.use('/api/users', userRoutes);

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});