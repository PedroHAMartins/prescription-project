import '../../../style/components/auth/_registerpage.sass';
import React, { useState } from 'react';
import Axios from 'axios';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = () => {
        Axios.post('http://localhost:3001/api/register', {
            username: username, 
            password: password
        }).then(() => {
            alert('Successfully registered!');
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('User already exists');
            }
        })
    }
    
    return (
        <section>
            <div className="register-box">
                <h1>Register</h1>
                <input type="text" name="" id="" onChange={(event) =>{
                    setUsername(event.target.value);
                }}/>
                <input type="password" name="" id="" onChange={(event) =>{
                    setPassword(event.target.value);
                }}/>
                <button onClick={registerUser}>Register</button>
            </div>
            <p>Already have an account? <a href="/">Login!</a></p>
        </section>
    )

}

export default RegisterPage;