const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Visitor = mongoose.model("visitors", visitorSchema);

module.exports = Visitor;
