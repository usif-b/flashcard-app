import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Flashcards } from './pages/Flashcards'
import { Header } from './components/Header'
import { Decks } from './pages/Decks'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

export default function App(){
  return(
    <div className='App'>
      <BrowserRouter>
        <Header />
          <div className='page'>
            <Routes>
              <Route path = '/' element = {<Decks />} />
              <Route path = '/:deckId' element = {<Flashcards />} />
              <Route path = '/register' element = {<Register/>} />
              <Route path = '/login' element = {<Login/>} />
            </Routes>
          </div>
      </BrowserRouter>      
    </div>
  )
}