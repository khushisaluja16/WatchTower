import {
  MagnifyingGlass,
  Bug,
  ShieldCheck,
  Globe,
} from "phosphor-react";

export default function Methodology() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Methodology</h1>
        <p style={styles.subtitle}>
          WatchTower follows a structured security testing methodology to
          identify vulnerabilities in web applications and servers.
        </p>
      </div>

      {/* Timeline */}
      <div style={styles.timeline}>
        {steps.map((step, index) => (
          <div key={index} style={styles.timelineRow}>
            {/* Connector */}
            <div style={styles.connectorColumn}>
              <div style={styles.dot} />
              {index !== steps.length - 1 && (
                <div style={styles.line} />
              )}
            </div>

            {/* Card */}
            <div
              style={styles.stepCard}
              className="methodology-card"
            >
              <div style={styles.iconWrapper}>
                {step.icon}
              </div>

              <div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= DATA ================= */

const steps = [
  {
    title: "Reconnaissance",
    description:
      "Initial information gathering is performed to identify target IP addresses, domain details, and publicly accessible endpoints.",
    icon: <Globe size={22} weight="duotone" />,
  },
  {
    title: "Scanning",
    description:
      "The system scans the target to detect open ports and running services.",
    icon: <MagnifyingGlass size={22} weight="duotone" />,
  },
  {
    title: "Service Detection",
    description:
      "Detected services and their versions are analyzed to identify outdated or vulnerable software.",
    icon: <Bug size={22} weight="duotone" />,
  },
  {
    title: "Vulnerability Analysis",
    description:
      "Automated security checks are performed to identify common vulnerabilities such as SQL Injection and XSS.",
    icon: <ShieldCheck size={22} weight="duotone" />,
  },
];

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: "900px",
    background: "#EDF4F2",
    padding: "32px",
    borderRadius: "20px",
    color: "#1f2937",
  },

  header: {
    marginBottom: "32px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#4b5563",
    lineHeight: "1.6",
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  timelineRow: {
    display: "flex",
    gap: "24px",
  },

  connectorColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  dot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#38bdf8",
    boxShadow: "0 0 0 4px rgba(56,189,248,0.25)",
  },

  line: {
    width: "2px",
    flexGrow: 1,
    background: "rgba(56,189,248,0.4)",
    marginTop: "6px",
  },

  stepCard: {
    flex: 1,
    display: "flex",
    gap: "18px",
    padding: "20px",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: "all 0.25s ease",
  },

  iconWrapper: {
    minWidth: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(56, 189, 248, 0.15)",
    color: "#0284c7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  stepTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  stepDescription: {
    fontSize: "14px",
    color: "#4b5563",
    lineHeight: "1.6",
  },
};
