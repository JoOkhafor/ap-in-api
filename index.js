const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

// Routes importing
const userRouter = require("./routes/user.route");
const visitRoutes = require("./routes/visitor.route");
const newsletterRoutes = require("./routes/newsletter.route");
const quotesRoutes = require("./routes/quote.route");

// Mongo DB Connections
require("./config/db");

// Middleware Connections
app.use(cors());
app.use(express.json());

// error handling
require("./utils/errorhandling");

// Routes
app.use("/users", userRouter);
app.use("/visits", visitRoutes);
app.use("/newsletters", newsletterRoutes);
app.use("/quotes", quotesRoutes);

// Connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("App running in port: " + PORT);
});

module.exports = app;
