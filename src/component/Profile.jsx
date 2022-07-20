import React, { useState, useEffect } from 'react'
import '../assets/css/profile.scss'
import Avatar from '../assets/image/large_avatar.png'
import axios from 'axios'

const exUser = {
    userId: 1,
    name: 'Nguyễn An Ninh',
    avatar: Avatar,
    sex: 0,
    email: 'nguyenanninh@gmail.com',
    age: 26,
    height: 174,
    weight: 74,
    address: '33 Nguyễn An Ninh',
    phone: '0818988577'
}

export const Profile = () => {

    const [user, setUser] = useState(exUser)
    const [isEdit, changeEditState] = useState(false)

    const onEditClickHandle = () => {
        if(isEdit) {
            console.log(user)
        }
        changeEditState(!isEdit);
    }

    useEffect(() => {
        axios.get(`https://app-matching-friend.herokuapp.com/accounts/23/profile`)
        .then((res)=>{
            setUser(res.data)
        }).catch((err) => console.log(err))
    }, [])

    return (
        <div id='profile'>
            <div className="profile-top">
                <div className="short-profile">
                    <img className="w-20 h-20 rounded-full px-2 mr-5" src={user.avatar} alt="avatar" />
                    <div className="short-info">

                        <input readOnly={!isEdit} type="text" className="short-info__email border-none" defaultValue={user.email} />                           
                        <input readOnly={!isEdit} type="text" className="short-info__name border-none" defaultValue={user.name} />
                        <div className="short-info__age old-area">
                            <input readOnly={!isEdit} type="number" className="input-50 border-none" defaultValue={22} />
                            <span className='age-text'>
                                years old
                            </span>
                        </div>
                    </div>
                </div>
                
            </div>

            <div style={{display: "block"}}>
                <button hidden={isEdit} className="btn btn-edit" onClick={() => onEditClickHandle()}>Edit</button>
                <button hidden={!isEdit} className="btn btn-save" onClick={() => onEditClickHandle()}>Save</button>
            </div>
            <div className="profile-title">
                INFOMATION
            </div>
            <div className="profile-content">

            <ul>
                <li>Sex : 
                    <select className={`border-none ${isEdit? "" : "select-read-only"}`} defaultValue={"male"} name="sex" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </li>
                <li>Age : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.age} name="age" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})} /> </li>
                <li>Height : <input readOnly={!isEdit} type="number" className="border-none input-50" defaultValue={user.height} name="height" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})} /> cm </li>
                <li>Weight : <input readOnly={!isEdit} type="number" className="border-none input-50" defaultValue={user.weight} name="weight" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> kg</li>
                <li>Address : <input readOnly={!isEdit} type="text" className="border-none" defaultValue={user.location?.locationName} name="locationName" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/>  </li>
                <li>Phone : <input readOnly={!isEdit} type="phone" className="border-none" defaultValue={user.phoneNumber} name="phoneNumber" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Religion : 
                    <select className={`border-none ${isEdit? "" : "select-read-only"}`} defaultValue={user.religion} name="religion" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}>
                        <option value="1">Có Tôn Giáo</option>
                        <option value="0">Không Tôn Giáo</option>
                    </select> 
                </li>
                <li>Education : <input readOnly={!isEdit} type="number" className="border-none" min="1" max="5" defaultValue={user.education} name="education" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Freetime Action : <input readOnly={!isEdit} type="text" className="border-none" defaultValue={user.freeTimeAction?.actionName} name="actionName" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Location : <input readOnly={!isEdit} type="text" className="border-none" defaultValue={user.likeLocation?.locationName} name="locationName" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Age From : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeAgeFrom} name="likeAgeFrom" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})} /> </li>
                <li>Like Age To : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeAgeTo} name="likeAgeTo" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Height From : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeHeightFrom} name="likeHeightFrom" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Height To : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeHeightTo} name="likeHeightTo" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Sex : <input readOnly={!isEdit} type="text" className="border-none" defaultValue={user.likeSex} name="likeSex" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Religion : 
                    <select className={`border-none ${isEdit? "" : "select-read-only"}`} defaultValue={user.likeReligion} name="likeReligion" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}>
                        <option value="1">Có Tôn Giáo</option>
                        <option value="0">Không Tôn Giáo</option>
                    </select> 
                </li>
                <li>Like Education : <input readOnly={!isEdit} type="number" className="border-none" min="1" max="5" defaultValue={user.likeEducation} name="likeEducation" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
                <li>Like Free Time Action : <input readOnly={!isEdit} type="text" className="border-none" defaultValue={user.likeFreeTimeAction?.actionName} name="actionName" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})}/> </li>
            </ul>
            </div>
        </div>
    )
}
