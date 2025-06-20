const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  _id: String,
  text: String
});

const questionSchema = new mongoose.Schema({
  id: String,
  text: String,
  multi: Boolean,
  options: [optionSchema]
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('Event', eventSchema);
