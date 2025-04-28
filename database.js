const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  } else {
    console.log('Connected to the users database.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    score INTEGER DEFAULT 0
  )
`);

module.exports = db;
