import React from 'react'
import { useState } from 'react'

export const AddDeck = () => {
    const [deckTitle, setDeckTitle] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
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

        const json = await response.json()
        if(!response.ok){
            setError(await json.message)
        }
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
                maxLength = {25}
                placeholder = 'Enter new deck title'
                onChange = {(e) => {setDeckTitle(e.target.value)}}
                />
                {error && <p className='error'>{error}</p>}
                <input type = 'submit' value = 'Add deck' />
            </form>
        </div>
    )
}