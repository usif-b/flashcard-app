import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AddFlashcard } from '../components/AddFlashcard'
import { FlashcardViewer } from '../components/FlashcardViewer'
import { FlashcardPreview } from '../components/FlashcardPreview'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

export const Flashcards = () => {
    const [deck, setDeck] = useState(null)
    const [flashcards, setFlashcards] = useState(null)
    const [editToggle, setEditToggle] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [error, setError] = useState('')
    const { deckId } = useParams()
    const navigate = useNavigate()

    const getDeck = async() => {
        const response = await fetch('http://localhost:5000/api/deck/' + deckId, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })

        const json = await response.json()

        console.log(json)
        setDeck(json)
    }

    const getFlashcards = async() => {
        const response = await fetch('http://localhost:5000/api/flashcard/' + deckId, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const json = await response.json()
        console.log(await json)
        if(json[0]){
            setFlashcards(json)
        }
    }

    const deleteDeck = async() => {
        const response = await fetch('http://localhost:5000/api/deck/' + deckId, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const json = await response.json()
        navigate('/')
    }

    const updateDeckName = async(e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/deck/' + deckId, {
            method: 'PUT',
            body: JSON.stringify({
                title: deck.title
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

    const removeFlashcard = (id) => {
        setFlashcards(flashcards => flashcards.filter(flashcard => flashcard._id !== id))
    }

    useEffect(() => {
        getFlashcards()
        getDeck()
    }, [])

    return(
        <div className='flashcards'>
            {deck && <>
                <div className='flashcards-header'>
                    {editToggle ? (<form id = 'editTitleForm' onSubmit={updateDeckName}>
                        <input
                        type = 'text'
                        className='form-input'
                        id = 'deckTitle'
                        name = 'deckTitle'
                        maxLength={25}
                        value = {deck.title}
                        onChange = {(e) => {
                            setDeck({
                                title: e.target.value
                            })
                        }}/>
                        {error && <p className='error'>{error}</p>}
                    </form>) : <h2>{deck.title}</h2>}
                    <div className='flashcards-header-buttons'>
                        <button onClick={() => {setEditToggle(!editToggle)}}><AiFillEdit/></button>
                        <button onClick={deleteDeck}><BsFillTrashFill/></button>
                    </div>
                </div>
                {flashcards && <FlashcardViewer flashcards = {flashcards} />}
                <AddFlashcard deckId = {deck._id} setFlashcards = {setFlashcards} flashcards = {flashcards}/>
                <button className='hide-button' onClick={() => {setIsHidden(!isHidden)}}>Hide flashcards</button>
                {flashcards && <div className='flashcard-list' style = {{display: isHidden ? 'none' : 'flex'}}>
                    {flashcards &&<>
                    {flashcards.map((flashcard) => {
                        return <FlashcardPreview key = {flashcard._id} flashcard = {flashcard} removeFlashcard = {removeFlashcard}/>
                        })}
                    </>}
                </div>}
            </>}
        </div>
    )
}