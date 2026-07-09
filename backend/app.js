const express = require("express");
const app = express();
const TaskRoutes = require("./routes/taskroutes");
const UserRoutes = require("./routes/userroutes");
const cors = require("cors");
require("dotenv").config();

//cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());
app.use("/api/tasks", TaskRoutes);
app.use("/api/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("welcome to task manager backend");
});

app.use((err, req, res, next) => {
  if (err) {
    console.error("Error occurred:", err.stack);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  } else {
    next();
  }
});

module.exports = app;
