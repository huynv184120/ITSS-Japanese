import React, { useRef, useState } from 'react'
import '../assets/css/signup-form.scss'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const SignupForm = () => {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [notification, updateNoti] = useState("");

  const handleSignUp = () => {
    if (nameRef.current.value && emailRef.current.value && passwordRef.current.value) {
      axios.post("https://app-matching-friend.herokuapp.com/accounts/create", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }).then(res => {
        updateNoti("Sign up success!")
        const { personId, name, sex } = res.data;
        localStorage.setItem('user', JSON.stringify({ userId: personId, name, sex }))
        navigate('/user/home')
      })
    }
    else {
      updateNoti("Please Fill Input!")
    }

  }
  return (
    <div className="signup-form__right">
      <div className="icon-close"><p onClick={() => navigate('/login')}>X</p></div>
      <div className="signup-form__input">
        <div className="group-input">
          <input ref={nameRef} type="text" placeholder='Username' />
        </div>
        <div className="group-input">
          <input ref={emailRef} type="email" placeholder='Email' />
        </div>
        <div className="group-input">
          <i className='bx bx-low-vision'></i>
          <input ref={passwordRef} type="password" placeholder='Password' />
        </div>
        <div className="group-input">
          <i className='bx bx-low-vision'></i>
          <input type="password" placeholder='Confirm Password' />
        </div>
        
        <div className="button-group">
          <button onClick={() => handleSignUp()}>Sign Up</button>
          <button>Sign In</button>
        </div>
        <p className={`error-notification ${!notification ? "hidden-err" : ""}`} >{notification}</p>
        {/* <div className="divider">
          <div className="divider__line"></div>
          <div className="divider__text">Or</div>
          <div className="divider__line"></div>
        </div> */}
      </div>
      {/* <div className="signup-form__option">
        <div className="option-google"></div>
        <div className="option-facebook"></div>
      </div> */}
    </div>
  )
}
