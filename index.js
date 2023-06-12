const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

// Routes importing
const userRouter = require("./routes/user.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const quotesRoutes = require("./routes/quote.routes");
const jobsRoutes = require("./routes/jobs.routes");
const applicationsRoutes = require("./routes/application.routes");
const visitsRoutes = require("./routes/visit.routes");

// Mongo DB Connections
require("./config/db");

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// error handling
require("./utils/errorhandling");

// Routes
app.use("/users", userRouter);
app.use("/newsletters", newsletterRoutes);
app.use("/quotes", quotesRoutes);
app.use("/jobs", jobsRoutes);
app.use("/applications", applicationsRoutes);
app.use("/visits", visitsRoutes);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});

module.exports = app;
