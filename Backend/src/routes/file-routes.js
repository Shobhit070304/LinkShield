const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");
const {
  UploadFile,
  UploadLink,
  getResource,
  getFile,
} = require("../controllers/file-controller");
const { userAuth } = require("../middlewares/userMiddleware");

// Multer Setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 📁 Upload File
router.post("/upload/file", userAuth, upload.single("file"), UploadFile);

// 🔗 Upload Link
router.post("/upload/link", userAuth, UploadLink);

router.get("/resource/:id", userAuth, getResource);
router.get("/file/:id", userAuth, getFile);

module.exports = router;
