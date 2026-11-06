import React from 'react';

interface SectionHeadingProps {
  kicker: string;
  badge?: string;
  title: string;
  italicWord?: string;
  description: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  badge,
  title,
  italicWord,
  description,
  className = ''
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
          {kicker}
        </span>
        {badge && (
          <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
            {badge}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
        {title}{' '}
        {italicWord && (
          <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
            {italicWord}
          </span>
        )}
      </h2>

      <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
        {description}
      </p>
    </div>
  );
};
