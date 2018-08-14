const express = require('express');

let router = express.Router();
let baseController = require('../controllers/baseController.js');
const middleware = require('../middleware.js');

// Getters
router.get('/', middleware.checkToken, baseController.index);
router.post('/login', baseController.login);
router.post('/customer/create', baseController.postCustomer);

module.exports = router;
