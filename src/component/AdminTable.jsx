import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Table} from './Table';
import axios from 'axios';

const styleBtn = "block mb-3 w-48 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
const styleClickedBtn = "block mb-3 w-48 bg-blue-400 text-white font-bold py-2 px-4 rounded-l"

export const AdminTable = () => {
    const [type, setType] = useState('user')
    const [btnStatistic, setBtnStatistic] = useState(styleBtn)
    const [btnUser, setBtnUser] = useState(styleClickedBtn)
    const [location, setLocation] = useState('')
    const [time, setTime] = useState('')

    const handleClick = (type) =>{
        if(type === 'user'){
            setBtnUser(styleClickedBtn)
            setBtnStatistic(styleBtn)
        }
        else{
            setBtnStatistic(styleClickedBtn)
            setBtnUser(styleBtn)
        }
        setType(type)
    }

    const handleSubmit = (type) => {
        console.log(time, location)
        if(type === 'location'){
            axios.post(`https://app-matching-friend.herokuapp.com/locations/create/`, {
                locationName: location
            }).then((res)=>{
                setLocation('')
                alert("successfully added location")
            })
            .catch(error => console.log(error));
        }
        else{
            axios.post(`https://app-matching-friend.herokuapp.com/free-time-actions/create/`, {
                actionName: time
            })
            .then((res)=>{
                setTime('')
                alert("successfully added time")
            })
            .catch(error => console.log(error));
        }
    }

    return (
        <div className="container mx-auto mt-32 flex">
            <div className="button-group">
                <button className={btnUser} onClick={()=>handleClick('user')}>User</button>
                <button className={btnStatistic} onClick={()=>handleClick('statistic')}>Statistic</button>
                <p className="mt-12 font-bold">Add new Location</p>
                <input class="shadow appearance-none border mb-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={location} id="username" type="text" placeholder="Location" onChange={event => setLocation(event.target.value)}/>
                <button className="block mb-3 w-48 bg-blue-400 text-white font-bold py-2 px-4 rounded-l" onClick={()=>handleSubmit('location')}>Add</button>
                <p className="mt-2 font-bold">Add new Free Time Action</p>
                <input class="shadow appearance-none border mb-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={time} id="username" type="text" placeholder="Free Time" onChange={event => setTime(event.target.value)}/>
                <button className="block mb-3 w-48 bg-blue-400 text-white font-bold py-2 px-4 rounded-l" onClick={()=>handleSubmit('freeTime')}>Add</button>
            </div>
            <div className="panel ml-12 bg-white w-screen rounded-md shadow-lg h-fit">
                <Table type={type}/>
            </div>
        </div>
    )
}