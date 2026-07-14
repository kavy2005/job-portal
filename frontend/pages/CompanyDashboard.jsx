import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get("/jobs/my-jobs");
      setJobs(data);
    } catch (err) {
      setError("Couldn't load your postings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark">
            Control tower
          </span>
          <h1 className="font-display font-bold text-3xl text-ink mt-2">My postings</h1>
        </div>
        <Link
          to="/post-job"
          className="bg-ink text-paper px-4 py-2 rounded-md font-medium hover:bg-inksoft active:scale-95 transition-all whitespace-nowrap"
        >
          + Post a job
        </Link>
      </div>

      {error && <p className="text-coral">{error}</p>}

      {loading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-line rounded-lg px-5 py-4 animate-pulse">
              <div className="space-y-2">
                <div className="h-4 bg-line/60 rounded w-40"></div>
                <div className="h-3 bg-line/40 rounded w-28"></div>
              </div>
              <div className="h-3 bg-line/40 rounded w-12"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 border border-dashed border-line rounded-lg"
        >
          <svg className="w-12 h-12 mx-auto text-ink/20 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0l-1.5-9M5 21l1.5-9m0 0h11" />
          </svg>
          <p className="font-display font-semibold text-ink text-lg">No jobs posted yet</p>
          <p className="text-ink/50 text-sm mt-1 mb-4">Post your first opening to start receiving applications.</p>
          <Link to="/post-job" className="text-amberdark font-medium hover:underline">
            Post a job
          </Link>
        </motion.div>
      )}

      <div className="space-y-3">
        {!loading && jobs.map((job, i) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/jobs/${job._id}`}
              className="flex items-center justify-between bg-white border border-line rounded-lg px-5 py-4 hover:shadow-md hover:border-amber/50 transition-all"
            >
              <div>
                <p className="font-display font-semibold text-ink">{job.title}</p>
                <p className="text-sm text-ink/50 mt-0.5">
                  {job.location || "Remote"} \u00b7 {job.jobType?.replace("-", " ")}
                </p>
              </div>
              <span className="font-mono text-xs text-ink/40">
                {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
