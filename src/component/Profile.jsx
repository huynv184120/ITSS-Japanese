import React, { useState, useEffect } from 'react'
import '../assets/css/profile.scss'
import Avatar from '../assets/image/large_avatar.png'
import axios from 'axios'
import { useParams } from 'react-router-dom';



export const Profile = () => {
    const [imageSelected, setImageSelected] = useState("")
    const [user, setUser] = useState({})
    const [isEdit, changeEditState] = useState(false)
    const [tab, setTab] = useState(1)
    const [location, setLocation] = useState([])
    const [freeTimeAction, setFreeTimeAction] = useState([])
    const param = useParams()

    const onEditClickHandle = () => {
        if (isEdit) {
            // const user = JSON.stringify(localStorage.getItem('user'))
            console.log(user)
            axios.put(`https://app-matching-friend.herokuapp.com/accounts/upload-profile`, user).then((response) => {
                console.log(response)
            });
        }
        changeEditState(!isEdit);
    }
    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "lolicon");
        axios.post("https://api.cloudinary.com/v1_1/dzgscwqqt/image/upload", formData).then((response) => {
            setUser({ ...user, ["avatar"]: response.data.secure_url })
        });
    }
    useEffect(() => {
        axios.get(`https://app-matching-friend.herokuapp.com/accounts/${param["id"] ? parseInt(param["id"]) : JSON.parse(localStorage.getItem('user')).userId}/profile`)
            .then((res) => {
                console.log(`https://app-matching-friend.herokuapp.com/accounts/${param["id"] ? parseInt(param["id"]) : JSON.parse(localStorage.getItem('user')).userId}/profile`)
                setUser({...res.data})
                console.log(res.data)
            }).catch((err) => console.log(err))
        axios.get(`https://app-matching-friend.herokuapp.com/locations`)
            .then((res) => {
                setLocation(res.data)
            }).catch((err) => console.log(err))
        axios.get(`https://app-matching-friend.herokuapp.com/free-time-actions`)
            .then((res) => {
                setFreeTimeAction(res.data)
            }).catch((err) => console.log(err))
    }, [])

    return (
        <div id='profile'>
            <div className="profile-top">
                <div className="short-profile">
                    <img src={user.avatar} alt="avatar" />
                    <div className="short-info">

                        <input readOnly={!isEdit} type="text" className="short-info__email border-none" defaultValue={user.email} />
                        <input readOnly={!isEdit} type="text" className="short-info__name border-none" defaultValue={user.name} />
                        <div className="short-info__age old-area">
                            <input readOnly={!isEdit} type="number" className="input-50 border-none" defaultValue={user.age} />
                            <span className='age-text'>
                                years old
                            </span>
                        </div>
                    </div>
                    <div className={`uppload-image ${isEdit ? 'd-block' : 'd-none'}`}>
                        <input type="file" placeholder='Chọn ảnh đại diện' onChange={(event) => {
                            setImageSelected(event.target.files[0]);
                        }} />
                        <button onClick={uploadImage}>Cập nhật ảnh</button>
                    </div>
                </div>

            </div>
            <div className="profile-title">
                <div className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>INFOMATION</div><div className={tab === 2 ? 'active' : ''} onClick={() => setTab(2)}>HOBBY</div>
            </div>
            <div className="profile-content">
                {
                    tab === 1 ?
                        <ul>
                            <li>Sex :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={"male"} name="sex" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            </li>
                            <li>Age : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.age} name="age" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Height : <input readOnly={!isEdit} type="number" className="border-none input-50" defaultValue={user.height} name="height" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> cm </li>
                            <li>Weight : <input readOnly={!isEdit} type="number" className="border-none input-50" defaultValue={user.weight} name="weight" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> kg</li>
                            <li>Location :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={user.location} name="location" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    {
                                        location.map((i, index) => <option key={index} value={i}>{i.locationName}</option>)
                                    }
                                </select>
                            </li>
                            <li>Phone : <input readOnly={!isEdit} type="phone" className="border-none" defaultValue={user.phoneNumber} name="phoneNumber" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Religion :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={user.religion} name="religion" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    <option value="1">Có Tôn Giáo</option>
                                    <option value="0">Không Tôn Giáo</option>
                                </select>
                            </li>
                            <li>Education : <input readOnly={!isEdit} type="number" className="border-none" min="1" max="5" defaultValue={user.education} name="education" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Freetime Action :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={user.freeTimeAction} name="freeTimeAction" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    {
                                        freeTimeAction.map((i, index) => <option key={index} value={i}>{i.actionName}</option>)
                                    }
                                </select>
                            </li>
                        </ul> :
                        <ul>
                            <li>Like Location :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={user.location} name="likeLocation" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    {
                                        location.map((i, index) => <option key={index} value={i}>{i.locationName}</option>)
                                    }
                                </select>
                            </li>
                            <li>Like Age From : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeAgeFrom} name="likeAgeFrom" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Like Age To : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeAgeTo} name="likeAgeTo" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Like Height From : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeHeightFrom} name="likeHeightFrom" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Like Height To : <input readOnly={!isEdit} type="number" className="border-none" defaultValue={user.likeHeightTo} name="likeHeightTo" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Like Sex : <input readOnly={!isEdit} type="text" className="border-none" defaultValue={user.likeSex} name="likeSex" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Like Religion :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={user.likeReligion} name="likeReligion" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    <option value="1">Có Tôn Giáo</option>
                                    <option value="0">Không Tôn Giáo</option>
                                </select>
                            </li>
                            <li>Like Education : <input readOnly={!isEdit} type="number" className="border-none" min="1" max="5" defaultValue={user.likeEducation} name="likeEducation" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} /> </li>
                            <li>Like Free Time Action :
                                <select className={`border-none ${isEdit ? "" : "select-read-only"}`} defaultValue={user.likeFreeTimeAction} name="likeFreeTimeAction" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}>
                                    {
                                        freeTimeAction.map((i, index) => <option key={index} value={i}>{i.actionName}</option>)
                                    }
                                </select>
                            </li>
                        </ul>
                }
            </div>
            <div className='edit-button'>
                <button hidden={isEdit} onClick={() => onEditClickHandle()}>Edit</button>
                <button hidden={!isEdit} className='save' onClick={() => onEditClickHandle()}>Save</button>
            </div>
        </div>
    )
}