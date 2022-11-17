import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Header } from './components/Header'
import { Deck } from './pages/Deck'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

export default function App(){
  return(
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/:deckId' element = {<Deck />} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/login' element = {<Login/>} />
        </Routes>
      </BrowserRouter>      
    </div>
  )
}