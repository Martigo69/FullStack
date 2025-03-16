const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, beforeEach, describe, after } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

describe('Users test in db', async () => {
    test('check the lenght of the db', async () => {
        const usersAtStart = await helper.usersInDb()
        assert.strictEqual(1, usersAtStart.length)
    })

    test('check the user creation with no details', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: '',
            name: '',
            password: '',
        }

        await api.post('/api/users').send(newUser).set('Content-Type', 'application/json').expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('check the user creation with valid details', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api.post('/api/users').send(newUser).set('Content-Type', 'application/json').expect(201)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    })

    test('check the user creation with invalid details', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'sala',
        }

        await api.post('/api/users').send(newUser).set('Content-Type', 'application/json').expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('check the user creation with already existing user', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api.post('/api/users').send(newUser).set('Content-Type', 'application/json').expect(400)
        assert(result.body.error.includes('expected `username` to be unique'))

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})