import React, { useEffect } from 'react'
import { useState } from 'react'
import { AddDeck } from '../components/AddDeck'
import { Deck } from '../components/Deck'

export const Decks = () => {
    const [decks, setDecks] = useState(null)

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
        getDecks()
    }, [])
    
    return(
        <div className='decks'>
            <h2>My decks</h2>
            <AddDeck />
            {decks && <div className='deck-list'>
                {decks.map((deck) => {
                    return <Deck key = {deck._id} deck = {deck}></Deck>
                })}
            </div>}
        </div>
    )
}