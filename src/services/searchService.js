const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Question = require('../models/questionModel');
require('dotenv').config();

// Load proto file
const PROTO_PATH = __dirname + '/../grpc/search.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load gRPC package definition
const searchProto = grpc.loadPackageDefinition(packageDefinition).search;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

async function search(call, callback) {
  try {
    const { query, page = 1, limit = 10 } = call.request;
    
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const questions = await Question.find({ 
      title: new RegExp(query, 'i') 
    })
    .lean()
    .limit(limit)
    .skip((page - 1) * limit)
    .maxTimeMS(5000);

    if (!questions || questions.length === 0) {
      return callback(null, {
        title: '',
        type: '',
        options: [],
        solution: '',
        blocks: []
      });
    }

    const question = questions[0];
    callback(null, {
      title: question.title || '',
      type: question.type || '',
      options: question.options || [],
      solution: question.solution || '',
      blocks: question.blocks || []
    });

  } catch (error) {
    console.error('Search error:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
}

// Start server after MongoDB connects
mongoose.connection.once('open', () => {
  const server = new grpc.Server();
  server.addService(searchProto.SearchService.service, { search });

  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('Failed to bind:', error);
        return;
      }
      console.log(`Server running at http://0.0.0.0:${port}`);
      server.start();
    }
  );
});