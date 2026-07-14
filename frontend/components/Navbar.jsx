import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const linkClass = "text-ink/70 hover:text-ink transition-colors";

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-display font-bold text-xl text-ink tracking-tight">
            Job<span className="text-amberdark">Board</span>
          </span>
          <span className="font-mono text-[10px] text-ink/40 border border-line rounded px-1.5 py-0.5 tracking-widest hidden sm:inline">
            NO. 001
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-body text-sm">
          <Link to="/jobs" className={linkClass}>Browse jobs</Link>

          {!user && (
            <>
              <Link to="/login" className={linkClass}>Log in</Link>
              <Link
                to="/register"
                className="bg-ink text-paper px-4 py-2 rounded-md font-medium hover:bg-inksoft active:scale-95 transition-all"
              >
                Sign up
              </Link>
            </>
          )}

          {user && user.role === "student" && (
            <Link to="/dashboard" className={linkClass}>My applications</Link>
          )}

          {user && user.role === "company" && (
            <>
              <Link to="/post-job" className={linkClass}>Post a job</Link>
              <Link to="/company-dashboard" className={linkClass}>My postings</Link>
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

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="w-6 h-0.5 bg-ink block" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="w-6 h-0.5 bg-ink block" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="w-6 h-0.5 bg-ink block" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-line bg-white"
          >
            <div className="flex flex-col px-6 py-4 gap-4 font-body text-sm">
              <Link to="/jobs" className={linkClass} onClick={() => setOpen(false)}>Browse jobs</Link>

              {!user && (
                <>
                  <Link to="/login" className={linkClass} onClick={() => setOpen(false)}>Log in</Link>
                  <Link to="/register" className={linkClass} onClick={() => setOpen(false)}>Sign up</Link>
                </>
              )}

              {user && user.role === "student" && (
                <Link to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>My applications</Link>
              )}

              {user && user.role === "company" && (
                <>
                  <Link to="/post-job" className={linkClass} onClick={() => setOpen(false)}>Post a job</Link>
                  <Link to="/company-dashboard" className={linkClass} onClick={() => setOpen(false)}>My postings</Link>
                </>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="font-mono text-xs uppercase tracking-wider text-coral text-left"
                >
                  Log out
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
