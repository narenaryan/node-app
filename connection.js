// Import the mongoose module
const mongoose = require('mongoose');
const config = require('./config.js');
// Set up default mongoose connection
let mongoDB = config.database;
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Get the default connection
let db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.db = db;
