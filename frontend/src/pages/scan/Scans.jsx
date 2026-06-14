import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
const STAGES = [
  { name: "Recon", action: "Resolving domain and DNS records…" },
  { name: "Reputation", action: "Checking phishing and malware databases…" },
  { name: "Redirects", action: "Analyzing redirects and URL structure…" },
  { name: "Finalizing", action: "Finalizing scan report…" },
];

const Scans = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const colors = {
    bg: darkMode
      ? "linear-gradient(180deg,#071224 0%,#08152d 100%)"
      : "#edf4f2",

    card: darkMode
      ? "#111827"
      : "#ffffff",

    text: darkMode
      ? "#ffffff"
      : "#0f172a",

    secondary: darkMode
      ? "#94a3b8"
      : "#64748b",

    border: darkMode
      ? "#1f2937"
      : "#e2e8f0",

    inputBg: darkMode
      ? "#0f172a"
      : "#ffffff",
  };
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
    <div
      style={{
        ...styles.container,
        background: colors.bg,
        color: colors.text,
      }}
    >
      <div
        style={{
          ...styles.breadcrumb,
          color: colors.secondary,
        }}
      >
        Home / Scans
      </div>
      <h1
        style={{
          ...styles.title,
          color: colors.text,
        }}
      >
        Run URL Scan
      </h1>

      {/* URL INPUT (before scan) */}
      {!started && (
        <div
          style={{
            ...styles.card,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: darkMode
              ? "0 0 20px rgba(0,0,0,0.25)"
              : "0 10px 30px rgba(15,23,42,0.06)",
          }}
        >
          <label style={styles.label}>Target URL</label>
          <input
            style={{
              ...styles.input,
              background: colors.inputBg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
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
          <p
            style={{
              ...styles.subtitle,
              color: colors.secondary,
            }}
          >
            Live scan in progress for <b>{url}</b>
          </p>

          <div style={styles.topRow}>
            <span style={styles.liveBadge}>
              {completed ? "Completed" : "Live"}
            </span>
            <span style={styles.time}>Duration: {elapsed}s</span>
          </div>

          {/* Progress */}
          <div
            style={{
              ...styles.card,
              background: colors.card,
              border: `1px solid ${colors.border}`,
              boxShadow: darkMode
                ? "0 0 20px rgba(0,0,0,0.25)"
                : "0 10px 30px rgba(15,23,42,0.06)",
            }}
          >

            <h3
              style={{
                ...styles.cardTitle,
                color: colors.text,
              }}
            >Progress</h3>

            <div style={styles.stageRow}>
              {STAGES.map((s, i) => (
                <span
                  key={s.name}
                  style={{
                    ...styles.stageLabel,
                    color: i <= stage
                      ? "#3b82f6"
                      : colors.secondary,
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>

            <div
              style={{
                ...styles.progressBar,
                backgroundColor: darkMode
                  ? "#1f2937"
                  : "#e5e7eb",
              }}
            >
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(stage / STAGES.length) * 100}%`,
                }}
              />
            </div>

            <p
              style={{
                ...styles.currentAction,
                color: colors.secondary,
              }}
            >
              {completed
                ? "Scan completed successfully."
                : STAGES[stage]?.action}
            </p>
          </div>

          {/* Logs */}
          <div
            style={{
              ...styles.card,
              background: colors.card,
              border: `1px solid ${colors.border}`,
              boxShadow: darkMode
                ? "0 0 20px rgba(0,0,0,0.25)"
                : "0 10px 30px rgba(15,23,42,0.06)",
            }}
          >
            <h3
              style={{
                ...styles.cardTitle,
                color: colors.text,
              }}
            >Scan Log</h3>

            {logs.map((log, i) => (
              <div key={i} style={styles.logItem}>
                <span
                  style={{
                    ...styles.logTime,
                    color: colors.secondary,
                  }}
                >
                  {log.time}
                </span>

                <span
                  style={{
                    color: colors.text,
                  }}
                >
                  {log.text}
                </span>
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
                  navigate("/scan-result/1", {
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
    minHeight: "100vh",
    padding: "32px",
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
