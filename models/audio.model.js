const { default: mongoose } = require("mongoose");

const audioFile = new mongoose.Schema(
  {
    srcUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "audio",
    },
  },
  { timestamps: true }
);

const AudioFile = mongoose.model("audios", audioFile);

module.exports = AudioFile;
