import { useState } from "react"

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = ({...blogStyle, display: visible ? 'none' : ''})
  const showWhenVisible = ({...blogStyle, display: visible ? '' : 'none'})

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br /> {blog.url}
        <br /> likes {blog.likes} <button>like</button>
        <br /> {blog.author}
      </div>
    </div>  
  )
}

export default Blog