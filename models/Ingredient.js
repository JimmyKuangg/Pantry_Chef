const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    recipes: {
        
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('Ingredient', IngredientSchema);