
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Book = new Schema({
    name: {type: String, default: "No name"},
    author: {type: String},
    description: {type: String},
    img: {type: String},
    rate: {type: String},
    price: {type: Number, min: 0},
    slug: {type: String, slug:'name'}

});

module.exports = mongoose.model('Book', Book)
