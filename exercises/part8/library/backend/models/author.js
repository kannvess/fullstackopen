const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  born: Number,
});

authorSchema.plugin(uniqueValidator);

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
