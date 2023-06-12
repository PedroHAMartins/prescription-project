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
    const token = jwt.sign({ id_user }, process.env.SECRET_KEY, { expiresIn: '6h' });
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
    const { 
        name, 
        gender, 
        age, 
        phone, 
        address, 
        birthdate, 
        email, 

        info_height, 
        info_weight, 
        info_allergies, 
        info_patologies, 
        info_objectives,
    
        heartrate_min,
        heartrate_max,
        bloodpressure,
        bloodpressure_classification,

        composition_muscle,
        composition_fat,
        composition_bone,

        perimeter_rightarm,
        perimeter_leftarm,
        perimeter_rightforearm,
        perimeter_leftforearm,
        perimeter_chest,
        perimeter_abdomen,
        perimeter_hip,
        perimeter_rightthigh,
        perimeter_leftthigh,
        perimeter_rightcalf,
        perimeter_leftcalf,

        measure_biceps,
        measure_triceps,
        measure_subscapular,
        measure_suprailiac,
        measure_thigs
        } = req.body;
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

        if(heartrate_min) {
            updateFirstEvaluationFields.push('heartrate_min = ?');
            updateFirstEvaluationValues.push(heartrate_min);
        }

        if(heartrate_max) {
            updateFirstEvaluationFields.push('heartrate_max = ?');
            updateFirstEvaluationValues.push(heartrate_max);
        }

        if(bloodpressure) {
            updateFirstEvaluationFields.push('bloodpressure = ?');
            updateFirstEvaluationValues.push(bloodpressure);
        }

        if(bloodpressure_classification) {
            updateFirstEvaluationFields.push('bloodpressure_classification = ?');
            updateFirstEvaluationValues.push(bloodpressure_classification);
        }

        if(composition_muscle) {
            updateFirstEvaluationFields.push('composition_muscle = ?');
            updateFirstEvaluationValues.push(composition_muscle);
        }

        if(composition_fat) {
            updateFirstEvaluationFields.push('composition_fat = ?');
            updateFirstEvaluationValues.push(composition_fat);
        }

        if(composition_bone) {
            updateFirstEvaluationFields.push('composition_bone = ?');
            updateFirstEvaluationValues.push(composition_bone);
        }

        if(perimeter_rightarm) {
            updateFirstEvaluationFields.push('perimeter_rightarm = ?');
            updateFirstEvaluationValues.push(perimeter_rightarm);
        }

        if(perimeter_leftarm) {
            updateFirstEvaluationFields.push('perimeter_leftarm = ?');
            updateFirstEvaluationValues.push(perimeter_leftarm);
        }

        if(perimeter_rightforearm) {
            updateFirstEvaluationFields.push('perimeter_rightforearm = ?');
            updateFirstEvaluationValues.push(perimeter_rightforearm);
        }

        if(perimeter_leftforearm) {
            updateFirstEvaluationFields.push('perimeter_leftforearm = ?');
            updateFirstEvaluationValues.push(perimeter_leftforearm);
        }
    
        if(perimeter_chest) {
            updateFirstEvaluationFields.push('perimeter_chest = ?');
            updateFirstEvaluationValues.push(perimeter_chest);
        }

        if(perimeter_abdomen) {
            updateFirstEvaluationFields.push('perimeter_abdomen = ?');
            updateFirstEvaluationValues.push(perimeter_abdomen);
        }

        if(perimeter_hip) {
            updateFirstEvaluationFields.push('perimeter_hip = ?');
            updateFirstEvaluationValues.push(perimeter_hip);
        }

        if(perimeter_rightthigh) {
            updateFirstEvaluationFields.push('perimeter_rightthigh = ?');
            updateFirstEvaluationValues.push(perimeter_rightthigh);
        }

        if(perimeter_leftthigh) {
            updateFirstEvaluationFields.push('perimeter_leftthigh = ?');
            updateFirstEvaluationValues.push(perimeter_leftthigh);
        }

        if(perimeter_rightcalf) {
            updateFirstEvaluationFields.push('perimeter_rightcalf = ?');
            updateFirstEvaluationValues.push(perimeter_rightcalf);
        }

        if(perimeter_leftcalf) {
            updateFirstEvaluationFields.push('perimeter_leftcalf = ?');
            updateFirstEvaluationValues.push(perimeter_leftcalf);
        }

        if(measure_biceps) {
            updateFirstEvaluationFields.push('measure_biceps = ?');
            updateFirstEvaluationValues.push(measure_biceps);
        }

        if(measure_triceps) {
            updateFirstEvaluationFields.push('measure_triceps = ?');
            updateFirstEvaluationValues.push(measure_triceps);
        }

        if(measure_subscapular) {
            updateFirstEvaluationFields.push('measure_subscapular = ?');
            updateFirstEvaluationValues.push(measure_subscapular);
        }

        if(measure_suprailiac) {
            updateFirstEvaluationFields.push('measure_suprailiac = ?');
            updateFirstEvaluationValues.push(measure_suprailiac);
        }

        if(measure_thigs) {
            updateFirstEvaluationFields.push('measure_thigs = ?');
            updateFirstEvaluationValues.push(measure_thigs);
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
                    console.log(result);
                    return res.status(500).json({ error: 'Error while updating first evaluation' });
                }
                console.log(result);
                res.status(200).json({message: 'Client successfully updated'});
            })
        }
    })
})

