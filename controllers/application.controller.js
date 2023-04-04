const ApplicationModel = require("../models/application.model");

async function Register(req, res) {
  console.log(req)
  const { fullname, email, phone_number, location, profile, motivation } =
    req.body;
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
    if (application)
      return res.status(402).send({
        message: "Seems like someone with this email already applied !",
      });
    const newApplication = new ApplicationModel({
      fullname,
      email,
      phone_number,
      location,
      profile,
      motivation,
      cv: req.file.filename,
    });
    const data = await newApplication.save();
    // upload.single("file");
    res.status(200).send({
      ...data,
      message: "Your appication is registered successfully !",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getApplications = async (req, res) => {
  try {
    const data = await ApplicationModel.find();
    if (!data.length)
      return res.status(404).send({ message: "No data found!" });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { Register, getApplications };

const ApplicationRegister = async (req, res) => {
  const { fullname, email, phone_number, location, profile, motivation } =
    req.body;
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
    if (application)
      return res.status(402).send({
        message: "Seems like someone with this email already applied !",
      });
    const newApplication = new ApplicationModel({
      fullname,
      email,
      phone_number,
      location,
      profile,
      motivation,
      cv: req.file.filename,
    });
    const data = await newApplication.save();
    // upload.single("file");
    res.status(200).send({
      ...data,
      message: "Your appication is registered successfully !",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
