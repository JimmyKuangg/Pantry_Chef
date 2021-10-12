const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  ingredients: [{
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: 'ingredient'
    },
    quanitity: Number,
    unit: String,
  }],
  cookTime: {
    type: String,
    required: true
  },
  calories: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  authorId: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Recipe', RecipeSchema);