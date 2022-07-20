import React from 'react'
import '../assets/css/login-form.scss'
import { useNavigate } from 'react-router-dom';

export const AdminLoginForm = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      localStorage.setItem('user', JSON.stringify({ userId: 2, name: 'Hiếu', sex: 0 }))
      navigate('/admin')
    }

    return (
        <div className="login-form__right">
            <div className="icon-close"><p onClick={() => navigate('/login')}>X</p></div>
            <div className="login-form__input">
                <div className="group-input">
                    <input type="text" placeholder='Username' />
                </div>
                <div className="group-input">
                    <i className='bx bx-low-vision'></i>
                    <input type="password" placeholder='Password' />
                </div>
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit">
                    <button onClick={handleLogin}>Log In</button>
                </div>
            </div>
        </div>
    )
}