const { Router } = require("express");
const {
  incrementVisitorCount,
  getVisitorCount,
} = require("../controllers/visitor.controller");

const router = Router();

router.get("/", incrementVisitorCount);
router.get("/get", getVisitorCount);

module.exports = router;
