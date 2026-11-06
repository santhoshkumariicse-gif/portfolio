import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useAppMotion } from './MotionProvider';

interface MotionButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  className?: string;
}

export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const { shouldReduceMotion } = useAppMotion();

  const variantStyles = {
    primary: 'bg-[var(--accent)] text-[var(--bg)] font-bold hover:bg-[#d8ff6b] border border-[var(--accent)]',
    secondary: 'bg-[var(--surface)] text-[var(--primary-text)] border border-[var(--border)] hover:border-[var(--accent)]',
    ghost: 'bg-transparent text-[var(--secondary-text)] hover:text-[var(--primary-text)]',
    outline: 'border border-[var(--border)] text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
  };

  const baseStyle = 'inline-flex items-center justify-center font-[var(--mono)] text-xs tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] select-none';

  if (shouldReduceMotion) {
    return (
      <button
        className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

