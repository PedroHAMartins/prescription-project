import '../../../../style/components/connected/main/_nav.sass';
import React from 'react';
import { CgGym, CgLogOut, CgProfile, CgUserList } from 'react-icons/cg';
import { MdOutlineDataThresholding } from 'react-icons/md';
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
                    <MdOutlineDataThresholding onClick={() => handleOptionClick('dashboard')}/>
                </li>
                <li>
                    <CgUserList onClick={() => handleOptionClick('database')}/>
                </li>
                <li>
                    <CgGym onClick={() => handleOptionClick('database_exercises')}/>
                </li>
                <li>
                    <Link to='/login' onClick={logout}><CgLogOut/></Link>
                </li>             
            </ul>
        </nav>
    )
}

export default NavBar;