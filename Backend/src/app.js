require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const userRoutes = require("./routes/user-routes");
const fileRoutes = require("./routes/file-routes");

connectDB();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.get("/", (req, res) => {
  res.send("Hello, this is the backend of LinkShield!");
});

app.use("/api/user", userRoutes);
app.use("/api", fileRoutes);

module.exports = app;
