const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['produce', 'meat', 'seafood', 'bread', 'dry good', 'snack', 'dairy'],
        required: true
    },
    expiryDate: {
        type: Date,
    },
    location: {
        type: String,
        enum: ['fridge', 'deep freeze', 'pantry', 'ottoman', 'emergency', 'shelf'],
        required: true
    },
    notes: {
        type: String
    }
})

const Food = mongoose.model('Food', foodSchema);


module.exports = Food;