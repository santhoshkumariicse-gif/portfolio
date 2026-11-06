import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroSystemArchitectureProps {
  className?: string;
  activeNodeId?: string | null;
  onSelectNode?: (nodeId: string) => void;
}

export const HeroSystemArchitecture: React.FC<HeroSystemArchitectureProps> = ({
  className = '',
  activeNodeId,
  onSelectNode
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Network topology definition
  const nodes = [
    { id: 'core', label: 'SYS_CORE', sub: 'CENTRAL HUB', x: 240, y: 220, r: 24, isCore: true },
    { id: 'ingress', label: 'IN_01', sub: 'INGRESS GATEWAY', x: 80, y: 100, r: 16 },
    { id: 'analyzer', label: 'AN_02', sub: 'TRAFFIC ANALYZER', x: 400, y: 110, r: 16 },
    { id: 'vault', label: 'SEC_03', sub: 'VAULT ENCRYPTION', x: 390, y: 340, r: 18 },
    { id: 'dispatch', label: 'GW_04', sub: 'DISPATCH BUS', x: 90, y: 330, r: 16 },
    { id: 'probe_a', label: 'PRB_05', sub: 'HEURISTIC SINK', x: 240, y: 70, r: 14 },
    { id: 'probe_b', label: 'PRB_06', sub: 'FILTER BOUNDARY', x: 150, y: 220, r: 14 },
    { id: 'probe_c', label: 'PRB_07', sub: 'AUDIT REGISTRY', x: 330, y: 230, r: 14 }
  ];

  const links = [
    { from: 0, to: 1 }, // Core to Ingress
    { from: 0, to: 2 }, // Core to Analyzer
    { from: 0, to: 3 }, // Core to Vault
    { from: 0, to: 4 }, // Core to Dispatch
    { from: 1, to: 5 }, // Ingress to Probe A
    { from: 5, to: 2 }, // Probe A to Analyzer
    { from: 1, to: 6 }, // Ingress to Probe B
    { from: 6, to: 0 }, // Probe B to Core
    { from: 0, to: 7 }, // Core to Probe C
    { from: 7, to: 3 }, // Probe C to Vault
    { from: 4, to: 6 }, // Dispatch to Probe B
    { from: 4, to: 3 }  // Dispatch to Vault
  ];

  return (
    <div className={`relative w-full aspect-square max-w-[480px] mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 480 440"
        className="w-full h-full overflow-visible"
        role="img"
        aria-labelledby="hero-arch-title hero-arch-desc"
      >
        <title id="hero-arch-title">Security Architecture System Topology</title>
        <desc id="hero-arch-desc">
          Vector diagram showing an active defense topology with a central coordinator hub, perimeter ingress, threat analysis sink, cryptographic vault, and inspection probes.
        </desc>

        {/* Technical Grid Pattern */}
        <defs>
          <pattern id="hero-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(240, 240, 233, 0.04)" strokeWidth="0.75" />
          </pattern>
        </defs>

        <rect width="480" height="440" fill="url(#hero-grid-pattern)" />

        {/* Concentric Coordinate Rings */}
        <circle cx="240" cy="220" r="180" fill="none" stroke="rgba(240, 240, 233, 0.05)" strokeDasharray="3 6" />
        <circle cx="240" cy="220" r="110" fill="none" stroke="rgba(240, 240, 233, 0.06)" />

        {/* Connection Trace Lines */}
        {links.map((link, idx) => {
          const n1 = nodes[link.from];
          const n2 = nodes[link.to];
          const isHighlighted = activeNodeId === n1.id || activeNodeId === n2.id;

          return (
            <g key={`link-${idx}`}>
              <line
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={isHighlighted ? 'var(--accent)' : 'rgba(199, 255, 69, 0.24)'}
                strokeWidth={isHighlighted ? 1.8 : 1.1}
                strokeDasharray={isHighlighted ? 'none' : idx % 2 === 0 ? 'none' : '4 3'}
                className="transition-colors duration-200"
              />

              {/* Data packet flow animation along paths */}
              {!shouldReduceMotion && (
                <motion.circle
                  r={isHighlighted ? 2.8 : 2}
                  fill={isHighlighted ? 'var(--accent)' : 'rgba(199, 255, 69, 0.8)'}
                  animate={{
                    cx: [n1.x, n2.x],
                    cy: [n1.y, n2.y]
                  }}
                  transition={{
                    duration: 3 + (idx % 3),
                    repeat: Infinity,
                    ease: 'linear',
                    delay: idx * 0.35
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Topology Nodes */}
        {nodes.map((node) => {
          const isActive = activeNodeId === node.id;
          const isCore = node.isCore;

          return (
            <g
              key={node.id}
              className="cursor-pointer group"
              onClick={() => onSelectNode?.(node.id)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.sub}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectNode?.(node.id);
                }
              }}
            >
              {/* Outer Pulse Halo for Core or Active Node */}
              {(isCore || isActive) && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + 10}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.4 }
                      : {
                          scale: [1, 1.25, 1],
                          opacity: [0.5, 0.15, 0.5]
                        }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}

              {/* Node Outer Housing */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={isCore ? 'var(--raised)' : 'var(--surface)'}
                stroke={isActive || isCore ? 'var(--accent)' : 'rgba(240, 240, 233, 0.22)'}
                strokeWidth={isCore ? 2 : 1.2}
                className="transition-all duration-200 group-hover:stroke-[var(--accent)]"
              />

              {/* Node Center Dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isCore ? 6 : 3.5}
                fill={isCore || isActive ? 'var(--accent)' : 'var(--primary-text)'}
                className="transition-colors duration-200"
              />

              {/* Monospace Telemetry Labels */}
              <text
                x={node.x}
                y={node.y + node.r + 14}
                textAnchor="middle"
                fontFamily="var(--mono)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.06em"
                fill={isActive || isCore ? 'var(--accent)' : 'var(--secondary-text)'}
                className="transition-colors duration-200 select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

