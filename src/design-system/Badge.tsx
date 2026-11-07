import React, { ReactNode } from 'react';

export type BadgeVariant = 'accent' | 'muted' | 'raised' | 'outline' | 'warning' | 'success';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'muted',
  className = ''
}) => {
  const variantMap: Record<BadgeVariant, string> = {
    accent: 'bg-[#E10620]/15 border-[#E10620]/40 text-[#FF3548]',
    muted: 'bg-white/5 border-[var(--border)] text-[var(--secondary-text)]',
    raised: 'bg-[var(--raised)] border-[var(--border)] text-[var(--secondary-text)]',
    outline: 'bg-transparent border-[var(--border-strong)] text-[var(--primary-text)]',
    warning: 'bg-amber-950/60 border-amber-800/60 text-amber-400',
    success: 'bg-red-950/40 border-[#E10620]/40 text-[#FF3548]'
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[0.68rem] font-[var(--mono)] uppercase tracking-wider font-bold border transition-colors select-none ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

