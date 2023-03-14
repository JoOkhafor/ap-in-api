const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    location: {
        type:String,
        required: true
    },
    letter: {
        type:String,
        required: true
    },
    cv: {
        type:String,
        required: true
    },
},{
    timestamps: true,
});

const ApplicationModel = mongoose.model('application.model', applicationSchema)

module.exports = ApplicationModel