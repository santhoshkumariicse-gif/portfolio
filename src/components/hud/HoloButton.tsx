import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface HoloButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'lime' | 'crimson';
  icon?: React.ReactNode;
  active?: boolean;
}

export const HoloButton: React.FC<HoloButtonProps> = ({
  variant = 'cyan',
  icon,
  active = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const colorStyles = {
    cyan: {
      border: 'border-[#00E5FF]/50 hover:border-[#00E5FF]',
      text: 'text-[#00E5FF]',
      bg: 'bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20',
      activeBg: 'bg-[#00E5FF] text-[#0A0B09]',
      glow: 'shadow-[0_0_15px_rgba(0,229,255,0.35)]',
      corner: 'border-[#00E5FF]'
    },
    lime: {
      border: 'border-[#C7FF45]/50 hover:border-[#C7FF45]',
      text: 'text-[#C7FF45]',
      bg: 'bg-[#C7FF45]/10 hover:bg-[#C7FF45]/20',
      activeBg: 'bg-[#C7FF45] text-[#0A0B09]',
      glow: 'shadow-[0_0_15px_rgba(199,255,69,0.35)]',
      corner: 'border-[#C7FF45]'
    },
    crimson: {
      border: 'border-[#FF3358]/50 hover:border-[#FF3358]',
      text: 'text-[#FF3358]',
      bg: 'bg-[#FF3358]/10 hover:bg-[#FF3358]/20',
      activeBg: 'bg-[#FF3358] text-white',
      glow: 'shadow-[0_0_15px_rgba(255,51,88,0.35)]',
      corner: 'border-[#FF3358]'
    }
  }[variant];

  return (
    <motion.button
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      onClick={onClick}
      className={`relative px-3.5 py-2 font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 border rounded-sm backdrop-blur-md flex items-center justify-center gap-2 select-none ${
        active
          ? `${colorStyles.activeBg} ${colorStyles.glow} border-transparent font-extrabold`
          : `${colorStyles.bg} ${colorStyles.border} ${colorStyles.text}`
      } ${className}`}
      {...(props as any)}
    >
      {/* Reticle Corner Marks */}
      <span className={`absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l ${colorStyles.corner}`} />
      <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r ${colorStyles.corner}`} />
      <span className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l ${colorStyles.corner}`} />
      <span className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r ${colorStyles.corner}`} />

      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
