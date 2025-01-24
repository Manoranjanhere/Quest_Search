const mongoose = require('mongoose');
const Question = require('./models/questionModel');
const data = require('./data.json'); 

require('dotenv').config();

const convertObjectIdField = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (obj[key].$oid) {
          obj[key] = new mongoose.Types.ObjectId(obj[key].$oid);
        } else {
          convertObjectIdField(obj[key]);
        }
      }
    }
  }
};

data.forEach(convertObjectIdFields);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  await Question.deleteMany({});
  console.log('Existing data deleted successfully');
  await Question.insertMany(data);
  console.log('Data loaded successfully');
  mongoose.disconnect();
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});