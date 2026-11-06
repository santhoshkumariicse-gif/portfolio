import React from 'react';

interface SkillIconProps {
  className?: string;
}

export const ProgrammingSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <path d="M16 18l6-6-6-6" stroke="var(--accent)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 6l-6 6 6 6" stroke="var(--accent)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 4l-4 16" stroke="var(--primary-text)" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WebArchitectureSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="1" stroke="var(--primary-text)" />
    <line x1="2" y1="7" x2="22" y2="7" stroke="var(--accent)" />
    <circle cx="5" cy="5" r="0.75" fill="var(--accent)" />
    <circle cx="8" cy="5" r="0.75" fill="var(--secondary-text)" />
    <path d="M8 21h8M12 17v4" stroke="var(--secondary-text)" strokeLinecap="round" />
  </svg>
);

export const BackendSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <rect x="3" y="4" width="18" height="6" rx="1" stroke="var(--primary-text)" />
    <rect x="3" y="14" width="18" height="6" rx="1" stroke="var(--accent)" />
    <circle cx="7" cy="7" r="1" fill="var(--accent)" />
    <circle cx="7" cy="17" r="1" fill="var(--primary-text)" />
    <path d="M14 7h4M14 17h4" stroke="var(--secondary-text)" strokeLinecap="round" />
  </svg>
);

export const MobileDevelopmentSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <rect x="6" y="2" width="12" height="20" rx="2" stroke="var(--primary-text)" />
    <line x1="10" y1="5" x2="14" y2="5" stroke="var(--accent)" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1" fill="var(--accent)" />
  </svg>
);

export const DatabaseSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="var(--accent)" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="var(--primary-text)" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="var(--accent)" />
  </svg>
);

export const ToolsSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <circle cx="6" cy="6" r="3" stroke="var(--accent)" />
    <circle cx="6" cy="18" r="3" stroke="var(--primary-text)" />
    <circle cx="18" cy="12" r="3" stroke="var(--accent)" />
    <path d="M9 6h4a5 5 0 015 5M6 9v6" stroke="var(--secondary-text)" strokeLinecap="round" />
  </svg>
);

export const SecurityEngineeringSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" stroke="var(--accent)" strokeLinejoin="round" />
    <path d="M12 8v4M12 16h.01" stroke="var(--primary-text)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WorkflowToolingSvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <circle cx="6" cy="6" r="3" stroke="var(--accent)" />
    <circle cx="6" cy="18" r="3" stroke="var(--primary-text)" />
    <circle cx="18" cy="12" r="3" stroke="var(--accent)" />
    <path d="M9 6h4a5 5 0 015 5M6 9v6" stroke="var(--secondary-text)" strokeLinecap="round" />
  </svg>
);

export const AISecuritySvg: React.FC<SkillIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <path d="M12 2a4 4 0 014 4v1h1a4 4 0 014 4v2a4 4 0 01-4 4h-1v1a4 4 0 01-4 4h0a4 4 0 01-4-4v-1H7a4 4 0 01-4-4v-2a4 4 0 014-4h1V6a4 4 0 014-4z" stroke="var(--accent)" strokeLinejoin="round" />
    <circle cx="9" cy="11" r="1" fill="var(--primary-text)" />
    <circle cx="15" cy="11" r="1" fill="var(--primary-text)" />
    <path d="M9 15h6" stroke="var(--accent)" strokeLinecap="round" />
  </svg>
);
