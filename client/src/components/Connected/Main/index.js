import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NavBar from './Nav';

const MainPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: token
            }
        };

        Axios.get('http://localhost:3001/api/user', config)
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <NavBar />
        </div>
    )
}

export default MainPage;