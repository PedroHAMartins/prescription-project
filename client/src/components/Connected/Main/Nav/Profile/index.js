import Axios from 'axios';
import getToken from '../../../../../utils/getToken';
import React, { useState, useEffect } from 'react';
import '../../../../../style/components/connected/main/options/_profile.sass';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });

    const getUserInfo = () => {
        const config = getToken();

        Axios.get('http://localhost:3001/api/user', config)
        .then((response) => {
            setUserInfo({ username: response.data.username, email: response.data.email });
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <section>
            <h1 className='profile-h1'>Your profile information</h1>
            <div className='profile-box'>
                <p className='profile-p'>Your username: {userInfo.username}</p>
                <p className='profile-p'>Your e-mail: {userInfo.email}</p>
            </div>
        </section>
    );
};

export default Profile;
