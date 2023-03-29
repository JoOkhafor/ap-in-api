const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    lowParagraph: {
      type: String,
    },
    activity: {
      type: Boolean,
    },
    enterprise: {
      type: String,
    },
    time: {
      type: String,
    },
    validity: {
      type: String,
    },
    level: {
      type: String,
    },
    category: {
      type: String,
    },
    workplace: {
      type: String,
    },
    location: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobModel = mongoose.model("jobs", jobSchema);

module.exports = JobModel;
