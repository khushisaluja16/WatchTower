# WatchTower

## Intelligent Vulnerability Assessment & Security Intelligence Platform

WatchTower is a web-based cybersecurity platform designed to automate vulnerability discovery, security assessment, and remediation planning for web applications and internet-facing services.

The platform combines network reconnaissance, service discovery, SSL/TLS analysis, web security validation, vulnerability matching, risk scoring, and recommendation generation into a unified security dashboard.

---

## Features

### Network Reconnaissance

* Host Discovery
* Open Port Detection
* Service Identification
* Version Detection

### Web Security Analysis

* Security Header Validation
* Information Disclosure Detection
* robots.txt Analysis
* Basic Web Security Assessment

### SSL/TLS Assessment

* Certificate Validation
* TLS Version Detection
* Cipher Suite Analysis
* Certificate Expiry Monitoring
* HSTS Verification
* SSL Security Grading

### Vulnerability Detection

* CVE Matching Engine
* Service-Based Vulnerability Identification
* Severity Classification
* Vulnerability Aggregation

### Risk Assessment

* Severity Aggregation
* Dynamic Risk Scoring
* Risk Level Classification
* Security Posture Evaluation

### Recommendation Engine

* Remediation Recommendations
* Priority Ranking
* Impact Assessment
* Effort Estimation
* Recommendation Scoring

### Reporting & Visualization

* Interactive Security Dashboard
* Vulnerability Reports
* Scan History
* Risk Analytics
* Security Metrics Visualization

---

## Architecture

```text
Frontend (React + Vite)
            │
            ▼
      FastAPI Backend
            │
            ▼
       ScanService
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Nmap     Web Scan    SSL Scan
Service   Service    Service
 │          │          │
 └──────────┼──────────┘
            ▼
 Vulnerability Engine
            ▼
 Severity Aggregator
            ▼
     Risk Engine
            ▼
 Recommendation Engine
            ▼
      Final Report
            ▼
         Frontend
```

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Recharts

### Backend

* FastAPI
* Python

### Database

* Supabase

### Security & Scanning

* Nmap
* python-nmap
* SSL/TLS Analysis
* CVE Matching Engine

### Deployment

* Vercel (Frontend)
* Render / Railway (Backend)

---

## Project Structure

```text
backend/
│
├── routes/
│   ├── scan_routes.py
│   └── ssl_routes.py
│
├── services/
│   ├── scan_service.py
│   ├── nmap_service.py
│   ├── web_scanner.py
│   ├── ssl_analyzer.py
│   ├── ssl_service.py
│   ├── vulnerability_engine.py
│   ├── severity_aggregator.py
│   ├── risk_engine.py
│   ├── recommendation_engine.py
│   └── scan_metadata_generator.py
│
├── models/
│
├── database.py
│
└── main.py
```

---

## Scan Workflow

```text
User Enters Domain
        │
        ▼
ScanService
        │
        ▼
Port Scan
        │
        ▼
Service Detection
        │
        ▼
Web Security Checks
        │
        ▼
SSL Analysis
        │
        ▼
Vulnerability Matching
        │
        ▼
Severity Aggregation
        │
        ▼
Risk Scoring
        │
        ▼
Recommendation Generation
        │
        ▼
Security Report
```

---

## Sample Output

```json
{
  "target": "example.com",

  "network": {
    "ip": "192.168.1.1",
    "open_ports": [80, 443]
  },

  "ssl_analysis": {
    "grade": "A"
  },

  "summary": {
    "risk_score": 15,
    "risk_level": "Low"
  }
}
```

---

## Future Enhancements

* OWASP Mapping
* CVSS Scoring
* MITRE ATT&CK Integration
* PDF Report Generation
* Threat Intelligence Integration
* DNS Enumeration
* Subdomain Discovery
* AI-Powered Security Explanations
* Attack Path Analysis

---

## Objectives

WatchTower aims to provide an accessible, extensible, and actionable vulnerability assessment platform capable of helping organizations identify, understand, and remediate security weaknesses through automated security intelligence and reporting.

---
