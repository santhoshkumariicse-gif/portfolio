import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only run on desktop devices with fine pointer (no touchscreens)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Precision Reticle Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C7FF45] shadow-[0_0_8px_#C7FF45]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Trailing Cyber Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#C7FF45]/60"
        animate={{
          x: mousePosition.x - (isHovered ? 20 : 12),
          y: mousePosition.y - (isHovered ? 20 : 12),
          width: isHovered ? 40 : 24,
          height: isHovered ? 40 : 24,
          backgroundColor: isHovered ? 'rgba(199, 255, 69, 0.12)' : 'transparent',
          borderColor: isHovered ? '#C7FF45' : 'rgba(199, 255, 69, 0.5)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
      />
    </div>
  );
};
