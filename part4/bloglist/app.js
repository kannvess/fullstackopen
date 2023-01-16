const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URI } = require('./utils/config');

const app = express();
const notesRouter = require('./controllers/blogs');
const {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor,
} = require('./utils/middleware');
const { logInfo, logError } = require('./utils/logger');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

logInfo('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    logInfo('connected to MongoDB');
  })
  .catch((error) => {
    logError('error connecting to MongoDB:', error);
  });

app.use(cors());
// app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);

app.use(tokenExtractor);
app.use('/api/blogs', notesRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
