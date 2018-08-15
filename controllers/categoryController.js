let models = require('../models/productModels.js');

// TBD: Improvement - Create a Factory for all types of controllers

let Category = models.Category;
let Article = models.Article;

let getCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.categoryName).populate('articles');
    if (!category) {
      res.status(404).send({error: 'Resource Not Found'});
    } else {
      res.send(category);
    }
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let postCategory = async (req, res, next) => {
  let category = new Category({
    _id: req.body.name,
    articles: req.body.articles,
    parent: req.body.parent || null
  });
  try {
    let result = await category.save();
    res.status(201).json(result);
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(500).send({error: 'Duplicate category is not allowed'});
    } else {
      res.status(500).send({error: err.message});
    }
  };
};

let deleteCategory = (req, res, next) => {
  Category.findByIdAndRemove(req.params.categoryName)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.noteId
        });
      }
      res.send({message: 'Category deleted successfully!'});
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Category not found with id ' + req.params.noteId
        });
      }
      return res.status(500).send({
        message: 'Could not delete category with id ' + req.params.noteId
      });
    });
};

let getAllCategories = async (req, res, next) => {
  try {
    let results = await Category.find().populate('articles');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let putCategory = async (req, res, next) => {
  try {
    await Category.remove({ _id: req.params.categoryName });
    let category = new Category();
    category._id = req.body.id;
    let articles = [];
    if (req.body.articles) {
      articles = await Article.find({'_id': {$in: req.body.articles}});
    }
    category.articles = articles;
    let result = await category.save();
    res.status(200).json(result);
  } catch (err) {
    if (err && err.code === 11000) {
      res.status(500).send({error: 'PUT param/body is invalid'});
    } else {
      res.status(500).send({error: err.message});
    }
  }
};

module.exports = {
  getCategory: getCategory,
  postCategory: postCategory,
  deleteCategory: deleteCategory,
  getAllCategories: getAllCategories,
  putCategory: putCategory
};
