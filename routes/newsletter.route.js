const express = require("express")
const { register, getAllNewsletters, deleteEmail, deleteMany, updateEmail } = require("../controllers/newsletter.controller")

const router = express.Router()

router.get("/", getAllNewsletters)
router.post("/register", register)
router.post("/del", deleteMany)
router.post("/del/:id", deleteEmail)
router.post("/update/:id", updateEmail)

module.exports = router