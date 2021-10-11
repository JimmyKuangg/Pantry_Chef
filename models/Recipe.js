const mongoose = require('mongoose');
const { text } = require('stream/consumers');
const Schema = mongoose.Schema;

const RecipeSchema = newSchema({
  name: {
    type: String,
    required: true
  }, 
  ingredients: {
    type: Array,
    required: true
  },
  cookTime: {
    type: String,
    required: true
  },
  calories: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  }
})