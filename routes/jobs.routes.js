const { Router } = require("express");
const {
  getOneJob,
  getJobs,
  addNewJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.controller");

const router = Router();

router.get("/", getJobs);
router.get("/find/:_id", getOneJob);
router.post("/new", addNewJob);
router.post("/update/:_id", updateJob);
router.get("/delete/:_id", deleteJob);

module.exports = router;
