import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import getToken from '../../../../../utils/getToken';
import '../../../../../style/components/connected/main/options/_databaseexercises.sass';


const DatabaseExercises = () => {
    const [exerciseName, setExerciseName] = useState('');
    const [type, setType] = useState('');
    const [exerciseList, setExerciseList] = useState([]);


    const insertExercise = () => {

        const config = getToken();

        Axios.post('http://localhost:3001/api/exercise/register', {
            name: exerciseName,
            type: type
        }, config).then(() => {
            alert('Successfully registered exercise!');
            setExerciseName('');
            loadExercises();
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('Exercise already exists');
            }
            if(error.response.status === 400) {
                alert('All fields are required');
            }
        })
    }

    const loadExercises = () => {

        const config = getToken();

        Axios.get('http://localhost:3001/api/exercise/list', config)
        .then((response) => {
            setExerciseList(response.data);
        }).catch((error) => {
            if(error.response.status === 404) {
                setExerciseList([]);
            }
            console.log(error);
        })
    }

    const exerciseByType = exerciseList.reduce((acc, exercise) => {
        const { type } = exercise;
        if(!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(exercise);
        return acc;
    }, {});

    useEffect(() => {
        const delay = setTimeout(() => {
            loadExercises();
        }, 100);

        return () => clearTimeout(delay);
    }, []);


    return (
        <section className='section__database__exercises'>
            <h1 className='section__database__exercises__h1'>Database Exercises</h1>
            <div className="div__database__exercises__insert">
                <h2>Register Exercise</h2>
                <input  type="text" 
                        name="" 
                        id="" 
                        placeholder="Exercise name"
                        onChange={(event) => setExerciseName(event.target.value)}/>
                <select name="" id="" onChange={(event) => setType(event.target.value)}>
                    <option value="">Select type</option>
                    <option value="arms">Arms</option>
                    <option value="legs">Legs</option>
                    <option value="back">Back</option>
                    <option value="chest">Chest</option>
                    <option value="cardio">Cardio</option>
                    <option value="shoulder">Shoulder</option>
                    <option value="other">Other</option>
                </select>
                <button onClick={insertExercise}>Register exercise</button>
            </div>
            <div className='div__list__exercises'>
                <h2>Exercises registered</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Arms</th>
                            <th>Legs</th>
                            <th>Back</th>
                            <th>Chest</th>
                            <th>Cardio</th>
                            <th>Shoulder</th>
                            <th>Other</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {exerciseByType['arms'] &&
                                exerciseByType['arms'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                            <td>
                                {exerciseByType['legs'] &&
                                exerciseByType['legs'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                            <td>
                                {exerciseByType['back'] &&
                                exerciseByType['back'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                            <td>
                                {exerciseByType['chest'] &&
                                exerciseByType['chest'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                            <td>
                                {exerciseByType['cardio'] &&
                                exerciseByType['cardio'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                            <td>
                                {exerciseByType['shoulder'] &&
                                exerciseByType['shoulder'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                            <td>
                                {exerciseByType['other'] &&
                                exerciseByType['other'].map((exercise) => (
                                    <div key={exercise.id_exercise}>{exercise.name}</div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default DatabaseExercises;