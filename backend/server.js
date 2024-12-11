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
        // Create table when the server starts
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Users table created or already exists');
            }
        });
        
        console.log('Database connection successful');
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