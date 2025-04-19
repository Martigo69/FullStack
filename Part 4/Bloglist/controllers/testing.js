const testingRouter = require('express').Router()
const Blog = require('../models/blog')

testingRouter.get('/reset', async (request, response) => {
    await Blog.deleteMany({})

    await Blog.insertMany([
        {
            title: 'React',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            user: '67d554a476c0f9e3ca47bcaa',
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            user: '67d554a476c0f9e3ca47bcaa',
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            user: '67d554a476c0f9e3ca47bcaa',
        },
        {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            user: '67d554a476c0f9e3ca47bcaa',
        },
        {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
            user: '67d554a476c0f9e3ca47bcaa',
        },
        {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
            user: '67d554a476c0f9e3ca47bcaa',
        }
    ])

    const blogs = await Blog.find({})
    response.json(blogs)
})

module.exports = testingRouter
