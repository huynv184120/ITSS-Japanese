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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const mockData = [{"personId":23,"email":"nguyenngocaocuong@gmail.com","location":{"locationId":1,"locationName":"Nghệ An"},"name":null,"age":21,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":12,"freeTimeAction":1,"password":"password","isAdmin":true},{"personId":24,"email":"nguyendinhcanh@gmail.com","location":{"locationId":2,"locationName":"Thanh Hóa"},"name":null,"age":22,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":12,"freeTimeAction":3,"password":"password","isAdmin":false},{"personId":25,"email":"lebaohieu@gmail.com","location":{"locationId":2,"locationName":"Thanh Hóa"},"name":null,"age":18,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":12,"freeTimeAction":5,"password":"password","isAdmin":false},{"personId":26,"email":"tadanghuy@gmail.com","location":{"locationId":2,"locationName":"Thanh Hóa"},"name":null,"age":16,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":11,"freeTimeAction":2,"password":"cuongcuong","isAdmin":false},{"personId":27,"email":"daoduythai@gmail.com","location":{"locationId":3,"locationName":"Hà Tĩnh"},"name":null,"age":32,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":10,"freeTimeAction":5,"password":"password","isAdmin":false},{"personId":28,"email":"lethaitong@gmail.com","location":{"locationId":3,"locationName":"Hà Tĩnh"},"name":null,"age":23,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":1,"freeTimeAction":6,"password":"password","isAdmin":false},{"personId":29,"email":"hadaihanh@gmail.com","location":{"locationId":5,"locationName":"Bình Dương"},"name":null,"age":16,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":7,"freeTimeAction":8,"password":"password","isAdmin":false},{"personId":30,"email":"dongthamthuc@gmail.com","location":{"locationId":5,"locationName":"Bình Dương"},"name":null,"age":17,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":12,"freeTimeAction":9,"password":"password","isAdmin":false},{"personId":31,"email":"toquymac@gmail.com","location":{"locationId":7,"locationName":"Hải Dường"},"name":null,"age":27,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":7,"freeTimeAction":5,"password":"password","isAdmin":false},{"personId":32,"email":"anhtuha@gmail.com","location":{"locationId":8,"locationName":"Thái Bình"},"name":null,"age":32,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":8,"freeTimeAction":2,"password":"cuongcuong","isAdmin":false},{"personId":33,"email":"nguyenduclam@gmail.com","location":{"locationId":7,"locationName":"Hải Dường"},"name":null,"age":18,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0855050635","sex":null,"religion":null,"education":1,"createTime":3,"freeTimeAction":3,"password":"cuongcuong","isAdmin":false},{"personId":34,"email":"phamhongson@gmail.com","location":{"locationId":5,"locationName":"Bình Dương"},"name":null,"age":18,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":4,"freeTimeAction":4,"password":"cuongcuong","isAdmin":false},{"personId":35,"email":"nguyenvanlong@gmail.com","location":{"locationId":6,"locationName":"Hà Nội"},"name":null,"age":19,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":4,"freeTimeAction":4,"password":"cuongcuong","isAdmin":false},{"personId":36,"email":"truongsyhung@gmail.com","location":{"locationId":4,"locationName":"Ninh Bình"},"name":null,"age":26,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":6,"freeTimeAction":7,"password":"cuongcuong","isAdmin":false},{"personId":37,"email":"lathevinh@gmail.com","location":{"locationId":6,"locationName":"Hà Nội"},"name":null,"age":29,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":6,"freeTimeAction":7,"password":"cuongcuong","isAdmin":false},{"personId":38,"email":"dangthaimai@gmail.com","location":{"locationId":2,"locationName":"Thanh Hóa"},"name":null,"age":33,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":3,"freeTimeAction":8,"password":"cuongcuong","isAdmin":false},{"personId":39,"email":"songkhongtu@gmail.com","location":{"locationId":2,"locationName":"Thanh Hóa"},"name":null,"age":31,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":7,"freeTimeAction":6,"password":"cuongcuong","isAdmin":false},{"personId":40,"email":"hongbemac@gmail.com","location":{"locationId":1,"locationName":"Nghệ An"},"name":null,"age":35,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":8,"freeTimeAction":6,"password":"cuongcuong","isAdmin":false},{"personId":41,"email":"dangsuthe@gmail.com","location":{"locationId":1,"locationName":"Nghệ An"},"name":null,"age":16,"image":null,"avatar":"url","height":12.3,"phoneNumber":"0818988577","sex":null,"religion":null,"education":1,"createTime":2,"freeTimeAction":6,"password":"cuongcuong","isAdmin":false}];

const data = [[4,2],[7,3],[10,1],[6,2],[12,4],[3,2],[1,1],[2,1],[8,2],[11,1]];

export const Table = ({ type }) => {

    const [listUser, setList] = useState([])
    const [listAvg, setListAvg] = useState([])

    useEffect(() => {
        axios.get(`https://app-matching-friend.herokuapp.com/accounts`)
        .then(res => {
            console.log(res)
            // this.setState({ persons });
            setList(res)
        })
        .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get(`https://app-matching-friend.herokuapp.com/features/avg`)
        .then(res => {
            console.log(res)
            const resData = data.map((arr)=>{
                return {
                    'month': arr[0],
                    'avg': arr[1]
                }
            })
            console.log(resData)
            setListAvg(res)
        })
        .catch(error => {
            let resData = data.map((arr)=>{
                return {
                    'month': arr[0],
                    'avg': arr[1]
                }
            })
            resData.sort((a, b)=>{
                return a.month - b.month
            })
            setListAvg(resData)
        });
    }, [])

    const handleRemove = (id) =>{
        if (window.confirm("Delete the user?")) {
            console.log(id)
            // axios.delete(`https://app-matching-friend.herokuapp.com/accounts/delete-account/${id}`)
            axios.delete(`https://app-matching-friend.herokuapp.com/accounts/delete-account/1`)
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
                        {mockData.map((obj, i) => (
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
