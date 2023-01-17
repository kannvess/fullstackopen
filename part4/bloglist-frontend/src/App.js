import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => (
  <div>
    <h2>Log in to application</h2>
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

const UserCredential = ({user, handleLogout}) => (
  <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
)

const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleNewBlog}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleNewBlog}>
      <div>
        title: <input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>
        author: <input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
)

const BlogList = ({blogs}) => (
  <div>
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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    const user = await loginService.login({username, password})

    try {
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  return (
    <div>
    {user === null
      ? <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      : <div>
          <h2>blogs</h2>
          <UserCredential user={user} handleLogout={handleLogout} />
          <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleNewBlog={handleNewBlog} />
          <BlogList blogs={blogs} />
        </div>
    }
    </div>
  )
}

export default App
