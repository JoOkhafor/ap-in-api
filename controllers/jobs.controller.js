const JobModel = require("../models/job.model");

/**
|--------------------------------------------------
| get one job
|--------------------------------------------------
*/
const getOneJob = async (req, res) => {
  const { _id } = req.params;
  try {
    const job = await JobModel.findOne(_id);
    if (!job) return res.status(404).send({ message: "Data not found!" });
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
|--------------------------------------------------
| get all jobs data
|--------------------------------------------------
*/
const getJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    if (jobs.length == 0) return res.status(404).send({ message: "Data not found!" });
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
|--------------------------------------------------
| add a job to publish
|--------------------------------------------------
*/
// const addNewJob = async () =>{
//       const data = req.body
      
// }


module.exports = { getOneJob, getJobs };
