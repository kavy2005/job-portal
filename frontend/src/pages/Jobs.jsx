import { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";

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
      <div className="mb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark">
          Departures
        </span>
        <h1 className="font-display font-bold text-3xl text-ink mt-2">
          Open positions
        </h1>
        <p className="text-ink/60 mt-1">{jobs.length} job{jobs.length !== 1 ? "s" : ""} boarding now</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 min-w-[180px] border border-line rounded-md px-3 py-2 bg-white text-ink focus:outline-none focus:border-amber transition-colors"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location..."
          className="flex-1 min-w-[140px] border border-line rounded-md px-3 py-2 bg-white text-ink focus:outline-none focus:border-amber transition-colors"
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border border-line rounded-md px-3 py-2 bg-white text-ink focus:outline-none focus:border-amber transition-colors"
        >
          <option value="">All types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {loading && <p className="text-ink/50 font-mono text-sm">Loading jobs...</p>}

      {error && <p className="text-coral">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center py-16 border border-dashed border-line rounded-lg">
          <p className="font-display font-semibold text-ink text-lg">No jobs match yet</p>
          <p className="text-ink/50 text-sm mt-1">Try a different search or check back soon.</p>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
