const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')


beforeEach( async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('FullStack', 10)
    const user = new User({
        username: 'sssss',
        name: 'sssss',
        blogs: [],
        passwordHash
    })
    await user.save()

    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(element => element.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('fetch single blog by id', async () => {
        const blogsindb = '5a422a851b54a676234d17f7'
        const response = await api.get(`/api/blogs/${blogsindb}`)
        assert.strictEqual(response.body.id, helper.initialBlogs[0]._id)
    })

    test('blogs unique identifier property', async () => {
        const requestId = helper.initialBlogs[0]._id
        await api.get(`/api/blogs/${requestId}`).expect(200)
    })

    test('blog added to db correctly', async () => {
        const user = {
            username: 'sssss',
            password: 'FullStack',
        }

        const loginUser = await api
            .post('/api/login')
            .send(user)

        const newBlog = {
            title: 'abdce',
            author: 'abced',
            url: 'https://patterns.com/',
            likes: 7,
        }

        await api.post('/api/blogs').send(newBlog).set('Content-Type', 'application/json').set('Authorization', `Bearer ${loginUser.body.token}`).expect(201)
        const updtedBlogs = await helper.blogsInDb()
        assert.strictEqual(updtedBlogs.length, helper.initialBlogs.length+1)
    })

    test('unauthorised blog adding restriction', async () => {

        const newBlog = {
            title: 'abdce',
            author: 'abced',
            url: 'https://patterns.com/',
            likes: 7,
        }

        await api.post('/api/blogs').send(newBlog).set('Content-Type', 'application/json').expect(401)
        const updtedBlogs = await helper.blogsInDb()
        assert.strictEqual(updtedBlogs.length, helper.initialBlogs.length)
    })

    test('blog without likes property', async () => {
        const user = {
            username: 'sssss',
            password: 'FullStack',
        }

        const loginUser = await api
            .post('/api/login')
            .send(user)

        const newBlog = {
            title: '11',
            author: '111',
            url: 'https://patterns.com/',
        }
        const response = await api.post('/api/blogs').send(newBlog).set('Content-Type', 'application/json').set('Authorization', `Bearer ${loginUser.body.token}`).expect(201)
        assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title,author,url property', async () => {
        const user = {
            username: 'sssss',
            password: 'FullStack',
        }

        const loginUser = await api
            .post('/api/login')
            .send(user)

        const newBlog = {
            title: '11',
        }
        await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${loginUser.body.token}`).expect(400)
    })

})

after(async () => {
    await mongoose.connection.close()
})