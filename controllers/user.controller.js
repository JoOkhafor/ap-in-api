const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { createToken } = require("../utils/token");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user)
      return res
        .status(404)
        .json({ message: "User with the given email already exit!" });

    if (!email || !password)
      return res.status(404).json({ message: "All fields are required..." });

    if (!validator.isEmail(email))
      return res.status(404).json({ message: "Email format is wrong..." });
    if (
      !validator.isStrongPassword(password, {
        minSymbols: 0,
        minLength: 5,
        minUppercase: 0,
        minNumbers: 1,
      })
    )
      return res
        .status(404)
        .json({ message: "Password must be strong password..." });

    user = new userModel({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save();

    let token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ message: "All fields are required..." });
  try {
    let user = await userModel.findOne({ email });

    if (!user || !user.email)
      return res.status(404).json({ message: "Invalid email or password" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!email || !password)
      return res.status(404).json({ message: "All fields are required..." });
    if (!validator.isEmail(email))
      return res.status(404).json({ message: "Email format is wrong..." });
    if (!isValidPassword)
      return res.status(404).json({ message: "Invalid email or password" });

    let token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
