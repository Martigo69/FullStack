import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, blogs, setBlogs, setErrorMessage, blogViewRef, updateBlogMock }) => {

  const handleUpdate = async (updateObject) => {
    updateObject.likes += 1
    if (updateBlogMock) {
      await updateBlogMock(updateObject)
    } else {
      const response = await blogService.updateBlog(updateObject)
        setBlogs(blogs)
        const errorMsg = [`Blog likes updated ${updateObject.title}`, 'Green']
        setErrorMessage(errorMsg)
        setTimeout(() => {
          setErrorMessage([])
        }, 5000)
    }
  }

  const handleDelete = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmDelete) return
    try{
        const response = await blogService.deleteBlog(id)
        console.log(response)
        let deletedBlog = blogs.filter(blog => blog.id === id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        const errorMsg = [`Blog Deleted ${deletedBlog[0].title}`, 'Yellow']
        setErrorMessage(errorMsg)
        setTimeout(() => {
          setErrorMessage([])
        }, 5000)
    } catch(error) {
      const status = error.response.status
      const message = error.response.data.error
      const errorMsg = [`Error deleting blog: ${message} (Status: ${status})`, 'Red']
      setErrorMessage(errorMsg)
      setTimeout(() => setErrorMessage([]), 5000)
    }
  }

  return (
    <div className="blog" data-testid={blog.title}>
      <div className='title'>Title: {blog.title}</div>
      <div className='author'>Author: {blog.author}</div>
      <Togglable buttonOpenLabel="View" buttonCloseLabel="Hide" ref={blogViewRef}>
        <div className='url'>{blog.url}</div>
        <div className='likes'>likes {blog.likes} <button className='likesbutton' onClick={() => handleUpdate(blog)}>like</button></div>
        <button className='deletebutton' onClick={() => handleDelete(blog.id)}>Delete</button>
      </Togglable>
    </div>
  );
};

export default Blog