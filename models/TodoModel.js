const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  }
});

const TodoModel = mongoose.model("Todo",TodoSchema)

module.exports = TodoModel;
