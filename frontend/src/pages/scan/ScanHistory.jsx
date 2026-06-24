import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useTheme } from "../../context/ThemeContext";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const colors = {
    bg: darkMode
      ? "linear-gradient(180deg,#071224 0%,#08152d 100%)"
      : "#f4f8f7",

    card: darkMode ? "#111827" : "#ffffff",

    text: darkMode ? "#ffffff" : "#0f172a",

    secondary: darkMode ? "#94a3b8" : "#64748b",

    tableHeader: darkMode ? "#1e293b" : "#f8fafc",

    border: darkMode ? "#1f2937" : "#e2e8f0",
  };

  useEffect(() => {
    fetchScans();
  }, []);

  useEffect(() => {
    const filtered = scans.filter(
      (scan) =>
        scan.target?.toLowerCase().includes(search.toLowerCase()) ||
        scan.target_url?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredScans(filtered);
  }, [search, scans]);

  const fetchScans = async () => {
    const { data, error } = await supabase
      .from("scans")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setScans(data || []);
      setFilteredScans(data || []);
    }

    setLoading(false);
  };

  const completed = scans.filter(
    (s) => s.status?.toLowerCase() === "completed"
  ).length;

  const pending = scans.filter(
    (s) => s.status?.toLowerCase() === "pending"
  ).length;

  const failed = scans.filter(
    (s) => s.status?.toLowerCase() === "failed"
  ).length;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      default:
        return "#94a3b8";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          color: colors.secondary,
          fontSize: "14px",
          marginBottom: "15px",
        }}
      >
        Home / Scan History
      </div>

      {/* Header */}
      <h1
        style={{
          fontSize: "56px",
          fontWeight: "700",
          margin: 0,
          color: colors.text,
        }}
      >
        Scan History
      </h1>

      <p
        style={{
          color: colors.secondary,
          fontSize: "18px",
          marginTop: "10px",
          marginBottom: "35px",
        }}
      >
        Review and manage all vulnerability scans
      </p>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="Total Scans"
          value={scans.length}
          color="#3b82f6"
          darkMode={darkMode}
        />

        <StatCard
          title="Completed"
          value={completed}
          color="#22c55e"
          darkMode={darkMode}
        />

        <StatCard
          title="Pending"
          value={pending}
          color="#f59e0b"
          darkMode={darkMode}
        />

        <StatCard
          title="Failed"
          value={failed}
          color="#ef4444"
          darkMode={darkMode}
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by target or URL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: "14px",
          border: `1px solid ${colors.border}`,
          background: colors.card,
          color: colors.text,
          outline: "none",
          marginBottom: "30px",
          fontSize: "16px",
          boxSizing: "border-box",
          boxShadow: darkMode
            ? "none"
            : "0 4px 12px rgba(0,0,0,0.05)",
        }}
      />

      {/* Table */}
      <div
        style={{
          background: colors.card,
          borderRadius: "18px",
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          transition: "all 0.3s ease",
          boxShadow: darkMode
            ? "0 0 15px rgba(59,130,246,0.08)"
            : "0 4px 12px rgba(0,0,0,0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px)";
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: colors.tableHeader,
                color: colors.text,
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Target</th>
              <th style={thStyle}>URL</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Created</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={loadingStyle}>
                  Loading...
                </td>
              </tr>
            ) : filteredScans.length === 0 ? (
              <tr>
                <td colSpan="6" style={loadingStyle}>
                  No Scan History Found
                </td>
              </tr>
            ) : (
              filteredScans.map((scan) => (
                <tr
                  key={scan.id}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <td style={{ ...tdStyle, color: colors.text }}>
                    {scan.id}
                  </td>

                  <td style={{ ...tdStyle, color: colors.text }}>
                    <strong>{scan.target}</strong>
                  </td>

                  <td style={{ ...tdStyle, color: colors.text }}>
                    {scan.target_url || scan.target}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background: `${getStatusColor(scan.status)}22`,
                        border: `1px solid ${getStatusColor(scan.status)}55`,
                        color: getStatusColor(scan.status),
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontWeight: "600",
                      }}
                    >
                      {scan.status}
                    </span>
                  </td>

                  <td style={{ ...tdStyle, color: colors.text }}>
                    {new Date(scan.created_at).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        navigate(`/scan-result/${scan.scan_uuid}`)
                      }
                      style={{
                        background:
                          "linear-gradient(135deg,#7c3aed,#9333ea)",
                        border: "none",
                        color: "#fff",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
};

const StatCard = ({ title, value, color, darkMode }) => (
  <div
    style={{
      background: darkMode ? "#111827" : "#ffffff",
      borderRadius: "18px",
      padding: "24px",
      border: `1px solid ${color}25`,
      boxShadow: darkMode
        ? `0 0 20px ${color}10`
        : "0 4px 12px rgba(0,0,0,0.05)",

      transition: "all 0.3s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-6px) scale(1.02)";
      e.currentTarget.style.boxShadow = darkMode
        ? `0 0 35px ${color}25`
        : "0 10px 25px rgba(0,0,0,0.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0px) scale(1)";
      e.currentTarget.style.boxShadow = darkMode
        ? `0 0 20px ${color}10`
        : "0 4px 12px rgba(0,0,0,0.05)";
    }}
  >
    <div
      style={{
        color: darkMode ? "#94a3b8" : "#64748b",
        marginBottom: "10px",
      }}
    >
      {title}
    </div>

    <div
      style={{
        fontSize: "42px",
        fontWeight: "700",
        color,
      }}
    >
      {value}
    </div>
  </div>
);

const thStyle = {
  textAlign: "left",
  padding: "22px",
  fontSize: "15px",
  fontWeight: "600",
  color: "inherit",
};

const tdStyle = {
  padding: "22px",
};

const loadingStyle = {
  textAlign: "center",
  padding: "50px",
  color: "#94a3b8",
};

export default ScanHistory;