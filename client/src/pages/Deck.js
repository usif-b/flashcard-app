import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AddFlashcard } from '../components/AddFlashcard'
import { FlashcardList } from '../components/FlashcardList'
import { FlashcardViewer } from '../components/FlashcardViewer'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

export const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [flashcards, setFlashcards] = useState(null)
    const [editToggle, setEditToggle] = useState(false)
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
        console.log(await json)
        navigate('/')
    }

    const updateDeckName = async() => {
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
    }

    useEffect(() => {
        getFlashcards()
        getDeck()
    }, [])

    return(
        <div className='deck-page'>
            {deck && <>
                <div className='deck-page-header'>
                    {editToggle ? (<form id = 'editTitleForm' onSubmit={updateDeckName}>
                        <input
                        type = 'text'
                        className='form-input'
                        id = 'deckTitle'
                        name = 'deckTitle'
                        value = {deck.title}
                        onChange = {(e) => {
                            setDeck({
                                title: e.target.value
                            })
                        }}/>
                    </form>) : <h2>{deck.title}</h2>}
                    <div className='deck-page-header-buttons'>
                        <button onClick={() => {setEditToggle(!editToggle)}}><AiFillEdit/></button>
                            <button onClick={deleteDeck}><BsFillTrashFill/></button>
                    </div>
                </div>
                <AddFlashcard deckId = {deck._id} />
            </>}
            {flashcards &&<>
                <FlashcardViewer flashcards = {flashcards} />
                <FlashcardList flashcards = {flashcards} />
            </>
            }
        </div>
    )
}