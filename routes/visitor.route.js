const { Router } = require("express");
const {
    getVisitorsNumber,
    incrementVisitorCount,
    getAll,
} = require("../controllers/visitor.controller");

const router = Router();

router.get("/", getAll);
router.get("/:category", getVisitorsNumber);
router.get("/increment/:category", incrementVisitorCount);

module.exports = router;
