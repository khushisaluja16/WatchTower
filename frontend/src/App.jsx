import { Routes, Route, Navigate } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Sidebar from "./sidebar/components/Sidebar";
import { useTheme } from "./context/ThemeContext";

import "antd/dist/reset.css";

const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Scans = lazy(() => import("./pages/scan/Scans"));
const ScanHistory = lazy(() => import("./pages/scan/ScanHistory"));
const Reports = lazy(() => import("./pages/reports/Reports"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const ScanResult = lazy(() => import("./pages/scan/ScanResult"));

function App() {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode ? "#071224" : "#edf4f2",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          minHeight: "100vh",
          overflowY: "auto",
          background: darkMode ? "#071224" : "#edf4f2",
          padding: 0,
          margin: 0,
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
              Loading...
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />

            <Route path="/home" element={<Home />} />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/scans"
              element={<Scans />}
            />

            <Route
              path="/scan-result/:scan_uuid"
              element={<ScanResult />}
            />

            <Route
              path="/scan-history"
              element={<ScanHistory />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
          </Routes>
        </Suspense>
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
    padding: "20px 12px",
    boxSizing: "border-box",
    overflowY: "auto",
    overflowX: "hidden"
  },
};

export default App;