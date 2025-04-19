import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ username, password, setUsername, setPassword, setUser, setErrorMessage, blogs, setBlogs }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
              username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            ) 
            blogService.setToken(user.token)
            blogService.getAll().then(blogs =>
              setBlogs( [...blogs].sort((a, b) => b.likes - a.likes) )
            )
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (exception) {
            const errorMsg = ['Wrong Username/Password','red']
            setUsername('')
            setPassword('')
            setErrorMessage(errorMsg)
            setTimeout(() => {
              setErrorMessage([])
            }, 5000)
          }
    }



    return (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <div>
              username
                <input
                data-testid='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                data-testid='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
        </form>  
    )
}
  
  export default Login