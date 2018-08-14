const express = require('express');

let router = express.Router();
let baseController = require('../controllers/baseController.js');
let articleController = require('../controllers/articleController.js');
let categoryController = require('../controllers/categoryController.js');

const middleware = require('../middleware.js');

// Route handling
router.get('/', middleware.checkToken, baseController.index);
router.get('/customer/:customerId', middleware.checkToken, baseController.getCustomer);
router.get('/article/:articleId', middleware.checkToken, articleController.getArticle);
router.get('/category/:categoryName', middleware.checkToken, categoryController.getCategory);
router.post('/login', baseController.login);
router.post('/customer/create', baseController.postCustomer);
router.post('/article/create', articleController.postArticle);
router.post('/category/create', categoryController.postCategory);

module.exports = router;
