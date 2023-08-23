const { Router } = require("express");
const {
  getOneJob,
  getJobs,
  addNewJob,
  updateJob,
  deleteJob,
  getJob,
  getAvailableJobs,
} = require("../controllers/jobs.controller");

const router = Router();

router.get("/", getJobs);
router.get("/available", getAvailableJobs);
router.get("/find/:title", getOneJob);
router.get("/findone/:title", getJob);
router.post("/new", addNewJob);
// router.post("/update/:_id", updateJob);
router.post("/delete/:_id", deleteJob);

module.exports = router;
