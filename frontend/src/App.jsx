import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/reset.css";

import Sidebar from "./sidebar/components/Sidebar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ScanResult from "./pages/scan/ScanResult";
import Reports from "./pages/reports/Reports";

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
    display: "flex", 
    minHeight: "100vh",
    background: "#edf4f2",
  },

  main: {
    flex: 1, 
    minHeight: "100vh",
    padding: "32px 24px",
    boxSizing: "border-box",
    overflowY: "auto",
    
  },
};

export default App;
