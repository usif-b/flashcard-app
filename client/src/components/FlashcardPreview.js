import React from 'react'
import { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

export const FlashcardPreview = (props) => {
    const [editToggle, setEditToggle] = useState(false)
    const [frontText, setFrontText] = useState(props.flashcard.frontText)
    const [backText, setBackText] = useState(props.flashcard.backText)
    const [error, setError] = useState('')

    const edit = () => {
        setEditToggle(!editToggle)
    }

    const discardChanges = () => {
        setFrontText(props.flashcard.frontText)
        setBackText(props.flashcard.backText)
        setEditToggle(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/flashcard/' + props.flashcard._id, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const json = await response.json()
        
        if(response.ok){
            props.removeFlashcard(props.flashcard._id)
        }
    }
    const handleEdit = async(e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/flashcard/' + props.flashcard._id, {
            method: 'PUT',
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

        if(response.ok){
            setEditToggle(false)
        }

        if(!response.ok){
            setError(await json.message)
        }
    }
    return(
        <div className='flashcard-preview'>
            <div className='flashcard-preview-buttons'>
                <button onClick = {edit}><AiFillEdit/></button>
                <button onClick = {handleDelete}><BsFillTrashFill/></button>
            </div>
            {editToggle ? <form onSubmit={handleEdit}>
                    <textarea
                    className = 'form-large-input'
                    rows = {3}
                    name = 'frontText'
                    value = {frontText}
                    maxLength = {230}
                    onChange = {(e) => {setFrontText(e.target.value)}}>
                    </textarea>
                    <textarea
                    className= 'form-large-input'
                    rows = {3}
                    name = 'backText'
                    value = {backText}
                    maxLength = {230}
                    onChange = {(e) => {setBackText(e.target.value)}}>
                    </textarea>
                    {error && <p className='error'>{error}</p>}
                    <div className='edit-flashcard-buttons'>
                        <input type = 'submit' value = 'Save' />
                        <button onClick = {discardChanges}>Discard</button>
                    </div>
                </form> :
                <div className='flashcard-preview-text'>
                    <p>{frontText}</p>
                    <p>{backText}</p>
                </div>}
        </div>
    )
}