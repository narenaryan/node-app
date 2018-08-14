const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const baseRouter = require('./routes/index.js');

// Starting point of the server
function main () {
  // Export app for other routes to use
  let app = module.exports = express();
  const port = process.env.PORT || 8000;
  // Middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use('/', baseRouter);
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
}

main();
