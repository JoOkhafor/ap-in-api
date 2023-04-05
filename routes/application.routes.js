const { Router } = require("express");
const {
  Register,
  getApplications,
} = require("../controllers/application.controller");

const router = Router();

router.post("/apply", Register);
router.get("/", getApplications);

module.exports = router;
