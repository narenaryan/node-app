const express = require('express');

let router = express.Router();
let baseController = require('../controllers/baseController.js');
const middleware = require('../middleware.js');

// Getters
router.get('/', middleware.checkToken, baseController.index);

module.exports = router;
