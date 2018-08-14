let models = require('../models/productModels.js');

// TBD: Improvement - Create a Factory for all types of controllers

let Category = models.Category;

let getCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.categoryName);
    res.send(category);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let postCategory = async (req, res, next) => {
  let category = new Category({
    _id: req.body.name,
    articles: req.body.articles
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

let deleteCategory = async (req, res, next) => {
  try {
    await Category.findById(req.params.categoryName).remove();
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let getAllCategoris = async (req, res, next) => {
  try {
    let results = await Category.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};

let putArticlestoCategory = async (req, res, next) => {
  res.status(501).send('Method Not Implemented!');
};

module.exports = {
  getCategory: getCategory,
  postCategory: postCategory,
  deleteCategory: deleteCategory,
  getAllCategoris: getAllCategoris,
  putArticlestoCategory: putArticlestoCategory
};
