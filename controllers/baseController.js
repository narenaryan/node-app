let models = require('../models/customerModel.js');
let jwt = require('jsonwebtoken');
let config = require('../config.js');

exports.index = (req, res) => {
  res.send('NOT IMPLEMENTED: because it is Single Page App');
};

// First method to be called to receive JWT token
exports.login = (req, res) => {
  models.Customer.findOne({'email': req.body.email}, (err, customer) => {
    if (err) {
      res.status(500).send(err.message);
    }
    // Authenticate user
    customer.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(500).send(err.message);
      }
      if (isMatch) {
        var token = jwt.sign({username: this.username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );

        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.json({
          success: false,
          message: 'Authentication failed!'
        });
      }
    });
  });
};

exports.postCustomer = (req, res, next) => {
  let newCustomer = new models.Customer({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastname
  });

  newCustomer.save((err) => {
    if (err) {
      return next(err);
    }
  });

  res.sendStatus(201);
};
