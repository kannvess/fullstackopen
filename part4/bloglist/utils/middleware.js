const morgan = require('morgan');
const { logError } = require('./logger');

const requestLogger = morgan('tiny');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logError(error);

  if (error.message === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.message === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
