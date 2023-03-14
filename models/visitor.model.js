const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        count: {
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
