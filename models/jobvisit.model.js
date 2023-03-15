const mongoose = require("mongoose");

const jobvisitSchema = new mongoose.Schema(
    {
        jobId: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const JobvisitModel = mongoose.model("jobvisits", jobvisitSchema);

module.exports = JobvisitModel;