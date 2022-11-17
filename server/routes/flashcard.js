const express = require('express')
const router = express.Router()
const { getFlashcards, setFlashcard, updatedFlashcard, deleteFlashcard } = require('../controllers/flashcard')
const { protect } = require('../middleware/auth')

router.get('/:deckId', protect, getFlashcards)
router.post('/:deckId', protect, setFlashcard)
router.put('/:flashcardId', protect, updatedFlashcard)
router.delete('/:flashcardId', protect, deleteFlashcard)

module.exports = router