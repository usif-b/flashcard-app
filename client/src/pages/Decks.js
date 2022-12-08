import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AddDeck } from '../components/AddDeck'
import { Deck } from '../components/Deck'

export const Decks = () => {
    const [decks, setDecks] = useState(null)
    const [signedIn, setSignedIn] = useState(false)

    const checkSignedIn = () => {
        if(sessionStorage.getItem('token')){
            setSignedIn(true)
        }
    }

    const addToDeck = (data) => {
        setDecks([...decks, data])
    }

    const getDecks = async () => {
        const response = await fetch('http://localhost:5000/api/deck', {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })

        const json = await response.json()
        if(response.ok){
            console.log(json)
            setDecks(json)
        }
        if(!response.ok){
            console.log('response not ok')
        }
    }

    useEffect(() => {
        checkSignedIn()
        if(signedIn){
            getDecks()
        }
    }, [signedIn])
    
    return(
        <>
            {signedIn ?
            <div className='decks'>
                <h2>My decks</h2>
                <AddDeck addToDeck = {addToDeck} decks = {decks}/>
                {decks && <div className='deck-list'>
                    {decks.map((deck) => {
                        return <Deck key = {deck._id} deck = {deck}></Deck>
                    })}
                </div>}
            </div> :
            <div className='not-logged-in'>
                <h2>A web-based flashcard tool</h2>
                <p>Login or Register to use platform</p>
                <div className='not-logged-in-buttons'>
                    <Link to = '/login'>Login</Link>
                    <Link to = '/register'>Register</Link>
                </div>
            </div>}
        </>
    )
}