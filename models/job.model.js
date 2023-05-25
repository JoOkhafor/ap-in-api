const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    activity: {
      type: Boolean,
      default: true
    },
    enterprise: {
      type: String,
    },
    worktime: {
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
    worktype: {
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
