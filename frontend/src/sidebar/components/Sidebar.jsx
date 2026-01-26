import { Link, useLocation } from "react-router-dom";

import "../styles/sidebar.css";
import Logo from "../logo/logowatchtower.png";
import {
  House,
  Play,
  ClipboardText,
  FileText,
  Code,
  Gear,
  Question,
} from "phosphor-react";

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
          {" "}
          <div className="menu-item">
            <ClipboardText size={20} weight="regular" />
            Methodology
          </div>
          <Link to="/dashboard" className="menu-link">
            <div
              className={`menu-item ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              <House size={20} weight="regular" />
              Dashboard
            </div>
          </Link>
          <div className="menu-item">
            <Play size={20} weight="regular" />
            Start Scan
          </div>
          <Link to="/scanResult" className="menu-link">
            <div
              className={`menu-item ${
                location.pathname === "/scanResult" ? "active" : ""
              }`}
            >
              <Play size={20} weight="regular" />
              Scan Result
            </div>
          </Link>
          <div className="menu-item">
            <FileText size={20} weight="regular" />
            Reports
          </div>
          <div className="menu-item">
            <Code size={20} weight="regular" />
            API
          </div>
        </div>

        <div className="sidebar-divider" />

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
