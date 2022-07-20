import React from "react";
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import { useState, useEffect } from "react";
import axios from 'axios';

export const Table = ({ type }) => {

    const [listUser, setList] = useState([])
    const [listAvg, setListAvg] = useState([])

    useEffect(() => {
        axios.get(`https://app-matching-friend.herokuapp.com/accounts`)
        .then(res => {
            console.log("user", res)
            setList(res.data)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get(`https://app-matching-friend.herokuapp.com/features/avg`)
        .then(res => {
            console.log("avg", res)
            const arr = res.data.map((arr)=>{
                return {
                    'month': arr[0],
                    'avg': arr[1]
                }
            })
            arr.sort((a, b)=>{
                return a.month - b.month
            })
            setListAvg(arr)
        })
        .catch(error => console.log(error));
    }, [])

    const handleRemove = (id) =>{
        if (window.confirm("Delete the user?")) {
            axios.delete(`https://app-matching-friend.herokuapp.com/accounts/delete-account/${id}`)
            setList(listUser.filter(user => user.personId !== id))
        }
    }


    return (
        <div>
            <p className="text-2xl font-bold ml-60 -mb-5 mt-3">
                {type === "user" ? "User" : "Statistic"}
            </p>
            <br />
            <div className="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400 mx-56"></div>
            </div>
            <div className="max-w-4xl mx-auto">
                {type === "user" ? (
                    <ul
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        {listUser.map((obj, i) => (
                            <li className="py-3 sm:py-4 bg-gray-100 px-3 rounded-md shadow-lg mb-5">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={obj.avatar}
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {obj.name}
                                        </p>
                                        <p className="text-sm text-blue-600 truncate dark:text-gray-200">
                                            {obj.email}
                                        </p>
                                        <div class="relative flex flex-col items-center group">
                                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                            </svg>
                                            <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                                                <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">{obj.email}</span>
                                                <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Age: {obj.age}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Height: {obj.height}
                                        </p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Phone Number: {obj.phoneNumber}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Sex: {obj.sex}
                                        </p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Religion: {obj.religion}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Location: {obj.location.locationName}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <button onClick={()=>handleRemove(obj.personId)}>
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src="https://cdn3.iconfinder.com/data/icons/faticons/32/remove-01-512.png"
                                                alt="remove"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p className="text-2xl">User</p>
                        <div>
                            <BarChart width={730} height={250} data={listAvg}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avg" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
