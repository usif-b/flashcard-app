import React from 'react'
import { FlashcardPreview } from './FlashcardPreview'

export const FlashcardList = (props) => {
    return(
        <div className='flashcard-list'>
            {props.flashcards &&<>
                {props.flashcards.map((flashcard) => {
                    return <FlashcardPreview key = {flashcard._id} flashcard = {flashcard} />
                })}
            </>}
        </div>
    )
}