import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/reset.css";

import Sidebar from "./sidebar/components/Sidebar";
import Methodology from "./pages/methodology/Methodology";
import Dashboard from "./pages/dashboard/Dashboard";
import ScanResult from "./pages/scan/ScanResult";
import Reports from "./pages/reports/Reports"; // ✅ FIX

function App() {
  return (
    <div style={styles.app}>
      <Sidebar />

      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scanResult" element={<ScanResult />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0b0f14",
  },
  main: {
  marginLeft: "300px",
  minHeight: "100vh",
  background: "#edf4f2",
  padding: "32px 24px",
  boxSizing: "border-box",
  overflowY: "auto",
}
,
};

export default App;
