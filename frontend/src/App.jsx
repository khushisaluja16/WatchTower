import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/components/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <div style={styles.app}>
      <Sidebar />

      {/* CONTENT AREA */}
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#14161c",
  },
  content: {
    marginLeft: "320px",
    paddingLeft: "24px",
    paddingTop: "16px",
  },
};

export default App;
