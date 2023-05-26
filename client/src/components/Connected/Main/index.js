import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NavBar from './Nav';
import '../../../style/components/connected/main/_main.sass'
import Dashboard from './Nav/Dashboard';
import Profile from './Nav/Profile';
import Database from './Nav/Database';
import ClientPage from './Nav/Database/ClientPage';
import DatabaseExercises from './Nav/DatabaseExercises';

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
    const [selectedClient, setSelectedClient] = useState(null);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return <Dashboard />
        case 'profile':
                return <Profile />
        case 'database':
                return (<Database selectedClient={selectedClient} setSelectedClient={setSelectedClient} />)
        case 'client':
                return <ClientPage client={selectedClient} />
        case 'database_exercises':
                return <DatabaseExercises />
        default:
            return <Dashboard />
        }
    };

    const changeComponent = (component) => {
        setSelectedComponent(component);
        setSelectedClient(null);
    }

    return (
        <main>
            <NavBar changeComponent={changeComponent}/>
            {selectedClient ? (
                <ClientPage client={selectedClient} />
            ) : (
                renderComponent()
            )}
        </main>
    )
}

export default MainPage;