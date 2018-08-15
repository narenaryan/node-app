let models = require('../models/productModels.js');
let Article = models.Article;
let Category = models.Category;

let getArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.articleId).populate('categories');
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

let deleteArticle = (req, res, next) => {
  // try {
  //   await Article.remove({ _id: req.params.articleId });
  // } catch (err) {
  //   res.status(500).send({error: err.message});
  // }

  // Tried above method but there is a blocking call in the library,
  // so falling back to promise based approach for DELETE call
  Article.findByIdAndRemove(req.params.articleId)
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: 'Article not found with id ' + req.params.noteId
        });
      }
      res.send({message: 'Article deleted successfully!'});
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Article not found with id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Could not delete article with id ' + req.params.noteId
      });
    });
};

let getAllArticles = async (req, res, next) => {
  try {
    let results = await Article.find().populate('categories');
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
