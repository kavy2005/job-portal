import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function formatSalary(min, max) {
  if (!min && !max) return "Not disclosed";
  if (min && max) return `\u20b9${min.toLocaleString("en-IN")} \u2013 \u20b9${max.toLocaleString("en-IN")}`;
  return `\u20b9${(min || max).toLocaleString("en-IN")}`;
}

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
    } catch (err) {
      setMessage("Couldn't load this job.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setApplying(true);
    setMessage("");
    try {
      await api.post("/applications", { jobId: id });
      setApplied(true);
      setMessage("Application sent. You're on the list.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Couldn't apply. Try again.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-ink/50 font-mono text-sm">Loading...</p>;
  }

  if (!job) {
    return <p className="text-center py-20 text-coral">{message || "Job not found."}</p>;
  }

  const code = `JOB-${job._id.slice(-6).toUpperCase()}`;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white border border-line rounded-xl shadow-sm overflow-hidden">
        <div className="bg-ink text-paper px-6 py-4 flex items-center justify-between">
          <span className="font-display font-bold tracking-tight">JobBoard</span>
          <span className="font-mono text-[11px] tracking-widest opacity-70">{code}</span>
        </div>

        <div className="p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark mb-2">
            {job.jobType?.replace("-", " ")}
          </p>
          <h1 className="font-display font-bold text-2xl text-ink">{job.title}</h1>
          <p className="text-ink/60 mt-1">
            {job.company?.companyName || job.company?.name || "Company"}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 py-4 border-y border-dashed border-line">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Location</p>
              <p className="font-display font-semibold text-ink text-sm mt-1">{job.location || "Remote"}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Salary</p>
              <p className="font-display font-semibold text-ink text-sm mt-1">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Experience</p>
              <p className="font-display font-semibold text-ink text-sm mt-1">{job.experience || "Any"}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-2">
              About the role
            </p>
            <p className="text-ink/80 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {message && (
            <p className={`mt-6 text-sm rounded px-3 py-2 ${applied ? "text-okgreen bg-okgreen/10" : "text-coral bg-coral/10"}`}>
              {message}
            </p>
          )}

          {(!user || user.role === "student") && (
            <button
              onClick={handleApply}
              disabled={applying || applied}
              className="w-full mt-6 bg-amber text-ink font-display font-semibold py-3 rounded-md hover:bg-amberdark hover:text-paper transition-colors disabled:opacity-50"
            >
              {applied ? "Application sent" : applying ? "Sending..." : "Apply for this role"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
