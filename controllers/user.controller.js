const userModel = require("../models/user.model");
const validator = require("validator");
const { userToken } = require("../utils/token");
const { encrypt, pwdCompare } = require("../utils/bcrypt");
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
    password = await encrypt(password);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
    });
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

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authToken = req.headers?.authorization?.split(" ")[1];
    
    if (email && password) {
      const loginUser = await userModel.findOne({ email }, {});
      if (!loginUser)
        return res.status(401).send({
          message: "Invalid email or password!",
        });
      if (!(await pwdCompare(password, loginUser.password)))
        return res.status(401).send({ message: "Invalid email or password!" });
      const loginToken = userToken(loginUser._id);
      return res.status(200).send({
        user: { ...loginUser._doc, password: null, _id: null },
        token: loginToken,
      });
    }

    if (authToken) {
      const { _id } = jwt.verify(authToken ?? authToken, SECRET_KEY);
      const authUser = await userModel.findOne(
        { _id },
        { _id: 0, password: 0 }
      );
      if (!authUser)
        return res.status(404).send({ message: "User not found!" });
      return res
        .status(200)
        .send({ user: authUser, token: authToken ?? authToken });
    }
    if (!email || !password)
      return res.status(401).send({ message: "All fields are required!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { registerUser, authUser };
