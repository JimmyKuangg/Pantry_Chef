<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pantry: [{
        type: Schema.Types.ObjectId,
        ref: 'pantries'
    }],
    date: {
      type: Date,
      default: Date.now
    }
})

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pantry: {
        type: Schema.Types.ObjectId,
        ref: 'Pantry'
    },
    date: {
      type: Date,
      default: Date.now
    }
})

>>>>>>> Backend-Setup
module.exports = User = mongoose.model('User', UserSchema);