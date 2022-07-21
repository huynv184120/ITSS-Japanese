import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/card.scss'
export const Card = ({ user }) => {
    const navigate = useNavigate()
    return (
        <div id='card' onClick={() => navigate(`/user/home/profile/${user.personId}`)}>
            <img src={user.avatar} alt="" className="image" />
            <div className="card-footer">
                <div className="icon-avatar">
                    <img src={user.avatar} alt="" className="avatar" />
                </div>
                <div className="name-user">
                    <p>{user.name}</p>
                </div>
                <div className='infor'>
                    <p>{user.age}</p>
                    <p>{user.sex == 1 ? 'Nam' : 'Nữ'}</p>
                </div>
                <div className="icon-message">
                    <a href="https://chat-client-itss.herokuapp.com/api/signup"><i className='bx bx-message-dots'></i></a>
                </div>
            </div>
        </div>
    )
}
