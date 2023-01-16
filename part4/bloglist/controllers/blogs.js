const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });

  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { body } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }

  const { user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { body } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  } else if (decodedToken.id.toString() !== body.userId) {
    response.status(401).json({ error: 'invalid user' });
  } else {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' });
  response.json(updatedNote);
});

module.exports = blogsRouter;
