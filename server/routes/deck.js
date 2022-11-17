const express = require('express')
const router = express.Router()
const { getDecks,getSingleDeck ,setDeck, updateDeck, deleteDeck} = require('../controllers/deck')
const { protect } = require('../middleware/auth')

router.get('/', protect, getDecks)
router.get('/:deckId', protect, getSingleDeck)
router.post('/', protect, setDeck)
router.put('/:deckId', protect, updateDeck)
router.delete('/:deckId', protect, deleteDeck)

module.exports = router