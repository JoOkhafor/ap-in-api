const { Router } = require("express");
const { pictureUpload } = require("../uploads/multer");
const {
  pictuteUploadMethod,
  pictureDownloadMethod,
  pictureDeleteMethod,
} = require("../controllers/picture.controller");

const router = Router();

router.post("/upload", pictureUpload.single("file"), pictuteUploadMethod);
router.get("/:filename", pictureDownloadMethod);
router.get("/delete/:filename", pictureDeleteMethod);

module.exports = router;