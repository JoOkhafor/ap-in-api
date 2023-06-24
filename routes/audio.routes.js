const { Router } = require("express");
const {
  audioFileUpload,
  audioFileStream,
  audioDeletion,
} = require("../controllers/audio.controller");
const { audioUpload } = require("../uploads/multer");

const router = Router();

router.post("/upload", audioUpload, audioFileUpload);
router.get("/:filename", audioFileStream);
router.post("/delete/:filename", audioDeletion);

module.exports = router;
