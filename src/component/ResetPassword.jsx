import React, { useRef } from 'react'
import '../assets/css/reset-password.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = () => {
    const navigation = useNavigate();

    const emailRef = useRef(null);
    const otpRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSendOtp = () => {
        axios.get(`https://app-matching-friend.herokuapp.com/accounts/reset-pass?email=${emailRef.current.value}`)
    }

    const handleResetPass = () => {
        axios.post("https://app-matching-friend.herokuapp.com/accounts/check-update-pass", {
            email: emailRef.current.value,
            otp: otpRef.current.value,
            newPass: passwordRef.current.value
        }).then(res => {
            // console.log(res);
            if (res.data) {

                const { personId, name, sex } = res.data;
                localStorage.setItem('user', JSON.stringify({ userId: personId, name, sex }))
                navigation('/login/login-form')
            }

            else{

            }
        }).catch(e => {
            console.error(e);
        })
    }

    return (
        <div className="login-form__right">
            <div className="icon-close"><p onClick={() => navigation('/login/login-form')}>X</p></div>
            <div className="login-form__input">
                <div className="group-input">
                    <input ref={emailRef} type="text" placeholder='Email' />
                    <p className="recieve-otp" onClick={() => handleSendOtp()}>Recieve OTP</p>
                </div>
                <div className="group-input">
                    <i className='bx bx-low-vision'></i>
                    <input ref={otpRef} type="text" placeholder='OTP' />
                </div>
                <div className="group-input">
                    <i className='bx bx-low-vision'></i>
                    <input ref={passwordRef} type="password" placeholder='Password' />
                </div>

                

                <button className="btn" onClick={() => handleResetPass()} >Submit</button>

            </div>

        </div>
    )
}