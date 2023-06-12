import '../../../../../../../style/components/connected/main/options/_prescription.sass'
import React, { useState, useEffect } from 'react';
import getToken from '../../../../../../../utils/getToken';
import Axios from 'axios';

const Prescription = ( {client} ) => {

    const [exerciseList, setExerciseList] = useState([]);

    const getExercises = () => {

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

    useEffect(() => {
        const delay = setTimeout(() => {
            getExercises();
        }, 100);

        return () => clearTimeout(delay);
    }, []);

    const renderExerciseOption = () => {
        const exerciseGroups = exerciseList.reduce((groups, exercise) => {
          const { type } = exercise;
          if (!groups[type]) {
            groups[type] = [];
          }
          groups[type].push(exercise);
          return groups;
        }, {});

        return Object.entries(exerciseGroups).map(([type, exercises]) => (
            <select key={type}>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          ));
        };

    return (
        <section>
            <h1>Prescription</h1>
            <div>
                <p>{client.name}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Reps</th>
                            <th>Sets</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {renderExerciseOption()}
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Prescription;