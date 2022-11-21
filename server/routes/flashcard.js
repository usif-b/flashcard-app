const express = require('express')
const router = express.Router()
const { getFlashcards, setFlashcard, updateFlashcard, deleteFlashcard } = require('../controllers/flashcard')
const { protect } = require('../middleware/auth')

router.get('/:deckId', protect, getFlashcards)
router.post('/:deckId', protect, setFlashcard)
router.put('/:flashcardId', protect, updateFlashcard)
router.delete('/:flashcardId', protect, deleteFlashcard)

module.exports = router