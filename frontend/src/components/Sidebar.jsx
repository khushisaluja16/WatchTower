import "../styles/sidebar.css";
import {
  House,
  Play,
  ClipboardText,
  FileText,
  Code,
  Gear,
  Question,
  Shield
} from "phosphor-react";

function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">

        <div className="sidebar-header">
          <Shield size={22} weight="regular" />
          <span>Vulnerability Scanner</span>
        </div>

        <div className="sidebar-section">MENU</div>

        <div className="sidebar-menu">

          <div className="menu-item">
            <House size={20} weight="regular" />
            Dashboard
          </div>

          <div className="menu-item">
            <Play size={20} weight="regular" />
            Start Scan
          </div>

          <div className="menu-item active">
            <ClipboardText size={20} weight="regular" />
            Methodology
          </div>

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
