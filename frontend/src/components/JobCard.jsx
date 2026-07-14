import { Link } from "react-router-dom";

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
    <Link
      to={`/jobs/${job._id}`}
      className="group flex bg-white rounded-lg border border-line shadow-sm hover:shadow-md transition-shadow overflow-hidden"
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
          <span className="text-line">|</span>
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
          <span className="text-line">|</span>
          <span>{job.experience || "Any experience"}</span>
        </div>
      </div>

      <div className="perforated my-4"></div>

      <div className="w-28 flex flex-col items-center justify-center gap-1 px-3 bg-paper">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
          Type
        </span>
        <span className="font-display font-bold text-ink text-sm">
          {typeLabels[job.jobType] || job.jobType}
        </span>
      </div>
    </Link>
  );
}
