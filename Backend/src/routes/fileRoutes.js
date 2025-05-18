const express = require("express");
const router = express.Router();
const multer = require("multer");
const Data = require("../models/data-model");
const { v4: uuid } = require("uuid");
const path = require("path");

// Multer Setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 📁 Upload File
router.post("/upload/file", upload.single("file"), async (req, res) => {
  try {
    const { expiry } = req.body;
    const expiresAt = new Date(Date.now() + parseInt(expiry) * 1000);

    const data = new Data({
      type: "file",
      filePath: req.file.path,
      originalName: req.file.originalname,
      expiresAt,
    });

    await data.save();
    res
      .status(201)
      .json({
        link: `${req.protocol}://localhost:5173/download/${data._id}`,
      });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔗 Upload Link
router.post("/upload/link", async (req, res) => {
  try {
    console.log("Received link upload request:", req.body);
    const { link, expiry } = req.body;
    const expiresAt = new Date(Date.now() + parseInt(expiry) * 1000);

    const data = new Data({
      type: "link",
      link,
      expiresAt,
    });

    await data.save();
    res
      .status(201)
      .json({
        link: `${req.protocol}://localhost:5173/download/${data._id}`,
      });
  } catch (error) {
    console.error("Error uploading link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/resource/:id", async (req, res) => {
  try {
   
    const data = await Data.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });

    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "Error or Not found" });
  }
});

module.exports = router;
