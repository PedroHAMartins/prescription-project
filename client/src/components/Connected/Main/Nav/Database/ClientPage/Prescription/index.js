import '../../../../../../../style/components/connected/main/options/_prescription.sass'
import React, { useState, useEffect } from 'react';
import getToken from '../../../../../../../utils/getToken';
import { TypeA, TypeAB, TypeABC, TypeABCD, TypeABCDE  } from './Type/index'

import Axios from 'axios';

const Prescription = ( {client} ) => {

    const [exerciseType, setExerciseType] = useState('');
    const [selectedTypeComponent, setSelectedTypeComponent] = useState(null);

    const renderSelectedTypeComponent = () => {
        return selectedTypeComponent || (
            <div>
                <TypeA client={client}/>;
            </div>
        );
    };

    useEffect(() => {
        const config = getToken();

        Axios.get(`http://localhost:3001/api/prescription/${client.id_client}`, config)
        .then((response) => {
            const trainingType = response.data[0]?.training_type || '';
            switch (trainingType) {
                case 'a':
                    setSelectedTypeComponent(<TypeA client={client}/>);
                    break;
                case 'ab':
                    setSelectedTypeComponent(<TypeAB client={client}/>);
                    break;
                case 'abc':
                    setSelectedTypeComponent(<TypeABC client={client}/>);
                    break;
                case 'abcd':
                    setSelectedTypeComponent(<TypeABCD client={client}/>);
                    break;
                case 'abcde':
                    setSelectedTypeComponent(<TypeABCDE client={client}/>);
                    break;
                default:
                    setSelectedTypeComponent(<TypeA client={client}/>);
                    break;
            }
        })
        .catch((error) => {
            if(error.response.status === 404) {
                setSelectedTypeComponent(null);
            }
        });
    });

    const selectedType = (event) => {
        setExerciseType(event.target.value)
    }

    const setType = () => {        
        const config = getToken();

        Axios.put(`http://localhost:3001/api/prescription/type/${client.id_client}`,{
            type: exerciseType
        }, config).then(() => {
            alert('Successfully registered type!');
            setSelectedTypeComponent(renderSelectedTypeComponent());
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('Type already selected');
            }
            if(error.response.status === 400) {
                alert('All fields are required');
            }
            if(error.response.status === 500) {
                console.log(error);
            }
        })
        .finally(() => {
            setExerciseType('');
        })
    }

    return (
        <section>
            <h1>Prescription</h1>
            <div>
                <p>{client.name}</p>
                {/* <div className='div__prescription__exercise-type'>
                    <h2>Select exercise routine type</h2>
                    <div className='div__prescription__exercise-type__group'>
                        <div className='div__prescription__exercise-type__group__inside'>
                            <label htmlFor="a">A</label>
                            <input type="radio" name="exerciseType" id="a" value="a" onClick={selectedType} defaultChecked={exerciseType === 'a'}/>
                        </div>
                        <div className='div__prescription__exercise-type__group__inside'>
                            <label htmlFor="ab">AB</label>
                            <input type="radio" name="exerciseType" id="ab" value="ab" onClick={selectedType} defaultChecked={exerciseType === 'ab'}/>
                        </div>
                        <div className='div__prescription__exercise-type__group__inside'>
                            <label htmlFor="abc">ABC</label>
                            <input type="radio" name="exerciseType" id="abc" value="abc" onClick={selectedType} defaultChecked={exerciseType === 'abc'}/>
                        </div>
                        <div className='div__prescription__exercise-type__group__inside'>
                            <label htmlFor="abcd">ABCD</label>
                            <input type="radio" name="exerciseType" id="abcd" value="abcd" onClick={selectedType} defaultChecked={exerciseType === 'abcd'}/>
                        </div>
                        <div className='div__prescription__exercise-type__group__inside'>
                            <label htmlFor="abcde">ABCDE</label>
                            <input type="radio" name="exerciseType" id="abcde" value="abcde" onClick={selectedType} defaultChecked={exerciseType === 'abcde'}/>
                        </div>
                    </div>
                <button onClick={setType}>Save type</button>
                </div> */}
                <div className='div__prescription__exercises'>
                    {renderSelectedTypeComponent()}
                </div>
            </div>
        </section>
    )
}

export default Prescription;