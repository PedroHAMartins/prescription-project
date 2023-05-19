import '../../../../style/components/connected/main/nav.sass';
import React from 'react';
import { CgCalendar, CgDatabase, CgLogOut, CgProfile } from 'react-icons/cg';
import { Link, Navigate } from 'react-router-dom';

const NavBar = ( { changeComponent }) => {
    const logout = () => {
        localStorage.removeItem('token');
    };

    const handleOptionClick = (component) => {
        changeComponent(component);
    }

    if(!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }

    return (
        <nav>
            <ul>
                <li>
                    <CgProfile onClick={() => handleOptionClick('profile')}/>
                </li>
                <li>
                    <CgCalendar onClick={() => handleOptionClick('dashboard')}/>
                </li>
                <li>
                    <CgDatabase onClick={() => handleOptionClick('database')}/>
                </li>
                <li>
                    <Link to='/login' onClick={logout}><CgLogOut/></Link>
                </li>             
            </ul>
        </nav>
    )
}

export default NavBar;