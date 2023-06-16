const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    publish_date: { type: Date, required: true, default: new Date() },
    author: { type: String, required: true },
    details: { type: String, required: true },
    views: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("articles", articleSchema)