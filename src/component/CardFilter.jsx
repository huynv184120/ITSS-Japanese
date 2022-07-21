import React from 'react'
import '../assets/css/card-filter.scss'
export const CardFilter = ({ user }) => {
  return (
    <div id='card-filter'>
      <img src={user.image} alt="" />
      <div className="cart-filter__info">
        <p className="name">{user.name}</p>
        <div className='infor'>
          <p className="address">{user.address}</p>
          <p>{user.age}</p>
          <p>{user.sex == 1 ? 'Nam' : 'Nữ'}</p>
        </div>
      </div>
    </div>
  )
}
