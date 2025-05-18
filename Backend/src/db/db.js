require("dotenv").config();
const mongoose = require("mongoose");

// Connect Mongo
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));
}

module.exports = connectDB;
