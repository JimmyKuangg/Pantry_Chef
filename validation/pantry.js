const Validator = require('validator');
const validText = require('./valid-text');
const validArray = require('./valid-array');

module.exports = function validatePantryInput(data) {
  let errors = {};

  data.ingredients = validArray(data.ingredients) ? data.ingredients : '';
  for(let i = 0; i < data.ingredients.length; i++) { 
    if (!Validator.isNumeric(data.ingredients.quantity)) {
      errors.ingredients.quantity = 'Quantity is required';
    }

    data.ingredients.unit = validText(data.ingredients.unit) ? data.ingredients.unit : '';
    if (Validator.isEmpty(data.ingredients.unit)) {
      errors.ingredients.unit = 'Unit of measure is required';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}