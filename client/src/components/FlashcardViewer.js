import React from 'react'
import { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export const FlashcardViewer = (props) => {
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped ] = useState(false)

    const increment = () => {
        if(index+1 !== props.flashcards.length){
            setIndex(index+1)
            if(flipped){
                flip()
            }
        }
    }

    const decrement = () => {
        if(index !== 0){
            setIndex(index-1)
            if(flipped){
                flip()
            }
        }
    }

    const flip = () => {
        setFlipped(!flipped)
    }

    return(
        <div className='flashcard-viewer'>
            <div className= 'flashcard' onClick = {flip}>
                {flipped ? <p>{props.flashcards[index].backText}</p> : <p>{props.flashcards[index].frontText}</p>}
            </div>
            <div className='flashcard-viewer-buttons'>
                <button onClick={decrement}><AiOutlineArrowLeft/></button>
                <p>{index+1} / {props.flashcards.length}</p>
                <button onClick={increment}><AiOutlineArrowRight/></button>
            </div>
        </div>
    )
}