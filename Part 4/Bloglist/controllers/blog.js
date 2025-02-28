const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
    const newBlog = request.body
    if (newBlog.title && newBlog.author && newBlog.url && newBlog.likes) {
        const newBlogObject = new Blog({
            'title': newBlog.name,
            'author': newBlog.number,
            'url': newBlog.url,
            'likes': newBlog.likes
        })
        Blog.find({ 'title': newBlog.name }).then( blog => {
            if (blog.length) {
                return response.status(400).json({
                    error: 'Blog already in Bloglist'
                })
            } else {
                newBlogObject.save().then(savedBlog => {
                    response.json(savedBlog)
                }).catch(error => { next(error) })
            }
        })
    } else {
        return response.status(400).json({
            error: 'Blog details missing'
        })
    }
})

module.exports = blogRouter