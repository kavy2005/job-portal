const express = require("express");
const { uploadResume, getProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/me", protect, getProfile);
router.post("/upload-resume", protect, upload.single("resume"), uploadResume);

module.exports = router;
