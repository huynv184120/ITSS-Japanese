import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/card.scss'
export const Card = ({ user }) => {
    const navigate = useNavigate()
    return (
        <div id='card'>
            <img src={user.avatar} alt="" className="image"  onClick={()=> navigate(`/user/profile/${user.personId}`)}/>
            <p>{user.name}</p>
            <div className="card-footer">
                <div className="icon-avatar">
                    <img src={user.avatar} alt="" className="avatar" />
                </div>
                <div className="icon-message">
                    <a href="https://chat-client-itss.herokuapp.com/api/signup"><i className='bx bx-message-dots'></i></a>
                </div>
            </div>
        </div>
    )
}
