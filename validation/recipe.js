const Validator = require('validator');
const validText = require('./valid-text');
const validArray = require('./valid-array')

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.ingredients = validArray(data.ingredients) ? data.ingredients: [];
  data.cookTime = validText(data.cookTime) ? data.cookTime : '';
  data.calories = validText(data.calories) ? data.calories : '';
  data.categories = validArray(data.categories) ? data.categories : [];
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (data.ingredients.length === 0) {
    errors.ingredients = 'Ingredients are required';
  }

  if (Validator.isEmpty(data.cookTime)) {
    errors.cookTime = 'Cook time is required';
  }

  if (Validator.isEmpty(data.calories)) {
    errors.calories = 'Calories is required';
  }

  if (data.categories.length === 0) {
    errors.categories = 'Categories are required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}