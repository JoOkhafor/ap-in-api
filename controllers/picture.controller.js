const fs = require("fs");
const Picture = require("../models/picture.model");

const pictuteUploadMethod = async (req, res) => {
  if (!req.file)
    return res.status(400).send({ message: "Please provide a picture !" });

  try {
    const picture = await Picture.create({ srcUrl: req?.file?.filename });
    res.status(200).send(picture);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const pictureDownloadMethod = async (req, res) => {
  const { filename: srcUrl } = req.params;
  if (!srcUrl) {
    return res.status(404).send({ message: "Not Found!" });
  }
  try {
    const picture = await Picture.findOne({ srcUrl });
    res
      .set({
        Headers: {
          "Content-Type": "image/jpeg/png/gif",
        },
      })
      .download(`uploads/pictures/${picture?.srcUrl}`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const pictureDeleteMethod = async (req, res) => {
  const { filename: srcUrl } = req.params;
  let fileError
  if (!srcUrl) {
    return res.status(404).send({ message: "Not Found!" });
  }
  try {
    const picture = await Picture.findOneAndDelete({ srcUrl });
    fs.unlink(`uploads/pictures/${picture.srcUrl}`, (err) => {
      if(err) fileError = err?.message 
    });
    res.status(200).send({ message: fileError || "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  pictureDeleteMethod,
  pictureDownloadMethod,
  pictuteUploadMethod,
};
