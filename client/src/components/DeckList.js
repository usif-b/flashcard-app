import React from 'react'
import { Deck } from './Deck'

export const DeckList = (props) => {
    return(
        <div className='deck-list'>
            {props.decks.map((deck) => {
                return <Deck key = {deck._id} deck = {deck}></Deck>
            })}
        </div>
    )
}