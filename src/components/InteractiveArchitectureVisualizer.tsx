import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Shield, Layers, Server, Database, Globe, CheckCircle, Info } from 'lucide-react';
import { architectureConfigs, ArchitectureNode } from '../data/architectureModels';

export const InteractiveArchitectureVisualizer: React.FC = () => {
  const projectKeys = Object.keys(architectureConfigs);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectKeys[0]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeLayerFilter, setActiveLayerFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAccessibleText, setShowAccessibleText] = useState<boolean>(false);

  const currentConfig = architectureConfigs[selectedProjectId] || architectureConfigs[projectKeys[0]];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.7));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedNodeId(null);
  };

  const selectedNode = currentConfig.nodes.find((n) => n.id === selectedNodeId) || currentConfig.nodes[0];

  const getLayerIcon = (layer: ArchitectureNode['layer']) => {
    switch (layer) {
      case 'client': return Globe;
      case 'gateway': return Layers;
      case 'compute': return Server;
      case 'storage': return Database;
      case 'security': return Shield;
      default: return Server;
    }
  };

  const layers = [
    { id: 'all', label: 'All Layers' },
    { id: 'client', label: 'Client / Ingress' },
    { id: 'gateway', label: 'Gateway' },
    { id: 'compute', label: 'Compute Engine' },
    { id: 'storage', label: 'Persistence' },
    { id: 'security', label: 'Security Boundary' }
  ];

  return (
    <section id="architecture-visualizer" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#131512]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                Architecture // Interactive Systems
              </span>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                Topology Inspector
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--primary-text)]">
              System architecture,{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                deconstructed.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              Interactive node-link topological diagrams tracing client ingress, computational parsing, storage tiers, and defensive security countermeasures.
            </p>
          </div>

          {/* Toggle Accessible Text Alternative */}
          <button
            type="button"
            onClick={() => setShowAccessibleText(!showAccessibleText)}
            className="self-start md:self-end min-h-[40px] px-3.5 py-1.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary-text)] hover:text-[var(--accent)] hover:border-[var(--accent)] font-[var(--mono)] text-xs transition-colors flex items-center gap-2 cursor-pointer"
            aria-pressed={showAccessibleText}
          >
            <Info className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{showAccessibleText ? 'Show Visual Diagram' : 'Show Text Specification'}</span>
          </button>
        </div>

        {/* Project Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-[var(--border)] pb-4 font-[var(--mono)] text-xs">
          {projectKeys.map((key) => {
            const config = architectureConfigs[key];
            const isActive = selectedProjectId === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedProjectId(key);
                  setSelectedNodeId(null);
                }}
                className={`min-h-[40px] px-4 py-2 border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[var(--accent)] bg-[var(--raised)] text-[var(--accent)] font-bold shadow-[0_0_12px_var(--accent-glow)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                {config.title.split(' ')[0]} {config.title.split(' ')[1]}
              </button>
            );
          })}
        </div>

        {/* Layer Filters & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerFilter(layer.id)}
                className={`px-2.5 py-1 text-[0.7rem] font-[var(--mono)] uppercase tracking-wider rounded transition-colors cursor-pointer ${
                  activeLayerFilter === layer.id
                    ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                    : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--secondary-text)]'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>

          {/* Zoom & Reset Controls */}
          <div className="flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--border)] p-1 rounded font-[var(--mono)] text-xs">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom in diagram"
              className="p-1.5 hover:text-[var(--accent)] transition-colors text-[var(--secondary-text)]"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="px-2 text-[0.7rem] text-[var(--muted)]">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom out diagram"
              className="p-1.5 hover:text-[var(--accent)] transition-colors text-[var(--secondary-text)]"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Reset zoom and selection"
              className="p-1.5 hover:text-[var(--accent)] transition-colors text-[var(--secondary-text)] border-l border-[var(--border)] pl-2"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showAccessibleText ? (
          /* Accessible Text Specification Mode */
          <div className="bg-[#0A0B09] border border-[var(--border-strong)] p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--primary-text)] mb-2">{currentConfig.title}</h3>
              <p className="text-sm text-[var(--secondary-text)]">{currentConfig.systemDescription}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-[var(--mono)] uppercase tracking-wider text-[var(--accent)] font-bold">
                System Topology Nodes:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentConfig.nodes.map((node) => (
                  <div key={node.id} className="p-4 bg-[var(--surface)] border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm text-[var(--primary-text)]">{node.label}</strong>
                      <span className="text-[0.65rem] font-[var(--mono)] uppercase px-2 py-0.5 bg-[var(--raised)] text-[var(--accent)]">
                        {node.layer}
                      </span>
                    </div>
                    <div className="text-xs font-[var(--mono)] text-[var(--secondary-text)] mb-2">
                      Technology: <span className="text-[var(--primary-text)]">{node.technology}</span>
                    </div>
                    <ul className="text-xs text-[var(--secondary-text)] list-disc list-inside space-y-1 mb-2">
                      {node.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                    <div className="text-[0.7rem] font-[var(--mono)] text-[var(--accent)]">
                      Security Control: {node.securityControls}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Interactive SVG Diagram & Detail Split Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* SVG Diagram Canvas */}
            <div className="lg:col-span-8 bg-[#0A0B09] border border-[var(--border-strong)] p-4 sm:p-6 overflow-hidden relative min-h-[380px] flex items-center justify-center">
              <div
                className="w-full transition-transform duration-200 origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg
                  viewBox="0 0 880 240"
                  className="w-full h-auto"
                  role="img"
                  aria-label={`${currentConfig.title} Interactive Schematic`}
                >
                  <defs>
                    <marker
                      id="v8-arrowhead"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill="#C7FF45" opacity="0.8" />
                    </marker>
                  </defs>

                  {/* Edges / Data Flow Pipes */}
                  {currentConfig.edges.map((edge, idx) => {
                    const fromNode = currentConfig.nodes.find((n) => n.id === edge.from);
                    const toNode = currentConfig.nodes.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const isHighlighted = selectedNodeId === edge.from || selectedNodeId === edge.to;

                    return (
                      <g key={idx}>
                        <path
                          d={`M ${fromNode.x + 80} ${fromNode.y + 30} L ${toNode.x} ${toNode.y + 30}`}
                          stroke={isHighlighted ? '#C7FF45' : 'rgba(240, 240, 233, 0.2)'}
                          strokeWidth={isHighlighted ? 2.5 : 1.5}
                          strokeDasharray={isHighlighted ? 'none' : '4,4'}
                          markerEnd="url(#v8-arrowhead)"
                        />
                        <text
                          x={(fromNode.x + toNode.x + 80) / 2}
                          y={fromNode.y + 20}
                          fill={isHighlighted ? '#C7FF45' : '#9BA195'}
                          fontSize="9"
                          fontFamily="JetBrains Mono, monospace"
                          textAnchor="middle"
                        >
                          {edge.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {currentConfig.nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isDimmed = activeLayerFilter !== 'all' && activeLayerFilter !== node.layer;

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNodeId(node.id)}
                        className="cursor-pointer transition-opacity"
                        opacity={isDimmed ? 0.35 : 1}
                      >
                        {/* Node Card Shell */}
                        <rect
                          width="120"
                          height="60"
                          rx="4"
                          fill={isSelected ? '#1D211C' : '#131512'}
                          stroke={isSelected ? '#C7FF45' : 'rgba(240, 240, 233, 0.2)'}
                          strokeWidth={isSelected ? 2 : 1}
                        />

                        {/* Status Light */}
                        <circle
                          cx="15"
                          cy="18"
                          r="3"
                          fill={isSelected ? '#C7FF45' : '#585F53'}
                        />

                        {/* Node Title */}
                        <text
                          x="25"
                          y="22"
                          fill={isSelected ? '#C7FF45' : '#F0F0E9'}
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {node.label.length > 13 ? `${node.label.substring(0, 11)}..` : node.label}
                        </text>

                        {/* Tech Tag */}
                        <text
                          x="12"
                          y="45"
                          fill="#9BA195"
                          fontSize="8.5"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {node.technology.length > 15 ? `${node.technology.substring(0, 14)}..` : node.technology}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Instructions banner */}
              <div className="absolute bottom-3 left-4 text-[0.65rem] font-[var(--mono)] text-[var(--muted)] pointer-events-none">
                💡 Click any component node to inspect responsibilities & security boundaries.
              </div>
            </div>

            {/* Selected Node Deep-Dive Panel */}
            <div className="lg:col-span-4 bg-[var(--surface)] border border-[var(--border-strong)] p-6">
              <div className="flex items-center gap-2 mb-3">
                {(() => {
                  const NodeIcon = getLayerIcon(selectedNode.layer);
                  return <NodeIcon className="w-4 h-4 text-[var(--accent)]" />;
                })()}
                <span className="font-[var(--mono)] text-xs text-[var(--accent)] font-bold uppercase tracking-wider">
                  {selectedNode.layer} Layer Inspection
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--primary-text)] mb-1">
                {selectedNode.label}
              </h3>
              <div className="text-xs font-[var(--mono)] text-[var(--secondary-text)] mb-4">
                Implementation: <span className="text-[var(--primary-text)] font-semibold">{selectedNode.technology}</span>
              </div>

              <div className="mb-4">
                <div className="text-xs font-[var(--mono)] uppercase text-[var(--secondary-text)] font-semibold mb-2">
                  Key Responsibilities:
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--secondary-text)]">
                  {selectedNode.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-xs font-[var(--mono)] uppercase text-[var(--accent)] font-semibold mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Security &amp; Defensive Controls:</span>
                </div>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                  {selectedNode.securityControls}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

