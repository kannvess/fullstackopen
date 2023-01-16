const morgan = require('morgan');
const User = require('../models/user');
const { logError } = require('./logger');

const requestLogger = morgan('tiny');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logError(error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (!authorization) {
    response.status(401).error({ error: 'token missing or invalid' });
  } else if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const user = await User.findById(request.body.userId);
  request.user = user;

  next();
};

module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor,
};
