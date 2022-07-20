import React, { useEffect } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import './../assets/css/home.scss'
import {SymbolInvtation} from "../chat-module/component/anncounce/Invitations";
import {socket} from '../Chat';

export const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    if (!user)
      navigate('login')
  }, [navigate])

  const handleLogOut = () => {
    localStorage.removeItem('user')
  }

  const homeContentMenu = [
    { id: 3, label: 'Profile', path: 'profile' },
    { id: 4, label: 'Logout', path: 'login', handle: handleLogOut }
  ]

  return (
    <div>
      <Header content={homeContentMenu} />
      <SymbolInvtation socket={socket}/>
      <div id="home">
        <div className="top-bg">
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
