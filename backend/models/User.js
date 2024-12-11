const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [user.email, user.password], callback);
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    }
};

module.exports = User;