app.put('/api/client/update2/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;

    const { 
        name, 
        gender, 
        age, 
        phone, 
        address, 
        birthdate, 
        email, 

        info_height2, 
        info_weight2, 
        info_allergies2, 
        info_patologies2, 
        info_objectives2,
    
        heartrate_min2,
        heartrate_max2,
        bloodpressure2,
        bloodpressure_classification2,

        composition_muscle2,
        composition_fat2,
        composition_bone2,

        perimeter_rightarm2,
        perimeter_leftarm2,
        perimeter_rightforearm2,
        perimeter_leftforearm2,
        perimeter_chest2,
        perimeter_abdomen2,
        perimeter_hip2,
        perimeter_rightthigh2,
        perimeter_leftthigh2,
        perimeter_rightcalf2,
        perimeter_leftcalf2,

        measure_biceps2,
        measure_triceps2,
        measure_subscapular2,
        measure_suprailiac2,
        measure_thigs2
        } = req.body;

    console.log(req.body);
    const updateFields2 = [];
    const updateValues2 = [];

    if(name) {
        updateFields2.push('name = ?');
        updateValues2.push(name);
    }
    if(gender) {
        updateFields2.push('gender = ?');
        updateValues2.push(gender);
    }

    if(age) {
        updateFields2.push('age = ?');
        updateValues2.push(age);
    }

    if(phone) {
        updateFields2.push('phone = ?');
        updateValues2.push(phone);
    }

    if(address) {
        updateFields2.push('address = ?');
        updateValues2.push(address);
    }

    if(birthdate) {
        updateFields2.push('birthdate = ?');
        updateValues2.push(birthdate);
    }

    if(email) {
        updateFields2.push('email = ?');
        updateValues2.push(email);
    }
    if(updateFields2.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    const sqlUpdate = `UPDATE client SET ${updateFields2.join(', ')} WHERE id_client = ?`;
    updateValues2.push(idClient);

    db.query(sqlUpdate, updateValues2, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Error while updating client' });
        }

        const updateSecondEvaluationFields = [];
        const updateSecondEvaluationValues = [];

        if(info_height2) {
            updateSecondEvaluationFields.push('info_height2 = ?');
            updateSecondEvaluationValues.push(info_height2);
        }

        if(info_weight2) {
            updateSecondEvaluationFields.push('info_weight2 = ?');
            updateSecondEvaluationValues.push(info_weight2);
        }

        if(info_allergies2) {
            updateSecondEvaluationFields.push('info_allergies2 = ?');
            updateSecondEvaluationValues.push(info_allergies2);
        }

        if(info_patologies2) {
            updateSecondEvaluationFields.push('info_patologies2 = ?');
            updateSecondEvaluationValues.push(info_patologies2);
        }

        if(info_objectives2) {
            updateSecondEvaluationFields.push('info_objectives2 = ?');
            updateSecondEvaluationValues.push(info_objectives2);
        }

        if(heartrate_min2) {
            updateSecondEvaluationFields.push('heartrate_min2 = ?');
            updateSecondEvaluationValues.push(heartrate_min2);
        }

        if(heartrate_max2) {
            updateSecondEvaluationFields.push('heartrate_max2 = ?');
            updateSecondEvaluationValues.push(heartrate_max2);
        }

        if(bloodpressure_classification2) {
            updateSecondEvaluationFields.push('bloodpressure2 = ?');
            updateSecondEvaluationValues.push(bloodpressure2);
        }

        if(bloodpressure_classification2) {
            updateSecondEvaluationFields.push('bloodpressure_classification2 = ?');
            updateSecondEvaluationValues.push(bloodpressure_classification2);
        }

        if(composition_muscle2) {
            updateSecondEvaluationFields.push('composition_muscle2 = ?');
            updateSecondEvaluationValues.push(composition_muscle2);
        }

        if(composition_fat2) {
            updateSecondEvaluationFields.push('composition_fat2 = ?');
            updateSecondEvaluationValues.push(composition_fat2);
        }

        if(composition_bone2) {
            updateSecondEvaluationFields.push('composition_bone2 = ?');
            updateSecondEvaluationValues.push(composition_bone2);
        }

        if(perimeter_rightarm2) {
            updateSecondEvaluationFields.push('perimeter_rightarm2 = ?');
            updateSecondEvaluationValues.push(perimeter_rightarm2);
        }

        if(perimeter_leftarm2) {
            updateSecondEvaluationFields.push('perimeter_leftarm2 = ?');
            updateSecondEvaluationValues.push(perimeter_leftarm2);
        }

        if(perimeter_rightforearm2) {
            updateSecondEvaluationFields.push('perimeter_rightforearm2 = ?');
            updateSecondEvaluationValues.push(perimeter_rightforearm2);
        }

        if(perimeter_leftforearm2) {
            updateSecondEvaluationFields.push('perimeter_leftforearm2 = ?');
            updateSecondEvaluationValues.push(perimeter_leftforearm2);
        }
    
        if(perimeter_chest2) {
            updateSecondEvaluationFields.push('perimeter_chest2 = ?');
            updateSecondEvaluationValues.push(perimeter_chest2);
        }

        if(perimeter_abdomen2) {
            updateSecondEvaluationFields.push('perimeter_abdomen2 = ?');
            updateSecondEvaluationValues.push(perimeter_abdomen2);
        }

        if(perimeter_hip2) {
            updateSecondEvaluationFields.push('perimeter_hip2 = ?');
            updateSecondEvaluationValues.push(perimeter_hip2);
        }

        if(perimeter_rightthigh2) {
            updateSecondEvaluationFields.push('perimeter_rightthigh2 = ?');
            updateSecondEvaluationValues.push(perimeter_rightthigh2);
        }

        if(perimeter_leftthigh2) {
            updateSecondEvaluationFields.push('perimeter_leftthigh2 = ?');
            updateSecondEvaluationValues.push(perimeter_leftthigh2);
        }

        if(perimeter_rightcalf2) {
            updateSecondEvaluationFields.push('perimeter_rightcalf2 = ?');
            updateSecondEvaluationValues.push(perimeter_rightcalf2);
        }

        if(perimeter_leftcalf2) {
            updateSecondEvaluationFields.push('perimeter_leftcalf2 = ?');
            updateSecondEvaluationValues.push(perimeter_leftcalf2);
        }

        if(measure_biceps2) {
            updateSecondEvaluationFields.push('measure_biceps2 = ?');
            updateSecondEvaluationValues.push(measure_biceps2);
        }

        if(measure_triceps2) {
            updateSecondEvaluationFields.push('measure_triceps2 = ?');
            updateSecondEvaluationValues.push(measure_triceps2);
        }

        if(measure_subscapular2) {
            updateSecondEvaluationFields.push('measure_subscapular2 = ?');
            updateSecondEvaluationValues.push(measure_subscapular2);
        }

        if(measure_suprailiac2) {
            updateSecondEvaluationFields.push('measure_suprailiac2 = ?');
            updateSecondEvaluationValues.push(measure_suprailiac2);
        }

        if(measure_thigs2) {
            updateSecondEvaluationFields.push('measure_thigs2 = ?');
            updateSecondEvaluationValues.push(measure_thigs2);
        }
        console.log(updateSecondEvaluationFields);
        console.log(updateSecondEvaluationValues);

        if (updateSecondEvaluationFields.length === 0) {
            return res.status(200).json({ message: 'No fields to update' });
        }
        else {
            const sqlUpdateSecondEvaluation = `UPDATE second_evaluation SET ${updateSecondEvaluationFields.join(', ')} WHERE id_client_fk = ?`;
            updateSecondEvaluationValues.push(idClient);

            db.query(sqlUpdateSecondEvaluation, updateSecondEvaluationValues, (err, result) => {
                if(err){
                    console.log(err);
                    console.log(result);
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

app.get('/api/client/second-evaluation/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    const sqlSelect = `SELECT * FROM second_evaluation WHERE id_client_fk = ?`;
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

    const sqlSelect = `SELECT client.*, first_evaluation.*, second_evaluation.*
    FROM client
    LEFT JOIN first_evaluation ON client.id_client = first_evaluation.id_client_fk
    LEFT JOIN second_evaluation ON client.id_client = second_evaluation.id_client_fk
    WHERE client.name LIKE ? AND client.id_user_fk = ?`;

    db.query(sqlSelect, [`%${query}%`, userId], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching client' });
        }

        if(result.length === 0) {
            return res.status(404).json({ error: 'No clients found' });
        }
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

app.put('/api/prescription/type/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    const type = req.body.type;

    const sqlUpdate = `UPDATE prescription SET training_type = ? WHERE id_client_fk = ?`;
    db.query(sqlUpdate, [type, idClient], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ error: 'Error while updating client' });
        }
        console.log(result);
        res.status(200).json({message: 'Client successfully updated'});
    })
})

app.get('/api/prescription/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    const sqlSelect = `SELECT * FROM prescription WHERE id_client_fk = ?`;

    db.query(sqlSelect, [idClient], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Error while fetching prescription' });
        }
        if(result.length === 0) {
            return res.status(404).json({ error: 'No prescriptions found' });
        }
        res.status(200).json(result);
    })
})


app.listen(3001, () => {
    console.log('Server is running on port 3001');
})