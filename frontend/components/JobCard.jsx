import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const typeLabels = {
  "full-time": "FT",
  "part-time": "PT",
  internship: "INTERN",
  remote: "REMOTE",
};

function formatSalary(min, max) {
  if (!min && !max) return "Not disclosed";
  if (min && max) return `\u20b9${min / 1000}k \u2013 \u20b9${max / 1000}k`;
  return `\u20b9${(min || max) / 1000}k`;
}

export default function JobCard({ job }) {
  const code = `JOB-${job._id.slice(-6).toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/jobs/${job._id}`}
        className="group flex flex-col sm:flex-row bg-white rounded-lg border border-line shadow-sm hover:shadow-lg hover:border-amber/50 transition-all overflow-hidden"
      >
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-ink group-hover:text-amberdark transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-ink/60 mt-0.5">
                {job.company?.companyName || job.company?.name || "Company"}
              </p>
            </div>
            <span className="font-mono text-[10px] text-ink/40 whitespace-nowrap pt-1">
              {code}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-ink/70">
            <span>{job.location || "Location TBD"}</span>
            <span className="text-line hidden sm:inline">|</span>
            <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
            <span className="text-line hidden sm:inline">|</span>
            <span>{job.experience || "Any experience"}</span>
          </div>
        </div>

        <div className="hidden sm:block perforated my-4"></div>
        <div className="sm:hidden h-px mx-5 bg-line" style={{ backgroundImage: "repeating-linear-gradient(to right, #D9D4C7 0, #D9D4C7 6px, transparent 6px, transparent 14px)" }}></div>

        <div className="flex sm:flex-col items-center justify-center gap-1 sm:gap-1 px-5 sm:px-3 py-2 sm:py-0 sm:w-28 bg-paper group-hover:bg-amber/10 transition-colors">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
            Type
          </span>
          <span className="font-display font-bold text-ink text-sm">
            {typeLabels[job.jobType] || job.jobType}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
