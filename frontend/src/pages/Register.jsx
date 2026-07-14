import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { name, email, password, role };
      if (role === "company") payload.companyName = companyName;
      const { data } = await api.post("/auth/register", payload);
      login(data);
      navigate(data.role === "company" ? "/company-dashboard" : "/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amberdark">
            New ticket
          </span>
          <h1 className="font-display font-bold text-3xl text-ink mt-2">
            Create an account
          </h1>
        </div>

        <div className="flex bg-white border border-line rounded-md p-1 mb-4">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
              role === "student" ? "bg-ink text-paper" : "text-ink/60"
            }`}
          >
            I'm a student
          </button>
          <button
            type="button"
            onClick={() => setRole("company")}
            className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
              role === "company" ? "bg-ink text-paper" : "text-ink/60"
            }`}
          >
            I'm hiring
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-line rounded-lg p-6 shadow-sm space-y-4">
          {error && (
            <p className="text-sm text-coral bg-coral/10 rounded px-3 py-2">{error}</p>
          )}

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              {role === "company" ? "Your name" : "Full name"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
              placeholder={role === "company" ? "Priya Sharma" : "Kavy Jain"}
            />
          </div>

          {role === "company" && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
                Company name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
                placeholder="Tech Corp"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2 text-ink focus:outline-none focus:border-amber transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper py-2.5 rounded-md font-medium hover:bg-inksoft transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-ink/60 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amberdark font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
