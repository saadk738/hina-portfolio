import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AdminPanel from '../pages/AdminPanel'
import Login from '../pages/Login'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/AdminPanel' element={<AdminPanel/>}/>
            <Route path='/Login' element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}
