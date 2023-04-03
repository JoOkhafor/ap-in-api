const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

// Routes importing
const userRouter = require("./routes/user.routes");
const visitRoutes = require("./routes/visitor.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const quotesRoutes = require("./routes/quote.routes");
const jobsRoutes = require("./routes/jobs.routes");
const applicationsRoutes = require("./routes/application.routes")

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
app.use("/jobs", jobsRoutes);
app.use("/applications", applicationsRoutes)

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});

module.exports = app;
