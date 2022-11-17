import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
    const [signedIn, setSignedIn] = useState(false)
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('token')
        navigate('/', {replace: true})
        window.location.reload()
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            setSignedIn(true)
        }
    }, [])

    return(
        <header className='header'>
            <Link to = '/'>
                <h2>Flashcards</h2>
            </Link>
            <div className='header-buttons'>
                <Link to = '/'>Home</Link>
                {signedIn ? <>
                <a href = '#' onClick={logout}>Log out</a>
                </>:<>
                <Link to = '/login'>Login</Link>
                <Link to = '/register'>Register</Link>
                </>}             
            </div>
        </header>
    )
}