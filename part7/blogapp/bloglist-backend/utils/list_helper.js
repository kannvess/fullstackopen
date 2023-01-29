const _ = require("lodash");

const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((sum, b) => sum + b.likes, 0);
};

const favoriteBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  return blogs.sort((a, b) => b.likes - a.likes)[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const byAuthor = _.groupBy(blogs, (b) => b.author);
  const likeCounts = Object.keys(byAuthor).map((name) => ({
    name,
    blogs: byAuthor[name].length,
  }));

  return likeCounts.sort((a, b) => b.blogs - a.blogs)[0].name;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const byAuthor = _.groupBy(blogs, (b) => b.author);
  const likeCounts = Object.keys(byAuthor).map((name) => ({
    name,
    likes: byAuthor[name].reduce((s, b) => s + b.likes, 0),
  }));

  return likeCounts.sort((a, b) => b.likes - a.likes)[0].name;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
