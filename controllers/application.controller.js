const ApplicationModel = require("../models/application.model");

async function Register(req, res) {
  const body = req.body;
  res.send({ body });
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
