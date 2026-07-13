const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String },
    jobType: { type: String, enum: ["full-time", "part-time", "internship", "remote"], default: "full-time" },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    experience: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
