const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ApplicationModel = mongoose.model("application.model", applicationSchema);

module.exports = ApplicationModel;
