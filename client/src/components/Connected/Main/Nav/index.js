import '../../../../style/components/connected/main/nav.sass';
import React from 'react';
import { CgCalendar, CgDatabase, CgLogOut, CgProfile } from 'react-icons/cg';
import { Link, Navigate } from 'react-router-dom';

const NavBar = () => {
    const logout = () => {
        localStorage.removeItem('token');
    }

    if(!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }

    return (
        <nav>
            <ul>
                <li><CgProfile /></li>
                <li><CgCalendar /></li>
                <li><CgDatabase /></li>
                <li><Link to='/login' onClick={logout}><CgLogOut/></Link></li>             
            </ul>
        </nav>
    )
}

export default NavBar;