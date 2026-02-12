import "./dashboard.css";
import { useState } from "react";
import {
  ChartBar,
  WarningCircle,
  ShieldCheck,
  Bug
} from "phosphor-react";

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

const weeklyData = [
  { label: "Mon", value: 320, color: "#ef4444" },
  { label: "Tue", value: 140, color: "#f97316" },
  { label: "Wed", value: 430, color: "#f59e0b" },
  { label: "Thu", value: 260, color: "#22c55e" },
  { label: "Fri", value: 80, color: "#10b981" },
  { label: "Sat", value: 460, color: "#60a5fa" },
  { label: "Sun", value: 190, color: "#64748b" },
];

const monthlyData = [
  { label: "Week 1", value: 800, color: "#ef4444" },
  { label: "Week 2", value: 950, color: "#f59e0b" },
  { label: "Week 3", value: 720, color: "#10b981" },
  { label: "Week 4", value: 880, color: "#60a5fa" },
];

const quarterlyData = [
  { label: "Month 1", value: 3000, color: "#ef4444" },
  { label: "Month 2", value: 2800, color: "#f59e0b" },
  { label: "Month 3", value: 3400, color: "#10b981" },
];

const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

const barData = [
  { day: "Mon", vulnerabilities: 320, color: "#ef4444" },
  { day: "Tue", vulnerabilities: 140, color: "#f97316" },
  { day: "Wed", vulnerabilities: 430, color: "#f59e0b" },
  { day: "Thu", vulnerabilities: 260, color: "#22c55e" },
  { day: "Fri", vulnerabilities: 80, color: "#10b981" },
  { day: "Sat", vulnerabilities: 460, color: "#60a5fa" },
  { day: "Sun", vulnerabilities: 190, color: "#64748b" },
];


const riskData = [
  { name: "Critical", value: 8, color: "#ef4444" },
  { name: "Medium", value: 10, color: "#f59e0b" },
  { name: "Low", value: 9, color: "#10b981" },
];

// calculate total
const totalRisk = riskData.reduce((acc, item) => acc + item.value, 0);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("Last 24 hours");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [range, setRange] = useState("7");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const data = [
  {
    id: "dfd9fc7",
    target: "example.com",
    issues: "High",
    risk: "Medium",
    date: "April 2023",
  },
  {
    id: "b7c450a4",
    target: "example.org",
    issues: "High",
    risk: "Low",
    date: "April 2023",
  },
  {
    id: "c653fdbb",
    target: "testsite.com",
    issues: "High",
    risk: "Low",
    date: "April 2023",
  },
];
  const filteredData = selectedFilter
    ? data.filter(item => item.issues === selectedFilter)
    : data;


  const chartData =
    range === "7"
      ? weeklyData
      : range === "30"
        ? monthlyData
        : quarterlyData;
        
  return (
    <div style={styles.page}>

      {/* Breadcrumb */}
      <p style={styles.breadcrumb}>Home / Dashboard</p>

      {/* Header Row */}
      <div style={styles.headerRow}>

        <h1 style={styles.title}>Dashboard</h1>

        <div style={styles.headerActions}>
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
      <div style={styles.cardsRow} >
        <SummaryCard
          title="Scans"
          value="32"
          icon={<ChartBar size={20} weight="bold" color="#2563eb" />}
          iconColor="#2563eb"
          onClick={() => setSelectedFilter("High")}
        />

        <SummaryCard
          title="Critical Issues"
          value="8"
          icon={<WarningCircle size={20} weight="bold" color="#ef4444" />}
          iconColor="#ef4444"
          onClick={() => setSelectedFilter("High")}
        />

        <SummaryCard
          title="Vulnerable Assets"
          value="15"
          icon={<ShieldCheck size={20} weight="bold" color="#10b981" />}
          iconColor="#10b981"
          onClick={() => setSelectedFilter("High")}
        />

        <SummaryCard
          title="Total Vulnerabilities"
          value="27"
          icon={<Bug size={20} weight="bold" color="#f59e0b" />}
          iconColor="#f59e0b"
          onClick={() => setSelectedFilter("High")}
        />
      </div>

      {/* Two Column Section */}
      <div style={styles.twoColumn}>
        <div style={styles.cardLarge}>
          <h3 style={{ marginBottom: "20px" }}>Risk Overview</h3>

          <div style={{ flex: 1, display: "flex", alignItems: "center" }}></div>
          <div style={styles.riskRow}>

            {/* Left: Donut Chart */}
            <div style={{ width: 280, height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={riskData}
                    dataKey="value"
                    innerRadius={80}
                    outerRadius={120}
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
                const percentage = ((item.value / totalRisk) * 100).toFixed(1);

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

        <div style={styles.cardLarge}>
          <div style={styles.chartHeader}>
            <h3>Recent Vulnerabilities</h3>
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

          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />

                <XAxis
                  dataKey="label"
                  type="category"
                  tick={{ fill: "#6b7280" }}
                />

                <YAxis tick={{ fill: "#6b7280" }} />

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
      <div style={styles.cardLarge}>
        <h3 style={{ marginBottom: "20px" }}>Detected Assets</h3>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.tableCell}>Scan ID</th>
              <th style={styles.tableCell}>Target</th>
              <th style={styles.tableCell}>Issues</th>
              <th style={styles.tableCell}>Risk Level</th>
              <th style={styles.tableCell}>Date</th>
              <th style={styles.tableCellRight}></th>
            </tr>
          </thead>


          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{row.id}</td>
                <td style={styles.tableCell}>{row.target}</td>

                <td style={styles.tableCell}>
                  <span
                    style={
                      row.issues === "High"
                        ? styles.badgeHigh
                        : styles.badgeLow
                    }
                  >
                    ● {row.issues}
                  </span>
                </td>

                <td style={styles.tableCell}>
                  <span
                    style={
                      row.risk === "Medium"
                        ? styles.badgeMedium
                        : styles.badgeLow
                    }
                  >
                    ● {row.risk}
                  </span>
                </td>

                <td style={styles.tableCell}>{row.date}</td>

                <td style={styles.tableCellRight}>›</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};


const SummaryCard = ({ title, value, icon, iconColor, onClick }) => {
  return (
     <div className="summary-card" style={styles.card} onClick={onClick}>

      {/* Top Row: Icon + Title */}
      <div style={styles.cardHeader}>
        <div
          style={{
            ...styles.iconWrapper,
            backgroundColor: iconColor + "20",
          }}
        >
          {icon}
        </div>

        <p style={styles.cardTitle}>{title}</p>
      </div>

      {/* Value */}
      <h2 style={styles.cardValue}>{value}</h2>

    </div>
  );
};


const styles = {
  page: {
    padding: "40px",
    backgroundColor: "#EDF4F2",
    minHeight: "100vh",
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
    gridTemplateColumns: "1fr 1fr",
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
    borderCollapse: "collapse",
    marginTop: "20px",
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
    gap: "18px",
    width: "240px",
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

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 14px",
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
