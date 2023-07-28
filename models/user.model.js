const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    profile: {
      srcUrl: String,
    },
    country: String,
    address: String,
    phone_number: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    role: {
      type: String,
      required: true,
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", user);

module.exports = userModel;
