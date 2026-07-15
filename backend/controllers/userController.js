const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "job-portal-resumes" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadResume = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can upload a resume" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resumeUrl: result.secure_url },
      { new: true }
    ).select("-password");

    res.json({ message: "Resume uploaded", resumeUrl: user.resumeUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadResume, getProfile };
