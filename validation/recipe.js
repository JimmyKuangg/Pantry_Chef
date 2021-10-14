const Validator = require('validator');
const validText = require('./valid-text');
const validArray = require('./valid-array')

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';
  data.ingredients = validArray(data.ingredients) ? data.ingredients : [];
  data.cookTime = validText(data.cookTime) ? data.cookTime : '';
  data.calories = validText(data.calories) ? data.calories : '';
  data.steps = validArray(data.steps) ? data.steps : [];
  data.categories = validArray(data.categories) ? data.categories : [];

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (data.ingredients.length === 0) {
    errors.ingredients = 'Ingredients are required';
  } else {
    for(let i = 0; i < data.ingredients.length; i++) { 
      data.ingredients[i].quantity = validText(data.ingredients[i].quantity) ? data.ingredients[i].quantity : '';
      if (Validator.isEmpty(data.ingredients[i].quantity)) {
        errors.quantity = 'Quantity is required';
      }
  
      data.ingredients[i].unit = validText(data.ingredients[i].unit) ? data.ingredients[i].unit : '';
      if (Validator.isEmpty(data.ingredients[i].unit)) {
        errors.unit = 'Unit of measure is required';
      }
    }
  }

  if (Validator.isEmpty(data.cookTime)) {
    errors.cookTime = 'Cook time is required';
  }

  if (Validator.isEmpty(data.calories)) {
    errors.calories = 'Calories is required';
  }

  if (data.steps.length === 0) {
    errors.steps = 'Steps are required';
  } else {
    for(let i = 0; i < data.steps.length; i++){
      data.steps[i] = validText(data.steps[i]) ? data.steps[i] : '';
      if (Validator.isEmpty(data.steps[i])) {
        errors.steps = 'Error in step input';
      }
    }
  }

  if (data.categories.length === 0) {
    errors.categories = 'Categories are required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}