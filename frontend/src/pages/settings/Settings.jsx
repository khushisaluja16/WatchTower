import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();

  const colors = {
    bg: darkMode
      ? "linear-gradient(180deg,#071224 0%,#08152d 100%)"
      : "#edf4f2",

    card: darkMode ? "#111827" : "#ffffff",

    text: darkMode ? "#ffffff" : "#0f172a",

    secondary: darkMode
      ? "#94a3b8"
      : "#64748b",

    border: darkMode
      ? "#1f2937"
      : "#e2e8f0",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "56px",
          fontWeight: "700",
          marginBottom: "30px",
        }}
      >
        Settings
      </h1>

      <div
        style={{
          background: colors.card,
          borderRadius: "20px",
          padding: "35px",
          maxWidth: "700px",
          border: `1px solid ${colors.border}`,
          boxShadow: darkMode
            ? "0 0 30px rgba(0,0,0,.3)"
            : "0 4px 20px rgba(0,0,0,.05)",
        }}
      >
        <h2
          style={{
            marginBottom: "35px",
            fontSize: "34px",
          }}
        >
          Appearance
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              Dark Mode
            </div>

            <div
              style={{
                color: colors.secondary,
                marginTop: "8px",
              }}
            >
              Switch between light and dark theme
            </div>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
              width: "120px",
              height: "56px",
              fontSize: "20px",
              fontWeight: "700",
              color: "#fff",
              background: darkMode
                ? "#3b82f6"
                : "#64748b",
            }}
          >
            {darkMode ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;