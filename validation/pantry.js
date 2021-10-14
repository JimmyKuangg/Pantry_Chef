const Validator = require('validator');
const validText = require('./valid-text');
const validArray = require('./valid-array');

module.exports = function validatePantryInput(data) {
  let errors = {};

  data.ingredients = validArray(data.ingredients) ? data.ingredients : '';
  for(let i = 0; i < data.ingredients.length; i++) { 
    data.ingredients[i].quantity = validText(data.ingredients[i].quantity) ? data.ingredients[i].quantity : '';
    if (!Validator.isNumeric(data.ingredients[i].quantity)) {
      errors.quantity = 'Quantity should be a number';
    } else if (Validator.isEmpty(data.ingredients[i].quantity)) {
      errors.quantity = 'Quantity is required';
    }

    data.ingredients[i].unit = validText(data.ingredients[i].unit) ? data.ingredients[i].unit : '';
    if (Validator.isNumeric(data.ingredients[i].unit)) {
      errors.unit = "Unit of measure should not be a number";
    }
    else if (Validator.isEmpty(data.ingredients[i].unit)) {
      errors.unit = 'Unit of measure is required';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}