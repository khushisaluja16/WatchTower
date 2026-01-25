const Dashboard = () => {
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Dashboard is working ✅</h2>
    </div>
  );
};

const styles = {
  page: { 
    minHeight: "100vh",
    padding: "24px",
    background:
      "radial-gradient(circle at top, #2b2e36 0%, #14161c 60%)",
    color: "#e6e6e6",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  title: {
    margin: 0,
    fontWeight: "600",
  },
};


export default Dashboard;
