import { Link, useLocation } from "react-router-dom";

import "../styles/sidebar.css";
import Logo from "../logo/logowatchtower.png";
import { House, Code, Gear, Question } from "phosphor-react";
import {
  DashboardOutlined,
  FileTextOutlined,
  ScanOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";

function Sidebar() {
  let location;
  try {
    location = useLocation();
  } catch {
    location = { pathname: "" };
  }
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="WatchTower Logo" className="sidebar-logo" />
          <span className="sidebar-title">WatchTower</span>
        </div>

        <div className="sidebar-section">MENU</div>

        <div className="sidebar-menu">
          <Link to="/home" className="menu-link">
            <div
              className={`menu-item ${
                location.pathname === "/home" ? "active" : ""
              }`}
            >
              <House size={20} weight="regular" />
              Home
            </div>
          </Link>
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="menu-item">
              <DashboardOutlined size={20} />
              Dashboard
            </div>
          </Link>
          <Link to="/scans" className="menu-link">
            <div
              className={`menu-item ${
                location.pathname === "/scans" ? "active" : ""
              }`}
            >
              <ScanOutlined size={20} weight="regular" />
              Scans
            </div>
          </Link>
          <Link to="/scanResult" className="menu-link">
            <div
              className={`menu-item ${
                location.pathname === "/scanResult" ? "active" : ""
              }`}
            >
              <SecurityScanOutlined size={20} weight="regular" />
              Scan Result
            </div>
          </Link>
          <Link to="/reports" className="menu-link">
            <div
              className={`menu-item ${
                location.pathname === "/reports" ? "active" : ""
              }`}
            >
              <FileTextOutlined size={20} weight="regular" />
              Reports
            </div>
          </Link>
          <div className="menu-item">
            <Code size={20} weight="regular" />
            API
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="menu-item">
            <Gear size={20} weight="regular" />
            Settings
          </div>

          <div className="menu-item">
            <Question size={20} weight="regular" />
            Help / About
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
