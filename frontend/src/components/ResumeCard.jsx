import { useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function ResumeCard() {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("File too large \u2014 max 5MB", "error");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true);
    try {
      const { data } = await api.post("/users/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      login({ ...user, resumeUrl: data.resumeUrl });
      showToast("Resume uploaded and attached to your profile", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Upload failed. Try again.", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const hasResume = Boolean(user?.resumeUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex bg-white rounded-lg border border-line shadow-sm overflow-hidden mb-6"
    >
      <div className="flex-1 p-5 flex items-center gap-4">
        <div className={`w-11 h-11 rounded-md flex items-center justify-center shrink-0 ${hasResume ? "bg-okgreen/10" : "bg-line/30"}`}>
          <svg className={`w-5 h-5 ${hasResume ? "text-okgreen" : "text-ink/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h1M5 21V5a2 2 0 012-2h6l6 6v12a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
            Document on file
          </p>
          <p className="font-display font-semibold text-ink">
            {hasResume ? "Resume attached" : "No resume uploaded yet"}
          </p>
          {hasResume && (
            <a
              href={user.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amberdark hover:underline"
            >
              View current resume
            </a>
          )}
        </div>
      </div>

      <div className="hidden sm:block perforated my-4"></div>

      <div className="flex items-center justify-center px-5 bg-paper">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-md border border-line cursor-pointer transition-colors whitespace-nowrap ${
            uploading ? "opacity-50 pointer-events-none" : "hover:border-amber hover:text-amberdark"
          }`}
        >
          {uploading ? "Uploading..." : hasResume ? "Replace" : "Upload PDF"}
        </label>
      </div>
    </motion.div>
  );
}
