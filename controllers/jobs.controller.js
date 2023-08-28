const JobModel = require("../models/job.model");

/**
|--------------------------------------------------
| get one job
|--------------------------------------------------
*/
const getOneJob = async (req, res) => {
  const { title } = req.params;
  if (!title) return res.status(401).send({ message: "Unauthorized!" });
  const token = req.headers?.authorization?.split(" ")[1];
  console.log({ logan: req.headers?.authorization });
  try {
    const job = await JobModel.findOne({ title });
    if (!job) return res.status(404).send({ message: "Data not found!" });
    await JobModel.updateOne({ _id: job?._id }, { views: job?.views + 1 });
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};
/**
|--------------------------------------------------
| get one job
|--------------------------------------------------
*/
const getJob = async (req, res) => {
  const { title } = req.params;
  if (!title) return res.status(401).send({ message: "Unauthorized!" });

  try {
    const job = await JobModel.findOne({ title });
    if (!job) return res.status(404).send({ message: "Data not found!" });

    res.status(200).send(job);
  } catch (error) {
    res.status(500).send(error?.message);
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
    
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

/**
 * available jobs
 */

const getAvailableJobs = async (req, res) => {
  try {
    const now = new Date();
    const data = await JobModel.find();
    let jobs = [];
    data.forEach((e, i) => {
      if (new Date(e.validity)?.getTime() > now.getTime()) {
        jobs = [...jobs, e];
      }
    });
    if (jobs.length == 0)
      return res.status(404).send({ message: "No Jobs available!" });
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

/**
|--------------------------------------------------
| add a new job to publish
|--------------------------------------------------
*/
const addNewJob = async (req, res) => {
  const { title } = req.body;
  if (!title || title == "")
    return res.status(300).send({ message: "Title must be specified!" });
  try {
    const job = await JobModel.findOne({ title });
    if (job) return res.status(300).send({ message: "Job already exits!" });
    const newJob = new JobModel(req.body);
    await newJob.save();
    res.status(200).send({ message: "Job saved successfully!" });
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

/**
|--------------------------------------------------
| Update a registered job
|--------------------------------------------------
*/
const updateJob = async (req, res) => {
  const _id = req.params._id;
  if (!_id) return res.status(404).send({ message: "No Job specified!" });
  const data = req.body;
  if (!data) return res.status(302).send({ message: "No data specified!" });
  try {
    const selectedJob = await JobModel.findOne({ _id });
    if (!selectedJob)
      return res.status(404).send({ message: "Job specified does not exits!" });
    const update = new JobModel({ ...data });
    const answer = await update.save();
    if (!answer)
      return res.status(500).send({ message: "Something went wrong..." });
    res.status(201).send({ message: "Job updated successfully!" });
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

/**
|--------------------------------------------------
| delete a job 
|--------------------------------------------------
*/
const deleteJob = async (req, res) => {
  const { _id } = req.params;
  if (!_id) return res.status(302).send({ message: "No job specified" });
  try {
    const job = await JobModel.findOne({ _id });
    if (!job)
      return res.status(404).send({ message: "Job specified not found!" });
    const deletedJob = await JobModel.deleteOne({ _id });
    if (!deletedJob)
      return res.status(500).send({ message: "Something went wrong!" });
    res.status(200).send({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

module.exports = {
  getOneJob,
  getJobs,
  getJob,
  addNewJob,
  updateJob,
  deleteJob,
  getAvailableJobs
};
