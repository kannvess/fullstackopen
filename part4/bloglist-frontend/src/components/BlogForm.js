import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title: <input type='text' placeholder='insert blog title here' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type='text' placeholder='insert blog author here' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type='text' placeholder='insert blog url here' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm