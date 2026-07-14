import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import { JobListSkeleton } from "../components/Skeletons";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, location, jobType]);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      if (location) params.location = location;
      if (jobType) params.jobType = jobType;
      const { data } = await api.get("/jobs", { params });
      setJobs(data.jobs);
    } catch (err) {
      setError("Couldn't load jobs. Check that your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark">
          Departures
        </span>
        <h1 className="font-display font-bold text-3xl text-ink mt-2">
          Open positions
        </h1>
        <p className="text-ink/60 mt-1">
          {loading ? "Checking the board..." : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} boarding now`}
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 min-w-[180px] border border-line rounded-md px-3 py-2 bg-white text-ink focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition-all"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location..."
          className="flex-1 min-w-[140px] border border-line rounded-md px-3 py-2 bg-white text-ink focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition-all"
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border border-line rounded-md px-3 py-2 bg-white text-ink focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition-all"
        >
          <option value="">All types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {loading && <JobListSkeleton count={4} />}

      {error && !loading && (
        <div className="text-center py-16 border border-dashed border-coral/30 rounded-lg">
          <p className="text-coral">{error}</p>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 border border-dashed border-line rounded-lg"
        >
          <svg className="w-12 h-12 mx-auto text-ink/20 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h4l2 5h8l2-5h4M5 8l1-4h12l1 4M12 12v.01" />
          </svg>
          <p className="font-display font-semibold text-ink text-lg">No jobs match yet</p>
          <p className="text-ink/50 text-sm mt-1">Try a different search or check back soon.</p>
        </motion.div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
