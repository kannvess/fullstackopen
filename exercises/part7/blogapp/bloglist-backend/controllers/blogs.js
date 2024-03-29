const router = require("express").Router();

const Blog = require("../models/blog");
const Comment = require('../models/comment')

router.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1, id: 1});

  response.json(blogs);
});

router.post("/", async (request, response) => {
  if (!request.user) {
    response.status(401).json({ error: "token missing or invalid" });
  }
  
  const { user } = request;
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user.id,
  });
  
  const savedBlog = await blog.save();
  
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  
  response.status(201).json(savedBlog);
});

router.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id

  const comment = new Comment({
    content: request.body.content
  })

  const savedComment = await comment.save()

  const blog = await Blog.findById(blogId)
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

router.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    response.status(401).json({
      error: "only the creator can delete a blog",
    });
  } else {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
});

router.put("/:id", async (request, response) => {
  if (!request.user) {
    response.status(401).json({ error: "token missing or invalid" });
  }

  const { user } = request;
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...blog, user: user.id },
    { new: true, runValidators: true, context: "query" }
  );

  response.json(updatedBlog);
});


module.exports = router;
