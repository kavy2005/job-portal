const express = require("express");
const { applyToJob, getMyApplications, getApplicantsForJob } = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, applyToJob);
router.get("/my-applications", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicantsForJob);

module.exports = router;
