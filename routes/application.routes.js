const { Router } = require("express");
const {
  ApplicationRegister,
  getApplications,
} = require("../controllers/application.controller");

const router = Router();

router.post("/register", (req, res) => console.log(req));
router.get("/", getApplications);

module.exports = router;
