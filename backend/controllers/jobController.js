const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can post jobs" });
    }

    const { title, description, location, jobType, salaryMin, salaryMax, experience } = req.body;

    const job = await Job.create({
      title,
      description,
      location,
      jobType,
      salaryMin,
      salaryMax,
      experience,
      company: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const { search, location, jobType, page = 1, limit = 10 } = req.query;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (jobType) {
      query.jobType = jobType;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const jobs = await Job.find(query)
      .populate("company", "name companyName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company", "name companyName");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can view their posted jobs" });
    }
    const jobs = await Job.find({ company: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createJob, getJobs, getJobById, getMyJobs };
