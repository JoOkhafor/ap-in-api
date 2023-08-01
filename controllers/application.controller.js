const ApplicationModel = require("../models/application.model");
const fs = require("fs");

const getApplications = async (req, res) => {
  const { jobId } = req.params;
  // const { length } = req.query;
  // console.log(length);
  try {
    const data = await ApplicationModel.find({ jobId });
    // if (!data.length)
    //   return res.status(404).send({ message: "No data found!" });
    // if (length) return res.status(200).send({ amount: data.length });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const ApplicationRegister = async (req, res) => {
  const {
    fullname,
    jobId,
    email,
    phone_number,
    location,
    profile,
    motivation,
  } = req.body;
  if (
    !fullname ||
    !email ||
    !phone_number ||
    !location ||
    !profile ||
    !motivation
  ) {
    return res.status(405).send({ message: "Please fill in all the boxes!" });
  }
  if (!req.file)
    return res.status(400).send({ message: "Please provide your CV file !" });
  try {
    const application = await ApplicationModel.findOne({ email });
    if (application) {
      fs.unlink(`uploads/docs/${req.file.filename}`, (err) => {
        if (err)  console.log(err);
      });
      return res.status(402).send({
        message: "Seems like someone with this email already applied !",
      });
    }
    const newApplication = new ApplicationModel({
      fullname,
      email,
      phone_number,
      location,
      profile,
      motivation,
      jobId,
      cv: req.file.filename,
    });
    const data = await newApplication.save();
    res.status(200).send({
      ...data._doc,
      message: "Your appication is registered successfully !",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const downloadFile = async (req, res) => {
  const { filename } = req.params;
  if (!filename) return res.status(400).send({ message: "Not Found!" });
  try {
    res
      .set({
        Headers: {
          "Content-Type": "application/pdf",
        },
      })
      .download(`uploads/docs/${filename}`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteOneApplication = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send({ message: "Not Found!" });
  try {
    const data = await ApplicationModel.findOneAndDelete({ _id: id });
    if (!data) return res.status(404).send({ message: "Not Found!" });
    fs.unlink(`uploads/docs/${data.cv}`, (err) => {
      if (err) throw err;
    });
    res.status(200).send({ message: "deleted success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getApplications,
  ApplicationRegister,
  downloadFile,
  deleteOneApplication,
};
