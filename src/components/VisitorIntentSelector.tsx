import React from 'react';
import { Briefcase, Terminal, Compass } from 'lucide-react';
import { VisitorPath } from '../types';

interface VisitorIntentSelectorProps {
  currentPath: VisitorPath;
  onSelectPath: (path: VisitorPath) => void;
}

export const VisitorIntentSelector: React.FC<VisitorIntentSelectorProps> = ({
  currentPath,
  onSelectPath
}) => {
  const options: Array<{
    id: VisitorPath;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'general',
      label: 'Complete Tour',
      sublabel: 'Full story & systems',
      icon: Compass
    },
    {
      id: 'recruiter',
      label: 'Recruiter Track',
      sublabel: 'Résumé, skills & contact',
      icon: Briefcase
    },
    {
      id: 'developer',
      label: 'Developer Track',
      sublabel: 'Architecture, labs & CLI',
      icon: Terminal
    }
  ];

  return (
    <div className="w-full max-w-[720px] mx-auto my-6 px-4">
      <div
        role="radiogroup"
        aria-label="Visitor Profile Personalization"
        className="p-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-md flex flex-col sm:flex-row items-stretch gap-1.5 shadow-lg"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = currentPath === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectPath(opt.id)}
              className={`flex-1 py-2 px-3 rounded flex items-center justify-between sm:justify-center gap-2.5 transition-all text-left font-[var(--mono)] text-xs cursor-pointer ${
                isSelected
                  ? 'bg-[var(--accent)] text-[var(--bg)] font-bold shadow-[0_0_15px_var(--accent-glow)]'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:bg-[var(--raised)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[var(--bg)]' : 'text-[var(--accent)]'}`} />
                <span>{opt.label}</span>
              </div>
              <span
                className={`text-[0.65rem] hidden md:inline opacity-80 ${
                  isSelected ? 'text-[var(--bg)]' : 'text-[var(--muted)]'
                }`}
              >
                ({opt.sublabel})
              </span>
            </button>
          );
        })}
      </div>

      {/* Track Explanatory Notice */}
      <div className="mt-2 text-center text-[0.7rem] font-[var(--mono)] text-[var(--muted)]">
        {currentPath === 'recruiter' && (
          <span>★ Recruiter Track active: Prioritizing verified internship milestones, skills toolkit, ATS résumé & direct contact links.</span>
        )}
        {currentPath === 'developer' && (
          <span>⚙ Developer Track active: Prioritizing technical projects, interactive architecture visualizers & cybersecurity sandboxes.</span>
        )}
        {currentPath === 'general' && (
          <span>✦ Standard Track active: Full sequential overview across engineering case studies, labs, and career history.</span>
        )}
      </div>
    </div>
  );
};

