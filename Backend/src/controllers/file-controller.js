const Data = require("../models/data-model");
const fs = require("fs");
const bcrypt = require("bcrypt");

module.exports.UploadFile = async (req, res) => {
  try {
    const { password, expiry } = req.body;
    const expiresAt = new Date(Date.now() + parseInt(expiry) * 1000);

    //Hash the password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const data = new Data({
      type: "file",
      filePath: req.file.path,
      originalName: req.file.originalname,
      expiresAt,
      password: hashedPassword,
      userId: req.user._id,
    });

    await data.save();
    res.status(201).json({
      link: `${req.protocol}://localhost:5173/download/${data._id}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.UploadLink = async (req, res) => {
  try {
    console.log("Received link upload request:", req.body);
    const { link, expiry, password } = req.body;
    const expiresAt = new Date(Date.now() + parseInt(expiry) * 1000);

    //Hash the password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const data = new Data({
      type: "link",
      link,
      expiresAt,
      password: hashedPassword,
      userId: req.user._id,
    });

    await data.save();
    res.status(201).json({
      link: `${req.protocol}://localhost:5173/download/${data._id}`,
    });
  } catch (error) {
    console.error("Error uploading link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.query; // ✅ FIXED
    console.log(id, password);

    const data = await Data.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: "Link not found or already deleted." });
    }

    if (data.password && password === undefined) {
      return res.status(201).json({
        isProtected: true,
        message: "This link is password protected.",
      });
    }

    if (data.password && password !== undefined) {
      const match = await bcrypt.compare(password, data.password);
      if (!match) return res.status(403).json({ message: "Wrong password" });
    }

    // Expiry check
    const expiryTime = new Date(
      data.createdAt.getTime() + data.expiresAt * 60000
    );
    const isExpired = Date.now() > expiryTime;

    if (isExpired) {
      if (data.type === "file" && data.filePath) {
        fs.unlink(data.filePath, (err) => {
          if (err) console.error("File delete failed:", err);
        });
      }
      await Data.findByIdAndDelete(id);
      return res
        .status(410)
        .json({ message: "This link has expired and is deleted." });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getFile = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Data.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: "Link not found or already deleted." });
    }

    // Expiry check
    const expiryTime = new Date(
      data.createdAt.getTime() + data.expiresAt * 60000
    );
    const isExpired = Date.now() > expiryTime;

    if (isExpired) {
      if (data.type === "file" && data.filePath) {
        fs.unlink(data.filePath, (err) => {
          if (err) console.error("File delete failed:", err);
        });
      }
      await Data.findByIdAndDelete(id);
      return res
        .status(410)
        .json({ message: "This link has expired and is deleted." });
    }

    // Increment download count
    data.downloadCount += 1;
    await data.save();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
