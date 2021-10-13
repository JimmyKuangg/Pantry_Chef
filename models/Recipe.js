const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  ingredients: [{
    ingredient:{
      type: Schema.Types.ObjectId,
      ref: 'Ingredient'
    },
    quantity: Number,
    unit: String
  }],
  cookTime: {
    type: String,
    required: true
  },
  calories: {
    type: String,
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  steps: [{
    type: String,
    required: true
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Recipe', RecipeSchema);