import { Link, Navigate } from 'react-router-dom';
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


    // const logout = () => {
    //     localStorage.removeItem('token');
    // }

    if(!localStorage.getItem('token')) {
        return <Navigate to='/' />
    }

    return (
        <div>
                {userInfo ? (
                    <div>
                        <NavBar />
                        {/* <ul>
                            <li>Username: {userInfo.username}</li>
                            <li>ID: {userInfo.id_user}</li>
                            <li>Password: {userInfo.password}</li>
                        </ul> */}
                    </div>
                ): (
                    <p>You are not logged in</p>
                )}
            {/* <Link to='/'>
                <button onClick={logout}>Logout</button>
            </Link> */}
        </div>
    )
}

export default MainPage;