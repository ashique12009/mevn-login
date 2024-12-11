const db = require('../config/db');

const User = {
    create: async (user) => {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        // Use async/await with the mysql2 query method
        const [result] = await db.promise().query(query, [user.email, user.password]);
        return result;
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        // Use async/await with the mysql2 query method
        const [results] = await db.promise().query(query, [email]);
        return results[0]; // Return the first result, or undefined if no results
    }
};

module.exports = User;