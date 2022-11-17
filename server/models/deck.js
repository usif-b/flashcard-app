const mongoose = require('mongoose')
const deckModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'add deck title']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Deck', deckModel)