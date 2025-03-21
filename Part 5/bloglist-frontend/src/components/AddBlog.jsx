import React, { useState } from 'react';
import blogService from '../services/blogs'

const AddBlog = ({blogs, setBlogs, setErrorMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
    setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
    setUrl(event.target.value)
    }
    const handleAddNewBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        const response = await blogService.createBlog(newBlog)
        setBlogs(blogs.concat(response))
        setTitle('')
        setAuthor('')
        setUrl('')
        const errorMsg = [`A new blog ${response.title} by ${response.author} added`,'green']
        setErrorMessage(errorMsg)
        setTimeout(() => {
            setErrorMessage([])
        }, 5000)
    }

    return (
        <form onSubmit={handleAddNewBlog}>
            <h2>Create New Blog</h2>
            <div>
            Title: <input type="text" value={title} onChange={handleTitleChange}/>
            </div>
            <div>
            Author: <input type="text" value={author} onChange={handleAuthorChange}/>
            </div>
            <div>
            Url: <input type="text" value={url} onChange={handleUrlChange}/>
            </div>
            <div>
            <button type="submit">Create</button>
            </div>
        </form>
    )
}
  
export default AddBlog