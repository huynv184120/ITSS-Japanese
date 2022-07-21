import React, { useEffect } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import './../assets/css/home.scss'
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
      <div id="home">
        <div className="top-bg">
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
