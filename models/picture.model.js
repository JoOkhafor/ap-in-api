const { default: mongoose } = require("mongoose");

const PictureModel = new mongoose.Schema({
  srcUrl: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "image"
  }
});

const Picture = mongoose.model("pictures", PictureModel);

module.exports = Picture;
