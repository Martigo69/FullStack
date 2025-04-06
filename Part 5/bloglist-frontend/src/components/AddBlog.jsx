import React, { useState } from 'react';
import blogService from '../services/blogs'

const AddBlog = ({blogs, setBlogs, setErrorMessage, blogFormRef, mockCreateBlog}) => {
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
        blogFormRef.current.toggleVisibility()
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        if (mockCreateBlog) {
            await mockCreateBlog(newBlog)
        } else {
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
    }

    return (
        <form className='addblog' onSubmit={handleAddNewBlog}>
            <h2>Create New Blog</h2>
            <div>
            Title: <input type="text" className='title' value={title} onChange={handleTitleChange}/>
            </div>
            <div>
            Author: <input type="text" className='author' value={author} onChange={handleAuthorChange}/>
            </div>
            <div>
            Url: <input type="text" className='url' value={url} onChange={handleUrlChange}/>
            </div>
            <div>
            <button className='submitbutton' type="submit">Create</button>
            </div>
        </form>
    )
}
  
export default AddBlog