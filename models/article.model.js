const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    bannerImg: { type: String },
    audiofile: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    author: { type: Object, required: true },
    details: { type: String },
    views: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("articles", articleSchema);
