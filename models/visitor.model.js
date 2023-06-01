const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        page: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Visitor = mongoose.model("visitors", visitorSchema);

module.exports = Visitor;
