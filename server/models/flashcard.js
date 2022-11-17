const mongoose = require('mongoose')
const flashcardModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Deck'
    },
    frontText: {
        type: String,
        required: [true, 'add front text']
    },
    backText: {
        type: String,
        required: [true, 'add back text']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Flashcard', flashcardModel)