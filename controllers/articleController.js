let models = require('../models/productModels.js');
let Article = models.Article;
let Category = models.Category;

let getArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.articleId);
    if (!article) {
      res.status(404).send({error: 'Resource Not Found'});
    } else {
      res.send(article);
    }
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let postArticle = async (req, res, next) => {
  let article = new Article({
    sku: req.body.sku,
    ean: req.body.ean,
    name: req.body.name,
    stockQuantity: req.body.stockQuantity,
    price: req.body.price
  });
  try {
    let categories = [];
    if (req.body.categories) {
      categories = await Category.find({'_id': {$in: req.body.categories}});
    }
    article.categories = categories;
    let result = await article.save();
    res.status(201).json(result);
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(500).send({error: 'Duplicate article is not allowed'});
    } else {
      res.status(500).send({error: err.message});
    }
  }
};

let deleteArticle = async (req, res, next) => {
  try {
    await Article.findById(req.params.articleId).remove();
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let getAllArticles = async (req, res, next) => {
  try {
    let results = await Article.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let putArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.articleId);
    article.categories = req.body.categories || [];
    article.name = req.body.name || null;
    article.sku = req.body.sku || null;
    article.ean = req.body.ean || null;
    article.stockQuantity = req.body.stockQuantity || null;
    article.price = req.body.price || null;
    let categories = [];
    if (req.body.categories) {
      categories = await Category.find({'_id': {$in: req.body.categories}});
    }
    article.categories = categories;
    let result = await article.save();
    res.status(201).json(result);
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(500).send({error: 'PUT body is invalid'});
    } else {
      res.status(500).send({error: err.message});
    }
  }
};

module.exports = {
  getArticle: getArticle,
  postArticle: postArticle,
  deleteArticle: deleteArticle,
  getAllArticles: getAllArticles,
  putArticle: putArticle
};
