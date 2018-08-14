const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const baseRouter = require('./routes/index.js');
const db = require('./connection.js');

// Starting point of the server
function main () {
  db.init();
  let app = module.exports = express(); // Export app for other routes to use
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use('/', baseRouter);
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
}

main();
