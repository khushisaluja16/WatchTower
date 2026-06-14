import React from "react";
import {
  Row,
  Col,
  Typography,
  Breadcrumb,
  Button,
  Card,
  Statistic,
  Table,
  Tag,
  Progress,
} from "antd";
import {
  DownloadOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../context/ThemeContext";

const { Title, Text } = Typography;


/* ---------------- TABLE ---------------- */

const columns = [
  {
    title: "CVE",
    dataIndex: "cve",
  },
  {
    title: "Risk Level",
    dataIndex: "risk",
    render: (risk) => {
      const colorMap = {
        High: "error",
        Medium: "warning",
        Low: "success",
      };
      return <Tag color={colorMap[risk]}>{risk}</Tag>;
    },
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Detected",
    dataIndex: "date",
  },
];

/* ---------------- DATA ---------------- */

const data = [
  {
    key: 1,
    cve: "CVE-2021-41775",
    risk: "High",
    type: "Misconfiguration",
    description: "Directory traversal & RCE",
    date: "April 16, 2023",
    evidence: {
      payload: "../../../../etc/passwd",
      response: "root:x:0:0:root:/root:/bin/bash",
      conclusion: "Server exposed system file",
    },
  },
  {
    key: 2,
    cve: "XSS-basic",
    risk: "Medium",
    type: "Client-Side",
    description: "Cross-Site Scripting detected",
    date: "April 16, 2023",
    evidence: {
      payload: "<script>alert(1)</script>",
      response: "<script>alert(1)</script>",
      conclusion: "Payload reflected without sanitization",
    },
  },
];

/* ---------------- LOGIC ---------------- */

const calculateRiskScore = (data) => {
  let score = 0;

  data.forEach((v) => {
    if (v.risk === "High") score += 40;
    else if (v.risk === "Medium") score += 20;
    else score += 5;
  });

  return Math.min(score, 100);
};

const groupByType = (data) => {
  const map = {};
  data.forEach((v) => {
    map[v.type] = (map[v.type] || 0) + 1;
  });
  return map;
};

/* ---------------- COMPONENT ---------------- */

const Reports = () => {
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
  };
  const riskScore = calculateRiskScore(data);
  const riskLevel =
    riskScore > 70
      ? "High Risk"
      : riskScore > 40
        ? "Moderate Risk"
        : "Low Risk";

  const grouped = groupByType(data);
  const expandedRowRender = (record) => (
    <div
      style={{
        background: darkMode ? "#0f172a" : "#fafafa",
        color: darkMode ? "#ffffff" : "#000000",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <p>
        <b>Test Payload:</b>
      </p>
      <pre>{record.evidence.payload}</pre>

      <p>
        <b>Server Response:</b>
      </p>
      <pre>{record.evidence.response}</pre>

      <p>
        <b>Why this is vulnerable:</b>
      </p>
      <p>{record.evidence.conclusion}</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, padding: "40px" }}>
      <Breadcrumb
        style={{
          color: colors.secondary,
          marginBottom: 10,
        }}
        items={[
          {
            title: (
              <span style={{ color: colors.secondary }}>
                Home
              </span>
            ),
          },
          {
            title: (
              <span style={{ color: colors.secondary }}>
                Reports
              </span>
            ),
          },
          {
            title: (
              <span style={{ color: colors.secondary }}>
                ScanReport: example.com
              </span>
            ),
          },
        ]}
      />

      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginTop: 12 }}>
        <div>
          <Title
            level={2}
            style={{
              marginBottom: 0,
              color: colors.text,
            }}
          >
            Scan Report
          </Title>
          <Text
            style={{
              color: colors.secondary,
            }}
          >
            Vulnerability Scan Report for <b>example.com</b>
          </Text>
        </div>

        <Button
          type="primary"
          icon={<DownloadOutlined />}
          style={{
            background:
              "linear-gradient(135deg,#3b82f6,#2563eb)",
            border: "none",
            height: 46,
            borderRadius: 12,
            fontWeight: 600,
          }}
        >
          Download PDF
        </Button>
      </Row>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col flex="250px">
          <Card
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
            styles={{
              body: {
                background: colors.card,
                color: colors.text,
              },
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: colors.secondary,
                  }}
                >
                  Critical Issues
                </span>
              }
              value={data.filter((d) => d.risk === "High").length}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>

        <Col flex="250px">
          <Card
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
            styles={{
              body: {
                background: colors.card,
                color: colors.text,
              },
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: colors.secondary,
                  }}
                >
                  Medium Issues
                </span>
              }
              value={data.filter((d) => d.risk === "Medium").length}
              valueStyle={{ color: "#d48806" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>

        <Col flex="250px">
          <Card
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
            styles={{
              body: {
                background: colors.card,
                color: colors.text,
              },
            }}
          >
            <Statistic
              title={
                <span
                  style={{
                    color: colors.secondary,
                  }}
                >
                  Low Issues
                </span>
              }
              value={data.filter((d) => d.risk === "Low").length}
              valueStyle={{ color: "#389e0d" }}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Security Posture */}
      <Card
        title={
          <span style={{ color: colors.text }}>
            Security Posture
          </span>
        }
        style={{
          marginTop: 20,
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
        styles={{
          body: {
            background: colors.card,
            color: colors.text,
          },
          header: {
            background: colors.card,
            color: colors.text,
            borderBottom: `1px solid ${colors.border}`,
          },
        }}
      >
        <Row align="middle" gutter={24}>
          <Col flex="250px">
            <Progress
              type="circle"
              percent={riskScore}
              strokeColor={
                riskScore > 70
                  ? "#ff4d4f"
                  : riskScore > 40
                    ? "#faad14"
                    : "#52c41a"
              }
              trailColor={darkMode ? "#1f2937" : "#e5e7eb"}
              format={(percent) => (
                <span
                  style={{
                    color: colors.text,
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {percent}%
                </span>
              )}
            />
          </Col>
          <Col flex="auto">
            <Title
              level={4}
              style={{
                color: colors.text,
              }}
            >
              {riskLevel}
            </Title>
            <Text
              style={{
                color: colors.secondary,
              }}
            >
              This score represents the estimated exposure level based on
              detected vulnerabilities.
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Vulnerability Breakdown */}
      <Card
        title={
          <span style={{ color: colors.text }}>
            Vulnerability Breakdown
          </span>
        }
        style={{
          marginTop: 20,
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
        styles={{
          body: {
            background: colors.card,
            color: colors.text,
          },
          header: {
            background: colors.card,
            color: colors.text,
            borderBottom: `1px solid ${colors.border}`,
          },
        }}
      >
        {Object.entries(grouped).map(([type, count]) => {
          const percent = Math.round((count / data.length) * 100);

          return (
            <div key={type} style={{ marginBottom: 16 }}>
              <Row justify="space-between">
                <b style={{ color: colors.text }}>
                  {type}
                </b>

                <span
                  style={{
                    color: colors.secondary,
                  }}
                >
                  {count} issues
                </span>
              </Row>

              <Progress percent={percent} showInfo={false} />
            </div>
          );
        })}
      </Card>

      {/* Issues Table */}
      <Card
        title={
          <span style={{ color: colors.text }}>
            Detected Issues
          </span>
        }
        style={{
          marginTop: 20,
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
        styles={{
          body: {
            background: colors.card,
            color: colors.text,
          },
          header: {
            background: colors.card,
            color: colors.text,
            borderBottom: `1px solid ${colors.border}`,
          },
        }}
      >
        <Table
          className={darkMode ? "dark-table" : ""}
          columns={columns}
          dataSource={data}
          expandable={{ expandedRowRender }}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Reports;
