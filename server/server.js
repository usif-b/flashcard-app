const express = require('express')
const dotenv = require('dotenv').config({path:'../.env'})
const cors = require('cors')
const { errorHandler } = require('./middleware/error')
const port = process.env.PORT
const connectDb = require('./config/db')

connectDb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/users', require('./routes/user'))
app.use('/api/deck', require('./routes/deck'))
app.use('/api/flashcard', require('./routes/flashcard'))
app.use(errorHandler)

app.listen(port, () => {
    console.log('Server started on port: ', port)
})