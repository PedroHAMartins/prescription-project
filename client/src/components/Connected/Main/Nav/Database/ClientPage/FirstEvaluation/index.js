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
        info_objectives: client.info_objectives
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

    const getFirstEvaluation = () => {
        const config = getToken();

        Axios.get(`http://localhost:3001/api/client/first-evaluation/${client.id_client}`, config)
        .then((response) => {
            setFirstEvaluationData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

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
            info_objectives: formData.info_objectives
        }, config).then(() => {
            alert('Successfully updated client!');
        }).catch((error) => {
            console.log(error);
            alert('Error updating client!');
        })
    }

    return (
        <section>
            <h1>First Evaluation</h1>
            <div className="div__personal-info">
                <legend>Personal Info</legend>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    defaultValue={formData.name}
                    onChange={handleChange}
                    />
                <div>
                    <label htmlFor="male">Gender:</label>
                    <input 
                        type="radio" 
                        name="gender" 
                        id="male" 
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleChange}
                    />
                    <label htmlFor="male">Male</label>
                    <input 
                        type="radio" 
                        name="gender" 
                        id="female" 
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                    />
                    <label htmlFor="female">Female</label>
                </div>
                <label htmlFor="age">Age:</label>
                <input 
                    type="number" 
                    name="age" 
                    id="age" 
                    defaultValue={formData.age}
                    onChange={handleChange}
                    />
                <label htmlFor="phone">Phone:</label>
                <input 
                    type="text" 
                    name="phone" 
                    id="phone" 
                    defaultValue={formData.phone}
                    onChange={handleChange}
                    />
                <label htmlFor="address">Address:</label>
                <input 
                    type="text" 
                    name="address" 
                    id="address" 
                    defaultValue={formData.address}
                    onChange={handleChange}
                    />
                <label htmlFor="birthdate">Birthdate:</label>
                <input 
                    type="date" 
                    name="birthdate" 
                    id="birthdate" 
                    defaultValue={formatDate(formData.birthdate)}
                    onChange={handleChange}
                    />
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    defaultValue={client.email} 
                    onChange={handleChange}
                />
            </div>
            <div className='div__first-evaluation'>                
                <div className='div__first-evaluation__info'>
                    <legend>General information</legend>
                    <label htmlFor="info_height">Height:</label>
                    <input 
                        type="text" 
                        name="info_height" 
                        id="info_height"
                        defaultValue={firstEvaluationData.info_height}
                        onChange={handleChange}
                    />
                    <label htmlFor="info_weight">Weight:</label>
                    <input 
                        type="text" 
                        name="info_weight" 
                        id="info_weight"
                        defaultValue={firstEvaluationData.info_weight}
                        onChange={handleChange}
                    />
                    <label htmlFor="info_allergies">Allergies:</label>
                    <input 
                        type="text" 
                        name="info_allergies" 
                        id="info_allergies"
                        defaultValue={firstEvaluationData.info_allergies}
                        onChange={handleChange}
                    />
                    <label htmlFor="info_patologies">Patologies:</label>
                    <input 
                        type="text" 
                        name="info_patologies" 
                        id="info_patologies"
                        defaultValue={firstEvaluationData.info_patologies}
                        onChange={handleChange}
                    />
                    <label htmlFor="info_objectives">Objectives:</label>
                    <input 
                        type="text" 
                        name="info_objectives" 
                        id="info_objectives"
                        defaultValue={firstEvaluationData.info_objectives}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button onClick={updateClient}>Save changes</button>
        </section>
    )
}

export default FirstEvaluation;