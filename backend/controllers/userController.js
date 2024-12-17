const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

// Secret key for signing tokens (store securely in .env in production)
const JWT_SECRET = process.env.JWT_SECRET; 

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findByEmail(email);
        
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        User.create({ email, password: hashedPassword }, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        // Handle any errors that occur in the try block
        return res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user exists
        const existingUser = await User.findByEmail(email);
        
        if (existingUser) {
            const user = existingUser;
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email }, // Payload
                JWT_SECRET, // Secret key
                { expiresIn: "1h" } // Token expiration time
            );

            return res.status(200).json({ message: 'Login successful', token });
        }

        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        // Handle any errors that occur in the try block
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { register, login };