export interface ArchitectureNode {
  id: string;
  label: string;
  layer: 'client' | 'gateway' | 'compute' | 'storage' | 'security';
  technology: string;
  responsibilities: string[];
  securityControls: string;
  x: number;
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
  protocol: string;
}

export interface ProjectArchitectureConfig {
  projectId: string;
  title: string;
  systemDescription: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export const architectureConfigs: Record<string, ProjectArchitectureConfig> = {
  'python-security-automation': {
    projectId: 'python-security-automation',
    title: 'Python Security Log Triage Daemon Architecture',
    systemDescription: 'Event-driven streaming log inspection pipeline using regular expression extraction, threshold state tracking, and sanitized incident reporting.',
    nodes: [
      {
        id: 'log-stream',
        label: 'Auth Log Stream',
        layer: 'client',
        technology: 'Linux /var/log/auth.log',
        responsibilities: ['Emits authentication failure records', 'Handles streaming file I/O descriptors'],
        securityControls: 'Read-only sandbox file permissions',
        x: 80,
        y: 120
      },
      {
        id: 'regex-parser',
        label: 'Regex Parsing Engine',
        layer: 'compute',
        technology: 'Python 3 / re module',
        responsibilities: ['Extracts client IP, timestamp, and target user', 'Normalizes malformed syslog records'],
        securityControls: 'Precompiled regex patterns to avoid ReDoS',
        x: 300,
        y: 120
      },
      {
        id: 'sliding-window',
        label: 'Threshold Sliding Window',
        layer: 'compute',
        technology: 'In-memory Dict / Deque',
        responsibilities: ['Tracks consecutive failed attempts per IP', 'Computes moving rate over 60-second window'],
        securityControls: 'Bounded memory ring buffer prevents memory exhaustion',
        x: 520,
        y: 120
      },
      {
        id: 'alert-dispatch',
        label: 'Alert & Report Dispatch',
        layer: 'storage',
        technology: 'JSON / CSV Structured Sink',
        responsibilities: ['Emits structured triage records', 'Logs high-priority brute-force warnings'],
        securityControls: 'Output sanitization prevents log injection (CWE-117)',
        x: 740,
        y: 120
      }
    ],
    edges: [
      { from: 'log-stream', to: 'regex-parser', label: 'File Tail Stream', protocol: 'Local IPC / POSIX File IO' },
      { from: 'regex-parser', to: 'sliding-window', label: 'Parsed Event Tuple', protocol: 'Python In-Memory Call' },
      { from: 'sliding-window', to: 'alert-dispatch', label: 'Threshold Exceeded Alert', protocol: 'Structured JSON Sink' }
    ]
  },
  'web-sec-testing': {
    projectId: 'web-sec-testing',
    title: 'Web Application Security Audit Architecture',
    systemDescription: 'Defensive vulnerability evaluation architecture dissecting request interception, injection detection, and sanitization boundaries.',
    nodes: [
      {
        id: 'http-client',
        label: 'Test Request Client',
        layer: 'client',
        technology: 'Browser / HTTP Client',
        responsibilities: ['Dispatches intentional test payloads (SQLi, XSS)', 'Records raw HTTP status and headers'],
        securityControls: 'Controlled lab testing only (DVWA / PortSwigger)',
        x: 80,
        y: 120
      },
      {
        id: 'proxy-intercept',
        label: 'Proxy Interceptor',
        layer: 'gateway',
        technology: 'Burp Suite / OWASP ZAP',
        responsibilities: ['Inspects raw request/response headers', 'Analyzes parameter reflection sinks'],
        securityControls: 'Local loopback proxy bindings (127.0.0.1)',
        x: 300,
        y: 120
      },
      {
        id: 'param-defense',
        label: 'Defensive Sanitizer',
        layer: 'security',
        technology: 'Parameterized Queries / CSP',
        responsibilities: ['Enforces prepared statements for SQL', 'Encodes HTML entities to prevent stored/reflected XSS'],
        securityControls: 'OWASP Top 10 mitigation guidelines',
        x: 520,
        y: 120
      },
      {
        id: 'database-sink',
        label: 'Lab Database Sink',
        layer: 'storage',
        technology: 'SQLite / PostgreSQL Lab',
        responsibilities: ['Stores normalized records', 'Validates zero query interpolation'],
        securityControls: 'Isolated sandbox database with zero external exposure',
        x: 740,
        y: 120
      }
    ],
    edges: [
      { from: 'http-client', to: 'proxy-intercept', label: 'Raw HTTP Request', protocol: 'HTTP/1.1 over Loopback' },
      { from: 'proxy-intercept', to: 'param-defense', label: 'Target Route Dispatch', protocol: 'Inspected Request Stream' },
      { from: 'param-defense', to: 'database-sink', label: 'Parameterized Execution', protocol: 'SQL Driver Bind Variables' }
    ]
  },
  'rda-lorrybook': {
    projectId: 'rda-lorrybook',
    title: 'RDA / LorryBook Fleet Platform [Conceptual Schema]',
    systemDescription: 'Conceptual event-driven logistics architecture modeling on-demand truck booking, geofence trip tracking, and digital proof of delivery.',
    nodes: [
      {
        id: 'driver-ui',
        label: 'Driver & Shipper UI',
        layer: 'client',
        technology: 'Responsive Web / Leaflet',
        responsibilities: ['Location broadcast', 'Trip status acknowledgement', 'Digital proof submission'],
        securityControls: 'Client-side input validation and HTTPS token auth',
        x: 80,
        y: 120
      },
      {
        id: 'api-gateway',
        label: 'FastAPI Dispatch Service',
        layer: 'gateway',
        technology: 'Python FastAPI / Pydantic',
        responsibilities: ['Validates trip payloads', 'Enforces driver queue availability logic'],
        securityControls: 'JWT Bearer token verification and rate limiting',
        x: 300,
        y: 120
      },
      {
        id: 'geofence-engine',
        label: 'Geofence Tracker',
        layer: 'compute',
        technology: 'Python Geodesic Math',
        responsibilities: ['Calculates radius ingress/egress', 'Triggers arrival lifecycle events'],
        securityControls: 'Sanitizes GPS coordinate boundaries',
        x: 520,
        y: 120
      },
      {
        id: 'postgres-store',
        label: 'Trip Ledger DB',
        layer: 'storage',
        technology: 'PostgreSQL Relational DB',
        responsibilities: ['Maintains immutable trip histories', 'Stores driver allocation states'],
        securityControls: 'Row-level isolation and encrypted secrets',
        x: 740,
        y: 120
      }
    ],
    edges: [
      { from: 'driver-ui', to: 'api-gateway', label: 'Trip Update / Heartbeat', protocol: 'HTTPS / REST API' },
      { from: 'api-gateway', to: 'geofence-engine', label: 'Coordinate Event', protocol: 'Internal IPC / Async Queue' },
      { from: 'geofence-engine', to: 'postgres-store', label: 'Trip State Ledger Write', protocol: 'PostgreSQL Connection Pool' }
    ]
  }
};

