const styles = {
  applied: "bg-ink text-paper",
  shortlisted: "bg-okgreen text-paper",
  rejected: "bg-coral text-paper",
};

const labels = {
  applied: "applied",
  shortlisted: "shortlisted",
  rejected: "rejected",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded ${styles[status] || styles.applied}`}
    >
      {labels[status] || status}
    </span>
  );
}
