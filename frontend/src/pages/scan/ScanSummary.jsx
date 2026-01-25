import React from "react";

function ScanSummary() {
  const SummaryCard = ({ label, count, percent, color }) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "12px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "14px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            marginTop: "6px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              opacity: 0.8,
            }}
          >
            {label}
          </p>
          <h3
            style={{
              margin: "4px 0",
            }}
          >
            {count}
          </h3>
          <span
            style={{
              fontSize: "0.75rem",
              opacity: 0.6,
            }}
          >
            {percent}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "28px",
      }}
    >
      <SummaryCard
        label="Critical issues"
        count={3}
        percent="16.6%"
        color="#ff5f5f"
      />
      <SummaryCard
        label="Medium issues"
        count={6}
        percent="9.75%"
        color="#ffb86c"
      />
      <SummaryCard
        label="Low issues"
        count={7}
        percent="44.2%"
        color="#4cd964"
      />
      <SummaryCard
        label="Open Ports"
        count={2}
        percent="Services exposed"
        color="#6aa9ff"
      />
    </div>
  );
}

export default ScanSummary;
