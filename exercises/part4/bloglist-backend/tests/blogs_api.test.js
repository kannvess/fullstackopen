const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

describe('when there are some blogs in database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('those are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('those are identified by field id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body[0].id).toBeDefined();
  });

  test('a blog can be deleted', async () => {
    const aBlogAtStart = (await helper.blogsInDb())[0];

    await api
      .delete(`/api/blogs/${aBlogAtStart.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(aBlogAtStart.title);
  });

  test('a blog can be edited', async () => {
    const aBlogAtStart = (await helper.blogsInDb())[0];
    const editedBlog = {
      ...aBlogAtStart,
      likes: 99,
    };

    await api
      .put(`/api/blogs/${aBlogAtStart.id}`)
      .send(editedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const aBlogAtEnd = blogsAtEnd.find((b) => b.id === aBlogAtStart.id);
    expect(aBlogAtEnd.likes).toBe(99);
  });

  describe('addition of a blog', () => {
    let token;
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({ username: 'root', passwordHash });

      await user.save();

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' });

      token = response.body.token;
    });

    test('succeeds if content valid', async () => {
      const newBlog = {
        title: 'Benefits of Scrumban',
        author: 'Kalle Ilves',
        url: 'www.google.com',
        likes: 7,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      expect(titles).toContain('Benefits of Scrumban');
    });

    test('fails if title and url missing', async () => {
      const newBlog = {
        author: 'Kalle Ilves',
        likes: 7,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });
});

describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('fails if username is too short', async () => {
    const newUser = {
      username: 'mo',
      pasword: 'sekred',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('fails if password is too short', async () => {
    const newUser = {
      username: 'kalle',
      pasword: 'p',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
