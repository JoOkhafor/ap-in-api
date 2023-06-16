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
  if (!filename) {
    return res.status(400).send({ message: "Not Found!" });
  }
  try {
    const picture = await Picture.findOne({ srcUrl });
    res.status(200).send(picture);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
