 import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const ScanResult = lazy(() => import("./pages/scan/ScanResult"));
const Reports = lazy(() => import("./pages/reports/Reports"));
const Scans = lazy(() => import("./pages/scan/Scans"));

import Sidebar from "./sidebar/components/Sidebar";
import "antd/dist/reset.css";

function App() {
  return (
    <div style={styles.app} className="app-layout">
      <Sidebar />

      <main style={styles.main} className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/scans" element={<Scans />} />
          <Route path="/scan-result" element={<ScanResult />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#edf4f2",
  },

  main: {
    flex: 1,
    minHeight: "100vh",
    padding: "24px",
    width: "100%",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
};

export default App;
