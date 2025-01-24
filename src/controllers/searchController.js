const Question = require('../models/questionModel');

exports.search = async (req, res) => {
  const query = req.query.q;
  try {
    const questions = await Question.find({ title: new RegExp(query, 'i') });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for questions' });
  }
};