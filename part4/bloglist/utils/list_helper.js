// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog.likes, 0));

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map((blog) => blog.likes));
  const blogWithTheHighestLikes = blogs.find((blog) => blog.likes === highestLikes);

  return blogWithTheHighestLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog };
