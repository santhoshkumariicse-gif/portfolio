import React, { useState } from 'react';
import { HeroSystemArchitecture } from '../svgs/HeroSystemArchitecture';

export const SystemVisualization: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>('core');

  const telemetryMap: Record<string, { label: string; coords: string; status: string }> = {
    core: { label: 'SYS_CORE // CENTRAL COORDINATOR', coords: '[0.50, 0.50]', status: 'NOMINAL / 100% ONLINE' },
    ingress: { label: 'IN_01 // PERIMETER INGRESS GATEWAY', coords: '[0.17, 0.23]', status: 'FILTERING / ACTIVE' },
    analyzer: { label: 'AN_02 // HEURISTIC TRAFFIC ANALYZER', coords: '[0.83, 0.25]', status: 'INSPECTION SINK' },
    vault: { label: 'SEC_03 // ENCRYPTED DATA VAULT', coords: '[0.81, 0.77]', status: 'AES_GCM ENCRYPTED' },
    dispatch: { label: 'GW_04 // DISPATCH BUS GATEWAY', coords: '[0.19, 0.75]', status: 'BUS NOMINAL' },
    probe_a: { label: 'PRB_05 // HEURISTIC SINK PROBE', coords: '[0.50, 0.16]', status: 'LOW LATENCY' },
    probe_b: { label: 'PRB_06 // FILTER BOUNDARY PROBE', coords: '[0.31, 0.50]', status: 'PASS CONFIRMED' },
    probe_c: { label: 'PRB_07 // AUDIT LOG REGISTRY', coords: '[0.69, 0.52]', status: 'TELEMETRY RECORDING' }
  };

  const currentInfo = activeNodeId && telemetryMap[activeNodeId]
    ? telemetryMap[activeNodeId]
    : telemetryMap.core;

  return (
    <div className="w-full max-w-[480px] mx-auto lg:ml-auto border border-[var(--border-strong)] bg-[var(--surface)] shadow-2xl transition-all duration-300 hover:border-[var(--active-border)]">
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[rgba(19,21,18,0.92)] border-b border-[var(--border)] font-[var(--mono)] text-[0.66rem] tracking-wider uppercase text-[var(--secondary-text)]">
        <span className="flex items-center gap-1.5 font-bold text-[var(--primary-text)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          SYSTEM_MESH // 01
        </span>
        <span className="text-[var(--accent)] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          DEFENSE MESH
        </span>
      </div>

      {/* SVG Canvas Housing */}
      <div className="p-3 sm:p-4">
        <HeroSystemArchitecture
          activeNodeId={activeNodeId}
          onSelectNode={(id) => setActiveNodeId(id)}
        />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-3.5 py-2.5 bg-[rgba(19,21,18,0.92)] border-t border-[var(--border)] font-[var(--mono)] text-[0.64rem] tracking-wider">
        <span className="text-[var(--muted)]">
          COORD: <span className="text-[var(--primary-text)] font-semibold">{currentInfo.coords}</span>
        </span>
        <span className="text-[var(--accent)] font-bold truncate">
          {currentInfo.label}
        </span>
      </div>
    </div>
  );
};

