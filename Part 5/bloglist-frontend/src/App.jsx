import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState([])
  const blogFormRef = useRef()
  const blogViewRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( [...blogs].sort((a, b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      { errorMessage.length !== 0 && <Notification errorMessage = {errorMessage} />}
      { user === null ? 
      <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} setUser={setUser} setErrorMessage={setErrorMessage}/> : 
      <div>
      <Togglable buttonOpenLabel="New Blog" buttonCloseLabel="Cancel" ref={blogFormRef}>
        <AddBlog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogFormRef={blogFormRef}/>
      </Togglable>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      {blogs.map(blog => (
        <div key={blog.id} style={{
          border: '1px solid black',
          padding: '10px',
          marginBottom: '10px'
        }}>
          <span>{blog.title}</span>
          <Togglable buttonOpenLabel="View" buttonCloseLabel="Hide" ref={blogViewRef}>
            <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogViewRef={blogViewRef} />
          </Togglable>
        </div>
      ))}
    </div> }
    </div>
  )
}

export default App