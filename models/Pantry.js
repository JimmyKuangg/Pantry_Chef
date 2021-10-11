const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PantrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    ingredients: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('Pantry', PantrySchema);