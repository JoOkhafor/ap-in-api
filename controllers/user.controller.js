const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { createToken, userToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

//
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Register a new user
const registerUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  if (!email || !password)
    return res.status(404).json({ message: "All fields are required..." });
  try {
    let oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res
        .status(404)
        .json({ message: "User with the given email already exit!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(404).json({ message: "Email format is wrong..." });
    }
    if (
      !validator.isStrongPassword(password, {
        minSymbols: 0,
        minLength: 5,
        minUppercase: 0,
        minNumbers: 1,
      })
    ) {
      return res
        .status(404)
        .json({ message: "Password must be strong password..." });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
    });
    console.log({ newUser });
    await newUser.save();
    const user = await userModel.findOne({ email }, { _id: 0, password: 0 });
    const token = userToken(newUser._id);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const authUser = (req, res) => {
  const { email, password } = req.body;
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  console.log(token)
  try {
    if (!token === undefined || !token === null) {
      const decode = jwt.verify(token, SECRET_KEY);
    }
  } catch (error) {
    return res.status(500).send({ message: `${error.message}` });
  }
};

module.exports = { registerUser, authUser };
