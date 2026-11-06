import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-[var(--bg)] border-t border-[var(--border)] text-xs font-[var(--mono)] text-[var(--muted)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 grid place-items-center border border-[var(--border)] text-[var(--accent)] font-bold text-[0.65rem]">
            SK
          </span>
          <span>© {new Date().getFullYear()} Santhosh Kumar M</span>
        </div>

        <div className="text-center sm:text-right flex items-center gap-4">
          <span>Engineered with React + TypeScript + SVGs</span>
          <a
            href="#top"
            className="inline-flex items-center gap-1 text-[var(--secondary-text)] hover:text-[var(--accent)] transition-colors"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

