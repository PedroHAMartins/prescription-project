import '../../../style/components/auth/_loginpage.sass';
import React, { useState } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const loginUser = () => {

        Axios.post('http://localhost:3001/api/login', {
            username: username,
            password: password
        }).then((response) => {      
            const token = response.data.token;
            localStorage.setItem('token', token);
            setLoggedIn(true);      
            alert('Successfully logged in!');
        }).catch((error) => {
            alert('Incorrect username or password');
            console.log(error);
        })
    }

    if(loggedIn) {
        return <Navigate to='/main' />
    }

    return (
        <section>
            <div className="login-box">
                <h1 className='login-h1'>Login</h1>
                <input type="text" name="" id="" className='login-input' placeholder='Username' onChange={(event) => {
                    setUsername(event.target.value);
                }}/>
                <input type="password" name="" id="" className='login-input' placeholder='Password 'onChange={(event) =>{
                    setPassword(event.target.value);
                }}/>
                <button onClick={loginUser} className='login-button'>Submit</button>
                <p className='login-p'>Don't have an account? <a href="/register" className='login-a'>Register!</a></p>
            </div>
        </section>
    )

}

export default LoginPage;