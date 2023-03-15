const { Router } = require("express");
const Auth = require("../auth/auth");
const {
    registerUser,
    loginUser,
    findUser,
    getUsers,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/find/:userId", findUser);
userRouter.get("/", getUsers);
userRouter.get("/auth", Auth);

module.exports = userRouter;
