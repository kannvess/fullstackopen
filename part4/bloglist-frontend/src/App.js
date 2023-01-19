import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

const Notification = ({message, messageCategory}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageCategory}>
      {message}
    </div>
  )
}

const UserCredential = ({user, handleLogout}) => (
  <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
)

const BlogList = ({blogs, updateBlog, removeBlog}) => {
  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageCategory, setMessageCategory] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setMessage(null)
      setMessageCategory('')
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageCategory('error')
      setTimeout(() => {
        setMessage(null)
        setMessageCategory('')
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage(null)
    setMessageCategory('')
    setUser(null)
  }

  const handleNewBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setMessageCategory('success')
        setTimeout(() => {
          setMessage(null)
          setMessageCategory('')
        }, 5000)
      })
  }

  const handleUpdate = (newBlog) => {
    blogService
      .update(newBlog)
      .then(returnedBlog => {
        setBlogs(
          blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)
        )
      })
  }

  const handleRemove = (blogId) => {
    blogService
      .remove(blogId)
      .then(() => {
        setBlogs(
          blogs.filter(blog => blog.id !== blogId)
        )
      })
  }

  return (
    <div>
    {user === null
      ? <div>
          <h2>log in to application</h2>
          <Notification message={message} messageCategory={messageCategory} />
          <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
        </div>
      : <div>
          <h2>blogs</h2>
          <Notification message={message} messageCategory={messageCategory} />
          <UserCredential user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel='new note'>
            <BlogForm createBlog={handleNewBlog} />
          </Togglable>
          <BlogList blogs={blogs} updateBlog={handleUpdate} removeBlog={handleRemove} />
        </div>
    }
    </div>
  )
}

export default App
