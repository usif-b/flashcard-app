import React from 'react'
import { useState } from 'react'

export const AddFlashcard = (props) => {
    const [frontText, setFrontText] = useState('')
    const [backText, setBackText] = useState('')

    const handleSubmit = async() => {
        const response = await fetch('http://localhost:5000/api/flashcard/' + props.deckId, {
            method: 'POST',
            body: JSON.stringify({
                frontText: frontText,
                backText: backText
            }),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })

        const json = await response.json()
        console.log(await json)
    }

        return(
            <form onSubmit = {handleSubmit} className = 'add-flashcard'>
                <div className='flashcard-input'>
                    <textarea
                    className='form-large-input'
                    rows={3}
                    name = 'frontText'
                    value = {frontText}
                    placeholder = 'Enter front of card'
                    onChange = {(e) => {setFrontText(e.target.value)}}>
                    </textarea>
                    <textarea
                    className='form-large-input'
                    rows={3}
                    name = 'backText'
                    value = {backText}
                    placeholder = 'Enter back of card'
                    onChange = {(e) => {setBackText(e.target.value)}}>
                    </textarea>
                </div>
                <input type = 'submit' value = 'Add flashcard' />
            </form>
        )
}