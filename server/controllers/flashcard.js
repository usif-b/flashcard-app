const asyncHandler = require('express-async-handler')
const Flashcard = require('../models/flashcard')

const getFlashcards = asyncHandler(async(req, res) => {
    const flashcards = await Flashcard.find({deckId: req.params.deckId})
    res.status(200).json(flashcards)
})

const setFlashcard = asyncHandler(async(req, res) => {
    if(!req.body.frontText || !req.body.backText){
        res.status(400)
        throw new Error('flashcard content missing')
    }

    const flashcard = await Flashcard.create({
        userId: req.user.id,
        deckId: req.params.deckId,
        frontText: req.body.frontText,
        backText: req.body.backText
    })

    res.status(200).json(flashcard)
})

const updateFlashcard = asyncHandler(async(req, res) => {
    const flashcard = await Flashcard.findById(req.params.flashcardId)
    if(!req.body.frontText || !req.body.backText){
        res.status(400)
        throw new Error('add flashcard content')
    }
    if(!flashcard){
        res.status(400)
        throw new Error('flashcard not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(flashcard.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(req.params.flashcardId, {
        frontText: req.body.frontText,
        backText: req.body.backText
    },
    {
        new: true,
    })

    res.status(200).json(updatedFlashcard)
})

const deleteFlashcard = asyncHandler(async(req, res) => {
    const flashcard = await Flashcard.findById(req.params.flashcardId)

    if(!flashcard){
        res.status(400)
        throw new Error('flashcard not found')
    }

    if(!req.user){
        res.status(400)
        throw new Error('user not found')
    }

    if(flashcard.userId.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    await flashcard.remove()

    res.status(200).json({id: req.params.flashcardId})
})

module.exports = {
    getFlashcards,
    setFlashcard,
    updateFlashcard,
    deleteFlashcard
}