const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const http = require('http');
const Question = require('../models/questionModel');
const { HealthImplementation, ServingStatus } = require('grpc-health-check');
require('dotenv').config();

const PROTO_PATH = __dirname + '/../grpc/search.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const searchProto = grpc.loadPackageDefinition(packageDefinition).search;




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
    const { query, page = 1, limit = 5, type = '' } = call.request;
    
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const searchQuery = {
      $or: [
        { title: new RegExp(query, 'i') },
        { solution: new RegExp(query, 'i') },
        { 'blocks.text': new RegExp(query, 'i') },
        { 'options.text': new RegExp(query, 'i') }
      ]
    };

    if (type) {
      searchQuery.type = type;
    }

    const questions = await Question.find(searchQuery)
      .lean()
      .limit(limit)
      .skip((page - 1) * limit)
      .maxTimeMS(5000);

    const transformedQuestions = questions.map(q => ({
      title: q.title || '',
      type: q.type || '',
      options: q.options?.map(opt => ({
        text: opt.text || '',
        isCorrectAnswer: !!opt.isCorrectAnswer
      })) || [],
      solution: q.solution || '',
      blocks: q.blocks?.map(block => ({
        text: block.text || '',
        showInOption: !!block.showInOption,
        isAnswer: !!block.isAnswer
      })) || []
    }));

    callback(null, { questions: transformedQuestions });
  } catch (error) {
    console.error('Search error:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
}

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

const healthServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    const isMongoConnected = mongoose.connection.readyState === 1;
    res.writeHead(isMongoConnected ? 200 : 503, { 'Content-Type': 'text/plain' });
    res.end(isMongoConnected ? 'OK' : 'Service Unavailable');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

healthServer.listen(8080, () => {
  console.log('Health check server running on port 8080');
});

