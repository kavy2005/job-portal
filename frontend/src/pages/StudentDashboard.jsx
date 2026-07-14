import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import StatusBadge from "../components/StatusBadge";

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

      {loading && <p className="text-ink/50 font-mono text-sm">Loading...</p>}
      {error && <p className="text-coral">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-16 border border-dashed border-line rounded-lg">
          <p className="font-display font-semibold text-ink text-lg">No applications yet</p>
          <p className="text-ink/50 text-sm mt-1 mb-4">Once you apply, it'll show up here.</p>
          <Link to="/jobs" className="text-amberdark font-medium hover:underline">
            Browse open jobs
          </Link>
        </div>
      )}

      {applications.length > 0 && (
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_120px] gap-4 px-5 py-3 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest">
            <span>Role</span>
            <span>Applied</span>
            <span>Status</span>
          </div>
          {applications.map((app) => (
            <div
              key={app._id}
              className="grid grid-cols-[1fr_140px_120px] gap-4 px-5 py-4 items-center border-t border-line"
            >
              <div>
                <Link to={`/jobs/${app.job?._id}`} className="font-display font-semibold text-ink hover:text-amberdark transition-colors">
                  {app.job?.title || "Job no longer available"}
                </Link>
                <p className="text-xs text-ink/50 mt-0.5">
                  {app.job?.company?.companyName || app.job?.company?.name}
                </p>
              </div>
              <span className="font-mono text-xs text-ink/60">
                {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
              </span>
              <StatusBadge status={app.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
