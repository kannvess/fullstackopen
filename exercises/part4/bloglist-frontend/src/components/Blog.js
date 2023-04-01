import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const hideWhenVisible = ({ ...blogStyle, display: visible ? 'none' : '' })
  const showWhenVisible = ({ ...blogStyle, display: visible ? '' : 'none' })
  const hideWhenDetail = ({ display: showDetail ? 'none' : '' })
  const showWhenDetail = ({ display: showDetail ? '' : 'none' })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const handleUpdate = () => {
    updateBlog({ ...blog, likes: blog.likes += 1 })
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        <span>{blog.title}</span>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br /> {blog.author}
        <div style={hideWhenDetail}>
          <button onClick={toggleDetail}>show detail</button>
        </div>
        <div className='detail' style={showWhenDetail}>
          {blog.url}
          <br /> likes {blog.likes} <button onClick={handleUpdate}>like</button>
          <br /> <button onClick={toggleDetail}>hide detail</button>
        </div>
        <button onClick={() => window.confirm(`Remove blog ${blog.title} by ${blog.author}`) ? handleRemove() : null}>remove</button>
      </div>
    </div>
  )
}

export default Blog