import React from 'react'
import { ResetPassword } from './component/ResetPassword'
import {
  Route, Routes
} from 'react-router-dom'
import './assets/css/App.scss'
import { LoginForm } from './component/LoginForm'
import { Profile } from './component/Profile'
import { SignupForm } from './component/SignupForm'
import { UserHome } from './component/UserHome'
import { Chat } from './page/Chat'
import { Home } from './page/Home'
import { Login } from './page/Login'
import { PageNotFound } from './page/PageNotFound'
import { Admin } from './page/Admin'
import { AdminLoginForm } from './component/AdminLoginForm'


function App() {
  return (
    <div className="App" >
      <Routes path='/'>
        <Route path='user'>
          <Route path='home' element={<Home />}>
            <Route path='' element={<UserHome />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='chat/:id' element={<Chat />} />
        </Route>
        <Route path='login' element={<Login />}>
          <Route path='login-form' element={<LoginForm />} />
          <Route path='resetPassword' element={<ResetPassword />} />
          <Route path='signup-form' element={<SignupForm />} />
          <Route path='*' element={<div></div>} />
        </Route>
        <Route path='admin' >
          <Route path='login-form' element={<AdminLoginForm />} />
          <Route path='' element={<Admin />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;