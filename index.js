const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user.route');
const errors = require('./utils/errorhandling');
require("dotenv").config({ path: "./config/.env" })

// Mongo DB Connections
require("./config/db")


// Middleware Connections
app.use(cors())
app.use(express.json())

// error handling
app.use(errors)

// Routes
app.use("/user", userRouter)

// Connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})

module.exports = app