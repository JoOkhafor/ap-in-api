const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
},{
    timestamps: true,
});

const NewsletterModel = mongoose.model('newsletters', newsletterSchema)

module.exports = NewsletterModel