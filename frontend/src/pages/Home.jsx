import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-16 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-amberdark">
          Now boarding
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink mt-4 leading-tight">
          Your next role,
          <br />
          one application away.
        </h1>
        <p className="text-ink/60 mt-4 max-w-md mx-auto">
          Browse open roles, apply in a click, and track every application
          like a departure board - no spreadsheets required.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link
            to="/jobs"
            className="bg-ink text-paper px-6 py-3 rounded-md font-medium hover:bg-inksoft transition-colors"
          >
            Browse open jobs
          </Link>
          {!user && (
            <Link
              to="/register"
              className="border border-line px-6 py-3 rounded-md font-medium text-ink hover:border-ink transition-colors"
            >
              Create an account
            </Link>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="bg-white border border-line rounded-xl shadow-sm max-w-md mx-auto overflow-hidden">
          <div className="flex">
            <div className="flex-1 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
                Passenger
              </p>
              <p className="font-display font-semibold text-ink mt-1">You</p>

              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mt-4">
                Destination
              </p>
              <p className="font-display font-semibold text-ink mt-1">Backend Developer Intern</p>

              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mt-4">
                Status
              </p>
              <span className="inline-block mt-1 font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded bg-okgreen text-paper">
                shortlisted
              </span>
            </div>
            <div className="perforated my-4"></div>
            <div className="w-24 flex flex-col items-center justify-center gap-1 px-3 bg-paper">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Seat</span>
              <span className="font-display font-bold text-ink text-lg">01A</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
