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

module.exports = {
  getCategory: getCategory,
  postCategory: postCategory
};
