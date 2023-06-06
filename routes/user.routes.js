const { Router } = require("express");
const { registerUser, authUser } = require("../controllers/user.controller");

const router = Router();

router.post("/register", registerUser);
router.post("/auth", authUser);

module.exports = router;
