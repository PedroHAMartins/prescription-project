import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NavBar from './Nav';
import '../../../style/components/connected/main/_main.sass'
import Dashboard from './Nav/Dashboard';
import Profile from './Nav/Profile';
import Database from './Nav/Database';

const MainPage = () => {
    // const [userInfo, setUserInfo] = useState(null);

    // useEffect(() => {
    //     getInfo();
    // }, []);

    // const getInfo = () => {
    //     const token = localStorage.getItem('token');
    //     const config = {
    //         headers: {
    //             Authorization: token
    //         }
    //     };

    //     Axios.get('http://localhost:3001/api/user', config)
    //         .then((response) => {
    //             setUserInfo(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    const [selectedComponent, setSelectedComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return <Dashboard />
        case 'profile':
                return <Profile />
        case 'database':
                return <Database />
        default:
            return <Dashboard />
        }
    };

    const changeComponent = (component) => {
        setSelectedComponent(component);
    }

    return (
        <main>
            <NavBar changeComponent={changeComponent}/>
            {renderComponent()}
        </main>
    )
}

export default MainPage;