// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog.likes, 0));

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map((blog) => blog.likes));
  const blogWithTheHighestLikes = blogs.find((blog) => blog.likes === highestLikes);
  delete blogWithTheHighestLikes._id;
  delete blogWithTheHighestLikes.__v;

  return blogWithTheHighestLikes;
};

const mostBlogs = (blogs) => {
  const authorWithBlogs = [];

  for (let index = 0; index < blogs.length; index += 1) {
    if (authorWithBlogs.find((blog) => blog.author === blogs[index].author)) {
      authorWithBlogs.find((blog) => blog.author === blogs[index].author).blogs += 1;
    } else {
      authorWithBlogs.push({
        author: blogs[index].author,
        blogs: 1,
      });
    }
  }

  const authorWithMostBlogs = authorWithBlogs
    // eslint-disable-next-line max-len
    .find((author) => author.blogs === Math.max(...authorWithBlogs.map((authorr) => authorr.blogs)));

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const authorWithLikes = [];

  for (let i = 0; i < blogs.length; i += 1) {
    if (authorWithLikes.find((j) => j.author === blogs[i].author)) {
      authorWithLikes.find((j) => j.author === blogs[i].author).likes += blogs[i].likes;
    } else {
      authorWithLikes.push({
        author: blogs[i].author,
        likes: blogs[i].likes,
      });
    }
  }

  return authorWithLikes
    // eslint-disable-next-line max-len
    .find((author) => author.likes === Math.max(...authorWithLikes.map((authorr) => authorr.likes)));
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
