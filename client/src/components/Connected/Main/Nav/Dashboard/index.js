import React, { useState } from 'react';
import Axios from 'axios';

const Dashboard = () => {
    const [clientName, setClientName] = useState('');

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: token
        }
    };

    const insertClient = () => {
        Axios.post('http://localhost:3001/api/client/register', {
            name: clientName
        }, config ).then(() => {
            alert('Successfully registered client!');
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('Client already exists');
            }
        })
    }

    return (
        <section>
            <div>
                <input type="text" name="" id="" placeholder="Client name" onChange={(event) => setClientName(event.target.value)}/>
                <button onClick={insertClient}>Register</button>
            </div>
        </section>
    )
}

export default Dashboard;