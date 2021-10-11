const Validator = require('validator')
const validText = require('./valid-text')

module.exports = function validateCategoryInput(data){
    let errors = {}
    data.name = validText(data.name) ? data.name : ''
    if (!Validator.isLength(data.name, {min: 2, max: 140})){
        errors.name = 'Category name must be between 2 and 140 characters'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}