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
    const gender = req.body.gender;

    if(!name || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

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

        const sqlInsert = `INSERT INTO client (name, gender, id_user_fk) VALUES (?, ?, ?)`;
        db.query(sqlInsert, [name, gender, userId], (err, result) => {
            if(err){
                return res.status(500).json({ error: 'Error while inserting client' });
            }
            const clientId = result.insertId;

            const sqlInsertFirstEvaluation = `INSERT INTO first_evaluation (id_client_fk) VALUES (?)`;
            const sqlInsertSecondEvaluation = `INSERT INTO second_evaluation (id_client_fk) VALUES (?)`;
            const sqlInsertPrescription = `INSERT INTO prescription (id_client_fk) VALUES (?)`;

            db.query(sqlInsertFirstEvaluation, [clientId], (err, result) => {
                if(err){
                    console.log('Error while inserting first evaluation:', err);
                }
                console.log('Inserted first evaluation', result);
            });

            db.query(sqlInsertSecondEvaluation, [clientId], (err, result) => {
                if(err){
                    console.log('Error while inserting second evaluation:', err);
                }
                console.log('Inserted second evaluation', result);
            });

            db.query(sqlInsertPrescription, [clientId], (err, result) => {
                if(err){
                    console.log('Error while inserting prescription:', err);
                }
                console.log('Inserted prescription', result);
            });
            res.status(200).json({message: 'Client successfully registered'});
        })
    })
})

app.put('/api/client/update/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    const { name, gender, age, phone, address, birthdate, email, info_height, info_weight, info_allergies, info_patologies, info_objectives } = req.body;
    const updateFields = [];
    const updateValues = [];

    if(name) {
        updateFields.push('name = ?');
        updateValues.push(name);
    }
    if(gender) {
        updateFields.push('gender = ?');
        updateValues.push(gender);
    }

    if(age) {
        updateFields.push('age = ?');
        updateValues.push(age);
    }

    if(phone) {
        updateFields.push('phone = ?');
        updateValues.push(phone);
    }

    if(address) {
        updateFields.push('address = ?');
        updateValues.push(address);
    }

    if(birthdate) {
        updateFields.push('birthdate = ?');
        updateValues.push(birthdate);
    }

    if(email) {
        updateFields.push('email = ?');
        updateValues.push(email);
    }
    if(updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    const sqlUpdate = `UPDATE client SET ${updateFields.join(', ')} WHERE id_client = ?`;
    updateValues.push(idClient);

    db.query(sqlUpdate, updateValues, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Error while updating client' });
        }

        const updateFirstEvaluationFields = [];
        const updateFirstEvaluationValues = [];

        if(info_height) {
            updateFirstEvaluationFields.push('info_height = ?');
            updateFirstEvaluationValues.push(info_height);
        }

        if(info_weight) {
            updateFirstEvaluationFields.push('info_weight = ?');
            updateFirstEvaluationValues.push(info_weight);
        }

        if(info_allergies) {
            updateFirstEvaluationFields.push('info_allergies = ?');
            updateFirstEvaluationValues.push(info_allergies);
        }

        if(info_patologies) {
            updateFirstEvaluationFields.push('info_patologies = ?');
            updateFirstEvaluationValues.push(info_patologies);
        }

        if(info_objectives) {
            updateFirstEvaluationFields.push('info_objectives = ?');
            updateFirstEvaluationValues.push(info_objectives);
        }

        if (updateFirstEvaluationFields.length === 0) {
            return res.status(200).json({ message: 'No fields to update' });
        }
        else {
            const sqlUpdateFirstEvaluation = `UPDATE first_evaluation SET ${updateFirstEvaluationFields.join(', ')} WHERE id_client_fk = ?`;
            updateFirstEvaluationValues.push(idClient);
            db.query(sqlUpdateFirstEvaluation, updateFirstEvaluationValues, (err, result) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({ error: 'Error while updating first evaluation' });
                }
                console.log(result);
                res.status(200).json({message: 'Client successfully updated'});
            })
        }
    })
})

app.get('/api/client/first-evaluation/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    const sqlSelect = `SELECT * FROM first_evaluation WHERE id_client_fk = ?`;
    db.query(sqlSelect, [idClient], (err, result) => {
        if(err){
            return res.status(500).json({ error: 'Error while fetching first evaluation' });
        }
        res.status(200).json(result);
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

app.get('/api/client/search', verifyAuth, (req, res) => {
    const {query} = req.query;
    const userId = req.id_user;

    const sqlSelect = `SELECT client.*, first_evaluation.*
    FROM client
    LEFT JOIN first_evaluation ON client.id_client = first_evaluation.id_client_fk
    WHERE client.name LIKE ? AND client.id_user_fk = ?`;

    db.query(sqlSelect, [`%${query}%`, userId], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching client' });
        }

        if(result.length === 0) {
            return res.status(404).json({ error: 'No clients found' });
        }
        console.log(result);
        res.status(200).json(result);
    })
})

app.post('/api/exercise/register',  async(req, res) => {
    const name = req.body.name;
    const type = req.body.type;

    if(!name || !type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id_user;

    const sqlSelect = `SELECT * FROM exercises WHERE name = ?`;

    db.query(sqlSelect, [name], async (err, result) => {
        if(err){
            return res.status(500).json({ error: 'Error while fetching exercise' });
        }

        if(result.length > 0) {
            return res.status(409).json({ error: 'Exercise already registered' });
        }

        const sqlInsert = `INSERT INTO exercises (name, type, id_user_fk) VALUES (?, ?, ?)`;
        db.query(sqlInsert, [name, type, userId], (err, result) => {
            if(err){
                return res.status(500).json({ error: 'Error while inserting exercise' });
            }
            res.status(200).json({message: 'Exercise successfully registered'});
        })
    })
})

app.get('/api/exercise/list', verifyAuth, (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id_user;

    const sqlSelect = `SELECT * FROM exercises WHERE id_user_fk = ?`;
    db.query(sqlSelect, [userId], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching exercise' });
        }
        if(result.length === 0) {
            return res.status(404).json({ error: 'No exercises found' });
        }
        res.status(200).json(result);
    })

})


app.listen(3001, () => {
    console.log('Server is running on port 3001');
})