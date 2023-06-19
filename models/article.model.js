const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    bannerImg: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true, default: "Anonymous" },
    details: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("articles", articleSchema);
