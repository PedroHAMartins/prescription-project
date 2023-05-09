const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "prescription-project-db"
})

app.use(cors());

app.use(express.json());

app.get('/api/users', (req, res) => {
    const sqlSelect = `SELECT * FROM users`;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/register',  async(req, res) => {

    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    const sqlSelect = `SELECT * FROM users WHERE username = ?`;

    db.query(sqlSelect, [username], async (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: 'Error while fetching user' });
        }

        if(result.length > 0) {
            return console.log('User already exists');
        }

        const sqlInsert = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.query(sqlInsert, [username, password], (err, result) => {
            console.log(result);
        })
    })
})

app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;
    const sqlSelect = `SELECT * FROM users WHERE username = ?`;

    db.query(sqlSelect, [username], async (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: 'Error while fetching user' });
        }

        if(result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch) {
            res.status(200).json({ message: 'Login successful' });
        }
        else{
            res.status(401).json({ error: 'Incorrect password' });
        }
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})