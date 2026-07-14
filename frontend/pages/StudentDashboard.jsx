import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import StatusBadge from "../components/StatusBadge";
import { RowSkeleton } from "../components/Skeletons";

export default function StudentDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/applications/my-applications");
      setApplications(data);
    } catch (err) {
      setError("Couldn't load your applications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark">
        Departure board
      </span>
      <h1 className="font-display font-bold text-3xl text-ink mt-2 mb-8">My applications</h1>

      {error && <p className="text-coral">{error}</p>}

      {(loading || applications.length > 0) && (
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_140px_120px] gap-4 px-5 py-3 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest">
            <span>Role</span>
            <span className="hidden sm:inline">Applied</span>
            <span>Status</span>
          </div>
          {loading && (
            <>
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </>
          )}
          {!loading && applications.map((app, i) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_140px_120px] gap-4 px-5 py-4 items-center border-t border-line"
            >
              <div>
                <Link to={`/jobs/${app.job?._id}`} className="font-display font-semibold text-ink hover:text-amberdark transition-colors">
                  {app.job?.title || "Job no longer available"}
                </Link>
                <p className="text-xs text-ink/50 mt-0.5">
                  {app.job?.company?.companyName || app.job?.company?.name}
                </p>
              </div>
              <span className="hidden sm:inline font-mono text-xs text-ink/60">
                {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
              </span>
              <StatusBadge status={app.status} />
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 border border-dashed border-line rounded-lg"
        >
          <svg className="w-12 h-12 mx-auto text-ink/20 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M5 21V5a2 2 0 012-2h6l6 6v12a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
          </svg>
          <p className="font-display font-semibold text-ink text-lg">No applications yet</p>
          <p className="text-ink/50 text-sm mt-1 mb-4">Once you apply, it'll show up here.</p>
          <Link to="/jobs" className="text-amberdark font-medium hover:underline">
            Browse open jobs
          </Link>
        </motion.div>
      )}
    </div>
  );
}
