import React from 'react';

interface StatusIndicatorProps {
  status?: string;
  isLive?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status = 'NOMINAL',
  isLive = true,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-2 font-[var(--mono)] text-xs font-bold text-[var(--accent)] select-none ${className}`}>
      <span className={`w-2 h-2 rounded-full bg-[var(--accent)] ${isLive ? 'animate-pulse' : ''}`} />
      <span>{status}</span>
    </div>
  );
};

