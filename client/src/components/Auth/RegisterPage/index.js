import '../../../style/components/auth/_registerpage.sass';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/users')
            .then((response) => {
                setUsersList(response.data);
            })
    }, []);

    const registerUser = () => {
        Axios.post('http://localhost:3001/api/register', {
            username: username, 
            password: password
        }).then(() => {
            alert('Successfully registered!');
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

            {usersList.map((user) => {
                return (
                    <div>
                        <p>Username</p><p>{user.username}</p>
                        <p>Password</p><p>{user.password}</p>
                    </div>
                )
            })}
        </section>
    )

}

export default RegisterPage;