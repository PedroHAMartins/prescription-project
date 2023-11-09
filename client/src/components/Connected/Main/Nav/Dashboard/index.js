import Axios from 'axios';
import getToken from '../../../../../utils/getToken';
import React, { useState, useEffect } from 'react';
import '../../../../../style/components/connected/main/options/_dashboard.sass';

const Dashboard = () => {
    const [totalClients, setTotalClients] = useState(0);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const config = getToken();
                const response = await Axios.get('http://localhost:3001/api/user/info', config);
                setTotalClients(response.data.totalClients);
            } catch (error) {
                console.log(error);
            }
        };

        getUserInfo();
    }, []);

    return (
        <section>
            <h1 className='dashboard-h1'>Dashboard</h1>
            <div className='dashboard-box'>
                <p className='dashboard-p'>Total clients: {totalClients}</p>
            </div>
        </section>
    );
};

export default Dashboard;
