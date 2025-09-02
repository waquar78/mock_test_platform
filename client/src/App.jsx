import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (

   <Routes>
    <Route path='/' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
      <Route path='/quiz' element={<Quiz/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
   </Routes>
  )
}

export default App