const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    role: {
        type: String,
        required: true,
        default: "USER"
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('users', user)

module.exports = userModel