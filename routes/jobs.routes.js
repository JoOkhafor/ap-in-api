const { Router } = require("express");
const { getOneJob, getJobs } = require("../controllers/jobs.controller");

const router = Router();

router.get("/", getJobs);
router.get("/find/:id", getOneJob);

module.exports = router;
