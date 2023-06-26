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
    var fileStream;
    const music = "uploads/audios/" + audio?.srcUrl;
    var stat = fs.statSync(music);
    range = req.headers.range;
    if (range !== undefined) {
      // remove 'bytes=' and split the string by '-'
      var parts = range.replace(/bytes=/, "").split("-");

      var partial_start = parts[0];
      var partial_end = parts[1];

      if (
        (isNaN(partial_start) && partial_start.length > 1) ||
        (isNaN(partial_end) && partial_end.length > 1)
      ) {
        return res.sendStatus(500);
      }
      // convert string to integer (start)
      var start = parseInt(partial_start, 10);
      // convert string to integer (end)
      // if partial_end doesn't exist, end equals whole file size - 1
      var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
      // content length
      var content_length = end - start + 1;

      res.status(206).header({
        "Content-Type": "audio/mpeg",
        "Content-Length": content_length,
        "Content-Range": "bytes " + start + "-" + end + "/" + stat.size,
      });

      // Read the stream of starting & ending part
      fileStream = fs.createReadStream(music, { start: start, end: end });
    } else {
      res.header({
        "Content-Type": "audio/mpeg",
        "Content-Length": stat.size,
      });
      fileStream = fs.createReadStream(music);
    }
    fileStream.pipe(res);
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
