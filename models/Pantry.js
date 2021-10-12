<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PantrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    ingredients: [{
        ingredient:{
            type: Schema.Types.ObjectId,
            ref: 'ingredients'
        },
        quantity: Number,
        unit: String,
    }],
    date: {
      type: Date,
      default: Date.now
    }
})


=======
const mongoose = require('mongoose');
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
        quantity: String,
        unit: String,
    }],
    date: {
      type: Date,
      default: Date.now
    }
})


>>>>>>> Backend-Setup
module.exports = User = mongoose.model('Pantry', PantrySchema);