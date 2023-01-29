const Blog = ({ blog, updateBlog, removeBlog }) => {
  const handleUpdate = (likedBlog) => {
    updateBlog({
      ...likedBlog,
      likes: likedBlog.likes + 1
    })
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />{blog.likes} likes <button onClick={() => handleUpdate(blog)}>like</button>
      <br />added by {blog.user.name}
    </div>
  )
};

export default Blog;
