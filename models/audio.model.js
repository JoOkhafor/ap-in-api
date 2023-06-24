const { default: mongoose } = require("mongoose");

const audioFile = new mongoose.Schema(
  {
    srcUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "image",
    },
  },
  { timestamps: true }
);

const AudioFile = mongoose.model("audiofiles", audioFile);

module.exports = AudioFile;
