import React from 'react'
import { Link } from 'react-router-dom'

export const Deck = (props) =>{

    const getDate = (timestamp) => {
        let date = new Date(timestamp)
        return (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear()
    }
    
    return(
        <Link to = {'/' + props.deck._id}>
            <div className='deck'>
                <h3>{props.deck.title}</h3>
                <p>{getDate(props.deck.createdAt)}</p>
            </div>
        </Link>
    )
}