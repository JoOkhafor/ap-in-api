const userModel = require("../models/user.model");
const validator = require("validator");
const { userToken } = require("../utils/token");
const { encrypt, pwdCompare } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");

// 
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Register a new user
const registerUser = async (req, res) => {
  let { fullName, email, password, address, country, phone_number, profile } =
    req.body;
  if (!email || !password)
    return res
      .status(404)
      .json({ message: "Password and email fields are required..." });
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
        minUppercase: 1,
        minNumbers: 1,
      })
    ) {
      return res
        .status(404)
        .json({ message: "Password must be strong password..." });
    }
    password = await encrypt(password);
    const newUser = new userModel({
      fullName,
      email,
      password,
      address,
      country,
      phone_number,
      profile,
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

// authenticate a user
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

const updateUser = async (req, res) => {
  const { fullName, email, address, country, phone_number, profile } = req.body;

  const authToken = req.headers?.authorization?.split(" ")[1];
  try {
    if (authToken) {
      const { _id } = jwt.verify(authToken ?? authToken, SECRET_KEY);
      const { email } = await userModel.findOne(
        { _id },
        { _id: 0, password: 0 }
      );
      const userUpdated = await userModel.updateOne(
        { email },
        {
          fullName,
          address,
          country,
          phone_number,
          profile,
        }
      );
      res.status(200).send({ user: userUpdated.modifiedCount });
    }
  } catch (error) {
    res.status(401).send({ message: error?.message });
  }
};

const updatePwd = async (req, res) => {
  const { old_pass, new_pass } = req.body;

  if (!old_pass || !new_pass) {
    return res.status(401).send({ message: "All fileds required!" });
  }

  const authToken = req.headers?.authorization?.split(" ")[1];
  try {
    if (authToken) {
      const { _id } = jwt.verify(authToken ?? authToken, SECRET_KEY);
      const { password } = await userModel.findOne({ _id }, { _id: 0 });

      if (old_pass || new_pass) {
        if (!(await pwdCompare(old_pass, password)))
          return res.status(401).send({ message: "Invalid password!" });
        if (
          !validator.isStrongPassword(new_pass, {
            minSymbols: 0,
            minLength: 5,
            minUppercase: 1,
            minNumbers: 1,
          })
        ) {
          return res
            .status(404)
            .json({ message: "Password must be strong password..." });
        }
        const new_password = await encrypt(new_pass);
        const user = await userModel.updateOne(
          { _id },
          { password: new_password }
        );
        res.status(200).send({ user });
      } else {
        return res.status(401).send({ message: "All fileds required!" });
      }
    }
  } catch (error) {
    res.status(401).send({ message: error?.message });
  }
};

const removeUser = async (req, res) => {
  const { email } = req.body;
  try {
    await userModel.deleteOne({ email });
    res.status(200).send({ message: "Deleted successfully !" });
  } catch (error) {
    res.status(error?.status).send({ message: error?.message });
  }
};

const allUsers = async (req, res) => {
  const authToken = req.headers?.authorization?.split(" ")[1];

  try {
    if (authToken) {
      const { _id } = jwt.verify(authToken ?? authToken, SECRET_KEY);
      const authUser = await userModel.findOne(
        { _id },
        { _id: 0, password: 0 }
      );
      if (!authUser?.role === "ADMIN")
        return res.status(402).send({ message: "Unauthorized!" });

      const users = await userModel.find({ _id: { $ne: _id } }, { _id: 0 });
      return res.status(200).send({ users });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  registerUser,
  authUser,
  updateUser,
  removeUser,
  updatePwd,
  allUsers,
};
