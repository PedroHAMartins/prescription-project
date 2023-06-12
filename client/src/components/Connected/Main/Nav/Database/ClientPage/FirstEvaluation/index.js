import React, { useState } from 'react';
import Axios from 'axios';
import getToken from '../../../../../../../utils/getToken';
import '../../../../../../../style/components/connected/main/options/_evaluation.sass'


const FirstEvaluation = ({ client }) => {
    const [formData, setFormData] = useState({
        name: client.name,
        gender: client.gender,
        age: client.age,
        phone: client.phone,
        address: client.address,
        birthdate: client.birthdate,
        email: client.email,        
    });

    const [firstEvaluationData, setFirstEvaluationData] = useState({
        info_height: client.info_height,
        info_weight: client.info_weight,
        info_allergies: client.info_allergies,
        info_patologies: client.info_patologies,
        info_objectives: client.info_objectives,
        heartrate_max: client.heartrate_max,
        heartrate_min: client.heartrate_min,
        bloodpressure: client.bloodpressure,
        bloodpressure_classification: client.bloodpressure_classification,
        composition_muscle: client.composition_muscle,
        composition_fat: client.composition_fat,
        composition_bone: client.composition_bone,
        perimeter_rightarm: client.perimeter_rightarm,
        perimeter_leftarm: client.perimeter_leftarm,
        perimeter_rightforearm: client.perimeter_rightforearm,
        perimeter_leftforearm: client.perimeter_leftforearm,
        perimeter_chest: client.perimeter_chest,
        perimeter_abdomen: client.perimeter_abdomen,
        perimeter_hip: client.perimeter_hip,
        perimeter_rightthigh: client.perimeter_rightthigh,
        perimeter_leftthigh: client.perimeter_leftthigh,
        perimeter_rightcalf: client.perimeter_rightcalf,
        perimeter_leftcalf: client.perimeter_leftcalf,
        measure_biceps: client.measure_biceps,
        measure_triceps: client.measure_triceps,
        measure_subscapular: client.measure_subscapular,
        measure_suprailiac: client.measure_suprailiac,
        measure_thigs: client.measure_thigs
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const formatDate = (date) => {
        if (!date){
            return '';
        }

        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    }

    // const getFirstEvaluation = () => {
    //     const config = getToken();

    //     Axios.get(`http://localhost:3001/api/client/first-evaluation/${client.id_client}`, config)
    //     .then((response) => {
    //         setFirstEvaluationData(response.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    const updateClient = () => {
        const config = getToken();
    
        Axios.put(`http://localhost:3001/api/client/update/${client.id_client}`, {
            name: formData.name,
            gender: formData.gender,
            age: formData.age,
            phone: formData.phone,
            address: formData.address,
            birthdate: formData.birthdate,
            email: formData.email,
            info_height: formData.info_height,
            info_weight: formData.info_weight,
            info_allergies: formData.info_allergies,
            info_patologies: formData.info_patologies,
            info_objectives: formData.info_objectives,
            heartrate_max: formData.heartrate_max,
            heartrate_min: formData.heartrate_min,
            bloodpressure: formData.bloodpressure,
            bloodpressure_classification: formData.bloodpressure_classification,
            composition_muscle: formData.composition_muscle,
            composition_fat: formData.composition_fat,
            composition_bone: formData.composition_bone,
            perimeter_rightarm: formData.perimeter_rightarm,
            perimeter_leftarm: formData.perimeter_leftarm,
            perimeter_rightforearm: formData.perimeter_rightforearm,
            perimeter_leftforearm: formData.perimeter_leftforearm,
            perimeter_chest: formData.perimeter_chest,
            perimeter_abdomen: formData.perimeter_abdomen,
            perimeter_hip: formData.perimeter_hip,
            perimeter_rightthigh: formData.perimeter_rightthigh,
            perimeter_leftthigh: formData.perimeter_leftthigh,
            perimeter_rightcalf: formData.perimeter_rightcalf,
            perimeter_leftcalf: formData.perimeter_leftcalf,
            measure_biceps: formData.measure_biceps,
            measure_triceps: formData.measure_triceps,
            measure_subscapular: formData.measure_subscapular,
            measure_suprailiac: formData.measure_suprailiac,
            measure_thigs: formData.measure_thigs
        }, config).then(() => {
            alert('Successfully updated client!');
        }).catch((error) => {
            console.log(error);
            alert('Error updating client!');
        })
    }

    return (
        <section>
            <div className='div__first-evaluation'>
                <h1 className='div__first-evaluation__title'>First Evaluation</h1>
                <div className='div__first-evaluation__body'>
                    <div className='div__first-evaluation__sector'>
                        <div className="div__evaluation__box">
                            <legend>Personal Info</legend>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" defaultValue={formData.name} onChange={handleChange}/>
                            </div>
                            <div className='div__gender'>
                                <label htmlFor="male">Gender:</label>
                                <div className='div__gender__radio'>
                                    <div className='div__gender__radio__item'>
                                        <input name="gender" id="male" type="radio" value="Male" checked={formData.gender === 'Male'} onChange={handleChange}/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className='div__gender__radio__item'>
                                        <input type="radio" name="gender" id="female" value="Female" checked={formData.gender === 'Female'} onChange={handleChange}/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="age">Age:</label>
                                <input type="number" name="age" id="age" defaultValue={formData.age}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" name="phone" id="phone" defaultValue={formData.phone}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="address">Address:</label>
                                <input type="text" name="address" id="address" defaultValue={formData.address}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="birthdate">Birthdate:</label>
                                <input type="date" name="birthdate" id="birthdate" defaultValue={formatDate(formData.birthdate)}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" defaultValue={client.email} onChange={handleChange}/>
                            </div>
                        </div>           
                        <div className='div__evaluation__box'>
                            <legend>General information</legend>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_height">Height:</label>
                                <input type="text" name="info_height" id="info_height" defaultValue={firstEvaluationData.info_height} onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_weight">Weight:</label>
                                <input type="text" name="info_weight" id="info_weight" defaultValue={firstEvaluationData.info_weight} onChange={handleChange} />
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_allergies">Allergies:</label>
                                <input type="text" name="info_allergies" id="info_allergies" defaultValue={firstEvaluationData.info_allergies} onChange={handleChange} />
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_patologies">Patologies:</label>
                                <input type="text" name="info_patologies" id="info_patologies" defaultValue={firstEvaluationData.info_patologies} onChange={handleChange} />
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_objectives">Objectives:</label>
                                <input type="text" name="info_objectives" id="info_objectives" defaultValue={firstEvaluationData.info_objectives} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='div__first-evaluation__sector'>
                        <div className='div__evaluation__box'>
                            <legend>Cardiology information</legend>
                            <div>
                                <legend>Heart rate</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="heartrate_min">Minimum</label>
                                    <input type="text" name="heartrate_min" id="heartrate_min" defaultValue={firstEvaluationData.heartrate_min} onChange={handleChange}/>
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="heartrate_max">Maximum</label>
                                    <input type="text" name="heartrate_max" id="heartrate_max" defaultValue={firstEvaluationData.heartrate_max} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <legend>Blood pressure</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="bloodpressure">Pressure</label>
                                    <input type="text" name="bloodpressure" id="bloodpressure" defaultValue={firstEvaluationData.bloodpressure} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="bloodpressure_classification">Classification</label>
                                    <input type="text" name="bloodpressure_classification" id="bloodpressure_classification" defaultValue={firstEvaluationData.bloodpressure_classification} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='div__evaluation__box'>
                                <legend>Body composition</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="composition_muscle">Muscle</label>
                                    <input type="text" name="composition_muscle" id="composition_muscle" defaultValue={firstEvaluationData.composition_muscle} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="composition_fat">Fat</label>
                                    <input type="text" name="composition_fat" id="composition_fat" defaultValue={firstEvaluationData.composition_fat} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="composition_bone">Bone</label>
                                    <input type="text" name="composition_bone" id="composition_bone" defaultValue={firstEvaluationData.composition_bone} onChange={handleChange} /> 
                                </div>
                            </div>
                            <div className='div__evaluation__box'>
                                <legend>Body perimetry</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_rightarm">Right arm</label>
                                    <input type="text" name="perimeter_rightarm" id="perimeter_rightarm" defaultValue={firstEvaluationData.perimeter_rightarm} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftarm">Left arm</label>
                                    <input type="text" name="perimeter_leftarm" id="perimeter_leftarm" defaultValue={firstEvaluationData.perimeter_leftarm} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_rightforearm">Right forearm</label>  
                                    <input type="text" name="perimeter_rightforearm" id="perimeter_rightforearm" defaultValue={firstEvaluationData.perimeter_rightforearm} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftforearm">Left forearm</label> 
                                    <input type="text" name="perimeter_leftforearm" id="perimeter_leftforearm" defaultValue={firstEvaluationData.perimeter_leftforearm} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_chest">Chest</label> 
                                    <input type="text" name="perimeter_chest" id="perimeter_chest" defaultValue={firstEvaluationData.perimeter_chest} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_abdomen">Abdomen</label> 
                                    <input type="text" name="perimeter_abdomen" id="perimeter_abdomen" defaultValue={firstEvaluationData.perimeter_abdomen} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_hip">Hip</label> 
                                    <input type="text" name="perimeter_hip" id="perimeter_hip" defaultValue={firstEvaluationData.perimeter_hip} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_thigh">Thigh</label> 
                                    <input type="text" name="perimeter_rightthigh" id="perimeter_rightthigh" defaultValue={firstEvaluationData.perimeter_rightthigh} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftthigh">Left thigh</label>
                                    <input type="text" name="perimeter_leftthigh" id="perimeter_leftthigh" defaultValue={firstEvaluationData.perimeter_leftthigh} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_rightcalf">Right calf</label> 
                                    <input type="text" name="perimeter_rightcalf" id="perimeter_rightcalf" defaultValue={firstEvaluationData.perimeter_rightcalf} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftcalf">Left calf</label> 
                                    <input type="text" name="perimeter_leftcalf" id="perimeter_leftcalf" defaultValue={firstEvaluationData.perimeter_leftcalf} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='div__evaluation__box'>
                                <legend>Body measurements</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_biceps">Biceps</label>
                                    <input type="text" name="measure_biceps" id="measure_biceps" defaultValue={firstEvaluationData.measure_biceps} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_triceps">Triceps</label> 
                                    <input type="text" name="measure_triceps" id="measure_triceps" defaultValue={firstEvaluationData.measure_triceps} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_subscapular">Subscapular</label> 
                                    <input type="text" name="measure_subscapular" id="measure_subscapular" defaultValue={firstEvaluationData.measure_subscapular} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_suprailiac">Suprailiac</label> 
                                    <input type="text" name="measure_suprailiac" id="measure_suprailiac" defaultValue={firstEvaluationData.measure_suprailiac} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_thigs">Thighs</label> 
                                    <input type="text" name="measure_thigs" id="measure_thigs" defaultValue={firstEvaluationData.measure_thigs} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={updateClient} className='evaluation__button'>Save changes</button>
            </div>
        </section>
    )
}

export default FirstEvaluation;