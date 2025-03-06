const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const requestBlogId = request.params.id
    const blogs = await Blog.findById(requestBlogId)
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const newBlog = request.body
    if (newBlog.title && newBlog.author && newBlog.url) {
        const newBlogObject = new Blog({
            'title': newBlog.title,
            'author': newBlog.author,
            'url': newBlog.url,
            'likes': newBlog.likes || 0
        })
        const blog = await Blog.findOne({ 'title': newBlog.title })
        if (blog) {
            return response.status(400).json({ error: 'Blog already in Bloglist' })
        } else {
            const savedBlog = await newBlogObject.save()
            return response.status(201).json(savedBlog)
        }
    } else {
        return response.status(400).json({ error: 'Blog details missing' })
    }
})


blogRouter.put('/:id', async (request, response) => {
    const newBlog = request.body
    if (newBlog.title && newBlog.author && newBlog.url && newBlog.likes) {
        const updatedBlogObject = {
            'title': newBlog.title,
            'author': newBlog.author,
            'url': newBlog.url,
            'likes': newBlog.likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogObject)
        return response.json(updatedBlog)
    } else {
        return response.status(400).json({ error: 'Blog details missing' })
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const deleteBlogId = request.params.id
    const searchedDeleteBlog = await Blog.findById(deleteBlogId)
    if (searchedDeleteBlog) {
        const deletedBlog = await Blog.findByIdAndDelete(deleteBlogId)
        response.status(204).json(deletedBlog)
    } else {
        return response.status(400).json({ error: 'Blog not in database' })
    }

})

module.exports = blogRouter