const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can apply to jobs" });
    }

    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existing = await Application.findOne({ job: jobId, student: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      student: req.user.id,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can view their applications" });
    }
    const applications = await Application.find({ student: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can view applicants" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.company.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your job posting" });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate("student", "name email resumeUrl")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { applyToJob, getMyApplications, getApplicantsForJob };
