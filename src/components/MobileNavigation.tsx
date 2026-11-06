import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  navItems: { id: string; label: string }[];
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeSection,
  navItems
}) => {
  const shouldReduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-[var(--surface)] border-l border-[var(--border-strong)] z-50 p-6 flex flex-col justify-between md:hidden"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 grid place-items-center border border-[var(--accent)] text-[var(--accent)] font-[var(--mono)] text-xs font-bold">
                    SK
                  </span>
                  <span className="font-bold text-sm tracking-tight text-[var(--primary-text)]">
                    Navigation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="min-w-[44px] min-h-[44px] grid place-items-center border border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--accent)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col mt-6 divide-y divide-[var(--border)]" aria-label="Mobile primary navigation">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={onClose}
                      className={`min-h-[48px] flex items-center justify-between font-[var(--mono)] text-xs uppercase tracking-widest font-semibold transition-colors ${
                        isActive
                          ? 'text-[var(--accent)] font-bold'
                          : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[var(--border)] flex flex-col gap-3">
              <a
                href="mailto:santhoshkumar160706@gmail.com?subject=Resume%20request"
                className="min-h-[44px] flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider transition-transform active:scale-[0.98]"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="text-[0.7rem] font-[var(--mono)] text-[var(--muted)] text-center">
                Namakkal, Tamil Nadu, India
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

