import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-sm"
      >
        <div className="bg-white border border-line rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-ink text-paper px-6 py-4 flex items-center justify-between">
            <span className="font-display font-bold tracking-tight">JobBoard</span>
            <span className="font-mono text-[11px] tracking-widest opacity-70">GATE 404</span>
          </div>
          <div className="p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-coral mb-2">
              Flight cancelled
            </p>
            <p className="font-display font-bold text-3xl text-ink">404</p>
            <p className="text-ink/60 mt-2 text-sm">
              This page took off without us. Let's get you back on track.
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-block bg-ink text-paper px-6 py-3 rounded-md font-medium hover:bg-inksoft transition-colors"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
