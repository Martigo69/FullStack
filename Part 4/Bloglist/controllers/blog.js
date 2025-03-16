const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
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

blogRouter.post('/',  middleware.userExtractor, async (request, response) => {
    const newBlog = request.body
    if (newBlog.title && newBlog.author && newBlog.url) {
        const newBlogObject = new Blog({
            'title': newBlog.title,
            'author': newBlog.author,
            'url': newBlog.url,
            'likes': newBlog.likes || 0,
            'user': request.user
        })
        const blog = await Blog.findOne({ 'title': newBlog.title })
        const user = await User.findById(request.user)
        if (blog) {
            return response.status(400).json({ error: 'Blog already in Bloglist' })
        } else {
            const savedBlog = await newBlogObject.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const deleteBlogId = request.params.id
    const searchedDeleteBlog = await Blog.findById(deleteBlogId)
    const user = await User.findById(request.user)
    if (searchedDeleteBlog) {
        if (searchedDeleteBlog.user.toString() === request.user.toString()) {
            const deletedBlog = await Blog.findByIdAndDelete(deleteBlogId)
            user.blogs = user.blogs.filter(blog => blog !== deletedBlog._id)
            await user.save()
            response.status(204).json(deletedBlog)
        } else {
            return response.status(401).json({ error: 'Unauthorized to delete the blog' })
        }
    } else {
        return response.status(400).json({ error: 'Blog not in database' })
    }

})

module.exports = blogRouter