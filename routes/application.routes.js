const { Router } = require("express");
const router = Router();
const { pdfUpload } = require("../uploads/multer");
const {
  getApplications,
  ApplicationRegister,
  downloadFile,
  deleteOneApplication,
  getNumbers,
} = require("../controllers/application.controller");

router.post("/register", pdfUpload.single("file"), ApplicationRegister);
router.get("/find/:jobId", getApplications);
router.get("/find/numbers/:jobId", getNumbers);
router.get("/file/:filename", downloadFile);
router.get("/delete/:id", deleteOneApplication);

module.exports = router; 
