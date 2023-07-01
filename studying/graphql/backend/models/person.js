const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  phone: {
    type: String,
    minLength: 5,
  },
  street: {
    type: String,
    required: true,
    minLength: 5,
  },
  city: {
    type: String,
    required: true,
    minLength: 3,
  },
  friendOf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
