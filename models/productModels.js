const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

// A category can have a category as parent and Many-to-Many relation with articles
let categorySchema = new Schema({
  _id: {type: String, required: true},
  parent: {type: String, ref: 'Category', required: false},
  children: [{type: String, ref: 'Category', required: false}],
  articles: [{type: ObjectId, ref: 'Article'}]
});

// An article can have Many-to-Many relation with categories
let articleSchema = new Schema({
  sku: {type: String, required: true},
  ean: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  stockQuantity: {type: Number, required: true},
  price: {type: Number, required: true},
  categories: [{type: ObjectId, ref: 'Category'}]
});

let Category = mongoose.model('Category', categorySchema);
let Article = mongoose.model('Article', articleSchema);

module.exports = {
  Category: Category,
  Article: Article
};
