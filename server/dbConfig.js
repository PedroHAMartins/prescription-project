const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "prescription-project-db"
})

module.exports = db;
