import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import "../styles/sidebar.css";
import Logo from "../logo/logowatchtower.png";

import {
  DashboardOutlined,
  FileTextOutlined,
  ScanOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";

import {
  House,
  Code,
  Settings,
  CircleHelp,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const { darkMode } = useTheme();

  return (
    <div className="sidebar-wrapper">
      <div
        className="sidebar"
        style={{
          background: darkMode ? "#07090d" : "#ffffff",
          borderRight: darkMode
            ? "1px solid #11161c"
            : "1px solid #e2e8f0",
          color: darkMode ? "#cbd5e1" : "#1e293b",
        }}
      >
        {/* Logo */}
        <div className="sidebar-header">
          <img
            src={Logo}
            alt="WatchTower Logo"
            className="sidebar-logo"
          />

          <span
            className="sidebar-title"
            style={{
              color: darkMode ? "#f8fafc" : "#0f172a",
              background: "none",
              WebkitTextFillColor: "unset",
            }}
          >
            WatchTower
          </span>
        </div>

        {/* Menu Label */}
        <div
          className="sidebar-section"
          style={{
            color: "#64748b",
          }}
        >
          MENU
        </div>

        {/* Main Menu */}
        <div className="sidebar-menu">
          <Link to="/home" className="menu-link">
            <div
              className={`menu-item ${location.pathname === "/home"
                  ? "active"
                  : ""
                }`}
            >
              <House size={20} />
              Home
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="menu-link"
          >
            <div
              className={`menu-item ${location.pathname ===
                  "/dashboard"
                  ? "active"
                  : ""
                }`}
            >
              <DashboardOutlined />
              Dashboard
            </div>
          </Link>

          <Link
            to="/scans"
            className="menu-link"
          >
            <div
              className={`menu-item ${location.pathname === "/scans"
                  ? "active"
                  : ""
                }`}
            >
              <ScanOutlined />
              Scans
            </div>
          </Link>

          <Link
            to="/scan-history"
            className="menu-link"
          >
            <div
              className={`menu-item ${location.pathname ===
                  "/scan-history"
                  ? "active"
                  : ""
                }`}
            >
              <SecurityScanOutlined />
              Scan History
            </div>
          </Link>

          <Link
            to="/reports"
            className="menu-link"
          >
            <div
              className={`menu-item ${location.pathname ===
                  "/reports"
                  ? "active"
                  : ""
                }`}
            >
              <FileTextOutlined />
              Reports
            </div>
          </Link>

          <div className="menu-item">
            <Code size={20} />
            API
          </div>
        </div>

        {/* Bottom Section */}
        <div className="sidebar-footer">
          <Link
            to="/settings"
            className="menu-link"
          >
            <div
              className={`menu-item ${location.pathname ===
                  "/settings"
                  ? "active"
                  : ""
                }`}
            >
              <Settings size={20} />
              Settings
            </div>
          </Link>

          <div className="menu-item">
            <CircleHelp size={20} />
            Help / About
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;