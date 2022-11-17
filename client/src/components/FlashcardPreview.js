import React from 'react'
import { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

export const FlashcardPreview = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [frontText, setFrontText] = useState(props.flashcard.frontText)
    const [backText, setBackText] = useState(props.flashcard.backText)

    const edit = () => {
        setEditMode(!editMode)
    }

    const discardChanges = () => {
        setFrontText(props.flashcard.frontText)
        setBackText(props.flashcard.backText)
        setEditMode(false)
    }

    const handleDelete = async() => {
        const response = await fetch('http://localhost:5000/api/flashcard/' + props.flashcard._id, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const json = await response.json()
        window.location.reload()
    }
    const handleEdit = async() => {
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
        console.log(json)
    }
    return(
        <div className='flashcard-preview'>
            <div className='flashcard-preview-buttons'>
                <button onClick = {edit}><AiFillEdit/></button>
                <button onClick = {handleDelete}><BsFillTrashFill/></button>
            </div>
            {editMode ? <form onSubmit={handleEdit}>
                    <textarea
                    className = 'form-large-input'
                    rows = {3}
                    name = 'frontText'
                    value = {frontText}
                    onChange = {(e) => {setFrontText(e.target.value)}}>
                    </textarea>
                    <textarea
                    className= 'form-large-input'
                    rows = {3}
                    name = 'backText'
                    value = {backText}
                    onChange = {(e) => {setBackText(e.target.value)}}>
                    </textarea>
                    <input type = 'submit' value = 'Save changes' />
                    <button onClick = {discardChanges}>Discard changes</button>
                </form> :
                <div className='flashcard-preview-text'>
                    <p>{frontText}</p>
                    <p>{backText}</p>
                </div>}
        </div>
    )
}