import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function formatSalary(min, max) {
  if (!min && !max) return "Not disclosed";
  if (min && max) return `\u20b9${min.toLocaleString("en-IN")} \u2013 \u20b9${max.toLocaleString("en-IN")}`;
  return `\u20b9${(min || max).toLocaleString("en-IN")}`;
}

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [notFound, setNotFound] = useState(false);

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
      setNotFound(true);
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
    try {
      await api.post("/applications", { jobId: id });
      setApplied(true);
      showToast("Application sent \u2014 you're on the list", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Couldn't apply. Try again.", "error");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-10 animate-pulse">
        <div className="bg-white border border-line rounded-xl overflow-hidden">
          <div className="h-14 bg-line/50"></div>
          <div className="p-6 space-y-3">
            <div className="h-3 bg-line/40 rounded w-24"></div>
            <div className="h-7 bg-line/50 rounded w-2/3"></div>
            <div className="h-4 bg-line/30 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="text-center py-20">
        <p className="font-display font-semibold text-ink text-lg">This job isn't on the board anymore</p>
        <p className="text-ink/50 text-sm mt-1">It may have closed or been removed.</p>
      </div>
    );
  }

  const code = `JOB-${job._id.slice(-6).toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto px-6 py-10"
    >
      <div className="relative bg-white border border-line rounded-xl shadow-sm overflow-hidden">
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

          {(!user || user.role === "student") && (
            <motion.button
              onClick={handleApply}
              disabled={applying || applied}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-6 bg-amber text-ink font-display font-semibold py-3 rounded-md hover:bg-amberdark hover:text-paper transition-colors disabled:opacity-60"
            >
              {applied ? "Application sent" : applying ? "Sending..." : "Apply for this role"}
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {applied && (
            <motion.div
              initial={{ opacity: 0, scale: 1.4, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -18 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="absolute top-16 right-6 border-4 border-okgreen text-okgreen font-display font-bold text-sm uppercase tracking-widest px-4 py-1.5 rounded pointer-events-none"
            >
              Applied
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
