import React from "react";
import { Row, Col, Card, Typography, Button, Breadcrumb } from "antd";

import {
  DownloadOutlined,
  ExclamationCircleFilled,
  WarningFilled,
  CheckCircleFilled,
  AppstoreFilled,
} from "@ant-design/icons";
import { Table } from "antd";

const portsColumns = [
  { title: "Port", dataIndex: "port" },
  { title: "Service", dataIndex: "service" },
  { title: "Type", dataIndex: "type" },
];

const portsData = [
  {
    key: 1,
    port: 80,
    service: "Nginx / 1.14.0",
    type: "HTTP",
  },
  {
    key: 2,
    port: 9443,
    service: "Apache / 2.4.29",
    type: "HTTPS",
  },
];

const { Title, Text } = Typography;

const SummaryCard = ({ icon, title, value, percent, color, subtitle }) => {
  return (
    <Card bordered={false} style={{ height: "100%" }}>
      <Row align="middle" gutter={12}>
        <Col>{icon}</Col>
        <Col>
          <Text strong>{title}</Text>
        </Col>
      </Row>

      <Title level={2} style={{ color, marginTop: 12 }}>
        {value}{" "}
        {percent && <Text style={{ fontSize: 14, color }}>{percent}</Text>}
      </Title>

      <Text type="secondary">{subtitle}</Text>
    </Card>
  );
};

const ScanResult = () => {
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 16,
        }}
      >
        <Breadcrumb items={[{ title: "Home" }, { title: "Scan Results" }]} />
        
      </Row>{/* account card */}
      <Row
        gutter={24}
        style={{ marginTop: "32px", marginBottom: 24 }}
        justify="space-between"
        align="middle"
      >
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            Scan Results
          </Title>
          <Text type="secondary">
            Target: <b>example.com</b> · Duration: 4.52 sec · Date: April 2023
          </Text>
        </div>

        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Download PDF
        </Button>
      </Row>
      {/* scan result summary card */}

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <SummaryCard
            icon={<ExclamationCircleFilled style={{ color: "#ff4d4f" }} />}
            title="Critical Issues"
            value="3"
            percent="(16.6%)"
            color="#ff4d4f"
            subtitle="Score"
          />
        </Col>

        <Col span={6}>
          <SummaryCard
            icon={<WarningFilled style={{ color: "#faad14" }} />}
            title="Medium Issues"
            value="6"
            percent="(9.75%)"
            color="#faad14"
            subtitle="Score"
          />
        </Col>

        <Col span={6}>
          <SummaryCard
            icon={<CheckCircleFilled style={{ color: "#52c41a" }} />}
            title="Low Issues"
            value="7"
            percent="(44.2%)"
            color="#52c41a"
            subtitle="Score"
          />
        </Col>

        <Col span={6}>
          <SummaryCard
            icon={<AppstoreFilled style={{ color: "#1890ff" }} />}
            title="Open Ports"
            value="2"
            subtitle="Services exposed"
          />
        </Col>
      </Row>
      {/* Recommendations */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Recommendations">
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>Upgrade Apache to version 2.4.49 for security patches.</li>
              <li>Implement CSP and input validation to mitigate XSS risks.</li>
              <li>
                Close unnecessary and vulnerable ports to minimize exposure.
              </li>
            </ul>
          </Card>
        </Col>

        
      </Row>
      {/* tables  */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Detected Ports">
            <Table
              columns={portsColumns}
              dataSource={portsData}
              pagination={false}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Detected Ports">
            <Table
              columns={portsColumns}
              dataSource={portsData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ScanResult;
