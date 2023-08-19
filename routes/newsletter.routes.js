const express = require("express")
const { register, getAllNewsletters, deleteEmail, deleteMany, updateEmail, exportToXls } = require("../controllers/newsletter.controller")

const router = express.Router()

router.get("/", getAllNewsletters)
router.post("/register", register)
router.get("/export", exportToXls)
router.post("/del", deleteMany)
router.post("/del/:id", deleteEmail)
router.post("/update/:id", updateEmail)

module.exports = router