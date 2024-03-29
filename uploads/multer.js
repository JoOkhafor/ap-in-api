const multer = require("multer");
const { now } = require("../utils/date");

// ************************

//Configuration for Multer for pdf file
const pdfFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/docs");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `resume-${req.body.fullname.split(" ")[0]}.${ext}`);
  },
});

// Multer Filter for pdf file
const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

//Calling the "multer" Function for pdf file
const pdfUpload = multer({
  storage: pdfFileStorage,
  fileFilter: pdfFileFilter,
});

// ************************

//Configuration for Multer for picture
const PictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pictures");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `pic${now()}.${ext}`);
  },
});

// Multer Filter for picture
const PictureFilter = (req, file, cb) => {
  const filetype = file.mimetype.split("/")[1];
  if (
    filetype === "gif" ||
    filetype === "webp" ||
    filetype === "jpeg" ||
    filetype === "jpg" ||
    filetype === "png" ||
    filetype === "svg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a image File!!"), false);
  }
};

//Calling the "multer" Function for picture
const pictureUpload = multer({
  storage: PictureStorage,
  fileFilter: PictureFilter,
});

// ************************

//Configuration for Multer for audio file
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audios");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `audio-${now()}.${ext}`);
  },
});

// calling multer function function for audio files
const audioUpload = multer({
  storage: audioStorage,
});

// ************************

module.exports = { pdfUpload, pictureUpload, audioUpload };
