import React, { useState } from 'react';
import NavBar from './Nav';
import '../../../style/components/connected/main/_main.sass'
import Dashboard from './Nav/Dashboard';
import Profile from './Nav/Profile';
import Database from './Nav/Database';
import DatabaseExercises from './Nav/DatabaseExercises';
import FirstEvaluation from './Nav/Database/ClientPage/FirstEvaluation';
import SecondEvaluation from './Nav/Database/ClientPage/SecondEvaluation';
import Prescription from './Nav/Database/ClientPage/Prescription';

const MainPage = () => {
    const [selectedComponent, setSelectedComponent] = useState('dashboard');
    const [selectedClient, setSelectedClient] = useState(null);

    const changeComponent = (component, client) => {
        setSelectedComponent(component);
        setSelectedClient(client);
    }

    const NoClientSelected = () => {
        return (
            <div>
                <p>No client selected</p>
            </div>
        )
    }

    const renderComponent = () => {

        switch (selectedComponent) {
            case 'dashboard':
                return <Dashboard />
            case 'profile':
                return <Profile />
            case 'database':
                return (<Database 
                        selectedClient={selectedClient} 
                        setSelectedClient={setSelectedClient} 
                        changeComponent={changeComponent}
                        />)
            case 'database_exercises':
                return <DatabaseExercises />
            case 'first_evaluation':
                return (
                    selectedClient ? (
                        <FirstEvaluation client={selectedClient} />
                    ) : (
                        <NoClientSelected />
                    )
                );
            case 'second_evaluation':
                return (
                    selectedClient ? (
                        <SecondEvaluation client={selectedClient} />
                    ) : (
                        <NoClientSelected />
                    )
                );
            case 'prescription':
                return (
                    selectedClient ? (
                        <Prescription client={selectedClient} />
                    ) : (
                        <NoClientSelected />
                    )
                )
            default:
                return <Dashboard />
        }
    };

    return (
        <main>
            <NavBar changeComponent={changeComponent}/>
            {renderComponent()}
        </main>
    )
}

export default MainPage;