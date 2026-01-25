import React from "react";

function ScanHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontWeight: 600,
          }}
        >
          Scan Results
        </h2>
        <p
          style={{
            fontSize: "0.85rem",
            opacity: 0.7,
            marginTop: "4px",
          }}
        >
          Target: <b>example.com</b> · Duration: 4.52 sec · Date: April 2023
        </p>
      </div>
      <button
        style={{
          background: "#2a2f3a",
          border: "1px solid #3a3f4b",
          padding: "8px 14px",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default ScanHeader;
