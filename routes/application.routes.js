const { Router } = require("express");
const { upload } = require("../uploads/multer");
const {
  getApplications,
  ApplicationRegister,
} = require("../controllers/application.controller");

const router = Router();

router.post("/register", upload.single("file"), ApplicationRegister);
router.get("/", getApplications); 

module.exports = router;
