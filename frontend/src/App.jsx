import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import NotFound from "./pages/NotFound";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/jobs" element={<PageWrapper><Jobs /></PageWrapper>} />
          <Route path="/jobs/:id" element={<PageWrapper><JobDetail /></PageWrapper>} />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute role="company">
                <PageWrapper><PostJob /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute role="company">
                <PageWrapper><CompanyDashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="student">
                <PageWrapper><StudentDashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;