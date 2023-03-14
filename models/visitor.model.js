const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        day: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Visitor = mongoose.model("visitors", visitorSchema);

module.exports = Visitor;
