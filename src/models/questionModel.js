const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: String,
  title: String,
  blocks: Array,
  options: Array,
  solution: String,
  siblingId: mongoose.Schema.Types.ObjectId,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;