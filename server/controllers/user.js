const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const registerUser = asyncHandler(async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please make sure to add all fields')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User by that email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Account not created successfully')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({email})
    
    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Account not signed in successfully')
    }
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}