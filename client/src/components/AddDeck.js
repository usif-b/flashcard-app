import React from 'react'
import { useState } from 'react'

export const AddDeck = () => {
    const [deckTitle, setDeckTitle] = useState('')

    const handleSubmit = async(e) => {
        const response = await fetch('http://localhost:5000/api/deck/', {
            method: 'POST',
            body: JSON.stringify({
                title: deckTitle
            }),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })

        const json = response.json()
        console.log(json)
    }

    return(
        <div className='add-deck'>
            <form onSubmit={handleSubmit}>
                <input
                type = 'text'
                className='form-input'
                id = 'deckTitle'
                name = 'deckTitle'
                value = {deckTitle}
                placeholder = 'Enter new deck title'
                onChange = {(e) => {setDeckTitle(e.target.value)}}
                />
                <input type = 'submit' value = 'Add deck' />
            </form>
        </div>
    )
}