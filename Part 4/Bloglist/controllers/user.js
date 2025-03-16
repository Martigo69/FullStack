const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (password !== undefined && username !== undefined) {
        if (username.length > 3 && password.length > 3) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

            const user = new User({
                username,
                name,
                passwordHash
            })

            const savedUsed = await user.save()

            response.status(201).json(savedUsed)
        } else {
            return response.status(400).json({ error: 'password or username must be at least 3 characters long' })
        }
    } else {
        return response.status(400).json({ error: 'password and username must be given' })
    }
})

module.exports = userRouter