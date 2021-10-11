const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.cookTime = validText(data.cookTime) ? data.cookTime: '';
  data.calories = validText(data.calories) ? data.calories: '';
  data.description = validText(data.description) ? data.description : '';
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (data.ingredients.length === 0) {
    errors.ingredients = 'Ingredients are required';
  }

  if (Validator.isEmpty(data.cookTime)) {
    errors.cookTime = 'Cooktime is required';
  }

  if (Validator.isEmpty(data.calories)) {
    errors.calories = 'Calories is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }

  if (data.categories.length === 0) {
    errors.categories = 'Categories are required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}