const { Router } = require("express");
const {
  incrementVisitorCount,
  getVisitorCount,
} = require("../controllers/visitor.controller");

const router = Router();

router.post("/visits", incrementVisitorCount);
router.get("/visits", getVisitorCount);

module.exports = router;
