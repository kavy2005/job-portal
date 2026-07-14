import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-ink tracking-tight">
            Job<span className="text-amberdark">Board</span>
          </span>
          <span className="font-mono text-[10px] text-ink/40 border border-line rounded px-1.5 py-0.5 tracking-widest hidden sm:inline">
            NO. 001
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-body text-sm">
          <Link to="/jobs" className="text-ink/70 hover:text-ink transition-colors">
            Browse jobs
          </Link>

          {!user && (
            <>
              <Link to="/login" className="text-ink/70 hover:text-ink transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-ink text-paper px-4 py-2 rounded-md font-medium hover:bg-inksoft transition-colors"
              >
                Sign up
              </Link>
            </>
          )}

          {user && user.role === "student" && (
            <Link to="/dashboard" className="text-ink/70 hover:text-ink transition-colors">
              My applications
            </Link>
          )}

          {user && user.role === "company" && (
            <>
              <Link to="/post-job" className="text-ink/70 hover:text-ink transition-colors">
                Post a job
              </Link>
              <Link to="/company-dashboard" className="text-ink/70 hover:text-ink transition-colors">
                My postings
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="font-mono text-xs uppercase tracking-wider text-coral hover:text-coral/70 transition-colors"
            >
              Log out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
