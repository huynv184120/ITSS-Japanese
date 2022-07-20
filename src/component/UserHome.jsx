import { React, useState, useEffect } from 'react'
import { CardFilter } from '../component/CardFilter'
import { Card } from '../component/Card'
import '../assets/css/user-home.scss'
import axios from 'axios';



import Avatar1 from '../assets/image/avatar/avatar1.png'
import Avatar2 from '../assets/image/avatar/avatar2.png'
import Avatar3 from '../assets/image/avatar/avatar3.png'
import Avatar4 from '../assets/image/avatar/avatar4.png'
import Avatar5 from '../assets/image/avatar/avatar5.png'
import Avatar6 from '../assets/image/avatar/avatar6.png'
import Avatar7 from '../assets/image/avatar/avatar7.png'
import Avatar8 from '../assets/image/avatar/avatar8.png'
import Avatar9 from '../assets/image/avatar/avatar9.png'
import Image1 from '../assets/image/avatar/image1.png'
import Image2 from '../assets/image/avatar/image2.png'
import Image3 from '../assets/image/avatar/image3.png'
import Image4 from '../assets/image/avatar/image4.png'
import Image5 from '../assets/image/avatar/image5.png'
import Image6 from '../assets/image/avatar/image6.png'
import Image7 from '../assets/image/avatar/image7.png'
import Image8 from '../assets/image/avatar/image8.png'
import Image9 from '../assets/image/avatar/image9.png'

const exListUser = [

  { image: Image9, name: 'Cường', avatar: Avatar1, sex: 0, address: "Ha noi, Dai Co Viet" },
  { image: Image3, name: 'Hiếu', avatar: Avatar2, sex: 0, address: "Ha Noi, Hoang Mai" },
  { image: Image2, name: 'Hải', avatar: Avatar3, sex: 0, address: "Ha Noi, Minh Khai" },
  { image: Image4, name: 'Thư', avatar: Avatar4, sex: 1, address: "Ha noi, Dai Co Viet" },
  { image: Image5, name: 'Tuyết', avatar: Avatar5, sex: 0, address: "Ha Noi, Minh Khai" },
  { image: Image6, name: 'Tú', avatar: Avatar6, sex: 1, address: "Ha Noi, Hoang Mai" },
  { image: Image7, name: 'Hiền', avatar: Avatar7, sex: 1, address: "Ha noi, Dai Co Viet" },
  { image: Image8, name: 'Cảnh', avatar: Avatar8, sex: 1, address: "Ha Noi, Hoang Mai" },
  { image: Image1, name: 'Đạt', avatar: Avatar9, sex: 0, address: "Ha noi, Dai Co Viet" }
]

export const UserHome = () => {
  const listOptions = [{ id: -1, label: 'All' }, { id: 0, label: 'Male' }, { id: 1, label: 'Female' }]
  const [currentOption, setCurrentOption] = useState(-1)

  const [conditionFilter, setConditionFilter] = useState("")

  const [allUser, updateAllUser] = useState([])
  const [filterUser, updateFilterUser] = useState([])

  useEffect(() => {
    axios.get("https://app-matching-friend.herokuapp.com/accounts")
    .then(res => {
      const dataAll = res.data
      const allUser = dataAll.map(e => ({
        image: e.avatar,
        name: e.name? e.name : "Anonymous",
        avatar: e.avatar,
        sex: e.sex,
        address: e.location?.locationName
      }))
      updateAllUser(allUser)
    })

    axios.get(`https://app-matching-friend.herokuapp.com/features/top-match/${JSON.parse(localStorage.getItem("user")).userId}`)
    .then(res => {
      const dataFilter = res.data
      const filterUser = dataFilter.map(e => ({
        image: e.avatar,
        name: e.name? e.name : "Anonymous",
        avatar: e.avatar,
        sex: e.sex,
        address: e.location?.locationName
      }))
      updateFilterUser(filterUser)
    })
  }, [])

  const renderListUser = (users = []) => {
    const colValue = [[], [], []]
    let counter = 0
    users.forEach((i, index) => {

      if (currentOption ===-1 || i.sex === currentOption) {

        colValue[counter % 3].push(<Card key={index} user={i} />)
        counter += 1
      }
    })

    return (
      <div className="card-content">
        <div className="card-col">
          {colValue[0]}
        </div>
        <div className="card-col">
          {colValue[1]}
        </div>
        <div className="card-col">
          {colValue[2]}
        </div>
      </div>
    )
  }
  return (
    <div className="bottom-bg">
      <div className="left-content">
        <div className="filter-option">
          <ul>
            {
              listOptions.map((i, id) => <li key={id} className={i.id === currentOption ? 'active' : ''} onClick={() => setCurrentOption(i.id)} >{i.label}</li>)
            }
          </ul>
        </div>
        <div className="list-user">
          {
            renderListUser(allUser)
          }
        </div>
      </div>
      <div className="right-content-container">
        <div className="right-content">
          <div className="filter-text">
            <input onChange={(e) => setConditionFilter(e.target.value)}type="text" placeholder='Enter key' />
          </div>
          <div className="filter-content">
            {
              filterUser.filter(e => (
                e.name?.toLowerCase().includes(conditionFilter.toLowerCase()) ||
                e.address?.toLowerCase().includes(conditionFilter.toLowerCase())
              )).map((i, index) => <CardFilter key={index} user={i} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
