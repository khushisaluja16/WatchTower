import React from "react";
import { Row, Col, Card, Typography, Button, Breadcrumb } from "antd";

import {
  DownloadOutlined,
  ExclamationCircleFilled,
  WarningFilled,
  CheckCircleFilled,
  AppstoreFilled,
} from "@ant-design/icons";

const { Title, Text } = Typography;

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
        {/* account card */}
      </Row>
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
    </div>
  );
};

export default ScanResult;
