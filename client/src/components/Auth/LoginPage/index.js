import '../../../style/components/auth/_loginpage.sass';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const LoginPage = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
        Axios.post('http://localhost:3001/api/login', {
            username: username,
            password: password
        }).then(() => {
            alert('Successfully logged in!');
        }).catch((error) => {
            alert('Incorrect username or password');
            console.log(error);
        })
    }

    return (
        <section>
            <div className="login-box">
                <h1>Login</h1>
                <input type="text" name="" id="" onChange={(event) => {
                    setUsername(event.target.value);
                }}/>
                <input type="password" name="" id="" onChange={(event) =>{
                    setPassword(event.target.value);
                }}/>
                <button onClick={loginUser}>Submit</button>
                <p>Don't have an account? <a href="/register">Register!</a></p>
            </div>
        </section>
    )

}

export default LoginPage;