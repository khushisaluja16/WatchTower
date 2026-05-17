# models.py
# Pydantic models = data validators + serializers
# FastAPI uses these automatically to validate request/response data

from pydantic import BaseModel
from typing import Optional, List

class SSLScanRequest(BaseModel):
    target: str        # e.g. "google.com"
    port: int = 443    # default HTTPS port
    scan_id: Optional[str] = None  # links to parent scan later

class SSLScanResponse(BaseModel):
    hostname: str
    port: int
    error: Optional[str] = None
    cert_subject: Optional[str] = None
    cert_issuer: Optional[str] = None
    cert_serial_number: Optional[str] = None
    valid_from: Optional[str] = None
    valid_until: Optional[str] = None
    days_until_expiry: Optional[int] = None
    is_expired: bool = False
    is_self_signed: bool = False
    tls_version: Optional[str] = None
    cipher_suite: Optional[str] = None
    cipher_bits: Optional[int] = None
    subject_alt_names: List[str] = []
    hsts_enabled: bool = False
    hsts_max_age: Optional[int] = None
    grade: Optional[str] = None
    warnings: List[str] = []
    db_id: Optional[str | int] = None