const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        company_name: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Quotes = mongoose.model("quotes", quoteSchema);

module.exports = Quotes;
