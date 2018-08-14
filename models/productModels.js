const mongoose = require('mongoose');

let Schema = mongoose.Schema;

// An article can have a straight parent which is a category
let articleSchema = new Schema({
  sku: {type: String, required: true},
  ean: {type: Number, required: true},
  name: {type: String, required: true},
  stockQuantity: {type: Number, required: true},
  price: {type: Number, required: true},
  parent: {type: Schema.Types.ObjectId, ref: 'Category'}
});

// A category can have a category as parent and multiple categories/articles
let categorySchema = new Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  parent: {type: Schema.Types.ObjectId, ref: 'Category'},
  children: [{type: Schema.Types.ObjectId, ref: 'Article', unique: true}, {type: String, ref: 'Category'}]
});

let Category = mongoose.model('Category', categorySchema);
let Article = mongoose.model('Article', articleSchema);

module.exports = {
  Category: Category,
  Article: Article
};
