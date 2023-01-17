import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username<input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password<input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

const BlogList = ({blogs, user}) => (
  <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
)

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({username, password})

    try {
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <div>
    {user === null
      ? <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      : <BlogList blogs={blogs} user={user} />
    }
    </div>
  )
}

export default App
