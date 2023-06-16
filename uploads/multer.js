const multer = require("multer");

//Configuration for Multer
const pdfFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/docs");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `resume-${req.body.fullname.split(' ')[0]}.${ext}`);
  },
});

// Multer Filter
const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

//Calling the "multer" Function
const pdfUpload = multer({
  storage: pdfFileStorage,
  fileFilter: pdfFileFilter,
})

//Configuration for Multer
const PictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/docs");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `resume-${req.body.fullname.split(' ')[0]}.${ext}`);
  },
});

// Multer Filter
const PictureFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === ("gif" || "webp" || "jpeg" || "jpg" || "png" || "svg" )  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a image File!!"), false);
  }
};

//Calling the "multer" Function
const pictureUpload = multer({
  storage: PictureStorage,
  fileFilter: PictureFilter,
})

module.exports = { pdfUpload, pictureUpload };