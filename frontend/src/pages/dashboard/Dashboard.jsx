const SummaryCard = ({ title, value, color }) => {
  return (
    <div
      style={{
        background: "#1f222a",
        border: `1px solid ${color}`,
        borderRadius: "12px",
        padding: "16px",
        minWidth: "180px",
        marginRight: "16px",
      }}
    >
      <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
        {title}
      </div>

      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: "600",
          color: color,
          marginTop: "8px",
        }}
      >
        {value}
      </div>
    </div>
  );
};



const Dashboard = () => {
  return ( 
  <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Dashboard</h2>

        <button style={styles.button}>
          + New Scan 
        </button>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <SummaryCard title="Total Scans" value="32" color="#6aa9ff" />
        <SummaryCard title="Critical Issues" value="8" color="#ff5f5f" />
        <SummaryCard title="Vulnerable Assets" value="15" color="#ffb86c" />
        <SummaryCard title="Total Vulnerabilities" value="27" color="#4cd964" />
      </div>
      
      {/* Summary cards will come here next */}
    </div>
    
  );
};

const styles = {
  page: {
    padding: "24px",
    minHeight: "100vh",
    marginLeft: "260px",
    background:
      "radial-gradient(circle at top, #2b2e36 0%, #14161c 60%)",
    color: "#e6e6e6",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  title: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2a2f3a",
    border: "1px solid #3a3f4b",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};

export default Dashboard;
