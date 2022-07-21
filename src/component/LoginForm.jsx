import React, { useEffect, useRef, useState } from 'react'
import '../assets/css/login-form.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const navigation = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [notification, updateNoti] = useState("");

    const handleLogin = () => {
        if (emailRef.current.value && passwordRef.current.value) {
            axios.post("https://app-matching-friend.herokuapp.com/accounts/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }).then(res => {
                console.log(res);
                if (res.data) {
                    updateNoti("Login success!")
                    const { personId, name, sex } = res.data;
                    localStorage.setItem('user', JSON.stringify({ userId: personId, name, sex }))
                    navigation('/user/home')
                }
                else{
                    updateNoti("Email or Password is incorrect!")
                }
            }).catch(e => {
                console.error(e);
            })
        } else {
            updateNoti("Enter email and password")

        }
    }

    useEffect(()=>{
        emailRef.current.value = ""
         passwordRef.current.value = ""
    })
    return (
        <div className="login-form__right">
            <div className="icon-close"><p onClick={() => navigation('/login')}>X</p></div>
            <div className="login-form__input">
                <div className="group-input">
                    <input ref={emailRef} type="text" placeholder='Email' />
                </div>
                <div className="group-input">
                    <i className='bx bx-low-vision'></i>
                    <input ref={passwordRef} type="password" placeholder='Password' />

                    <p className="reset-password" onClick={() => navigation('/login/resetPassword')}>Forgot password?</p>
                    <p className={`error-notification ${!notification ? "hidden-err" : ""}`} >{notification}</p>
                </div>

                <button className="btn" onClick={() => handleLogin()}>LOG IN</button>
            </div>
            {/* <div className="login-form__option">
                <div className="option-google"></div>
                <div className="option-facebook"></div>
            </div> */}
            {/* <div className="new-account">
                <p >
                    Create Account
                </p>
            </div> */}
        </div>
    )
}