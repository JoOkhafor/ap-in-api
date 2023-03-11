const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user.route');
require("dotenv").config({ path: "./config/.env" })

// Mongo DB Connections
require("./config/db")


// Middleware Connections
app.use(cors({
    origin: "*"
}))
app.use(express.json())

// error handling
require('./utils/errorhandling')

// Routes
app.use("/users", userRouter)
app.get("/", (req, res) => {
    res.send({ message: "This is an Api server" }).status(200)
})

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})

module.exports = app