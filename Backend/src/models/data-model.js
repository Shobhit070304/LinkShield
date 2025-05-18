const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  type: { type: String, enum: ["file", "link"], required: true },
  filePath: String,
  originalName: String,
  link: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

dataSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Data", dataSchema);
