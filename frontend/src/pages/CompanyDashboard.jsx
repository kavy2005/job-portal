import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          className="bg-ink text-paper px-4 py-2 rounded-md font-medium hover:bg-inksoft transition-colors whitespace-nowrap"
        >
          + Post a job
        </Link>
      </div>

      {loading && <p className="text-ink/50 font-mono text-sm">Loading...</p>}
      {error && <p className="text-coral">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-16 border border-dashed border-line rounded-lg">
          <p className="font-display font-semibold text-ink text-lg">No jobs posted yet</p>
          <p className="text-ink/50 text-sm mt-1 mb-4">Post your first opening to start receiving applications.</p>
          <Link to="/post-job" className="text-amberdark font-medium hover:underline">
            Post a job
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {jobs.map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="flex items-center justify-between bg-white border border-line rounded-lg px-5 py-4 hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-display font-semibold text-ink">{job.title}</p>
              <p className="text-sm text-ink/50 mt-0.5">
                {job.location || "Remote"} · {job.jobType?.replace("-", " ")}
              </p>
            </div>
            <span className="font-mono text-xs text-ink/40">
              {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
