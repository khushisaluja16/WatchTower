import "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import {
  ChartBar,
  TriangleAlert,
  ShieldCheck,
  Bug,
  BarChart3
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const isMobile = window.innerWidth <= 768;

const Dashboard = () => {


  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  const colors = {
    bg: darkMode
      ? "linear-gradient(180deg,#071224 0%,#08152d 100%)"
      : "#edf4f2",

    card: darkMode
      ? "#111827"
      : "#ffffff",

    text: darkMode
      ? "#ffffff"
      : "#0f172a",

    secondary: darkMode
      ? "#94a3b8"
      : "#64748b",

    border: darkMode
      ? "#1f2937"
      : "#e2e8f0",
  };

  const [timeRange, setTimeRange] = useState("Last 24 hours");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [range, setRange] = useState("7");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const riskData =
    dashboardData?.risk_distribution
      ? [
        {
          name: "Critical",
          value: dashboardData.risk_distribution.Critical || 0,
          color: "#ef4444"
        },
        {
          name: "High",
          value: dashboardData.risk_distribution.High || 0,
          color: "#f97316"
        },
        {
          name: "Medium",
          value: dashboardData.risk_distribution.Medium || 0,
          color: "#f59e0b"
        },
        {
          name: "Low",
          value: dashboardData.risk_distribution.Low || 0,
          color: "#10b981"
        }
      ]
      : [];

  const totalRisk = riskData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const data =
    dashboardData?.recent_scans || [];
  const filteredData = data;


  const chartData =
    dashboardData?.vulnerability_trend || [];
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/dashboard/stats"
      );

      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        background: colors.bg,
        color: colors.text,
      }}
    >

      {/* Breadcrumb */}
      <p
        style={{
          ...styles.breadcrumb,
          color: colors.secondary,
        }}
      >
        Home / Dashboard
      </p>

      {/* Header Row */}
      <div className="header-row">

        <h1
          style={{
            ...styles.title,
            color: colors.text,
          }}
        >
          Dashboard
        </h1>

        <div className="header-actions">
          <div style={styles.dropdownWrapper}>

            <button
              style={styles.dropdownButton}
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              {timeRange} ▼
            </button>

            {openDropdown && (
              <div style={styles.dropdownMenu}>
                {["Last 24 hours", "Last 7 days", "Last 30 days"].map((option) => (
                  <div
                    key={option}
                    style={styles.dropdownItem}
                    onClick={() => {
                      setTimeRange(option);
                      setOpenDropdown(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

          </div>


          <button
            className="newScanBtn"
            style={styles.newScanButton}
          >
            + New Scan
          </button>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="cards-row">
        <SummaryCard
          title="Scans"
          value={dashboardData?.total_scans || 0}
          icon={<BarChart3 size={20} color="#2563eb" />}
          iconColor="#2563eb"
          onClick={() => setSelectedFilter("High")}
          darkMode={darkMode}
        />

        <SummaryCard
          title="Critical Issues"
          value={dashboardData?.critical_issues || 0}
          icon={<TriangleAlert size={20} color="#ef4444" />}
          iconColor="#ef4444"
          onClick={() => setSelectedFilter("High")}
          darkMode={darkMode}
        />

        <SummaryCard
          title="Vulnerable Assets"
          value={dashboardData?.vulnerable_assets || 0}
          icon={<ShieldCheck size={20} weight="bold" color="#10b981" />}
          iconColor="#10b981"
          onClick={() => setSelectedFilter("High")}
          darkMode={darkMode}
        />

        <SummaryCard
          title="Total Vulnerabilities"
          value={dashboardData?.total_vulnerabilities || 0}
          icon={<Bug size={20} weight="bold" color="#f59e0b" />}
          iconColor="#f59e0b"
          onClick={() => setSelectedFilter("High")}
          darkMode={darkMode}
        />
      </div>

      {/* Two Column Section */}
      <div style={styles.twoColumn}>
        <div
          style={{
            ...styles.cardLarge,
            background: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: colors.text,
            }}
          >
            Risk Overview
          </h3>

          <div style={{ flex: 1, display: "flex", alignItems: "center" }}></div>
          <div
            className="risk-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "20px" : "40px",
              width: "100%",
            }}
          >

            {/* Left: Donut Chart */}
            <div
              style={{
                width: "100%",
                maxWidth: window.innerWidth <= 768 ? "180px" : "280px",
                height: window.innerWidth <= 768 ? "180px" : "220px",
                margin: "0 auto",
                flexShrink: 0,
              }}
            >

              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={riskData}
                    dataKey="value"
                    innerRadius={window.innerWidth <= 768 ? 45 : 65}
                    outerRadius={window.innerWidth <= 768 ? 75 : 100}
                    cx="50%"
                    cy="50%"
                    paddingAngle={4}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Right: Legend */}
            <div style={styles.legendContainer}>
              {riskData.map((item, index) => {
                const percentage =
                  totalRisk > 0
                    ? ((item.value / totalRisk) * 100).toFixed(1)
                    : 0;

                return (
                  <div
                    key={index}
                    style={{
                      ...styles.legendItem,
                      backgroundColor: item.color + "20",
                      border: `1px solid ${item.color}40`,
                    }}
                  >

                    <div style={styles.legendLeft}>
                      <span
                        style={{
                          ...styles.legendDot,
                          backgroundColor: item.color,
                        }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>{percentage}%</span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        <div
          style={{
            ...styles.cardLarge,
            background: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={styles.chartHeader}>
            <h3 style={{ color: colors.text }}>
              Recent Vulnerabilities
            </h3>
            <select
              style={styles.dropdown}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid
                  stroke={darkMode ? "#334155" : "#e5e7eb"}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="label"
                  tick={{ fill: darkMode ? "#94a3b8" : "#0f172a" }}
                />

                <YAxis
                  tick={{ fill: darkMode ? "#94a3b8" : "#0f172a" }}
                />

                <Tooltip cursor={false} />

                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

      {/* Table Section */}
      <div
        style={{
          ...styles.cardLarge,
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            color: colors.text,
          }}
        >
          Detected Assets
        </h3>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={{ ...styles.tableCell, color: colors.text }}>Scan ID</th>
              <th style={{ ...styles.tableCell, color: colors.text }}>Target</th>
              <th style={{ ...styles.tableCell, color: colors.text }}>Issues</th>
              <th style={{ ...styles.tableCell, color: colors.text }}>Risk Level</th>
              <th style={{ ...styles.tableCell, color: colors.text }}>Date</th>
              <th style={{ ...styles.tableCell, color: colors.text }}></th>
            </tr>
          </thead>


          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} style={{ ...styles.tableRow, background: colors.card, }}>
                <td style={{
                  ...styles.tableCell,
                  color: colors.text,
                }}>{row.scan_uuid?.slice(0, 8)}</td>
                <td style={{
                  ...styles.tableCell,
                  color: colors.text,
                }}>{row.target}</td>

                <td style={{
                  ...styles.tableCell,
                  color: colors.text,
                }}>
                  <span style={styles.badgeHigh}>
                    ● {row.vulnerability_count}
                  </span>
                </td>

                <td
                  style={{
                    ...styles.tableCell,
                    color: colors.text,
                  }}
                >
                  <span
                    style={
                      row.risk_level === "Critical"
                        ? styles.badgeHigh
                        : row.risk_level === "High"
                          ? styles.badgeHigh
                          : row.risk_level === "Medium"
                            ? styles.badgeMedium
                            : styles.badgeLow
                    }
                  >
                    ● {row.risk_level}
                  </span>
                </td>

                <td style={{
                  ...styles.tableCell,
                  color: colors.text,
                }}>{new Date(row.created_at).toLocaleDateString()}</td>

                <td style={styles.tableCellRight}>›</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const SummaryCard = ({
  title,
  value,
  icon,
  iconColor,
  onClick,
  darkMode,
}) => {
  return (
    <div
      className={`summary-card ${darkMode ? "dark" : ""
        }`}
      onClick={onClick}
      style={{
        ...styles.card,
        background: darkMode ? "#111827" : "#ffffff",
        border: darkMode
          ? "1px solid #1f2937"
          : "1px solid #e2e8f0",
      }}
    >
      {/* Top Row */}
      <div style={styles.cardHeader}>
        <div
          style={{
            ...styles.iconWrapper,
            backgroundColor: iconColor + "20",
          }}
        >
          {icon}
        </div>

        <p
          style={{
            ...styles.cardTitle,
            color: darkMode ? "#94a3b8" : "#64748b",
          }}
        >
          {title}
        </p>
      </div>

      <h2
        style={{
          ...styles.cardValue,
          color: darkMode ? "#ffffff" : "#0f172a",
        }}
      >
        {value}
      </h2>
    </div>
  );
};


const styles = {
  page: {
    padding: window.innerWidth <= 768 ? "16px" : "40px",
    backgroundColor: "#EDF4F2",
    minHeight: "100vh",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },

  breadcrumb: {
    color: "#6b7280",
    marginBottom: "8px",
    fontSize: "14px",
  },

  title: {
    fontSize: "32px",
    margin: 0,
    color: "#0f172a",
    lineHeight: "1.2",
  },

  cardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "12px",
  },

  iconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  cardTitle: {
    color: "#6b7280",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1",
  },

  cardValue: {
    fontSize: "28px",
    color: "#0f172a",
  },

  twoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },

  cardLarge: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },

  placeholder: {
    height: "200px",
    backgroundColor: "#f1f5f9",
    borderRadius: "12px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    marginTop: "0px",
    borderSpacing: "0 14px",
  },

  high: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  medium: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  low: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  legendContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: isMobile ? "100%" : "240px",
    flexShrink: 1,
  },

  legendItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    borderRadius: "12px",
    fontWeight: "500",
  },

  legendLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  riskRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  dropdown: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    cursor: "pointer",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  topActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  timeDropdown: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #dbeafe",
    background: "#f8fbff",
    color: "#0f172a",
    fontWeight: "500",
    cursor: "pointer",
  },

  newScanButton: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
    transition: "all 0.2s ease",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  dropdownWrapper: {
    position: "relative",
  },

  dropdownButton: {
    padding: "10px 18px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
  },

  dropdownMenu: {
    position: "absolute",
    top: "45px",
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    minWidth: "170px",
    zIndex: 100,
  },

  dropdownItem: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: "#ffffff",
  },

  badgeHigh: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  badgeMedium: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  badgeLow: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  tableHeadRow: {
    textAlign: "left",
    fontSize: "13px",
    color: "#64748b",
  },

  tableRow: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
  },

  tableCell: {
    padding: "16px 12px",
    fontSize: "14px",
    color: "#0f172a",
  },

  tableCellRight: {
    padding: "16px 12px",
    textAlign: "right",
    color: "#94a3b8",
  },

};
export default Dashboard;