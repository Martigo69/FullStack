import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setErrorMessage }) => {

  const handleUpdate = async (updateObject) => {
    updateObject.likes += 1
    const response = await blogService.updateBlog(updateObject)
      setBlogs(blogs)
      const errorMsg = [`Blog likes updated ${updateObject.title}`, 'Green']
      setErrorMessage(errorMsg)
      setTimeout(() => {
        setErrorMessage([])
      }, 5000)
  }

  const handleDelete = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmDelete) return
      const response = await blogService.deleteBlog(id)
      let deletedBlog = blogs.filter(blog => blog.id === id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      const errorMsg = [`Blog Deleted ${deletedBlog[0].title}`, 'Yellow']
      setErrorMessage(errorMsg)
      setTimeout(() => {
        setErrorMessage([])
      }, 5000)
    }

  return (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={() => handleUpdate(blog)}>like</button></div>
      <div>{blog.author}</div>
      <button onClick={() => handleDelete(blog.id)}>Delete</button>
    </div>
  );
};

export default Blog