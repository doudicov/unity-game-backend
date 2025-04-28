const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;

// Middleware
app.use(cors()); // Allow Unity to access API
app.use(bodyParser.json()); // Parse JSON requests

// 1. Register a new user
app.post('/register', (req, res) => {
    const { username, email } = req.body;
    const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.run(sql, [username, email], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, username, email });
    });
});

// 2. Get user data
app.get('/user/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(row);
    });
});

// 3. Update user score
app.put('/update-score', (req, res) => {
    const { id, score } = req.body;
    const sql = 'UPDATE users SET score = ? WHERE id = ?';
    db.run(sql, [score, id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Score updated successfully' });
    });
});

// 4. Delete user
app.delete('/user/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'User deleted' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
