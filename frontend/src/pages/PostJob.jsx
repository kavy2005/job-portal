import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "full-time",
    salaryMin: "",
    salaryMax: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
      };
      await api.post("/jobs", payload);
      navigate("/company-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't post the job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark">
        New listing
      </span>
      <h1 className="font-display font-bold text-3xl text-ink mt-2 mb-8">Post a job</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-lg p-6 shadow-sm space-y-4">
        {error && <p className="text-sm text-coral bg-coral/10 rounded px-3 py-2">{error}</p>}

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
            Job title
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={update("title")}
            className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
            placeholder="Backend Developer Intern"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
            Description
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={update("description")}
            className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
            placeholder="What will they work on?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={update("location")}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
              placeholder="Remote"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              Job type
            </label>
            <select
              value={form.jobType}
              onChange={update("jobType")}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              Min salary (₹)
            </label>
            <input
              type="number"
              value={form.salaryMin}
              onChange={update("salaryMin")}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
              placeholder="15000"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              Max salary (₹)
            </label>
            <input
              type="number"
              value={form.salaryMax}
              onChange={update("salaryMax")}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
              placeholder="25000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
            Experience
          </label>
          <input
            type="text"
            value={form.experience}
            onChange={update("experience")}
            className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
            placeholder="0-1 years"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-paper py-2.5 rounded-md font-medium hover:bg-inksoft transition-colors disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post job"}
        </button>
      </form>
    </div>
  );
}
