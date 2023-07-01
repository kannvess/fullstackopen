/* eslint-disable no-underscore-dangle */
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      console.log('Author.findOne');
      return author.books.length;
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author');
      }

      return Book.find({ genres: args.genre }).populate('author');
    },
    allAuthors: async () => {
      console.log('Author.find');
      return Author.find({}).populate('books');
    },
    me: (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        });

        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }

        const newBook = new Book({ ...args, author: newAuthor._id });
        newAuthor.books = newAuthor.books.concat(newBook._id);

        try {
          await newBook.save();
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
            },
          });
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

        return newBook;
      }

      const newBook = new Book({ ...args, author: author._id });
      author.books = author.books.concat(newBook._id);

      try {
        await newBook.save();
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      return user.save();
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== '123') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        });
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
