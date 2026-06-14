import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ScanResult = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const colors = {
    bg: darkMode
      ? "linear-gradient(180deg,#071224 0%,#08152d 100%)"
      : "#f4f8f7",

    card: darkMode ? "#111827" : "#ffffff",

    text: darkMode ? "#ffffff" : "#0f172a",

    secondary: darkMode ? "#94a3b8" : "#64748b",

    border: darkMode ? "#1f2937" : "#e2e8f0",
  };

  const report = {
    target: "example.com",

    network: {
      ip: "192.168.1.100",
      open_ports: [80, 443, 22],
    },

    summary: {
      risk_score: 78,
      vulnerability_count: 3,
      open_port_count: 3,
      ssl_grade: "B",
    },

    services: [
      "Apache 2.4.49",
      "OpenSSH 8.2",
      "OpenSSL 1.1.1",
    ],

    ssl: {
      issuer: "Let's Encrypt",
      valid_until: "2027-05-01",
      grade: "B",
    },

    web_checks: [
      {
        issue: "Missing CSP Header",
        severity: "Medium",
      },
      {
        issue: "Missing HSTS",
        severity: "High",
      },
    ],

    vulnerabilities: [
      {
        cve: "CVE-2025-1001",
        severity: "High",
        description: "Apache Path Traversal",
        recommendation: "Upgrade Apache",
      },

      {
        cve: "CVE-2025-1002",
        severity: "Critical",
        description: "Remote Code Execution",
        recommendation: "Patch OpenSSL",
      },
    ],
  };

  const getRiskColor = (score) => {
    if (score >= 80) return "#ef4444";
    if (score >= 50) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        padding: "40px",
      }}
    >
      <div
        style={{
          color: colors.secondary,
          marginBottom: "15px",
        }}
      >
        Home / Scan Result
      </div>

      <h1
        style={{
          fontSize: "52px",
          marginBottom: "10px",
        }}
      >
        Scan Report
      </h1>

      <p
        style={{
          color: colors.secondary,
          marginBottom: "30px",
        }}
      >
        Detailed vulnerability assessment report
      </p>

      {/* TARGET INFO */}
      <Section
        title="Target Information"
        colors={colors}
      >
        <InfoRow
          label="Target"
          value={report.target}
        />

        <InfoRow
          label="IP Address"
          value={report.network.ip}
        />

        <InfoRow
          label="Open Ports"
          value={report.network.open_ports.join(
            ", "
          )}
        />
      </Section>

      {/* RISK */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <RiskCard
          title="Risk Score"
          value={report.summary.risk_score}
          color={getRiskColor(
            report.summary.risk_score
          )}
          darkMode={darkMode}
        />

        <RiskCard
          title="Vulnerabilities"
          value={
            report.summary.vulnerability_count
          }
          color="#ef4444"
          darkMode={darkMode}
        />

        <RiskCard
          title="Open Ports"
          value={report.summary.open_port_count}
          color="#3b82f6"
          darkMode={darkMode}
        />

        <RiskCard
          title="SSL Grade"
          value={report.summary.ssl_grade}
          color="#22c55e"
          darkMode={darkMode}
        />
      </div>

      {/* SERVICES */}
      <Section
        title="Detected Services"
        colors={colors}
      >
        {report.services.map((service, index) => (
          <div key={index}>
            • {service}
          </div>
        ))}
      </Section>

      {/* SSL */}
      <Section
        title="SSL Analysis"
        colors={colors}
      >
        <InfoRow
          label="Issuer"
          value={report.ssl.issuer}
        />

        <InfoRow
          label="Valid Until"
          value={report.ssl.valid_until}
        />

        <InfoRow
          label="Grade"
          value={report.ssl.grade}
        />
      </Section>

      {/* WEB CHECKS */}
      <Section
        title="Web Security Checks"
        colors={colors}
      >
        {report.web_checks.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
            }}
          >
            <strong>{item.issue}</strong>
            {" - "}
            {item.severity}
          </div>
        ))}
      </Section>

      {/* VULNS */}
      <Section
        title="Vulnerabilities"
        colors={colors}
      >
        {report.vulnerabilities.map(
          (vuln, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "12px",
                background: darkMode
                  ? "#1e293b"
                  : "#f8fafc",
              }}
            >
              <h3>{vuln.cve}</h3>

              <p>
                Severity:{" "}
                <strong>
                  {vuln.severity}
                </strong>
              </p>

              <p>{vuln.description}</p>

              <p>
                Recommendation:{" "}
                {vuln.recommendation}
              </p>
            </div>
          )
        )}
      </Section>

      <button
        onClick={() =>
          navigate("/scan-history")
        }
        style={{
          background:
            "linear-gradient(135deg,#7c3aed,#9333ea)",
          border: "none",
          color: "#fff",
          padding: "14px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          marginTop: "10px",
        }}
      >
        Back to Scan History
      </button>
    </div>
  );
};

const Section = ({
  title,
  colors,
  children,
}) => (
  <div
    style={{
      background: colors.card,
      borderRadius: "18px",
      padding: "25px",
      marginBottom: "25px",
      border: `1px solid ${colors.border}`,
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      {title}
    </h2>

    {children}
  </div>
);

const InfoRow = ({
  label,
  value,
}) => (
  <div
    style={{
      marginBottom: "10px",
    }}
  >
    <strong>{label}: </strong>
    {value}
  </div>
);

const RiskCard = ({
  title,
  value,
  color,
  darkMode,
}) => (
  <div
    style={{
      background: darkMode
        ? "#111827"
        : "#ffffff",
      borderRadius: "18px",
      padding: "24px",
      border: `1px solid ${color}30`,
      boxShadow: darkMode
        ? `0 0 20px ${color}10`
        : "0 4px 12px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        color: "#94a3b8",
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

export default ScanResult;