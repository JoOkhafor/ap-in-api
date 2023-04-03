const { Router } = require("express");
const {
  getApplications,
  Register,
} = require("../controllers/application.controller");

const router = Router();

router.post("/register", Register);
router.get("/", getApplications);

module.exports = router;
