const { Router } = require("express");
const { registerUser, loginUser, findUser, getUsers } = require("../controllers/user.controller");

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/find", findUser)
userRouter.get("/all", getUsers)

module.exports = userRouter