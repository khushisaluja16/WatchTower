import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const STAGES = [
  { name: "Recon", action: "Resolving domain and DNS records…" },
  { name: "Reputation", action: "Checking phishing and malware databases…" },
  { name: "Redirects", action: "Analyzing redirects and URL structure…" },
  { name: "Finalizing", action: "Finalizing scan report…" },
];

const Scans = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [stage, setStage] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [logs, setLogs] = useState([]);

  /* timer */
  useEffect(() => {
    if (!started || completed) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, completed]);

  /* scan stages */
  useEffect(() => {
    if (!started || completed) return;

    if (stage >= STAGES.length) {
      setCompleted(true);
      return;
    }

    const timeout = setTimeout(() => {
      setLogs((prev) => [
        {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: STAGES[stage].action.replace("…", " completed"),
        },
        ...prev,
      ]);
      setStage((s) => s + 1);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [stage, started, completed]);

  const startScan = () => {
    if (!url) return;
    setStarted(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>Home / Scans</div>

      <h1 style={styles.title}>Run URL Scan</h1>

      {/* URL INPUT (before scan) */}
      {!started && (
        <div style={styles.card}>
          <label style={styles.label}>Target URL</label>
          <input
            style={styles.input}
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button style={styles.primaryBtn} onClick={startScan}>
            Start Scan
          </button>
        </div>
      )}

      {/* LIVE SCAN */}
      {started && (
        <>
          <p style={styles.subtitle}>
            Live scan in progress for <b>{url}</b>
          </p>

          <div style={styles.topRow}>
            <span style={styles.liveBadge}>
              {completed ? "Completed" : "Live"}
            </span>
            <span style={styles.time}>Duration: {elapsed}s</span>
          </div>

          {/* Progress */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Progress</h3>

            <div style={styles.stageRow}>
              {STAGES.map((s, i) => (
                <span
                  key={s.name}
                  style={{
                    ...styles.stageLabel,
                    color: i <= stage ? "#2563eb" : "#94a3b8",
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(stage / STAGES.length) * 100}%`,
                }}
              />
            </div>

            <p style={styles.currentAction}>
              {completed
                ? "Scan completed successfully."
                : STAGES[stage]?.action}
            </p>
          </div>

          {/* Logs */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Scan Log</h3>

            {logs.map((log, i) => (
              <div key={i} style={styles.logItem}>
                <span style={styles.logTime}>{log.time}</span>
                <span>{log.text}</span>
              </div>
            ))}

            {!completed && (
              <div style={styles.scanning}>⏳ Scanning in progress…</div>
            )}

            {/* RESULT BUTTON */}
            {completed && (
              <button
                style={{ ...styles.primaryBtn, marginTop: "16px" }}
                onClick={() =>
                  navigate("/scan-result", {
                    state: {
                      url,
                      status: "Dangerous",
                      score: 78,
                      issues: [
                        "Domain registered 9 days ago",
                        "URL found in phishing database",
                        "Multiple redirects detected",
                      ],
                    },
                  })
                }
              >
                View Scan Result
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
  
};

const styles = {
  container: {
    backgroundColor: "#eef5f2",
    minHeight: "100vh",
    padding: "32px",
    color: "#0f172a",
  },
  breadcrumb: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "8px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
  },
  subtitle: {
    marginBottom: "12px",
    color: "#475569",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
  },
  label: {
    display: "block",
    fontSize: "14px",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginBottom: "16px",
  },
  primaryBtn: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  liveBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 500,
  },
  time: {
    color: "#64748b",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "16px",
  },
  stageRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "8px",
  },
  stageLabel: {
    fontWeight: 500,
  },
  progressBar: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    transition: "width 0.4s ease",
  },
  currentAction: {
    color: "#475569",
    fontSize: "14px",
  },
  logItem: {
    display: "flex",
    gap: "16px",
    fontSize: "14px",
    padding: "6px 0",
  },
  logTime: {
    minWidth: "70px",
    color: "#94a3b8",
  },
  scanning: {
    marginTop: "12px",
    color: "#2563eb",
    fontWeight: 500,
  },
};
export default Scans;
