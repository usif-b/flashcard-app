const asyncHandler = require('express-async-handler')
const Deck = require('../models/deck')
const Flashcard = require ('../models/flashcard')

const getDecks = asyncHandler(async(req, res) => {
    const decks = await Deck.find({userId: req.user.id})
    res.status(200).json(decks)
})

const getSingleDeck = asyncHandler(async(req, res) => {
    const deck = await Deck.findById(req.params.deckId)
    if(!deck){
        res.status(400)
        throw new Error('deck not found')
    }
    
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(deck.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    res.status(200).json(deck)
})

const setDeck = asyncHandler(async(req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('deck title missing')
    }

    const deck = await Deck.create({
        userId: req.user.id,
        title: req.body.title
    })

    res.status(200).json(deck)
})

const updateDeck = asyncHandler(async(req, res) => {
    const deck = await Deck.findById(req.params.deckId)
    if(!req.body.title){
        res.status(400)
        throw new Error('add deck title')
    }
    if(!deck){
        res.status(400)
        throw new Error('deck not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(deck.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedDeck = await Deck.findByIdAndUpdate(req.params.deckId, {
        title: req.body.title
    },
    {
        new: true,
    })

    res.status(200).json(updatedDeck)
})

const deleteDeck = asyncHandler(async(req, res) => {
    const deck = await Deck.findById(req.params.deckId)
    await Flashcard.deleteMany({deckId: req.params.deckId})

    if(!deck){
        res.status(400)
        throw new Error('deck not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(deck.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    await deck.remove()
    
    res.status(200).json({id: req.params.deckId})
})

module.exports = {
    getDecks,
    getSingleDeck,
    setDeck,
    updateDeck,
    deleteDeck
}