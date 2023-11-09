import '../../../style/components/auth/_registerpage.sass';
import React, { useState } from 'react';
import Axios from 'axios';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const registerUser = () => {
        Axios.post('http://localhost:3001/api/register', {
            username: username, 
            password: password,
            email: email
        }).then(() => {
            alert('Successfully registered!');
        }).catch((error) => {
            if(error.response.status === 409) {
                alert('User or email already exists');
            }
        })
    }
    
    return (
        <section>
            <div className="register-box">
                <h1 className='register-h1'>Register</h1>
                <input type="text" name="" id="" className='register-input' placeholder='Username' onChange={(event) =>{
                    setUsername(event.target.value);
                }}/>
                <input type="email" name="" id="" className='register-input' placeholder='E-mail' onChange={(event) =>{
                    setEmail(event.target.value);
                }}/>
                <input type="password" name="" id="" className='register-input' placeholder='Password' onChange={(event) =>{
                    setPassword(event.target.value);
                }}/>
                <button onClick={registerUser} className='register-button'>Register</button>
                <p className='register-p'>Already have an account? <a href="/" className='register-a'>Login!</a></p>
            </div>
        </section>
    )

}

export default RegisterPage;