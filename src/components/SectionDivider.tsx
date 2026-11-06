import React from 'react';

interface SectionDividerProps {
  label?: string;
  sub?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  sub = 'LAT 11.23°N // LON 78.16°E',
  className = ''
}) => {
  return (
    <div
      className={`relative w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-4 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-between">
        {/* Left Technical Crosshair Marker */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)] font-[var(--mono)] text-xs opacity-75">+</span>
          <span className="w-12 h-[1px] bg-[var(--border-strong)] inline-block" />
        </div>

        {/* Center Tag / Coordinate Readout */}
        {label ? (
          <div className="flex items-center gap-3 px-3 py-1 border border-[var(--border)] bg-[var(--surface-subtle)] font-[var(--mono)] text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
            <span className="text-[var(--secondary-text)] font-semibold">{label}</span>
            <span className="text-[var(--border-strong)]">|</span>
            <span className="hidden sm:inline">{sub}</span>
          </div>
        ) : (
          <div className="h-[1px] flex-1 mx-4 bg-[var(--border)]" />
        )}

        {/* Right Technical Crosshair Marker */}
        <div className="flex items-center gap-2">
          <span className="w-12 h-[1px] bg-[var(--border-strong)] inline-block" />
          <span className="text-[var(--accent)] font-[var(--mono)] text-xs opacity-75">+</span>
        </div>
      </div>
    </div>
  );
};

