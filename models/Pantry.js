const mongoose = require('mongoose');
const Ingredient = require('./Ingredient');
const Schema = mongoose.Schema;


const PantrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ingredients: [{
        ingredient:{
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        },
        quantity: Number,
        unit: String,
    }],
    date: {
      type: Date,
      default: Date.now
    }
})


module.exports = User = mongoose.model('Pantry', PantrySchema);