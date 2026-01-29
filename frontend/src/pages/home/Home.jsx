import {
  ShieldCheck,
  Bug,
  MagnifyingGlass,
  Globe,
  Lightning,
} from "phosphor-react";
import { useEffect, useState } from "react";
function AnimatedStat({ value, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value === "LOW" ? 0 : Number(value);
    if (isNaN(end)) return;

    const interval = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div style={styles.statCard} className="hover-card">
      <h2 style={styles.statValue}>{value === "LOW" ? "LOW" : count}</h2>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}
export default function Methodology() {
  return (
    <div style={styles.container}>
      {/* ================= HERO ================= */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.title}>WatchTower</h1>
          <div style={styles.status}>
            <span style={styles.statusDot} />
            System Active
          </div>
          <p style={styles.subtitle}>
            Real-time vulnerability intelligence for modern web applications.
            WatchTower continuously monitors, analyzes, and prioritizes security
            risks across your attack surface.
          </p>
        </div>
      </div>

      {/* ================= STATS ================= */}
     <div style={styles.statsGrid}>
  {stats.map((s, i) => (
    <AnimatedStat key={i} value={s.value} label={s.label} />
  ))}
</div>


      {/* ================= INTELLIGENCE MODULES ================= */}
      <h2 style={styles.sectionTitle}>Security Intelligence Modules</h2>

      <div style={styles.featureGrid}>
        {features.map((f, i) => (
          <div key={i} style={styles.featureCard} className="hover-card">
            <div style={styles.featureIcon}>{f.icon}</div>
            <div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureText}>{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= WORKFLOW ================= */}
      <h2 style={styles.sectionTitle}>How WatchTower Operates</h2>

      <div style={styles.workflow}>
        {workflow.map((w, i) => (
          <div key={i} style={styles.workflowCard} className="hover-card">
            <span style={styles.workflowIndex}>0{i + 1}</span>
            <h3 style={styles.workflowTitle}>{w.title}</h3>
            <p style={styles.workflowText}>{w.text}</p>
          </div>
        ))}
      </div>
      <h2 style={styles.sectionTitle}>Recent Threat Activity</h2>

<div style={styles.timeline}>
  {timeline.map((t, i) => (
    <div key={i} style={styles.timelineItem}>
      <span style={styles.timelineDot} />
      <div>
        <p style={styles.timelineText}>{t.text}</p>
        <span style={styles.timelineTime}>{t.time}</span>
      </div>
    </div>
  ))}
</div>

    </div>
    
  );
}

/* ================= DATA ================= */

const stats = [
  { value: "128", label: "Vulnerabilities Detected" },
  { value: "6", label: "Active Scans" },
  { value: "24", label: "Protected Targets" },
  { value: "LOW", label: "Overall Risk Level" },
];

const features = [
  {
    title: "Live Attack Surface",
    text:
      "Continuously maps exposed endpoints, domains, and services to maintain full visibility of your attack surface.",
    icon: <Globe size={24} />,
  },
  {
    title: "Automated Threat Detection",
    text:
      "Identifies common and emerging vulnerabilities using automated security scanning techniques.",
    icon: <MagnifyingGlass size={24} />,
  },
  {
    title: "Threat Intelligence Engine",
    text:
      "Correlates detected issues with known vulnerability patterns and security best practices.",
    icon: <Bug size={24} />,
  },
  {
    title: "Risk Prioritization",
    text:
      "Ranks vulnerabilities based on severity and exploitability to focus remediation efforts.",
    icon: <ShieldCheck size={24} />,
  },
];

const workflow = [
  {
    title: "Surface Enumeration",
    text:
      "Identifies all reachable assets, endpoints, and exposed services within the target environment.",
  },
  {
    title: "Exposure Mapping",
    text:
      "Analyzes open ports and access points to understand potential attack paths.",
  },
  {
    title: "Fingerprinting",
    text:
      "Detects technologies and software versions to identify outdated or insecure components.",
  },
  {
    title: "Risk Scoring",
    text:
      "Evaluates vulnerabilities to determine security impact and remediation priority.",
  },
];
const timeline = [
  { text: "SQL Injection attempt detected on /login endpoint", time: "2 minutes ago" },
  { text: "Outdated Apache service identified on target host", time: "12 minutes ago" },
  { text: "New scan initiated for api.watchtower.local", time: "28 minutes ago" },
  { text: "Cross-Site Scripting vulnerability flagged", time: "1 hour ago" },
];

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: "1200px",
    background: "#EDF4F2",
    padding: "36px",
    borderRadius: "24px",
    color: "#0f172a",
  },

  hero: {
    marginBottom: "36px",
  },

  title: {
    fontSize: "44px",
    fontWeight: "800",
    marginBottom: "6px",
  },

  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#16a34a",
    marginBottom: "14px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 8px rgba(34,197,94,0.8)",
  },

  subtitle: {
    maxWidth: "720px",
    fontSize: "16px",
    color: "#334155",
    lineHeight: "1.7",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "44px",
  },

  statCard: {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "18px",
    border: "1px solid rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "6px",
  },

  statLabel: {
    fontSize: "13px",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },

  sectionTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "18px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "22px",
    marginBottom: "48px",
  },

  featureCard: {
    display: "flex",
    gap: "16px",
    padding: "22px",
    borderRadius: "18px",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
  },

  featureIcon: {
    minWidth: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(59,130,246,0.15)",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  featureText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
  },

  workflow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "22px",
  },

  workflowCard: {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "18px",
    border: "1px solid rgba(0,0,0,0.08)",
    position: "relative",
  },

  workflowIndex: {
    position: "absolute",
    top: "14px",
    right: "14px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#3b82f6",
  },

  workflowTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  workflowText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
  },
  timeline: {
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
},

timelineItem: {
  display: "flex",
  gap: "14px",
  alignItems: "flex-start",
  background: "#ffffff",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid rgba(0,0,0,0.08)",
},

timelineDot: {
  width: "10px",
  height: "10px",
  marginTop: "6px",
  borderRadius: "50%",
  background: "#ef4444",
  boxShadow: "0 0 8px rgba(239,68,68,0.6)",
},

timelineText: {
  fontSize: "14px",
  fontWeight: "500",
  color: "#0f172a",
},

timelineTime: {
  fontSize: "12px",
  color: "#64748b",
},

};

