import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../../../../style/components/connected/main/options/_database.sass'

const Database = () => {
    const [clientName, setClientName] = useState('');
    const [gender, setGender] = useState('');


    const [clientList, setClientList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: token
        }
    };

    const insertClient = () => {
        Axios.post('http://localhost:3001/api/client/register', {
            name: clientName,
            gender: gender
        }, config ).then(() => {
            alert('Successfully registered client!');
            setClientName('');
            searchClient();
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('Client already exists');
            }
        })
    }
    const searchClient = () => {
        
        Axios.get('http://localhost:3001/api/client/search', {
            params: {
                query: searchQuery
            },
            headers: {
                Authorization: token
            }
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
    })



    return (
        <section>
            <div>
                <input  type="text" 
                        name="" 
                        id="" 
                        placeholder="Client name" 
                        onChange={(event) => setClientName(event.target.value)}/>
                <div>
                    <input  type="radio" 
                            name="gender" 
                            id="male" 
                            value="Male" 
                            checked={gender === 'Male'} 
                            onChange={(event) => setGender(event.target.value)}/>
                    <label htmlFor="male">Male</label>
                </div>

                <div>
                    <input  type="radio" 
                            name="gender" 
                            id="female" 
                            value="Female" 
                            checked={gender === 'Female'} 
                            onChange={(event) => setGender(event.target.value)}/>
                    <label htmlFor="female">Female</label>
                </div>

                <button onClick={insertClient}>Register</button>
            </div>
            <div>
                <h2>Clients list</h2>
                <input type="text" name="" id="" placeholder='Search by name' value={searchQuery} onChange={handleSearchInputChange}/>
                <table>
                    <thead>
                        <tr>
                            <th>Client name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList.map((client) => {
                            return (
                                <tr key={client.id_client}>
                                    <td>{client.name}</td>
                                    <td>{client.gender}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>              
            </div>
        </section>
    )
}

export default Database;