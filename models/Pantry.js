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
        }
    }],
    date: {
      type: Date,
      default: Date.now
    }
})

module.exports = User = mongoose.model('Pantry', PantrySchema);