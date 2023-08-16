const { Router } = require("express");
const {
  registerUser,
  authUser,
  updateUser,
  removeUser,
  allUsers,
  updatePwd,
} = require("../controllers/user.controller");

const router = Router();

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/pass", updatePwd);
router.post("/update", updateUser);
router.post("/delete", removeUser);
router.post("/", allUsers);

module.exports = router;
