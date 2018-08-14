const express = require('express');

let router = express.Router();
let baseController = require('../controllers/baseController.js');
let articleController = require('../controllers/articleController.js');
let categoryController = require('../controllers/categoryController.js');

const middleware = require('../middleware.js');

// Route handling
router.get('/', middleware.checkToken, baseController.index);
router.get('/customer/:customerId', middleware.checkToken, baseController.getCustomer);
router.get('/customers', middleware.checkToken, baseController.getAllCustomers);
router.get('/article/:articleId', middleware.checkToken, articleController.getArticle);
router.get('/articles', middleware.checkToken, articleController.getAllArticles);
router.get('/category/:categoryName', middleware.checkToken, categoryController.getCategory);
router.get('/categories', middleware.checkToken, categoryController.getAllCategoris);

router.post('/login', baseController.login); // Step to access JWT
router.post('/customer/create', middleware.checkToken, baseController.postCustomer);
router.post('/article/create', middleware.checkToken, articleController.postArticle);
router.post('/category/create', middleware.checkToken, categoryController.postCategory);

router.put('/add/articles/category/:categoryId/', middleware.checkToken, categoryController.putArticlestoCategory);
router.put('/add/categories/article/:articleId/', middleware.checkToken, articleController.putCategoriestoArticle);

router.delete('/customer/:customerId', middleware.checkToken, baseController.deleteCustomer);
router.delete('/article/:articleId', middleware.checkToken, articleController.deleteArticle);
router.delete('/category/:categoryName', middleware.checkToken, categoryController.deleteCategory);

module.exports = router;
