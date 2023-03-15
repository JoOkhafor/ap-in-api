const express = require("express");
const {
    getQuotes,
    getOneQuote,
    registerQuote,
    deleteOneQuote,
} = require("../controllers/quote.controller");
const router = express.Router();

router.get("/", getQuotes);
router.get("/get/:id", getOneQuote);
router.post("/register", registerQuote);
router.post("/delete/:id", deleteOneQuote);

module.exports = router