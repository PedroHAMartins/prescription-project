import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ClientRow from './ClientRow';
import '../../../../../style/components/connected/main/options/_database.sass'
import getToken from '../../../../../utils/getToken';

const Database = ( {selectedClient, setSelectedClient, changeComponent}) => {
    const [clientName, setClientName] = useState('');
    const [gender, setGender] = useState('');


    const [clientList, setClientList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const insertClient = () => {

        const config = getToken();

        Axios.post('http://localhost:3001/api/client/register', {
            name: clientName,
            gender: gender
        }, config ).then(() => {
            alert('Successfully registered client!');
            setClientName('');
            setGender('');           
            searchClient();
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('Client already exists');
            }
            if(error.response.status === 400) {
                alert('All fields are required');
            }
        })
    }
    const searchClient = () => {

        const config = getToken();
        
        Axios.get('http://localhost:3001/api/client/search', {
            params: {
                query: searchQuery
            },
            ...config
        }).then((response) => {
            setClientList(response.data);
        }).catch((error) => {
            if(error.response.status === 404) {
                setClientList([]);
            }
        })
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        searchClient();
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            searchClient();
        }, 100);

        return () => clearTimeout(delay);
    }, []);

    return (
        <section className='section__database__clients'>
            <div className='div__database__clients__insert'>
                <h2>Register Client</h2>
                <input  type="text" 
                        name="" 
                        id="" 
                        placeholder="Client name" 
                        value={clientName}
                        onChange={(event) => setClientName(event.target.value)}/>
                <div className='div__insert__radio'>
                    <div>
                        <input  type="radio" 
                                name="gender" 
                                id="" 
                                value="Male" 
                                checked={gender === 'Male'} 
                                onChange={(event) => setGender(event.target.value)}/>
                        <label htmlFor="Male">Male</label>
                    </div>

                    <div>
                        <input  type="radio" 
                                name="gender" 
                                id="" 
                                value="Female" 
                                checked={gender === 'Female'} 
                                onChange={(event) => setGender(event.target.value)}/>
                        <label htmlFor="Female">Female</label>
                    </div>
                </div>

                <button onClick={insertClient}>Register</button>
            </div>
            <div className='div__list'>
                <h2>Clients list</h2>
                <input type="text" name="" id="" placeholder='Search by name' value={searchQuery} onChange={handleSearchInputChange}/>
                <table>
                    <thead>
                        <tr>
                            <th>Clients</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList.map((client) => (
                            <ClientRow 
                                key={client.id_client} 
                                client={client} 
                                setSelectedClient={setSelectedClient}
                                changeComponent={changeComponent}
                                />
                        ))}
                    </tbody>
                </table>              
            </div>
        </section>
    )
}

export default Database;