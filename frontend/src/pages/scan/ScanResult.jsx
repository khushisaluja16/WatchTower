import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const ScanResult = () => {
  const navigate = useNavigate();
  const { scan_uuid } = useParams();

  const { darkMode } = useTheme();


  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const response = await axios.get(
          `http://127.0.0.1:8000/scan/report/${scan_uuid}`
        );

        setReport(response.data.report_json);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchReport();

  }, [scan_uuid]);

  const colors = {
    bg: darkMode
      ? "linear-gradient(180deg,#071224 0%,#08152d 100%)"
      : "#f4f8f7",

    card: darkMode ? "#111827" : "#ffffff",

    text: darkMode ? "#ffffff" : "#0f172a",

    secondary: darkMode ? "#94a3b8" : "#64748b",

    border: darkMode ? "#1f2937" : "#e2e8f0",
  };

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Loading Report...
      </div>
    );
  }

  if (!report) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Report Not Found
      </div>
    );
  }

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
      <span
        style={{
          background:
            report.scan_metadata?.scan_type === "deep"
              ? "#fee2e2"
              : "#dbeafe",

          color:
            report.scan_metadata?.scan_type === "deep"
              ? "#dc2626"
              : "#2563eb",

          padding: "6px 12px",
          borderRadius: "999px",
          marginLeft: "10px",
          fontWeight: 600
        }}
      >
        {
          report.scan_metadata?.scan_type === "deep"
            ? "🛡 Deep Scan"
            : "⚡ Quick Scan"
        }
      </span>
      <p
        style={{
          color: colors.secondary,
          marginBottom: "30px",
        }}
      >
        Detailed vulnerability assessment report
      </p>
      <Section
        title="Executive Summary"
        colors={colors}
      >
        <InfoRow
          label="Target"
          value={report.target}
        />

        <InfoRow
          label="Risk Score"
          value={report.summary.risk_score}
        />

        <InfoRow
          label="Risk Level"
          value={report.summary.risk_level}
        />

        <InfoRow
          label="Scan Type"
          value={
            report.scan_metadata?.scan_type ||
            "quick"
          }
        />
      </Section>

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
          label="Scan Type"
          value={report.scan_metadata?.scan_type}
        />

        <InfoRow
          label="IP Address"
          value={
            report.network?.ip || "Not Available"
          }
        />

        <InfoRow
          label="Open Ports"
          value={
            report.network?.open_ports?.length
              ? report.network.open_ports.join(", ")
              : "None Detected"
          }
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

      <Section
        title="Severity Breakdown"
        colors={colors}
      >
        <InfoRow
          label="Critical"
          value={
            report.severity_summary?.critical || 0
          }
        />

        <InfoRow
          label="High"
          value={
            report.severity_summary?.high || 0
          }
        />

        <InfoRow
          label="Medium"
          value={
            report.severity_summary?.medium || 0
          }
        />

        <InfoRow
          label="Low"
          value={
            report.severity_summary?.low || 0
          }
        />
      </Section>

      {/* SERVICES */}
      <Section
        title="Detected Services"
        colors={colors}
      >
        {report.services?.length > 0 ? (

          report.services.map((service, index) => (
            <div key={index}>
              • {service.service} (Port {service.port})
            </div>
          ))

        ) : (

          <p>
            No services detected in this scan.
          </p>

        )}
      </Section>

      {/* SSL */}
      <Section
        title="SSL Analysis"
        colors={colors}
      >
        <InfoRow
          label="Issuer"
          value={
            report.ssl_analysis?.cert_issuer ||
            "Not Available"
          }
        />

        <InfoRow
          label="Valid Until"
          value={report.ssl_analysis?.valid_until  ||
            "Not Available"}
        />

        <InfoRow
          label="Grade"
          value={report.ssl_analysis?.grade  ||
            "Not Available"}
        />
      </Section>

      {/* WEB CHECKS */}
      <Section
        title="Web Security Checks"
        colors={colors}
      >
        {report.web_checks?.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
            }}
          >
            <strong>{item.type}</strong>
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
        {report.vulnerabilities?.length === 0 ? (
          <p>No vulnerabilities found.</p>
        ) : (
          report.vulnerabilities.map((vuln, index) => (
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
          ))
        )}
      </Section>

      <Section
        title="Recommendations"
        colors={colors}
      >
        {
          report.recommendations?.length > 0
            ? report.recommendations.map(
              (item, index) => (
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
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {item.priority}
                  </p>

                  <p>
                    <strong>Impact:</strong>{" "}
                    {item.impact}
                  </p>

                  <p>
                    {item.description}
                  </p>
                </div>
              )
            )
            : (
              <p>
                No recommendations available.
              </p>
            )
        }
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