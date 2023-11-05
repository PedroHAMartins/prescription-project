import Axios from "axios";
import getToken from "../../../../../../../../utils/getToken";
import { useEffect, useState } from "react";
import '../../../../../../../../style/components/connected/main/options/_type.sass'


const TypeA = ( {client} ) => {
    // console.log ("Client Data: ", client);
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState(Array(20).fill(''));
    const [prescriptionData, setPrescriptionData] = useState({
        exercise_1: client.exercise_1,
        exercise_2: client.exercise_2,
        exercise_3: client.exercise_3,
        exercise_4: client.exercise_4,
        exercise_5: client.exercise_5,
        exercise_6: client.exercise_6,
        exercise_7: client.exercise_7,
        exercise_8: client.exercise_8,
        exercise_9: client.exercise_9,
        exercise_10: client.exercise_10,
        exercise_11: client.exercise_11,
        exercise_12: client.exercise_12,
        exercise_13: client.exercise_13,
        exercise_14: client.exercise_14,
        exercise_15: client.exercise_15,
        exercise_16: client.exercise_16,
        exercise_17: client.exercise_17,
        exercise_18: client.exercise_18,
        exercise_19: client.exercise_19,
        exercise_20: client.exercise_20,
        reps_1: client.reps_1,
        reps_2: client.reps_2,
        reps_3: client.reps_3,
        reps_4: client.reps_4,
        reps_5: client.reps_5,
        reps_6: client.reps_6,
        reps_7: client.reps_7,
        reps_8: client.reps_8,
        reps_9: client.reps_9,
        reps_10: client.reps_10,
        reps_11: client.reps_11,
        reps_12: client.reps_12,
        reps_13: client.reps_13,
        reps_14: client.reps_14,
        reps_15: client.reps_15,
        reps_16: client.reps_16,
        reps_17: client.reps_17,
        reps_18: client.reps_18,
        reps_19: client.reps_19,
        reps_20: client.reps_20,
        sets_1: client.sets_1,
        sets_2: client.sets_2,
        sets_3: client.sets_3,
        sets_4: client.sets_4,
        sets_5: client.sets_5,
        sets_6: client.sets_6,
        sets_7: client.sets_7,
        sets_8: client.sets_8,
        sets_9: client.sets_9,
        sets_10: client.sets_10,
        sets_11: client.sets_11,
        sets_12: client.sets_12,
        sets_13: client.sets_13,
        sets_14: client.sets_14,
        sets_15: client.sets_15,
        sets_16: client.sets_16,
        sets_17: client.sets_17,
        sets_18: client.sets_18,
        sets_19: client.sets_19,
        sets_20: client.sets_20
    })
    const getExercises = () => {
        const config = getToken();
        Axios.get('http://localhost:3001/api/exercise/list', config)
        .then((response) => {
            setExerciseList(response.data);
        })
        .catch((error) => {
            if(error.response.status === 404) {
                setExerciseList([]);
            }
            console.log(error);
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log("Updated State:", { ...prescriptionData, [name]: value });
        setPrescriptionData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleExerciseSelectChange = (index, event) => {
        const updatedSelectedExercises = [...selectedExercises];
        updatedSelectedExercises[index] = event.target.value;
        setSelectedExercises(updatedSelectedExercises);
    
        const updatedPrescriptionData = { ...prescriptionData };
        updatedPrescriptionData[`exercise_${index + 1}`] = event.target.value;
        setPrescriptionData(updatedPrescriptionData);
    
        console.log(`Selected exercise at index ${index}: ${event.target.value}`);
    };

    const getPrescription = () => {
        const config = getToken();

        Axios.get(`http://localhost:3001/api/client/prescription/${client.id_client}`, config)
        .then((response) => {
            setPrescriptionData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    console.log("Initial Prescription Data:", prescriptionData);

    const updatePrescription = () => {
        const config = getToken();
        // console.log("Request Data:", prescriptionData);
        
        Axios.put(`http://localhost:3001/api/client/prescription/update/${client.id_client}`, {
            exercise_1: prescriptionData.exercise_1,
            exercise_2: prescriptionData.exercise_2,
            exercise_3: prescriptionData.exercise_3,
            exercise_4: prescriptionData.exercise_4,
            exercise_5: prescriptionData.exercise_5,
            exercise_6: prescriptionData.exercise_6,
            exercise_7: prescriptionData.exercise_7,
            exercise_8: prescriptionData.exercise_8,
            exercise_9: prescriptionData.exercise_9,
            exercise_10: prescriptionData.exercise_10,
            exercise_11: prescriptionData.exercise_11,
            exercise_12: prescriptionData.exercise_12,
            exercise_13: prescriptionData.exercise_13,
            exercise_14: prescriptionData.exercise_14,
            exercise_15: prescriptionData.exercise_15,
            exercise_16: prescriptionData.exercise_16,
            exercise_17: prescriptionData.exercise_17,
            exercise_18: prescriptionData.exercise_18,
            exercise_19: prescriptionData.exercise_19,
            exercise_20: prescriptionData.exercise_20,
            reps_1: prescriptionData.reps_1,
            reps_2: prescriptionData.reps_2,
            reps_3: prescriptionData.reps_3,
            reps_4: prescriptionData.reps_4,
            reps_5: prescriptionData.reps_5,
            reps_6: prescriptionData.reps_6,
            reps_7: prescriptionData.reps_7,
            reps_8: prescriptionData.reps_8,
            reps_9: prescriptionData.reps_9,
            reps_10: prescriptionData.reps_10,
            reps_11: prescriptionData.reps_11,
            reps_12: prescriptionData.reps_12,
            reps_13: prescriptionData.reps_13,
            reps_14: prescriptionData.reps_14,
            reps_15: prescriptionData.reps_15,
            reps_16: prescriptionData.reps_16,
            reps_17: prescriptionData.reps_17,
            reps_18: prescriptionData.reps_18,
            reps_19: prescriptionData.reps_19,
            reps_20: prescriptionData.reps_20,
            sets_1: prescriptionData.sets_1,
            sets_2: prescriptionData.sets_2,
            sets_3: prescriptionData.sets_3,
            sets_4: prescriptionData.sets_4,
            sets_5: prescriptionData.sets_5,
            sets_6: prescriptionData.sets_6,
            sets_7: prescriptionData.sets_7,
            sets_8: prescriptionData.sets_8,
            sets_9: prescriptionData.sets_9,
            sets_10: prescriptionData.sets_10,
            sets_11: prescriptionData.sets_11,
            sets_12: prescriptionData.sets_12,
            sets_13: prescriptionData.sets_13,
            sets_14: prescriptionData.sets_14,
            sets_15: prescriptionData.sets_15,
            sets_16: prescriptionData.sets_16,
            sets_17: prescriptionData.sets_17,
            sets_18: prescriptionData.sets_18,
            sets_19: prescriptionData.sets_19,
            sets_20: prescriptionData.sets_20
        }, config).then(() => {
            alert('Successfully updated client!');
        }).catch((error, result) => {
            console.log(error);
            alert('Error updating client!');
        })
    }


    useEffect(() => {
        const delay = setTimeout(() => {
            getExercises();
        }, 100);

        return () => clearTimeout(delay);
    }, []);

    const renderExerciseSelects = () => {
        return selectedExercises.map((selectedExercise, index) => {
            const exerciseKey = `${client}.exercise_${index + 1}`;

            return (
                <div key={index}>
                    <select
                        key={exerciseKey}
                        id={exerciseKey}
                        value={selectedExercise}
                        onChange={(event) => handleExerciseSelectChange(index, event)}
                        defaultValue={exerciseKey}
                    >
                        <option value=""></option>
                        {exerciseList.map((exercise) => {
                            return (
                                <option
                                    key={exercise.id}
                                    value={exercise.name}
                                >
                                    {exercise.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        });
    };
    

    const RepsInputs = () => {
        const repsInputs = Array.from({ length: 20 }, (_, index) => {
            const inputKey = `${client}.reps_${index + 1}`;
            return (
                <div key={index}>
                    <input
                        type="number"
                        id={inputKey}
                        name={inputKey}  // Add the name attribute here
                        onChange={handleChange}
                        defaultValue={inputKey}
                    />
                </div>
            );
        });
    
        return <>{repsInputs}</>;
    };
    
    const SetsInputs = () => {
        const setsInputs = Array.from({ length: 20 }, (_, index) => {
            const inputKey = `${client}.sets_${index + 1}`;
            return (
                <div key={index}>
                    <input
                        type="number"
                        id={inputKey}
                        name={inputKey}  // Add the name attribute here
                        onChange={handleChange}
                        defaultValue={inputKey}
                    />
                </div>
            );
        });
    
        return <>{setsInputs}</>;
    };
    

    return (
        <div>
            <table className="div__type__table">
                <thead>
                    <tr>
                        <th>Exercise name</th>
                        <th>Reps / Minutes</th>
                        <th>Sets</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {renderExerciseSelects()}
                        </td>
                        <td>
                            <div>
                                {RepsInputs()}
                            </div>
                        </td>
                        <td>
                            <div>
                                {SetsInputs()}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="div__type__button" onClick={updatePrescription}>Save changes</button>
            <button className="div__type__button" onClick={getPrescription}>Retrieve Data</button>
        </div>
    )
}

const TypeAB = () => {
    return (
        <div>
            <p>Type AB</p>      
        </div>
    );
}

const TypeABC = () => {
    return (
        <div>
            <p>Type ABC</p>      
        </div>
    );
}

const TypeABCD = () => {
    return (
        <div>
            <p>Type ABCD</p>      
        </div>
    );
}

const TypeABCDE = () => {
    return (
        <div>
            <p>Type ABCDE</p>      
        </div>
    );
}

export { TypeA, TypeAB, TypeABC, TypeABCD, TypeABCDE };