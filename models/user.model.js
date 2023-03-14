const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        unique: true 
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('user', user)

module.exports = userModel