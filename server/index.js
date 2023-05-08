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

    const sqlInsert = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.query(sqlInsert, [username, password], (err, result) => {
        console.log(result);
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})