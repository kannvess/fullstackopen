const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing HTTP POST',
    author: 'nashkihaysnairfailfardammahum',
    url: 'http://localhost:3003/api/blogs',
    likes: 999,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain(newBlog.title);
});

test('likes property defaults to zero', async () => {
  const newBlog = {
    title: 'Testing likes property to default to zero',
    author: 'nashkihaysnairfailfardammahum',
    url: 'http://localhost:3003/api/blogs',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

test('title or url missing respond with HTTP 400', async () => {
  const newBlog = {
    author: 'nashkihaysnairfailfardammahum',
    likes: 123,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('deleting a blog returns 204', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

  const ids = blogsAtEnd.map((blog) => blog.id);
  expect(ids).not.toContain(blogToDelete.id);
});

test('updating a note', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const newBlog = {
    title: 'Testing HTTP PUT',
    author: 'nashkihaysnairfailfardammahum',
    url: 'http://localhost:3003/api/blogs',
    likes: 123,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const updatedBlog = blogsAtStart.find((blog) => blog.id === blogToUpdate.id);
  expect(blogToUpdate).toEqual(updatedBlog);
});

afterAll(() => {
  mongoose.connection.close();
});
