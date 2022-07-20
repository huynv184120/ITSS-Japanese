import React from 'react'
import '../assets/css/login-form.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const AdminLoginForm = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState('')
    const [password, setPass] = useState('')

    const handleLogin = () => {
        if(mail.length === 0 || password.length === 0){
            alert("Email or Password must be input")
        }
        else{
            axios.post(`https://app-matching-friend.herokuapp.com/accounts/login`, {
                email: mail,
                password: password
            })
            .then(res => {
                const data = res.data
                if(Object.keys(data).length > 1){
                    localStorage.setItem('user', JSON.stringify({ userId: data.personId, name: data.name, sex: data.sex }))
                    navigate('/admin')
                }
                else{
                    alert("Maybe wrong email or password")
                }
            })
            .catch(error => console.log(error));
        }
    }

    return (
        <div className="login-form__right">
            <div className="icon-close"><p onClick={() => navigate('/login')}>X</p></div>
            <div className="login-form__input">
                <div className="group-input">
                    <input type="text" placeholder='Username'onChange={event => setMail(event.target.value)}/>
                </div>
                <div className="group-input">
                    <i className='bx bx-low-vision'></i>
                    <input type="password" placeholder='Password' onChange={event => setPass(event.target.value)}/>
                </div>
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit">
                    <button onClick={()=>handleLogin()}>Log In</button>
                </div>
            </div>
        </div>
    )
}