import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import getToken from '../../../../../../../utils/getToken';
import '../../../../../../../style/components/connected/main/options/_evaluation.sass'


const SecondEvaluation = ({ client }) => {
    const [formData2, setFormData2] = useState({
        name: client.name,
        gender: client.gender,
        age: client.age,
        phone: client.phone,
        address: client.address,
        birthdate: client.birthdate,
        email: client.email,        
    });

    const [secondEvaluationData, setSecondEvaluationData] = useState({
        info_height2: client.info_height2,
        info_weight2: client.info_weight2,
        info_allergies2: client.info_allergies2,
        info_patologies2: client.info_patologies2,
        info_objectives2: client.info_objectives2,
        heartrate_max2: client.heartrate_max2,
        heartrate_min2: client.heartrate_min2,
        bloodpressure2: client.bloodpressure2,
        bloodpressure_classification2: client.bloodpressure_classification2,
        composition_muscle2: client.composition_muscle2,
        composition_fat2: client.composition_fat2,
        composition_bone2: client.composition_bone2,
        perimeter_rightarm2: client.perimeter_rightarm2,
        perimeter_leftarm2: client.perimeter_leftarm2,
        perimeter_rightforearm2: client.perimeter_rightforearm2,
        perimeter_leftforearm2: client.perimeter_leftforearm2,
        perimeter_chest2: client.perimeter_chest2,
        perimeter_abdomen2: client.perimeter_abdomen2,
        perimeter_hip2: client.perimeter_hip2,
        perimeter_rightthigh2: client.perimeter_rightthigh2,
        perimeter_leftthigh2: client.perimeter_leftthigh2,
        perimeter_rightcalf2: client.perimeter_rightcalf2,
        perimeter_leftcalf2: client.perimeter_leftcalf2,
        measure_biceps2: client.measure_biceps2,
        measure_triceps2: client.measure_triceps2,
        measure_subscapular2: client.measure_subscapular2,
        measure_suprailiac2: client.measure_suprailiac2,
        measure_thigs2: client.measure_thigs2
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData2((prevFormData2) => ({
            ...prevFormData2,
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

    const getSecondEvaluation = () => {
        const config = getToken();

        Axios.get(`http://localhost:3001/api/client/second-evaluation/${client.id_client}`, config)
        .then((response) => {
            setSecondEvaluationData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const updateClient2 = () => {
        const config = getToken();
    
        Axios.put(`http://localhost:3001/api/client/update2/${client.id_client}`, {
            name: formData2.name,
            gender: formData2.gender,
            age: formData2.age,
            phone: formData2.phone,
            address: formData2.address,
            birthdate: formData2.birthdate,
            email: formData2.email,
            info_height2: formData2.info_height2,
            info_weight2: formData2.info_weight2,
            info_allergies2: formData2.info_allergies2,
            info_patologies2: formData2.info_patologies2,
            info_objectives2: formData2.info_objectives2,
            heartrate_max2: formData2.heartrate_max2,
            heartrate_min2: formData2.heartrate_min2,
            bloodpressure2: formData2.bloodpressure2,
            bloodpressure_classification2: formData2.bloodpressure_classification2,
            composition_muscle2: formData2.composition_muscle2,
            composition_fat2: formData2.composition_fat2,
            composition_bone2: formData2.composition_bone2,
            perimeter_rightarm2: formData2.perimeter_rightarm2,
            perimeter_leftarm2: formData2.perimeter_leftarm2,
            perimeter_rightforearm2: formData2.perimeter_rightforearm2,
            perimeter_leftforearm2: formData2.perimeter_leftforearm2,
            perimeter_chest2: formData2.perimeter_chest2,
            perimeter_abdomen2: formData2.perimeter_abdomen2,
            perimeter_hip2: formData2.perimeter_hip2,
            perimeter_rightthigh2: formData2.perimeter_rightthigh2,
            perimeter_leftthigh2: formData2.perimeter_leftthigh2,
            perimeter_rightcalf2: formData2.perimeter_rightcalf2,
            perimeter_leftcalf2: formData2.perimeter_leftcalf2,
            measure_biceps2: formData2.measure_biceps2,
            measure_triceps2: formData2.measure_triceps2,
            measure_subscapular2: formData2.measure_subscapular2,
            measure_suprailiac2: formData2.measure_suprailiac2,
            measure_thigs2: formData2.measure_thigs2
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
                <h1 className='div__first-evaluation__title'>Second Evaluation</h1>
                <div className='div__first-evaluation__body'>
                    <div className='div__first-evaluation__sector'>
                        <div className="div__evaluation__box">
                            <legend>Personal Info</legend>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" defaultValue={formData2.name} onChange={handleChange}/>
                            </div>
                            <div className='div__gender'>
                                <label htmlFor="male">Gender:</label>
                                <div className='div__gender__radio'>
                                    <div className='div__gender__radio__item'>
                                        <input name="gender" id="male" type="radio" value="Male" checked={formData2.gender === 'Male'} onChange={handleChange}/>
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className='div__gender__radio__item'>
                                        <input type="radio" name="gender" id="female" value="Female" checked={formData2.gender === 'Female'} onChange={handleChange}/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="age">Age:</label>
                                <input type="number" name="age" id="age" defaultValue={formData2.age}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" name="phone" id="phone" defaultValue={formData2.phone}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="address">Address:</label>
                                <input type="text" name="address" id="address" defaultValue={formData2.address}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="birthdate">Birthdate:</label>
                                <input type="date" name="birthdate" id="birthdate" defaultValue={formatDate(formData2.birthdate)}onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" defaultValue={formData2.email} onChange={handleChange}/>
                            </div>
                        </div>           
                        <div className='div__evaluation__box'>
                            <legend>General information</legend>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_height">Height:</label>
                                <input type="text" name="info_height2" id="info_height2" defaultValue={secondEvaluationData.info_height2} onChange={handleChange}/>
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_weight">Weight:</label>
                                <input type="text" name="info_weight2" id="info_weight2" defaultValue={secondEvaluationData.info_weight2} onChange={handleChange} />
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_allergies">Allergies:</label>
                                <input type="text" name="info_allergies2" id="info_allergies2" defaultValue={secondEvaluationData.info_allergies2} onChange={handleChange} />
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_patologies">Patologies:</label>
                                <input type="text" name="info_patologies2" id="info_patologies2" defaultValue={secondEvaluationData.info_patologies2} onChange={handleChange} />
                            </div>
                            <div className='div__evaluation__box__item'>
                                <label htmlFor="info_objectives">Objectives:</label>
                                <input type="text" name="info_objectives2" id="info_objectives2" defaultValue={secondEvaluationData.info_objectives2} onChange={handleChange} />
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
                                    <input type="text" name="heartrate_min2" id="heartrate_min2" defaultValue={secondEvaluationData.heartrate_min2} onChange={handleChange}/>
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="heartrate_max">Maximum</label>
                                    <input type="text" name="heartrate_max2" id="heartrate_max2" defaultValue={secondEvaluationData.heartrate_max2} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <legend>Blood pressure</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="bloodpressure">Pressure</label>
                                    <input type="text" name="bloodpressure2" id="bloodpressure2" defaultValue={secondEvaluationData.bloodpressure2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="bloodpressure_classification">Classification</label>
                                    <input type="text" name="bloodpressure_classification2" id="bloodpressure_classification2" defaultValue={secondEvaluationData.bloodpressure_classification2} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='div__evaluation__box'>
                                <legend>Body composition</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="composition_muscle">Muscle</label>
                                    <input type="text" name="composition_muscle2" id="composition_muscle2" defaultValue={secondEvaluationData.composition_muscle2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="composition_fat">Fat</label>
                                    <input type="text" name="composition_fat2" id="composition_fat2" defaultValue={secondEvaluationData.composition_fat2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="composition_bone">Bone</label>
                                    <input type="text" name="composition_bone2" id="composition_bone2" defaultValue={secondEvaluationData.composition_bone2} onChange={handleChange} /> 
                                </div>
                            </div>
                            <div className='div__evaluation__box'>
                                <legend>Body perimetry</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_rightarm">Right arm</label>
                                    <input type="text" name="perimeter_rightarm2" id="perimeter_rightarm2" defaultValue={secondEvaluationData.perimeter_rightarm2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftarm">Left arm</label>
                                    <input type="text" name="perimeter_leftarm2" id="perimeter_leftarm2" defaultValue={secondEvaluationData.perimeter_leftarm2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_rightforearm">Right forearm</label>  
                                    <input type="text" name="perimeter_rightforearm2" id="perimeter_rightforearm2" defaultValue={secondEvaluationData.perimeter_rightforearm2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftforearm">Left forearm</label> 
                                    <input type="text" name="perimeter_leftforearm2" id="perimeter_leftforearm2" defaultValue={secondEvaluationData.perimeter_leftforearm2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_chest">Chest</label> 
                                    <input type="text" name="perimeter_chest2" id="perimeter_chest2" defaultValue={secondEvaluationData.perimeter_chest2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_abdomen">Abdomen</label> 
                                    <input type="text" name="perimeter_abdomen2" id="perimeter_abdomen2" defaultValue={secondEvaluationData.perimeter_abdomen2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_hip">Hip</label> 
                                    <input type="text" name="perimeter_hip2" id="perimeter_hip2" defaultValue={secondEvaluationData.perimeter_hip2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_thigh">Thigh</label> 
                                    <input type="text" name="perimeter_rightthigh2" id="perimeter_rightthigh2" defaultValue={secondEvaluationData.perimeter_rightthigh2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftthigh">Left thigh</label>
                                    <input type="text" name="perimeter_leftthigh2" id="perimeter_leftthigh2" defaultValue={secondEvaluationData.perimeter_leftthigh2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_rightcalf">Right calf</label> 
                                    <input type="text" name="perimeter_rightcalf2" id="perimeter_rightcalf2" defaultValue={secondEvaluationData.perimeter_rightcalf2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="perimeter_leftcalf">Left calf</label> 
                                    <input type="text" name="perimeter_leftcalf2" id="perimeter_leftcalf2" defaultValue={secondEvaluationData.perimeter_leftcalf2} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='div__evaluation__box'>
                                <legend>Body measurements</legend>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_biceps">Biceps</label>
                                    <input type="text" name="measure_biceps2" id="measure_biceps2" defaultValue={secondEvaluationData.measure_biceps2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_triceps">Triceps</label> 
                                    <input type="text" name="measure_triceps2" id="measure_triceps2" defaultValue={secondEvaluationData.measure_triceps2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_subscapular">Subscapular</label> 
                                    <input type="text" name="measure_subscapular2" id="measure_subscapular2" defaultValue={secondEvaluationData.measure_subscapular2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_suprailiac">Suprailiac</label> 
                                    <input type="text" name="measure_suprailiac2" id="measure_suprailiac2" defaultValue={secondEvaluationData.measure_suprailiac2} onChange={handleChange} />
                                </div>
                                <div className='div__evaluation__box__item'>
                                    <label htmlFor="measure_thigs">Thighs</label> 
                                    <input type="text" name="measure_thigs2" id="measure_thigs2" defaultValue={secondEvaluationData.measure_thigs2} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={updateClient2} className='evaluation__button'>Save changes</button>
            </div>
        </section>
    )
}

export default SecondEvaluation;