const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const generateToken = (id_user) => {
    const token = jwt.sign({ id_user }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
}

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.id_user = decoded.id_user;
        next();
    })
}
app.post('/api/register',  async(req, res) => {

    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    const sqlSelect = `SELECT * FROM user WHERE username = ?`;

    db.query(sqlSelect, [username], async (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching user' });
        }

        if(result.length > 0) {
            return res.status(409).json({ error: 'User already in database' });
        }

        const sqlInsert = `INSERT INTO user (username, password) VALUES (?, ?)`;
        db.query(sqlInsert, [username, password], (err, result) => {
            if(err) {
                return res.status(500).json({ error: 'Error while inserting user' });
            }
            res.status(200).json({message: 'Registration successful'});
            console.log(result);
        })
    })
})

app.post('/api/client/register',  async(req, res) => {
    const name = req.body.name;

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id_user;

    const sqlSelect = `SELECT * FROM client WHERE name = ?`;

    db.query(sqlSelect, [name], async (err, result) => {
        if(err){
            return res.status(500).json({ error: 'Error while fetching client' });
        }

        if(result.length > 0) {
            return res.status(409).json({ error: 'Client already registered' });
        }

        const sqlInsert = `INSERT INTO client (name, id_user_fk) VALUES (?, ?)`;
        db.query(sqlInsert, [name, userId], (err, result) => {
            if(err){
                return res.status(500).json({ error: 'Error while inserting client' });
            }
            res.status(200).json({message: 'Client successfully registered'});
        })
    })
})

app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;
    const sqlSelect = `SELECT * FROM user WHERE username = ?`;

    db.query(sqlSelect, [username], async (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching user' });
        }

        if(result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch) {
            const token = generateToken(user.id_user);
            res.status(200).json({ message: 'Login successful', token});
            console.log(token);
        }
        else{
            res.status(401).json({ error: 'Incorrect password' });
        }
    })
})

app.get('/api/user', verifyAuth, (req, res) => {
    const id_user = req.id_user;
    const sqlSelect = `SELECT * FROM user WHERE id_user = ?`;

    db.query(sqlSelect, [id_user], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching user' });
        }

        if(result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result[0];
        const user_info = {
            id_user: user.id_user,
            username: user.username,
            password: user.password
        };
        
        res.status(200).json(user_info);
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})