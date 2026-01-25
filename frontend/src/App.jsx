import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/components/Sidebar";
import Methodology from "./pages/methodology/Methodology";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <div style={styles.app}>
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
    marginLeft: "320px", // ⬅️ FIX (300 + sidebar padding)
    minHeight: "100vh",
    background: "#1c2330",
    padding: "32px 24px",
    boxSizing: "border-box",
    overflowY: "auto",

    isolation: "isolate",
  },
};

export default App;
