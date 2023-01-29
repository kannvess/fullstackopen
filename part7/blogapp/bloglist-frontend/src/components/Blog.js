import { useState } from "react";
import blogService from "../services/blogs"

const Blog = ({ blog, updateBlog }) => {
  const [comments, setComments] = useState(blog.comments)
  const [newComment, setNewComment] = useState('')

  if (!blog) {
    return null
  }

  const handleUpdate = (likedBlog) => {
    updateBlog({
      ...likedBlog,
      likes: likedBlog.likes + 1
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const comment = {
      content: newComment
    }

    const response = await blogService.addComment(blog.id, comment)
    setComments(comments.concat(response))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />{blog.likes} likes <button onClick={() => handleUpdate(blog)}>like</button>
      <br />added by {blog.user.name}
      
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' value={newComment} onChange={(event) => setNewComment(event.target.value)}></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map(comment => 
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
};

export default Blog;
