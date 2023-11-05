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
    const exerciseData = req.body;

    const updateQueries = Object.keys(exerciseData).map((key) => {
        return new Promise((resolve, reject) => {
            const index = key.split('_')[1];
            const column = key.startsWith('exercise_') ? 'exercise_' + index : key.startsWith('sets_') ? 'sets_' + index : 'reps_' + index;
            const value = exerciseData[key];

            const sqlUpdate = `UPDATE prescription SET ${column} = ? WHERE id_client_fk = ?`;
            db.query(sqlUpdate, [value, idClient], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updateQueries)
        .then(() => {
            res.status(200).json({ message: 'Prescription successfully updated' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error while updating prescription' });
        });
});


app.put('/api/prescription/add', verifyAuth, (req, res) => {
    const idClient = req.query.client;
    const exerciseData = req.body;

    const updateQueries = Object.keys(exerciseData).map((key) => {
        const column = key.startsWith('exercise_') ? 'exercise_name' : key.startsWith('reps_') ? 'reps' : 'sets';
        const index = key.split('_')[1];
        return db.promise().execute(`UPDATE prescription SET ${column} = ? WHERE id_client_fk = ? AND exercise_${index} = ?`, [exerciseData[key], idClient, exerciseData[`exercise_${index}`]]);
    });

    Promise.all(updateQueries)
        .then(() => {
            res.status(200).json({ message: 'Prescription updated successfully' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error while updating prescription' });
        });
});

app.put('/api/prescription/type/a/add', verifyAuth, (req, res) => {
    const { exercise_1,
            exercise_2,
            exercise_3, 
            exercise_4,
            exercise_5,
            exercise_6,
            exercise_7,
            exercise_8,
            exercise_9,
            exercise_10,
            exercise_11,
            exercise_12,
            exercise_13,
            exercise_14,
            exercise_15,
            exercise_16,
            exercise_17,
            exercise_18,
            exercise_19,
            exercise_20} = req.body;

    const prescriptionId = req.params.id;

    console.log(exercise_1, exercise_2, exercise_3, exercise_4, exercise_5, exercise_6, exercise_7, exercise_8, exercise_9, exercise_10,
    exercise_11, exercise_12, exercise_13, exercise_14, exercise_15, exercise_16, exercise_17, exercise_18, exercise_19, exercise_20);

    console.log(prescriptionId);
    
    const sqlInsert = `INSERT INTO prescription (exercise_1, exercise_2, exercise_3, exercise_4, exercise_5, exercise_6, exercise_7, exercise_8, exercise_9, exercise_10,
    exercise_11, exercise_12, exercise_13, exercise_14, exercise_15, exercise_16, exercise_17, exercise_18, exercise_19, exercise_20) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    WHERE id_prescription_fk = ?`;

    db.query(sqlInsert, [exercise_1, exercise_2, exercise_3, exercise_4, exercise_5, exercise_6, exercise_7, exercise_8, exercise_9, exercise_10,
    exercise_11, exercise_12, exercise_13, exercise_14, exercise_15, exercise_16, exercise_17, exercise_18, exercise_19, exercise_20, prescriptionId], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ error: 'Error while inserting type A' });
        }
        console.log(result);
        res.status(200).json({message: 'Type A successfully added'});
    }
    )
})

app.get('/api/client/prescription/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    const sqlSelect = `SELECT * FROM prescription WHERE id_client_fk = ?`;

    db.query(sqlSelect, [idClient], (err, result) => {
        if(err) {
            console.error('Error fetching prescription:', err);
            console.log(err);
            return res.status(500).json({ error: 'Error while fetching prescription' });
        }
        res.status(200).json(result);
        console.log(result);
    });
});

app.put('/api/client/prescription/update/:id', verifyAuth, (req, res) => {
    const idClient = req.params.id;
    console.log("Request Body:", req.body);
    const { 
        exercise_1, 
        exercise_2, 
        exercise_3, 
        exercise_4, 
        exercise_5, 
        exercise_6, 
        exercise_7,
        exercise_8,
        exercise_9,
        exercise_10,
        exercise_11,
        exercise_12,
        exercise_13,
        exercise_14,
        exercise_15,
        exercise_16, 
        exercise_17,
        exercise_18,
        exercise_19,
        exercise_20,

        reps_1,
        reps_2,
        reps_3,
        reps_4,
        reps_5,
        reps_6,
        reps_7,
        reps_8,
        reps_9,
        reps_10,
        reps_11,
        reps_12,
        reps_13,
        reps_14,
        reps_15,
        reps_16,
        reps_17,
        reps_18,
        reps_19,
        reps_20,

        sets_1,
        sets_2,
        sets_3,
        sets_4, 
        sets_5,
        sets_6,
        sets_7,
        sets_8,
        sets_9,
        sets_10,
        sets_11,
        sets_12,
        sets_13,
        sets_14,
        sets_15,
        sets_16,
        sets_17,
        sets_18,
        sets_19,
        sets_20      
        } = req.body;

    console.log(req.body);
    const updateFieldsPrescription = [];
    const updateValuesPrescription = [];

    if(exercise_1) {
        updateFieldsPrescription.push('exercise_1 = ?');
        updateValuesPrescription.push(exercise_1);
    }
    if(exercise_2) {
        updateFieldsPrescription.push('exercise_2 = ?');
        updateValuesPrescription.push(exercise_2);
    }
    if(exercise_3) {
        updateFieldsPrescription.push('exercise_3 = ?');
        updateValuesPrescription.push(exercise_3);
    }
    if(exercise_4) {
        updateFieldsPrescription.push('exercise_4 = ?');
        updateValuesPrescription.push(exercise_4);
    }
    if(exercise_5) {
        updateFieldsPrescription.push('exercise_5 = ?');
        updateValuesPrescription.push(exercise_5);
    }
    if(exercise_6) {
        updateFieldsPrescription.push('exercise_6 = ?');
        updateValuesPrescription.push(exercise_6);
    }
    if(exercise_7) {
        updateFieldsPrescription.push('exercise_7 = ?');
        updateValuesPrescription.push(exercise_7);
    }
    if(exercise_8) {
        updateFieldsPrescription.push('exercise_8 = ?');
        updateValuesPrescription.push(exercise_8);
    }
    if(exercise_9) {
        updateFieldsPrescription.push('exercise_9 = ?');
        updateValuesPrescription.push(exercise_9);
    }
    if(exercise_10) {
        updateFieldsPrescription.push('exercise_10 = ?');
        updateValuesPrescription.push(exercise_10);
    }
    if(exercise_11) {
        updateFieldsPrescription.push('exercise_11 = ?');
        updateValuesPrescription.push(exercise_11);
    }
    if(exercise_12) {
        updateFieldsPrescription.push('exercise_12 = ?');
        updateValuesPrescription.push(exercise_12);
    }
    if(exercise_13) {
        updateFieldsPrescription.push('exercise_13 = ?');
        updateValuesPrescription.push(exercise_13);
    }
    if(exercise_14) {
        updateFieldsPrescription.push('exercise_14 = ?');
        updateValuesPrescription.push(exercise_14);
    }
    if(exercise_15) {
        updateFieldsPrescription.push('exercise_15 = ?');
        updateValuesPrescription.push(exercise_15);
    }
    if(exercise_16) {
        updateFieldsPrescription.push('exercise_16 = ?');
        updateValuesPrescription.push(exercise_16);
    }
    if(exercise_17) {
        updateFieldsPrescription.push('exercise_17 = ?');
        updateValuesPrescription.push(exercise_17);
    }
    if(exercise_18) {
        updateFieldsPrescription.push('exercise_18 = ?');
        updateValuesPrescription.push(exercise_18);
    }
    if(exercise_19) {
        updateFieldsPrescription.push('exercise_19 = ?');
        updateValuesPrescription.push(exercise_19);
    }
    if(exercise_20) {
        updateFieldsPrescription.push('exercise_20 = ?');
        updateValuesPrescription.push(exercise_20);
    }
    if(sets_1) {
        updateFieldsPrescription.push('sets_1 = ?');
        updateValuesPrescription.push(sets_1);
    }
    if(sets_2) {
        updateFieldsPrescription.push('sets_2 = ?');
        updateValuesPrescription.push(sets_2);
    }
    if(sets_3) {
        updateFieldsPrescription.push('sets_3 = ?');
        updateValuesPrescription.push(sets_3);
    }
    if(sets_4) {
        updateFieldsPrescription.push('sets_4 = ?');
        updateValuesPrescription.push(sets_4);
    }
    if(sets_5) {
        updateFieldsPrescription.push('sets_5 = ?');
        updateValuesPrescription.push(sets_5);
    }
    if(sets_6) {
        updateFieldsPrescription.push('sets_6 = ?');
        updateValuesPrescription.push(sets_6);
    }
    if(sets_7) {
        updateFieldsPrescription.push('sets_7 = ?');
        updateValuesPrescription.push(sets_7);
    }
    if(sets_8) {
        updateFieldsPrescription.push('sets_8 = ?');
        updateValuesPrescription.push(sets_8);
    }
    if(sets_9) {
        updateFieldsPrescription.push('sets_9 = ?');
        updateValuesPrescription.push(sets_9);
    }
    if(sets_10) {
        updateFieldsPrescription.push('sets_10 = ?');
        updateValuesPrescription.push(sets_10);
    }
    if(sets_11) {
        updateFieldsPrescription.push('sets_11 = ?');
        updateValuesPrescription.push(sets_11);
    }
    if(sets_12) {
        updateFieldsPrescription.push('sets_12 = ?');
        updateValuesPrescription.push(sets_12);
    }
    if(sets_13) {
        updateFieldsPrescription.push('sets_13 = ?');
        updateValuesPrescription.push(sets_13);
    }
    if(sets_14) {
        updateFieldsPrescription.push('sets_14 = ?');
        updateValuesPrescription.push(sets_14);
    }
    if(sets_15) {
        updateFieldsPrescription.push('sets_15 = ?');
        updateValuesPrescription.push(sets_15);
    }
    if(sets_16) {
        updateFieldsPrescription.push('sets_16 = ?');
        updateValuesPrescription.push(sets_16);
    }
    if(sets_17) {
        updateFieldsPrescription.push('sets_17 = ?');
        updateValuesPrescription.push(sets_17);
    }
    if(sets_18) {
        updateFieldsPrescription.push('sets_18 = ?');
        updateValuesPrescription.push(sets_18);
    }
    if(sets_19) {
        updateFieldsPrescription.push('sets_19 = ?');
        updateValuesPrescription.push(sets_19);
    }
    if(sets_20) {
        updateFieldsPrescription.push('sets_20 = ?');
        updateValuesPrescription.push(sets_20);
    }
    if(reps_1) {
        updateFieldsPrescription.push('reps_1 = ?');
        updateValuesPrescription.push(reps_1);
    }
    if(reps_2) {
        updateFieldsPrescription.push('reps_2 = ?');
        updateValuesPrescription.push(reps_2);
    }
    if(reps_3) {
        updateFieldsPrescription.push('reps_3 = ?');
        updateValuesPrescription.push(reps_3);
    }
    if(reps_4) {
        updateFieldsPrescription.push('reps_4 = ?');
        updateValuesPrescription.push(reps_4);
    }
    if(reps_5) {
        updateFieldsPrescription.push('reps_5 = ?');
        updateValuesPrescription.push(reps_5);
    }
    if(reps_6) {
        updateFieldsPrescription.push('reps_6 = ?');
        updateValuesPrescription.push(reps_6);
    }
    if(reps_7) {
        updateFieldsPrescription.push('reps_7 = ?');
        updateValuesPrescription.push(reps_7);
    }
    if(reps_8) {
        updateFieldsPrescription.push('reps_8 = ?');
        updateValuesPrescription.push(reps_8);
    }
    if(reps_9) {
        updateFieldsPrescription.push('reps_9 = ?');
        updateValuesPrescription.push(reps_9);
    }
    if(reps_10) {
        updateFieldsPrescription.push('reps_10 = ?');
        updateValuesPrescription.push(reps_10);
    }
    if(reps_11) {
        updateFieldsPrescription.push('reps_11 = ?');
        updateValuesPrescription.push(reps_11);
    }
    if(reps_12) {
        updateFieldsPrescription.push('reps_12 = ?');
        updateValuesPrescription.push(reps_12);
    }
    if(reps_13) {
        updateFieldsPrescription.push('reps_13 = ?');
        updateValuesPrescription.push(reps_13);
    }
    if(reps_14) {
        updateFieldsPrescription.push('reps_14 = ?');
        updateValuesPrescription.push(reps_14);
    }
    if(reps_15) {
        updateFieldsPrescription.push('reps_15 = ?');
        updateValuesPrescription.push(reps_15);
    }
    if(reps_16) {
        updateFieldsPrescription.push('reps_16 = ?');
        updateValuesPrescription.push(reps_16);
    }
    if(reps_17) {
        updateFieldsPrescription.push('reps_17 = ?');
        updateValuesPrescription.push(reps_17);
    }
    if(reps_18) {
        updateFieldsPrescription.push('reps_18 = ?');
        updateValuesPrescription.push(reps_18);
    }
    if(reps_19) {
        updateFieldsPrescription.push('reps_19 = ?');
        updateValuesPrescription.push(reps_19);
    }
    if(reps_20) {
        updateFieldsPrescription.push('reps_20 = ?');
        updateValuesPrescription.push(reps_20);
    }
    if(updateFieldsPrescription.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    const sqlUpdate = `UPDATE prescription SET ${updateFieldsPrescription.join(', ')} WHERE id_client_fk = ?`;
    updateValuesPrescription.push(idClient);

    db.query(sqlUpdate, updateValuesPrescription, (err, result) => {
        if(err){
            console.log(err);
            console.log(result);
            return res.status(500).json({ error: 'Error while updating prescription' });
        }
        else{
            console.log(err);
            console.log(result);
            return res.status(200).json({ success: 'Prescription updated successfully' });
        }
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})