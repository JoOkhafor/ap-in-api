const fs = require("fs");
const AudioFile = require("../models/audio.model");

const audioFileUpload = async (req, res) => {
  if (!req.file)
    return res.status(400).send({ message: "Please provide a picture !" });

  try {
    const audio = await AudioFile.create({ srcUrl: req?.file?.filename });
    res.status(200).send(audio);
  } catch (error) {
    res.status(500).send({ message: error?.message });
  }
};

const audioFileStream = async (req, res) => {
  const { filename: srcUrl } = req.params;
  if (!srcUrl) {
    return res.status(404).send({ message: "Not Found!" });
  }
  try {
    const audio = await AudioFile.findOne({ srcUrl });
    const fileStream = fs.createReadStream(`uploads/audios/${audio?.srcUrl}`);

    fileStream.on("data", (buffer) => {
      res
        .set({
          Headers: {
            "Content-Type": "audio",
          },
        })
        .send(buffer);
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const audioDeletion = async (req, res) => {
  const { filename: srcUrl } = req.params;
  let fileError;
  if (!srcUrl) {
    return res.status(404).send({ message: "Not Found!" });
  }
  try {
    const audio = await AudioFile.findOneAndDelete({ srcUrl });
    fs.unlink(`uploads/audios/${audio?.srcUrl}`, (err) => {
      if (err) fileError = err?.message;
    });
    res.status(200).send({ message: fileError || "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  audioDeletion,
  audioFileStream,
  audioFileUpload,
};
