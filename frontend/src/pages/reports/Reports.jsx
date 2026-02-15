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
  const riskScore = calculateRiskScore(data);
  const riskLevel =
    riskScore > 70
      ? "High Risk"
      : riskScore > 40
        ? "Moderate Risk"
        : "Low Risk";

  const grouped = groupByType(data);
  const expandedRowRender = (record) => (
    <div style={{ background: "#fafafa", padding: 16, borderRadius: 8 }}>
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
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Breadcrumb
        items={[
          { title: "Home" },
          { title: "Reports" },
          { title: "ScanReport: example.com" },
        ]}
      />

      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginTop: 12 }}>
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Scan Report
          </Title>
          <Text type="secondary">
            Vulnerability Scan Report for <b>example.com</b>
          </Text>
        </div>

        <Button type="primary" icon={<DownloadOutlined />}>
          Download PDF
        </Button>
      </Row>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Critical Issues"
              value={data.filter((d) => d.risk === "High").length}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Medium Issues"
              value={data.filter((d) => d.risk === "Medium").length}
              valueStyle={{ color: "#d48806" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Low Issues"
              value={data.filter((d) => d.risk === "Low").length}
              valueStyle={{ color: "#389e0d" }}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Security Posture */}
      <Card title="Security Posture" style={{ marginTop: 20 }}>
        <Row align="middle" gutter={24}>
          <Col span={8}>
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
            />
          </Col>
          <Col span={16}>
            <Title level={4}>{riskLevel}</Title>
            <Text type="secondary">
              This score represents the estimated exposure level based on
              detected vulnerabilities.
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Vulnerability Breakdown */}
      <Card title="Vulnerability Breakdown" style={{ marginTop: 20 }}>
        {Object.entries(grouped).map(([type, count]) => {
          const percent = Math.round((count / data.length) * 100);

          return (
            <div key={type} style={{ marginBottom: 16 }}>
              <Row justify="space-between">
                <b>{type}</b>
                <span>{count} issues</span>
              </Row>

              <Progress percent={percent} showInfo={false} />
            </div>
          );
        })}
      </Card>

      {/* Issues Table */}
      <Card title="Detected Issues" style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{expandedRowRender}}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Reports;
