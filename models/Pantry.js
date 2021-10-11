const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PantrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: String,
        required: true
    },
    recipes: {
        type: Array,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('Pantry', PantrySchema);