const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const api = supertest(app)


beforeEach( async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(element => element.save())
    await Promise.all(promiseArray)
})

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
    const newBlog = {
        title: 'abdce',
        author: 'abced',
        url: 'https://patterns.com/',
        likes: 7,
    }
    await api.post('/api/blogs').send(newBlog).set('Content-Type', 'application/json').expect(201)
    const updtedBlogs = await helper.blogsInDb()
    assert.strictEqual(updtedBlogs.length, helper.initialBlogs.length+1)
})

test('blog without likes property', async () => {
    const newBlog = {
        title: '11',
        author: '111',
        url: 'https://patterns.com/',
    }
    const response = await api.post('/api/blogs').send(newBlog).set('Content-Type', 'application/json').expect(201)
    assert.strictEqual(response.body.likes, 0)
})

test('blog without title,author,url property', async () => {
    const newBlog = {
        title: '11',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
})

after(async () => {
    await mongoose.connection.close()
})